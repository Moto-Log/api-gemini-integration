import { Client } from 'pg';
import * as dotenv from 'dotenv';


dotenv.config();

// Load database credentials from environment variables or a secure configuration file
export default class Database {
  private static instance: Client | null;

  private constructor() {}

  public static getInstance(): Client {
    if (!Database.instance) {
      // Create the connection only once
      Database.instance = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT!, 10) || 5432,
      });
    }
    return Database.instance;
  }

  public static disconnect(): void {
    if (Database.instance) {
      Database.instance.end();
      Database.instance = null;
    }
  }
}