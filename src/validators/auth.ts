/*
 * Created on Thu Jan 01 2026 00:15:16
 * File name : auth.js
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Thu Jan 01 2026 00:15:16
 * 2026 Ankur Gangwar
 */



class AuthError extends Error { 
  private code:string;
  constructor(message:string, code:string = "AUTH_ERROR") {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}


export default AuthError;