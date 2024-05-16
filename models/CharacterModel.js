const connection = require('../db/db')


class CharacterModel {

    // récupération de tous les personnages Tintin
    static async  getAllCharacters() {

        return await new Promise(function (resolve, reject) {
            const sql = 'SELECT * FROM Series';
            connection.query(sql, function (err, results) {
            console.log("🚀 ~ CharacterModel ~ results:", results)
                if (err) {
                    const customError = new Error("Erreur lors de la récupération des données Tintin");
                    customError.details = err.message;
                    reject(customError)
                }
                console.log('Here the results sql for one task : ', results);
                const characters = results;
                resolve(characters);
            })
        })
    }

    // récupération d'un personnage par son id
    static async getCharacterById(id) {
        console.log("🚀 ~ CharacterModel ~ getCharacterById ~ id:", id)
        return new Promise(function (resolve, reject){
            const escapeId = connection.escape(id);
            console.log("🚀 ~ CharacterModel ~ escapeId:", escapeId)
            const sql = 'SELECT * FROM  Series WHERE id = '  + escapeId ;
            console.log("🚀 ~ CharacterModel ~ sql:", sql)
            connection.query(sql, function (err, results) {
                console.log("🚀 ~ CharacterModel ~ results:", results)
                if(err) {
                    const customError = new Error("Erreur lors de la récupération des données Tintin");
                    customError.details = err.message;
                    reject(customError)
                }
                console.log('Here the results sql for one task : ', results);
                const tintin = results[0];
                resolve(tintin);
                    
                })
            })
    
            
        }

    // récupération d'un film par son nom
    static async getTintinByName(name) {
        console.log("🚀 ~ CharacterModel ~ getTintinByName ~ id:", name)
        return new Promise(function (resolve, reject){
            const escapeName = connection.escape(name);
            console.log("🚀 ~ CharacterModel ~ escapeName:", escapeName)
            const sql = 'SELECT * FROM  Series WHERE nom = '  + escapeName ;
            console.log("🚀 ~ CharacterModel ~ sql:", sql)
            connection.query(sql, function (err, results) {
                console.log("🚀 ~ CharacterModel ~ results:", results)
                if(err) {
                    const customError = new Error("Erreur lors de la récupération des données Tintin");
                    customError.details = err.message;
                    reject(customError)
                }
                console.log('Here the results sql for one task : ', results[0]);
                const character = results[0];
                resolve(character);
                
            })
        })

        
    }

    // modifier un personnage Tintin
    static  putCharacter(id, body) {
        console.log("🚀 ~ CharacterModel ~ putCharacter ~ body:", body)
        console.log("🚀 ~ CharacterModel ~ putCharacter ~ id:", id)
        return new Promise(function (resolve, reject){
            const idCharacter = connection.escape(id).replace(/'/g, "");
            const { nom, prenom, picture, profession, personnage, personnage_suite, slug } = body; 
            const nomPerso = connection.escape(nom).replace(/'/g, "");
            const prenomPerso = connection.escape(prenom).replace(/'/g, "");
            const imagePerso = connection.escape(picture).replace(/'/g, "");
            const professionPerso = connection.escape(profession).replace(/'/g, "");
            const personnagePerso = connection.escape(personnage).replace(/'/g, "");
            const personnageSuitePerso = connection.escape(personnage_suite).replace(/'/g, "");
            const slugPerso = connection.escape(slug).replace(/'/g, "");

            let sql = 'UPDATE Series SET nom=?, prenom=?, picture=?, profession=?, personnage=?, personnage_suite=?, slug=? WHERE id = ?';
            connection.query(sql, [nomPerso, prenomPerso, imagePerso, professionPerso, personnagePerso, personnageSuitePerso, slugPerso, idCharacter], function (err, results) {
                console.log("🚀 ~ CharacterModel ~ results:", results)
                if (err) {
                    const customError = new Error("Erreur lors de la mise à jour des données Tintin");
                    customError.details = err.message;
                    reject(customError);
                } else {
                    console.log("🚀 ~ getRandomMovies: ~ results:", results);
                    const jsonData = JSON.parse(JSON.stringify(results));
                    resolve(jsonData);
                }

            })

 
        })
        
    }

    // sauvegarde d'un personnage Tintin
    static async postCharacter(body) {
        console.log("🚀 ~ CharacterModel ~ postCharacter ~ body:", body)
        return new Promise(function (resolve, reject){
            const { nom, prenom, picture, profession, personnage, personnage_suite, slug } = body; 
            const nomPerso = connection.escape(nom).replace(/'/g, "");
            const prenomPerso = connection.escape(prenom).replace(/'/g, "");
            const imagePerso = connection.escape(picture).replace(/'/g, "");
            const professionPerso = connection.escape(profession).replace(/'/g, "");
            const personnagePerso = connection.escape(personnage).replace(/'/g, "");
            const personnageSuitePerso = connection.escape(personnage_suite).replace(/'/g, "");
            const slugPerso = connection.escape(slug).replace(/'/g, "");
            
            connection.query('INSERT INTO Series (nom, prenom, picture, profession, personnage, personnage_suite, slug, creation_times_tamp) VALUES (?,?,?,?,?,?,?, NOW())', [nomPerso, prenomPerso, imagePerso, professionPerso, personnagePerso, personnageSuitePerso, slugPerso], function (err, results) {
                if (err) {
                    const customError = new Error("Erreur lors de la récupération des données Tintin");
                    customError.details = err.message;
                    reject(customError);
                } else {
                    console.log("🚀 ~ getRandomMovies: ~ results:", results);
                    const jsonData = JSON.parse(JSON.stringify(results));
                    resolve(jsonData);
                }

            })

        })
        
    }

    // récupération d'un film par son slug
    static async getCharacterBySlug(slug) {
            console.log("🚀 ~ CharacterModel ~ getCharacterBySlug ~ id:", slug)
            return new Promise(function (resolve, reject){
                const escapeSlug = connection.escape(slug);
                console.log("🚀 ~ CharacterModel ~ escapeSlug:", escapeSlug)
                const sql = 'SELECT * FROM  Series WHERE slug = '  + escapeSlug ;
                console.log("🚀 ~ CharacterModel ~ sql:", sql)
                connection.query(sql, function (err, results) {
                    console.log("🚀 ~ CharacterModel ~ results:", results)
                    if(err) {
                        const customError = new Error("Erreur lors de la récupération des données Tintin");
                        customError.details = err.message;
                        reject(customError)
                    }
                    console.log('Here the results sql for one task : ', results);
                    const character = results[0];
                    resolve(character);
                        
                })
            })
    
            
    }

    // suppression d'un personnage
    static deleteCharacterById(id) {
        console.log("🚀 ~ CharacterModel ~ deleteCharacterById ~ id:", id)
        return new Promise(function (resolve, reject) {
            const escapeId = connection.escape(id).replace(/'/g,"");
            let sql = 'DELETE FROM Series WHERE id =?';

            connection.query(sql, escapeId, function(err, results) {
                if (err) {
                    const customError = new Error("Erreur lors de la récupération des données Tintin");
                    customError.details = err.message;
                    reject(customError);
                } else {
                    console.log("🚀 ~ getRandomMovies: ~ results:", results);
                    const jsonData = JSON.parse(JSON.stringify(results));
                    resolve(jsonData);
                }

            })

        })
        
    }
    

    



}

module.exports = CharacterModel;
