import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import bcrypt from "bcryptjs";


const salt = bcrypt.genSaltSync(10);




const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
            [email, hashPass, username]
        );

    } catch (error) {
        console.log(">>> Check error", error)
    }


}

const getUserList = async () => {
    let users = [];

    //create connection specify bluebird as Pormise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'SELECT * from users',
        );

        return rows;
    } catch (err) {
        console.log(">>> Check error: ", err)
    }

}

const deleteUser = async (id) => {
    // DELETE FROM users WHERE id = ""
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        return rows;
    } catch (error) {
        console.log(">>> Check error: ", error)
    }

}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );
        return rows;
    } catch (error) {
        console.log(">>> Check error: ", error)
    }
}

const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'UPDATE users SET email = ?, username = ? WHERE id = ?',
            [email, username, id]
        );
        return rows;
    } catch (error) {
        console.log(">>> Check error: ", error)
    }
}


module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo
}