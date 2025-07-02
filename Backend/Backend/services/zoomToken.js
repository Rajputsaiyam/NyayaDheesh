const axios = require('axios');
const qs = require('querystring');
require('dotenv').config();

let accessToken = null;
let tokenExpiration = null;

async function getAccessToken() {
  if (accessToken && tokenExpiration > Date.now()) {
    return accessToken;
  }

  try {
    const authString = Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64');

    const response = await axios.post('https://zoom.us/oauth/token', qs.stringify({
      grant_type: 'account_credentials',
      account_id: process.env.ZOOM_ACCOUNT_ID
    }), {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Verify token has required scopes
    if (!response.data.scope.includes('meeting:write')) {
      throw new Error('Token missing required meeting:write scope');
    }

    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000);

    return accessToken;
  } catch (error) {
    console.error('Error getting OAuth access token:', error.response?.data || error.message);
    throw new Error('Failed to get Zoom access token with required scopes');
  }
}
async function createZoomMeeting(meetingData) {
  try {
    const token = await getAccessToken();
    
    // Ensure proper JSON formatting of meeting data
    // const formattedMeetingData = {
    //   topic: meetingData.topic || 'Legal Consultation',
    //   type: 2, // Scheduled meeting
    //   start_time: new Date(meetingData.start_time).toISOString(),
    //   duration: meetingData.duration || 30, // Default 30 minutes
    //   timezone: 'UTC',
    //   settings: {
    //     host_video: true,
    //     participant_video: true,
    //     join_before_host: false,
    //     mute_upon_entry: true,
    //     auto_recording: 'none',
    //     ...meetingData.settings
    //   }
    // };
    const formattedMeetingData = {
      topic: "Test Meeting",
      type: 2,
      start_time: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      duration: 30,
      timezone: "UTC",
      settings: {
        host_video: true,
        participant_video: true
      }
    };

    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      formattedMeetingData, // This will be properly stringified by axios
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      meetingId: response.data.id,
      joinUrl: response.data.join_url,
      startUrl: response.data.start_url
    };
  } catch (error) {
    console.error('Detailed Zoom API error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error('Failed to create Zoom meeting: ' + (error.response?.data?.message || error.message));
  }
}

module.exports = {
  createZoomMeeting
};