/**
 * File: mongo.config.js
 * Author: Ankur Gangwar
 * Created: 2025-12-25
 * Description: This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 */

import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();


class MongoDBCLient {
  private static instance: Mongoose | null = null;

  constructor() {
    //do nothing
  }

  public static async getInstance(): Promise<Mongoose> {
    if (!MongoDBCLient.instance) {
      try {
        const mongoURL = process.env.MONGO_URI;
        if (!mongoURL) {
          throw new Error("MONGO_URI is not defined");
        }

        MongoDBCLient.instance = await mongoose.connect(mongoURL, {
          maxPoolSize: Number(process.env.MONGO_POOL_SIZE || 10),
          serverSelectionTimeoutMS: 5000,
        });

        console.log(
          `MongoDB connected: ${MongoDBCLient.instance.connection.host}`
        );

        mongoose.connection.on("error", (err) => {
          console.error("MongoDB runtime error:", err);
        });


      } catch (err: any) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
      }

    }

    return MongoDBCLient.instance;
  }
}

export default MongoDBCLient;
 