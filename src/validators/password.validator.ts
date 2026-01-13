/*
 * Created on Mon Dec 29 2025 22:36:04
 * File name : password.validator.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Mon Dec 29 2025 22:36:04
 * 2025 Ankur Gangwar
 */

import validate from "../utils/validation.util";

import { regex } from "../utils/regex.util";

interface AuthPayload {
  username: string;
  password: string;
}

export const PasswordValidator = (payload: AuthPayload) =>
  validate(payload, {
    username: {
      required: true,
      regex: regex.username,
      message: "Invalid username",
    },
    password: {
      required: true,
      regex: regex.password,
      message: "Invalid password format",
    },
  }); 