import * as express from "express"
import * as bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes/routes"
import { registerRoutes } from "./utils/registerRoutes"

AppDataSource.initialize().then(async () => {
    const app = express()    
    app.use(bodyParser.json())
    registerRoutes(app, Routes);
    app.listen(3000)
    console.log("http://localhost:3000/users listening...")

}).catch(error => console.log(error))
