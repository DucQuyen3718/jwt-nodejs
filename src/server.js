import express from "express";
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web";
require('dotenv').config();
import bodyParser from "body-parser";
// import connection from "./config/connectDB";
import initApiRoutes from "./routes/api"
import configCors from "./config/cors";
import { createJWT, verifyToken } from "./middleware/JWTAction"

const app = express();
const PORT = process.env.PORT || 8080;


//config CORS
configCors(app)

//config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection DB
// connection();

//test jwt
createJWT();
let decodedData = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGVjUXV5biIsImFkZHJlc3MiOiJIYU5vaSIsImlhdCI6MTc0NTM5NTU1N30.txLf9gjLnNnvREIgmSEgU9IuI01-yETC7qqprP3o3-0");
console.log(decodedData)
//init web route
initWebRoutes(app);
initApiRoutes(app);
app.listen(PORT, () => {
    console.log(`>>> JWT Backend is running on port ${PORT}`)
})

