import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import bcrypt from "bcryptjs";


const salt = bcrypt.genSaltSync(10);




const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);

    connection.query(
        `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
        }
    );
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

    // return connection.query(
    //     `SELECT * from users`,
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err)
    //             return users
    //         }

    //         users = results;
    //         console.log(">>> run get user", users)
    //         return users;
    //     }
    // );

    try {
        const [rows, fields] = await connection.execute(
            'SELECT * from users',
        );

        return rows;
    } catch (err) {
        console.log(">>> Check error: ", err)
    }

}


module.exports = {
    createNewUser,
    getUserList
}