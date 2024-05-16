const connection = require('../db/db');



class TintinModel {

    // récupération de tous les films Tintin
    static async  getAllTintin(tokenUserId) {
    console.log("🚀 ~ TintinModel ~ getAllTintin ~ tokenUserId:", tokenUserId)

    if(!tokenUserId) {
    console.log('Pas d\'utilisateur connecté ! ');

        return await new Promise(function (resolve, reject) {
            const sql = 'SELECT * FROM Tintins';
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

    } else {
        console.log('Utilisateur connecté ! ');

        return await new Promise(function (resolve, reject) {
            const sql = `SELECT t.*, f.id AS favorite FROM Tintins AS t LEFT JOIN Favoris AS f ON t.id = f.tintinId AND f.userId = ${tokenUserId}`;
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

    // récupération de tous les films les mieux noté par la communauté ordonné en descendance par note dans une limite de 7 films
    static async getTintinBestRate(tokenUserId) {
        console.log("🚀 ~ TintinModel ~ getTintinBestRate ~ tokenUserId:", tokenUserId)
        if(!tokenUserId) {
            console.log('Pas d\'utilisateur connecté ! ');

            return await new Promise(function (resolve, reject) {
                const sql = `SELECT DISTINCT title, picture, synopsis, movie, rating FROM Tintins ORDER BY rating DESC LIMIT 7`;
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


        } else {
            console.log('Utilisateur connecté ! ');

            return await new Promise(function (resolve, reject) {
                const sql = `SELECT DISTINCT t.*, f.id AS favorite FROM Tintins AS t LEFT JOIN Favoris AS f ON t.id = f.tintinId AND f.userId = ${tokenUserId} ORDER BY rating DESC LIMIT 7`;
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

    // récupération d'un film par son id
    static async getTintinById(id) {
        console.log("🚀 ~ TintinModel ~ getTintinById ~ id:", id)
        return new Promise(function (resolve, reject){
            const escapeId = connection.escape(id);
            console.log("🚀 ~ TintinModel ~ escapeId:", escapeId)
            const sql = 'SELECT * FROM  Tintins WHERE id = '  + escapeId ;
            console.log("🚀 ~ TintinModel ~ sql:", sql)
            connection.query(sql, function (err, results) {
                console.log("🚀 ~ TintinModel ~ results:", results)
                if(err) {
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

        // récupération d'un film par son titre
        static async getTintinByTitle(title) {
            console.log("🚀 ~ TintinModel ~ getTintinById ~ title:", title)
            return new Promise(function (resolve, reject){
                const escapeTitle = connection.escape(title);
                console.log("🚀 ~ TintinModel ~ escapeTitle:", escapeTitle)
                const sql = 'SELECT * FROM  Tintins WHERE title = '  + escapeTitle ;
                console.log("🚀 ~ TintinModel ~ sql:", sql)
                connection.query(sql, function (err, results) {
                    console.log("🚀 ~ TintinModel ~ results:", results)
                    if(err) {
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
    

    // récupération d'un film par son slug
    static async getTintinBySlug(slug) {
        console.log("🚀 ~ TintinModel ~ getTintinBySlug ~ id:", slug)
        return new Promise(function (resolve, reject){
            const escapeSlug = connection.escape(slug);
            console.log("🚀 ~ TintinModel ~ escapeId:", escapeSlug)
            const sql = 'SELECT * FROM  Tintins WHERE slug = '  + escapeSlug ;
            console.log("🚀 ~ TintinModel ~ sql:", sql)
            connection.query(sql, function (err, results) {
                console.log("🚀 ~ TintinModel ~ results:", results)
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

    // récupération d'un film par son titre
    static async getMovieTintinWithParam(query) {
        console.log("🚀 ~ TintinModel ~ getMovieTintinWithParam ~ query:", query)
        return new Promise(function (resolve, reject){
            const escapeQuery = connection.escape(query).replace(/'/g,"");
            const sql = `SELECT * FROM Tintins WHERE title LIKE ${connection.escape(`%${escapeQuery}%`)}`;
            connection.query(sql, function (err, results) {
                if(err) {
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

    // sélection d'un film aléatoirement de façon ordonnée
    static getRandomMovies(limit, tokenUserId) {
        return new Promise(function (resolve, reject) {
            if (!tokenUserId) {
                connection.query('SELECT * FROM Tintins ORDER BY RAND() LIMIT ?', [limit], function (err, results) {
                    if (err) {
                        const customError = new Error("Erreur lors de la récupération des données Tintin");
                        customError.details = err.message;
                        reject(customError);
                    } else {
                        console.log("🚀 ~ getRandomMovies: ~ results:", results);
                        const jsonData = JSON.parse(JSON.stringify(results));
                        resolve(jsonData);
                    }
                });
            } else {
                console.log('Token trouvé !');
                // Autre logique si un token utilisateur est présent
                resolve(); // Assurez-vous de résoudre la promesse si aucun traitement n'est nécessaire
            }
        });
    }

    // sélection de tous les films aléatoirement de façon ordonnéeavec la note moyenne
    static getAverageRateAllTintin() {
        return new Promise(function (resolve, reject) {
            const sql = 'SELECT t.*, ROUND(AVG(rate)) AS note FROM Tintins AS t JOIN Favoris AS f ON t.id = f.tintinId GROUP BY tintinId';
                connection.query(sql, function (err, results) {
                    if (err) {
                        const customError = new Error("Erreur lors de la récupération des données Tintin");
                        customError.details = err.message;
                        reject(customError);
                    } else {
                        console.log('Here the results sql for one task : ', results);
                        const tintin = results;
                        resolve(tintin);
                    }
                });
        });
    }

        // post(création) d'un film tintin
        static postTintin(body) {
            console.log("🚀 ~ TintinModel ~ postTintin ~ body:", body)
            return new Promise(function (resolve, reject) {
                const { title, picture, synopsis, url, rate, slug } = body; 
                const movieTintinTitle = connection.escape(title).replace(/'/g,"");
                console.log("🚀 ~ TintinModel ~ movieTintinTitle:", movieTintinTitle);
                const movieTintinPicture = connection.escape(picture).replace(/'/g,"");
                const movieTintinSynopsis = connection.escape(synopsis).replace(/'/g,"");
                const movieTintinUrl = connection.escape(url).replace(/'/g,"");
                const movieTintinRate = connection.escape(rate).replace(/'/g,"");
                const movieTintinSlug = connection.escape(slug).replace(/'/g,"");

                    connection.query('INSERT INTO Tintins (title, picture, synopsis, movie, rating, slug, creation_times_tamp) VALUES (?,?,?,?,?,?, NOW())', 
                    [movieTintinTitle, movieTintinPicture, movieTintinSynopsis, movieTintinUrl, movieTintinRate, movieTintinSlug], function (err, results) {
                        if (err) {
                            const customError = new Error("Erreur lors de la récupération des données Tintin");
                            customError.details = err.message;
                            reject(customError);
                        } else {
                            console.log("🚀 ~ getRandomMovies: ~ results:", results);
                            const jsonData = JSON.parse(JSON.stringify(results));
                            resolve(jsonData);
                        }
                    });
            });
        }


        // put (modification) d'un film tintin
        static putTintin(id, body) {
            console.log("🚀 ~ TintinModel ~ putTintin ~ id:", id)
            console.log("🚀 ~ TintinModel ~ postTintin ~ body:", body)
            return new Promise(function (resolve, reject) {
                const { title, picture, synopsis, url, rate, slug } = body; 
                const escapeId = connection.escape(id).replace(/'/g,"");
                const movieTintinTitle = connection.escape(title).replace(/'/g,"");
                console.log("🚀 ~ TintinModel ~ movieTintinTitle:", movieTintinTitle);
                const movieTintinPicture = connection.escape(picture).replace(/'/g,"");
                const movieTintinSynopsis = connection.escape(synopsis).replace(/'/g,"");
                const movieTintinUrl = connection.escape(url).replace(/'/g,"");
                const movieTintinRate = connection.escape(rate).replace(/'/g,"");
                const movieTintinSlug = connection.escape(slug).replace(/'/g,"");

                let sql = 'UPDATE Tintins SET title=?, picture=?, synopsis=?, movie=?, rating=?, slug=? WHERE id = ?';

                connection.query(sql, [movieTintinTitle, movieTintinPicture, movieTintinSynopsis, movieTintinUrl, movieTintinRate, movieTintinSlug, escapeId], function (err, results) {
                    if (err) {
                        const customError = new Error("Erreur lors de la récupération des données Tintin");
                        customError.details = err.message;
                        reject(customError);
                    } else {
                        console.log("🚀 ~ getRandomMovies: ~ results:", results);
                        const jsonData = JSON.parse(JSON.stringify(results));
                        resolve(jsonData);
                    }
                });
            });
        }

    
        // patch (modification) note d'un film tintin
        static patchMovieRateTintin(id, rate) {
            console.log("🚀 ~ TintinModel ~ patchMovieRateTintin ~ id:", id)
            console.log("🚀 ~ TintinModel ~ patchMovieRateTintin ~ body:", rate.rate)
            return new Promise(function (resolve, reject) {
                const escapeId = connection.escape(id).replace(/'/g,"");
                const movieTintinRate = connection.escape(rate.rate).replace(/'/g,"");

                let sql = 'UPDATE Tintins SET rating=? WHERE id = ?';

                connection.query(sql, [movieTintinRate, escapeId], function (err, results) {
                    console.log("🚀 ~ TintinModel ~ results:", results)
                    if (err) {
                        const customError = new Error("Erreur lors de la mise à jour des données Tintin");
                        customError.details = err.message;
                        reject(customError);
                    } else {
                        console.log("🚀 ~ getRandomMovies: ~ results:", results);
                        const jsonData = JSON.parse(JSON.stringify(results));
                        resolve(jsonData);
                    }
                });
            });
        }

        // suppression d'un film tintin
        static deleteTintin(id){
            console.log("🚀 ~ deleteTintin: ~ id:", id)
            return new Promise(function (resolve, reject) {
                const escapeId = connection.escape(id).replace(/'/g,"");
                let sql = 'DELETE FROM Tintins WHERE id = ?';

                connection.query(sql, escapeId , function (err, result) {
                    if (err) {
                        const customError = new Error("Erreur lors de la récupération des données Tintin");
                        customError.details = err.message;
                        reject(customError);
                    } else {
                        console.log("🚀 ~ getRandomMovies: ~ results:", result);
                        const jsonData = JSON.parse(JSON.stringify(result));
                        resolve(jsonData);
                    }

                })

            })

        }

    

}


module.exports = TintinModel;




