import db from '../models/index'
import bcrypt from "bcryptjs";


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}


const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    });

    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    });

    if (user) {
        return true;
    }
    return false;
}



const registerNewUser = async (rawUserData) => {

    try {
        //check email/phone already exist
        let isEmailExist = await checkEmailExist(rawUserData.email)
        if (isEmailExist === true) {
            return {
                EM: "The Email is already exist",
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist === true) {
            return {
                EM: "The Phone number is already exist",
                EC: 1
            }
        }
        //hash password

        let hashPassword = hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            username: rawUserData.username,
            password: hashPassword
        })

        return {
            EM: 'A user created successfully',
            EC: 0
        }

    } catch (e) {
        console.log(e)
        return {
            EM: "Some thing wrong in service",
            EC: "-2"
        }
    }



}

module.exports = {
    registerNewUser
}