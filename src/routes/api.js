import express from "express";
const router = express.Router();
import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'
import roleController from "../controller/roleController"
/**
 * 
 * @param {*} app: express app
 */

// const testMiddleWare = (req, res, next) => {
//     console.log(">>> calling a middleware")
//     if (true) {
//         return res.send("reject middleware")
//     }
//     next();
// }


const initApiRoutes = (app) => {
    //rest api
    //GET - R; POST - C, PUT - U, DELETE - D

    router.all('*', checkUserJWT, checkUserPermission,);

    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.post("/logout", apiController.handleLogout)


    router.get("/account", userController.getUserAccount);

    //user routes
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    //role routes
    router.get("/role/read", roleController.readFunc);
    router.post("/role/create", roleController.createFunc);
    router.put("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup);

    //group routes
    router.get("/group/read", groupController.readFunc);


    return app.use("/api/v1/", router);
}

export default initApiRoutes;