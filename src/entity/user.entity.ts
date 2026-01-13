/*
 * Created on Mon Jan 12 2026 23:27:29
 * File name : user.entity.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Mon Jan 12 2026 23:27:29
 * 2026 Ankur Gangwar
 */



import { RowDataPacket } from "mysql2/promise";

export interface User extends RowDataPacket {
    id      : number;
    username: string;
    mobile  : string;
    password: string;
    status? : string;
}