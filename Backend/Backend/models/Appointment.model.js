const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true
  },
  consultationMode: {
    type: String,
    enum: ["In-Person", "Online"],
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending"
  },
  zoomMeetingId: {
    type: String
  },
  zoomJoinUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports=Appointment;
