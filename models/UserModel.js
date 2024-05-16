const connection = require('../db/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


class UserModel {

    // récupération d'un utilisateur par son id
    static async getUserById(id) {
        console.log("🚀 ~ file: User.js:44 ~ User ~ getOneUser ~ id:", id)
        return await new Promise(function (resolve, reject) {
            const escapeId = connection.escape(id).replace(/'/g,"");
            console.log("🚀 ~ UserModel ~ escapeId:", escapeId)
            const sql = 'SELECT * FROM Users WHERE id =  ' + escapeId;
            console.log("🚀 ~ UserModel ~ sql:", sql)
            connection.query(sql, function (error, results) {
                console.log("🚀 ~ file: User.js:47 ~ User ~ results:", results)
                if (error) {
                    reject(error)
                }
                console.log('Here the results sql for one task : ', results);
                const user = results[0]
                resolve(user);

            })
        })
    }

    // récupération d'un utilisateur par son role
    static async getRoleUser(userId) {
        console.log("🚀 ~ file: User.js:44 ~ User ~ getRoleUser ~ id:", userId)
        return await new Promise(function (resolve, reject) {
            const escapeId = connection.escape(userId).replace(/'/g,"");
            console.log("🚀 ~ UserModel ~ escapeId:", escapeId)
            const sql = 'SELECT role FROM Users WHERE id =  ' + escapeId;
            console.log("🚀 ~ UserModel ~ sql:", sql)
            connection.query(sql, function (error, results) {
                console.log("🚀 ~ file: User.js:47 ~ User ~ results:", results)
                if (error) {
                    reject(error)
                }
                console.log('Here the results sql for one task : ', results);
                const user = results
                resolve(user);
    
            })
        })
    }
    

    // récupération d'un utilisateur par son email
    static async getUserByEmail(email) {
        console.log("🚀 ~ file: User.js:26 ~ User ~ getUserByEmail ~ email:", email)

        return await new Promise(function (resolve, reject) {
            const escapeEmail = connection.escape(email)
            console.log("🚀 ~ UserModel ~ escapeEmail:", escapeEmail)
            const sql = 'SELECT * FROM Users WHERE email =  ' + escapeEmail;
            console.log("🚀 ~ UserModel ~ sql:", sql)
            connection.query(sql, function (error, results, fields) {
                console.log("🚀 ~ UserModel ~ results:", results)
                if (error) {
                    reject(error)
                }
                console.log('Here the results sql for one task : ', results);
                const user = results[0]
                resolve(user);
    
            })
        })
    }

    // création d'un utilisateur 
    static async saveOneUser(body) {
        console.log("🚀 ~ file: UserController.js:6 ~ User ~ saveOneUser ~ req:", body)
        let hash = await bcrypt.hash(body.password, saltRounds)
        return await new Promise(function (resolve, reject) {
            const escapeEmail = connection.escape(body.email).replace(/'/g,"")
            const escapeFirstname = connection.escape(body.firstname).replace(/'/g,"")
            const escapeLastname = connection.escape(body.lastname).replace(/'/g,"")


            connection.query('INSERT INTO Users (firstName, lastName, email, hashPassword, role, creation_times_tamp) VALUES (?,?,?,?,"user", NOW())', 
            [escapeFirstname, escapeLastname, escapeEmail, hash], function (error, results, fields) {
                if(error) {
                    reject(error)
                }
                console.log('Here the results now model : ', results);
                resolve(results);
    
            })

        })
    }

    


}

module.exports = UserModel;
