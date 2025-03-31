import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import bcrypt from "bcryptjs";
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);




const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);

    try {

        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })

    } catch (error) {
        console.log(">>> Check error", error)
    }


}

const getUserList = async () => {
    let user = [];

    user = await db.User.findAll();

    return user;
    //create connection specify bluebird as Pormise
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         'SELECT * from user',
    //     );

    //     return rows;
    // } catch (err) {
    //     console.log(">>> Check error: ", err)
    // }

}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    });

    // DELETE FROM user WHERE id = ""
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         'DELETE FROM user WHERE id = ?',
    //         [id]
    //     );

    //     return rows;
    // } catch (error) {
    //     console.log(">>> Check error: ", error)
    // }

}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    })

    return user.get({ plain: true })

    // console.log(">>> check user findOne: ", user.get({ plain: true }), "id = ", id);

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         'SELECT * FROM user WHERE id = ?',
    //         [id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log(">>> Check error: ", error)
    // }
}

const updateUserInfo = async (email, username, id) => {
    await db.User.update(
        { email: email, username: username },
        {
            where: {
                id: id,
            },
        },
    );
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         'UPDATE user SET email = ?, username = ? WHERE id = ?',
    //         [email, username, id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log(">>> Check error: ", error)
    // }
}


module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo
}