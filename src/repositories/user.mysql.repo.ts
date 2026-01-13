/*
* Created on Mon Jan 12 2026 23:17:13
* File name : user.mysql.repo.ts
* This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
* Description : Mon Jan 12 2026 23:17:13
* 2026 Ankur Gangwar
*/
import { Pool, RowDataPacket } from "mysql2/promise";
import { User } from "../entity/user.entity";

class UserRepository {
    private db: Pool;
    constructor(db: Pool) {
        this.db = db;
    }

    async findByUsername(username: string): Promise<User | null> {
        const [rows] = await this.db.query<User[]>(
            "SELECT * FROM users WHERE username = ? LIMIT 1",
            [username]
        );
        return rows[0] ?? null;
    }


    async findByMobile(mobile: string): Promise<User | null> {
        const [rows] = await this.db.query<User[]>("select * from users where mobile = ?", [mobile]);
        return rows[0] ?? null;
    }
}


export default UserRepository;