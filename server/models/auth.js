const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true, trim: true, min: 3, max: 20, },
    lastName: { type: String, require: true, trim: true, min: 3, max: 20, },
    email: { type: String, require: true, trim: true, unique: true, lowercase: true, },
    hash_password: { type: String, require: true, },
}, { timestamps: true });


const appointmentSchema = new mongoose.Schema({
    id: ObjectId,
    title: { type: String, require: true, trim: true, min: 3, max: 20 },
    agenda: { type: String, require: true, trim: true, min: 3, max: 20 },
    name: { type: String, require: true, trim: true, min: 3, max: 20 },
    email: { type: String, require: true, trim: true, min: 3, max: 20 },
    withAppointment: { type: String, require: true },
    offHours: { type: String, require: true },
    slots: { type: ObjectId, require: true, ref: 'Slot' },
    created_at: Date
});

const slotSchema = new mongoose.Schema({
    slot_time: { type: String, require: true },
    slot_date: { type: String, require: true },
    created_at: { type: Date, default: Date.now },
});

slotSchema.index({ slot_time: 1, slot_date: 1 }, { unique: true });

userSchema.virtual("fullName").get(function () { return `${this.firstName} ${this.lastName}`; });

userSchema.method({ async authenticate(password) { return bcrypt.compare(password, this.hash_password); }, });

appointmentSchema.method({ async authenticate(id) { return id, this.email, this.withAppointment, this.slots; }, })

slotSchema.method({ async authenticate(id) { return id, this.email, this.slot_time, this.slot_date; }, })


const User = mongoose.model('User', userSchema);
const Slot = mongoose.model('Slot', slotSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { User, Slot, Appointment };