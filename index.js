import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./configs/dbConfig.js";

import OrderRoutes from './routes/orderRoute.js';
import itemRoutes from './routes/itemRoutes.js';

//initialized express
const app = express();

const URL = process.env.ORIGIN_URL;

// SERVER PORT
const PORT = process.env.PORT || 6001;

// root end point
app.get("/", (req, res) => {
  res.send("Welcome to SLPD");
});

// CORS [allow the pass the cookies to orin localhost]
app.use(cors({ credentials: true, origin: URL }));

// accept JSONS
app.use(express.json({ limit: "100mb" }));

// config the urlEncoded middleware
app.use(express.urlencoded({ extended: false }));

// register cookie parser middleware
app.use(cookieParser());



app.use('/orders', OrderRoutes);
app.use('/items', itemRoutes);


app.use((req, res, next) => {
  console.log(`${req.method} =====> URL: ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`🚀💀 Server is started on port ${PORT}!`);
  dbConnect();
});



