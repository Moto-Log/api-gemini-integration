import express from "express";
import {Request, Response} from "express";
import * as bodyParser from "body-parser";
import controller from "./controllers/controllers"
import { Client } from "pg";
import Database from "./config/db";
import dotenv from 'dotenv';
dotenv.config();

class StartUp {
    public app: express.Application;

    constructor() {
        this.app = express();
        const db: Client = Database.getInstance();
        this.middler();
        this.routes();
    }

    middler(){
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    routes(){
        this.app.route('/').get((req, res) => {
            res.status(201).send({ version: "0.0.1"});
        });
        this.app.route('/upload').post(async (req: Request, res: Response) => {
            try{
                const measure_datetime: string = req.body.measure_datetime;
                const response: any = await controller.validar_leitura(measure_datetime);
                res.status(200).send({response: response});

            } catch (e: any){
                res.status(400).send({error: e.message});
            }
        });
        
    }


}

export default new StartUp();