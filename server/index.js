import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { createServer } from "http";
import { corsOptions } from "./config/corsConfig.js";

// custom imports
import startupRoute from "./routes/startup.js"


dotenv.config()

// creating server by using express
const app = express()
const httpServer = createServer(app);


// express parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// CORS middleware
app.use(cors(corsOptions));
app.use(helmet())


// routes
app.use("/api/v1/startup", startupRoute)



const PORT = process.env.port || 4000
httpServer.listen(PORT, () => {
    console.log(`Server listening at port - ${PORT}`)
})