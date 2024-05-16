const connection = require('../db/db')


class FavoriesModel {

    // post d'un film Tintin dans sa liste de favoris
    static async postTintinListFavories(tokenUserId, movieId) {
        console.log("🚀 ~ FavoriesModel ~ postTintinListFavories ~ movieId:", movieId)
        console.log("🚀 ~ FavoriesModel ~ postTintinListFavories ~ tokenUserId:", tokenUserId)
        
        if(tokenUserId) {
            console.log('Utilisateur connecté ! ');
            return await new Promise(function (resolve, reject) {
                const sql = `INSERT INTO Favoris (userId, tintinId, creation_times_tamp) VALUES (?,?, NOW())`;
                connection.query(sql, [tokenUserId, movieId], function (err, results) {
                console.log("🚀 ~ TintinModel ~ results:", results)
                    if (err) {
                        const customError = new Error("Erreur lors de la récupération des données Tintin");
                        customError.details = err.message;
                        reject(customError)
                    }
                    console.log('Here the results sql for one task : ', results);
                    const tintin = results;
                    resolve(tintin);
                })
            })

        }
    }

    // récupération de tous les films Tintin dans la list de favoris
    // SELECT t.*, f.id AS favorite, f.userId FROM Tintins AS t LEFT JOIN Favoris AS f ON t.id = f.tintinId WHERE f.userId = 107
    static async  getAllTintinFavoris(tokenUserId) {
        console.log("🚀 ~ TintinModel ~ getAllTintin ~ tokenUserId:", tokenUserId)
    
        if(!tokenUserId) {
        console.log('Pas d\'utilisateur connecté ! ');
    
            return null;
        } else {
            console.log('Utilisateur connecté ! ');
    
            return await new Promise(function (resolve, reject) {
                const sql = `SELECT t.*, f.id AS favorite FROM Tintins AS t LEFT JOIN Favoris AS f ON t.id = f.tintinId WHERE f.userId = ${tokenUserId}`;
                connection.query(sql, function (err, results) {
                console.log("🚀 ~ TintinModel ~ results:", results)
                    if (err) {
                        const customError = new Error("Erreur lors de la récupération des données Tintin");
                        customError.details = err.message;
                        reject(customError)
                    }
                    console.log('Here the results sql for one task : ', results);
                    const tintin = results;
                    resolve(tintin);
                })
            })
    
     
        }
        }

        

        // récupération d'un film Tintin dans la liste de favoris avec id  de l'utilisateur et id du film
        // SELECT t.*, f.id AS favorite, f.userId AS utilisateur FROM Tintins AS t LEFT JOIN Favoris AS f ON t.id = f.tintinId WHERE f.tintinId = 6 AND f.userId = 107
        static async  getTintinFavorisById(tokenUserId, movieId) {
            console.log("🚀 ~ TintinModel ~ getAllTintin ~ tokenUserId:", tokenUserId)
            console.log("🚀 ~ FavoriesModel ~ getAllTintinFavorisById ~ movieId:", movieId)
        
            if(!tokenUserId) {
            console.log('Pas d\'utilisateur connecté ! ');
        
                return null;
            } else {
                console.log('Utilisateur connecté ! ');
        
                return await new Promise(function (resolve, reject) {
                    const sql = `SELECT t.*, f.id AS favorite, f.userId AS utilisateur FROM Tintins AS t LEFT JOIN Favoris AS f ON t.id = f.tintinId WHERE f.tintinId = ${movieId} AND f.userId = ${tokenUserId}`;
                    connection.query(sql, function (err, results) {
                    console.log("🚀 ~ TintinModel ~ results:", results)
                        if (err) {
                            const customError = new Error("Erreur lors de la récupération des données Tintin");
                            customError.details = err.message;
                            reject(customError)
                        }
                        console.log('Here the results sql for one task : ', results);
                        const tintin = results;
                        resolve(tintin);
                    })
                })
        
         
            }
            }



    
    
    //enregistrement de la note d'un film de la liste de favoris de l'utilisateur
    static async saveOneRateMovieToFavoris(rate, userId, movieId) {
        console.log("🚀 ~ FavoriesModel ~ saveOneRateMovieToFavoris ~ movieId:", movieId)
        console.log("🚀 ~ FavoriesModel ~ saveOneRateMovieToFavoris ~ userId:", userId)
        console.log("🚀 ~ FavoriesModel ~ saveOneRateMovieToFavoris ~ rate:", rate)
        return new Promise(function (resolve, reject) {

        const movieTintinRate = connection.escape(rate).replace(/'/g,"");
        const userIdCleaned = connection.escape(userId).replace(/'/g,"");
        const movieTintin = connection.escape(movieId).replace(/'/g,"");
    
        const sql = 'UPDATE Favoris SET rate =? WHERE userId =?  AND tintinId =?';
                
        connection.query(sql, [movieTintinRate, userIdCleaned , movieTintin], function(err, results){
            if (err) {
                const customError = new Error("Erreur lors de la récupération des données Tintin");
                customError.details = err.message;
                reject(customError);
            } else {
                console.log("🚀 ~ saveOneRateMovieToFavoris: ~ results:", results);
                const jsonData = JSON.parse(JSON.stringify(results));
                resolve(results);
            }
    
        })
        })
                
    }
    
    //suppression d'un film dans sa liste Favoris
    static async deleteTintinFromFavoritesById(userId, movieId) {
    console.log("🚀 ~ FavoriesModel ~ deleteFromFavorites ~ movieId:", movieId)
    console.log("🚀 ~ FavoriesModel ~ deleteFromFavorites ~ userId:", userId)
    return new Promise(function (resolve, reject) {

        const escapeIdMovie = connection.escape(movieId).replace(/'/g,"");
        const escapeIdUser = connection.escape(userId).replace(/'/g,"");
        const sql = 'DELETE FROM Favoris WHERE userId =? AND tintinId=?' ;

        connection.query(sql, [escapeIdUser, escapeIdMovie] , function(err, result){
            if (err) {
                const customError = new Error("Erreur lors de la récupération des données Tintin");
                customError.details = err.message;
                reject(customError);
            } else {
                console.log("🚀 ~ saveOneRateMovieToFavoris: ~ results:", result);
                const jsonData = JSON.parse(JSON.stringify(result));
                resolve(jsonData);
            }
 
        })
    })



    }

    
}

module.exports = FavoriesModel;
