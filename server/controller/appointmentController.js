const { Appointment, Slot } = require("../models/auth.js");

const appointmentController = {
  all: async (req, res) => {
    try {
      const appointments = await Appointment.find({ email: req.body.email }).populate("slots").exec();
      res.json(appointments);
    } catch (err) {
      console.error('Error:', err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while fetching appointments",
      });
    }
  },
  create: async (req, res) => {
    const requestBody = req.body;

    try {
      const newSlot = new Slot({
        slot_time: requestBody.slot_time,
        slot_date: requestBody.slot_date,
        created_at: Date.now(),
      });

      await newSlot.save();

      // Check if there is an existing appointment for the same user, slot_time, and slot_date
      const existingAppointment = await Appointment.findOne({
        email: requestBody.email,
        "slots.slot_time": requestBody.slot_time,
        "slots.slot_date": requestBody.slot_date,
      });

      if (existingAppointment) {
        // Slot is already booked
        return res.status(400).json({
          message: "This slot is not available for booking",
        });
      }

      // Create a new appointment
      const newAppointment = new Appointment({
        title: requestBody.title,
        agenda: requestBody.agenda,
        name: requestBody.name,
        email: requestBody.email,
        slots: newSlot._id,
      });

      // Save the new appointment
      await newAppointment.save();

      // Return the saved appointment
      const savedAppointment = await Appointment.findOne({ _id: newAppointment._id })
        .populate("slots")
        .exec();

      res.json(savedAppointment);
    } catch (err) {
      if (err.code === 11000) {
        // Slot is already booked
        return res.status(400).json({
          message: "This slot is not available for booking",
        });
      }

      console.error('Error:', err);

      // Internal server error
      res.status(500).json({
        message: "An error occurred while creating the appointment",
      });
    }
  },
};

module.exports = appointmentController;