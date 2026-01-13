/*
 * Created on Thu Dec 25 2025 19:42:03
 * File name : log.model.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Dec 25 2025 19:42:03
 * 2025 Ankur Gangwar
 */

import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: { type: String, required: true },
  event: { type: String, required: true },
  payload: { type: Object },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Log", logSchema);
