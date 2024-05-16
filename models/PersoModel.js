const connection  = require('../db/db');



class PersoModel {

    // récupération de tous les info du personnage de Tintin
    static async getAllPerso() {
        try {
            const sql = 'SELECT * FROM Personnages';
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
                console.log("🚀 ~ PersoModel ~ results:", results[0]);
                return results; // Retournez ici les résultats
            } catch (error) {
                    throw new Error("Erreur lors de la récupération des données Tintin");
                }
    }

    // récupération de toutes les info du personnage de Tintin par son id
    static async getPersoById(id) {
        console.log("🚀 ~ PersoModel ~ getPersoById ~ id:", id)
        try {
            const escapeId = connection.escape(id);
            const sql = 'SELECT * FROM Personnages WHERE id = ' + escapeId;
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
                    console.log("🚀 ~ PersoModel ~ results:", results);
                    return results; // Retournez ici les résultats
                } catch (error) {
                    throw new Error("Erreur lors de la récupération des données Tintin");
                }
    }
    
    


}

module.exports = PersoModel;
