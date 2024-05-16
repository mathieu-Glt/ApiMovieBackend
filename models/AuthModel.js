const connection  = require('../db/db');



class AuthModel {

    // verify user exists
    static async  getUser(id) {
        console.log("🚀 ~ AuthModel ~ getUser ~ id:", id)
        try {
            const escapeId = connection.escape(id);
            const sql = 'SELECT * FROM Users WHERE id = ' + escapeId;
            const results = await new Promise((resolve, reject) => {
                connection.query(sql, function (err, results) {
                    if (err) {
                        const customError = new Error("Erreur lors de la récupération des données Tintin");
                        customError.details = err.message;
                        reject(customError);
                    }
                    resolve(results);
                });
            });
            console.log("🚀 ~ AuthModel ~ results:", results);
            return results; // Retournez ici les résultats
        } catch (error) {
            throw new Error("Erreur lors de la récupération des données Tintin");
        }
    }
}

module.exports = AuthModel;
