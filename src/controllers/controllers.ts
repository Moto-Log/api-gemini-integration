import { Client, QueryResult } from "pg";
import Database from "../config/db";

class controller{
    public async validar_leitura(measure_datetime: string): Promise<any> {
        try {
          const db: Client = Database.getInstance();
          const result: QueryResult = await db.query(`SELECT * FROM image_readings`);
          if (result.rowCount > 0){
            throw new Error("Leitura do mês já realizada");
          }
          return result.rowCount > 0;
        } catch (error) {
          console.error('Error in controller:', error);
          throw error;
        }
    }
}

export default new controller();