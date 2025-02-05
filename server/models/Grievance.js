const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachments: [{ type: String }], // URLs to uploaded files
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Grievance", grievanceSchema);
