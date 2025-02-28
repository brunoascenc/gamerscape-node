import "reflect-metadata";
import express from "express";
import { routes } from "./routes";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(routes);

app.listen(3333, () => console.log("Server is running"));