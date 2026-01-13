/*
* Created on Mon Jan 12 2026 22:34:09
* File name : regex.util.ts
* This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
* Description : Mon Jan 12 2026 22:34:09
* 2026 Ankur Gangwar
*/


 

export const regex  : {
  username: RegExp;
  password: RegExp;
  mobile: RegExp;
  email: RegExp;
} = {
  username: /^[a-zA-Z0-9_]{3,20}$/,

  // Min 8 chars, at least 1 uppercase letter and 1 digit
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,

  // Indian mobile numbers
  mobile: /^[6-9]\d{9}$/,

  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};
