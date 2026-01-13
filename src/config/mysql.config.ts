/*
 * Created on Fri Jan 09 2026 22:36:39
 * File name : mysql.config.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Fri Jan 09 2026 22:36:39
 * 2026 Ankur Gangwar
 */


import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

class MySQLDBClient {
  private static instance: Pool;

  constructor() {
    // do nothing
  }

  public static async getInstance(): Promise<Pool> {
    if (!MySQLDBClient.instance) {
      try {


        MySQLDBClient.instance = mysql.createPool({
          host                 : process.env.MYSQL_HOST,
          user                 : process.env.MYSQL_USERNAME,
          password             : process.env.MYSQL_PASSWORD,
          database             : process.env.MYSQL_DBNAME,
          waitForConnections   : true,
          connectionLimit      : Number(process.env.MYSQL_CONNECTION_LIMIT || 15),
          queueLimit           : 0,
          idleTimeout          : 0,
          enableKeepAlive      : true,
          keepAliveInitialDelay: 0,
        });

        const conn = await MySQLDBClient.instance.getConnection();
        console.log("MySQL connected");
        conn.release();
      }
      catch (err: any) {
        console.error("MySQL connection failed:", err.message);
        process.exit(1);
      }
    }



    return MySQLDBClient.instance;
  }


}


export default MySQLDBClient;
 