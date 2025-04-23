require('dotenv').config();

import express from "express";
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
// import connection from "./config/connectDB";
import initApiRoutes from "./routes/api"
import configCors from "./config/cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;


//config CORS
configCors(app)

//config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());
//test connection DB
// connection();



//init web route
initWebRoutes(app);
initApiRoutes(app);


app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log(`>>> JWT Backend is running on port ${PORT}`)
})

