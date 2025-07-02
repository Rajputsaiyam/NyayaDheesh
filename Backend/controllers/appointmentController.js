const Appointment=require("../models/Appointment.model.js");
const { createZoomMeeting }=require("../services/zoomToken.js") ;

/**
 * Create an appointment & start Zoom Meeting
 */
async function  createAppointment (req, res) {
  try {
    const { user, lawyer, consultationMode, appointmentDate } = req.body;

    // Create a Zoom meeting only if consultation mode is "Online"
    let zoomMeeting = null;
    if (consultationMode === "Online") {
      zoomMeeting = await createZoomMeeting(appointmentDate);
    }

    // Save appointment to database
    const appointment = new Appointment({
      user,
      lawyer,
      consultationMode,
      appointmentDate,
      status: "Pending",
      zoomMeetingId: zoomMeeting ? zoomMeeting.meetingId : null,
      zoomJoinUrl: zoomMeeting ? zoomMeeting.joinUrl : null
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
      zoomMeeting
    });
  } catch (error) {
    console.error("Error creating appointment:", error.message);
    res.status(500).json({ message: "Error creating appointment" });
  }
};

module.exports = {createAppointment};