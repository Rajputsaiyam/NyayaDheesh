const Appointment = require('../models/Appointment');
const { createZoomMeeting } = require('./zoomOAuthService'); // Changed from zoomService

const createAppointment = async (appointmentData) => {
  try {
    if (appointmentData.consultationMode === 'Online') {
      const zoomMeeting = await createZoomMeeting({
        topic: `Legal Consultation - ${appointmentData.user.name}`,
        start_time: appointmentData.appointmentDate,
        duration: 60, // Default to 60 minutes
        settings: {
          waiting_room: true // Example additional setting
        }
      });
      
      appointmentData.zoomMeetingId = zoomMeeting.meetingId;
      appointmentData.zoomJoinUrl = zoomMeeting.joinUrl;
    }

    // Rest of your appointment creation logic
  } catch (error) {
    console.error('Appointment creation error:', error);
    throw error;
  }
};

module.exports = {createAppointment};
// ... rest of your service code