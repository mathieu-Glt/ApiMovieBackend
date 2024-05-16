const connection  = require('../db/db');




class HergeModel {


        // récupération de tous les info de Herge
        static async getAllHerge() {
            try {
                const sql = 'SELECT * FROM Herges';
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
                console.log("🚀 ~ HergeModel ~ results:", results[0]);
                return results; // Retournez ici les résultats
            } catch (error) {
                throw new Error("Erreur lors de la récupération des données Tintin");
            }
        }

        // récupération de toutes les info de Herge par son id
        static async getHergeById(id) {
            console.log("🚀 ~ HergeModel ~ getHergeById ~ id:", id)
            try {
                const escapeId = connection.escape(id);
                const sql = 'SELECT * FROM Herges WHERE id = ' + escapeId;
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
                console.log("🚀 ~ HergeModel ~ results:", results);
                return results; // Retournez ici les résultats
            } catch (error) {
                throw new Error("Erreur lors de la récupération des données Tintin");
            }
        }


            
}


module.exports = HergeModel;
