const tintinModel = require('../models/TintinModel');
const userModel = require('../models/UserModel');
const favoriesModel = require('../models/FavoriesModel')
const fs = require('fs');
const parseurl = require('parseurl');
const multer  = require('multer');
const path = require('path');
const upload = require('../multerConfig');
const xss = require('xss');


exports.getAllTintins = async (req, res, next) => {
    console.log('access token user: ', req.id);

    try {
        const tintins = await tintinModel.getAllTintin(req.id);
        console.log("🚀 ~ exports.getAllTintins= ~ tintins:", tintins)
        if(tintins.length > 0) {
            return res.status(200).json({
                status: 200,
                msg: 'Collection found',
                results: tintins
            })

        } else {
            return res.status(404).json({
                status: 404,
                msg: 'Collection not found',
                results: tintins
            })

        }
    } catch (error) {
        console.log('error register route', error.message);
        res.status(500).json({ status: 500, msg: 'The server encountered an error' })

    }
}

exports.getTintinBestRate = async (req, res, next) => {
    console.log('access token user: ', req.id);

    try {
        const tintins = await tintinModel.getTintinBestRate(req.id);
        console.log("🚀 ~ exports.getTintinBestRate= ~ tintins:", tintins)
        if(tintins.length > 0) {
            return res.status(200).json({
                status: 200,
                msg: 'Collection found',
                results: tintins
            })

        } else {
            return res.status(404).json({
                status: 404,
                msg: 'Collection not found',
                results: tintins
            })

        }
    } catch (error) {
        console.log('error register route', error.message);
        res.status(500).json({ status: 500, msg: 'The server encountered an error' })

    }
}



exports.getTintinById = async  (req, res, next) => {
console.log("🚀 ~ exports.getTintinById= ~ req:", req.params.id)

    try {
        const id = req.params.id;
        const tintin = await  tintinModel.getTintinById(id);
        console.log("🚀 ~ exports.getTintinById= ~ tintin:", tintin)
        if (tintin) {
            return res.status(200).json({
                status: 200,
                msg: 'tintin found',
                results: tintin
            })
        } else {
            return res.status(404).json({
                status: 404,
                msg: 'tintin not found',
                results: tintin
            })

        }


    } catch (error) {
        console.log('error register route', error.message);
        res.status(500).json({ status: 500, msg: 'The server encountered an error' })

    }
}

exports.getTintinBySLug = async  (req, res, next) => {
    console.log("🚀 ~ exports.getTintinBySLug= ~ req:", req.params.slug)
    
        try {
            const slug = req.params.slug;
            const tintin = await  tintinModel.getTintinBySlug(slug);
            console.log("🚀 ~ exports.getTintinBySLug= ~ tintin:", tintin)
            if (tintin) {
                return res.status(200).json({
                    status: 200,
                    msg: 'tintin found',
                    results: tintin
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    msg: 'tintin not found',
                    results: tintin
                })
    
            }
    
    
        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
    
        }
    }

exports.getMovieTintinWithParam = async  (req, res, next) => {
    console.log("🚀 ~ exports.getTintinBySLug= ~ req:", req.params.slug)
        
    try {
        const title = req.params.query;
        const tintin = await  tintinModel.getMovieTintinWithParam(title);
        console.log("🚀 ~ exports.getMovieTintinWithParam= ~ tintin:", tintin)
        if (tintin) {
            return res.status(200).json({
                status: 200,
                msg: 'tintin found',
                results: tintin
            })
        } else {
            return res.status(404).json({
                status: 404,
                msg: 'tintin not found',
                results: tintin
            })
        
        }
        
        
    } catch (error) {
        console.log('error register route', error.message);
        res.status(500).json({ status: 500, msg: 'The server encountered an error' })
        
    }
}

exports.getRandomMovies = async  (req, res, next) => {
    console.log("🚀 ~ exports.getTintinBySLug= ~ req:", req.id)
            
    try {
        const tintin = await  tintinModel.getRandomMovies(1, req.id);
        console.log("🚀 ~ exports.getMovieTintinWithParam= ~ tintin:", tintin)
            if (tintin) {
                return res.status(200).json({
                    status: 200,
                    msg: 'Collection found',
                    results: tintin
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    msg: 'Collection not found',
                    results: tintin
                })
            
            }
            
            
        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
            
        }
}

exports.getAverageRateAllTintin = async  (req, res, next) => {
    console.log("🚀 ~ exports.getAverageRateAllTintin= ~ req:", req.id)
                
    try {
        const tintinsAverageRate = await  tintinModel.getAverageRateAllTintin();
        console.log("🚀 ~ exports.getAverageRateAllTintin= ~ tintin:", tintinsAverageRate)
        if (tintinsAverageRate) {
            return res.status(200).json({
                status: 200,
                msg: 'Collection found',
                results: tintinsAverageRate
            })
        } else {
            return res.status(404).json({
                status: 404,
                msg: 'Collection not found',
                results: tintinsAverageRate
            })
                
        }
                
                
    } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
                
    }
}

exports.postTintin = async  (req, res, next) => {
    console.log("🚀 ~ exports.postTintin= ~ req.body:", req.body)
    console.log("🚀 ~ exports.postTintin= ~ req.id:", req.id)
    let user = await userModel.getRoleUser(req.id)        
    console.log("🚀 ~ exports.postTintin= getRoleUser ~ user:", user)
    if (user[0].role === 'admin') {
        console.log('User admin !');
        try {
            const cleanedTitleMovie = xss(req.body.title);
            console.log("🚀 ~ exports.postTintin= ~ cleanedTitleMovie:", cleanedTitleMovie)
            const cleanedPictureMovie = xss(req.body.picture);
            const cleanedSynopsisMovie = xss(req.body.synopsis);
            const cleanedUrlMovie = xss(req.body.url)
            const cleanedRateMovie = xss(req.body.rate)
            const cleanedSlugMovie = xss(req.body.slug)

            const body = {
                title: cleanedTitleMovie,
                picture: cleanedPictureMovie,
                synopsis: cleanedSynopsisMovie,
                url: cleanedUrlMovie,
                rate: cleanedRateMovie,
                slug: cleanedSlugMovie
            }

            const postTintin = await  tintinModel.postTintin(body);
            console.log("🚀 ~ exports.postTintin= ~ tintin:", postTintin)
            if (postTintin.affectedRows > 0 ) {
                return res.status(200).json({
                    status: 201,
                    msg: `The movie ${cleanedTitleMovie} has been created !`,
                    results: postTintin
                })
            } 
            } catch (error) {
                console.log('error register route', error.message);
                res.status(500).json({ status: 500, msg: 'The server encountered an error' })
            }
    } else {
        res.json({ status: 401, msg: 'unauthorized !' });
    }

}

exports.uploadPicture = async  (req, res, next) => {
    console.log("🚀 ~ uploadPicture: ~ req:", req.files)  
    console.log("🚀 ~ exports.postTintin= ~ req.id:", req.id)
    let user = await userModel.getRoleUser(req.id)        
    console.log("🚀 ~ exports.postTintin= getRoleUser ~ user:", user.role)
    if (user[0].role === 'admin') {
        console.log('User admin !');
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                res.json({ status: 400, msg: "La photo n'a pas pu être récupérée" });
            } else {
                console.log('Il y a la présence d\'un fichier !');
                //on sauvegarde notre image dans le dossier que l'on souhaite
                req.files.image.mv('public/images/' + req.files.image.name, function (err) {
                    console.log('ça passe', '/public/images/' + req.files.image.name)
                    if (err) {
                        res.json({ status: 500, msg: "La photo n'a pas pu être enregistrée" })
                    } else {
                        res.json({ status: 200, msg: 'ok file registered', url: req.files.image.name });
                    }
                });
            }
                
        } catch (error) {
                console.log('error register route', error.message);
                res.status(500).json({ status: 500, msg: 'The server encountered an error' })
                    
        }
    
    } else {
        res.json({ status: 401, msg: 'unauthorized !' });
    }


}

exports.updateRateTintin = async  (req, res, next) => {
    console.log("🚀 ~ exports.updateRateTintin= ~ req.body:", req.body)
    // console.log("🚀 ~ exports.updateRateTintin= ~ req.id:", req.id)
    // console.log("🚀 ~ exports.updateRateTintin= ~ req.id:", req.params.id)

    const userId = req.id;
    console.log("🚀 ~ exports.updateRateTintin= ~ userId:", userId)
    const rate = req.body.rate;
    console.log("🚀 ~ exports.updateRateTintin= ~ rate:", rate)
    const tintinId = req.body.movieId
    console.log("🚀 ~ exports.updateRateTintin= ~ tintinId:", tintinId)

    let tintin = await tintinModel.getTintinById(tintinId)
    console.log("🚀 ~ exports.updateRateTintin= ~ tintin:", tintin[0])

    let user = await userModel.getRoleUser(req.id)
    console.log("🚀 ~ exports.updateRateTintin= ~ user:", user[0].role)
    if(user[0].role === 'admin' || user[0].role === 'user') {
        console.log(`Je suis ${user[0].role}`);
        try {
           let rateMovie = await favoriesModel.saveOneRateMovieToFavoris(rate, userId, tintinId)
           console.log("🚀 ~ exports.updateRateTintin= ~ rateMovie:", rateMovie)
           if(rateMovie.affectedRows > 0) {
            return res.status(200).json({
                status: 201,
                msg: `The movie ${tintin.title} has been updated !`,
                results: rateMovie
            })

           }

        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
        }
    }


}

exports.putTintin = async  (req, res, next) => {
    console.log("🚀 ~ exports.putTintin= ~ req.body:", req.body)
    console.log("🚀 ~ exports.putTintin= ~ req.id:", req.id)
    console.log("🚀 ~ exports.putTintin= ~ req.id:", req.params.id)
    let user = await userModel.getRoleUser(req.id)        
    console.log("🚀 ~ exports.putTintin= getRoleUser ~ user:", user.role)
    if (user[0].role === 'admin') {
        console.log('User admin !');
        try {
            const id = req.params.id;
            const cleanedTitleMovie = xss(req.body.title);
            console.log("🚀 ~ exports.postTintin= ~ cleanedTitleMovie:", cleanedTitleMovie)
            const cleanedPictureMovie = xss(req.body.picture);
            const cleanedSynopsisMovie = xss(req.body.synopsis);
            const cleanedUrlMovie = xss(req.body.url)
            const cleanedRateMovie = xss(req.body.rate)
            const cleanedSlugMovie = xss(req.body.slug)

            const body = {
                title: cleanedTitleMovie,
                picture: cleanedPictureMovie,
                synopsis: cleanedSynopsisMovie,
                url: cleanedUrlMovie,
                rate: cleanedRateMovie,
                slug: cleanedSlugMovie
            }

            const postTintin = await tintinModel.putTintin(id, body);
            console.log("🚀 ~ exports.postTintin= ~ tintin:", postTintin)
            if (postTintin.affectedRows > 0 ) {
                return res.status(200).json({
                    status: 201,
                    msg: `The movie ${cleanedTitleMovie} has been updated !`,
                    results: postTintin
                })
            } 
            } catch (error) {
                console.log('error register route', error.message);
                res.status(500).json({ status: 500, msg: 'The server encountered an error' })
            }
    } else {
        res.json({ status: 401, msg: 'unauthorized !' });
    }

}

exports.patchMovieRateTintin = async  (req, res, next) => {
    console.log("🚀 ~ exports.putTintin= ~ req.body.rate:", req.body.rate)
    console.log("🚀 ~ exports.putTintin= ~ req.id:", req.id)
    console.log("🚀 ~ exports.putTintin= ~ req.params.id:", req.params.id)
    let user = await userModel.getRoleUser(req.id)        
    console.log("🚀 ~ exports.putTintin= getRoleUser ~ user:", user.role)
    if (user[0].role === 'admin') {
        console.log('User admin !');
        try {
            const id = req.params.id;
            const tintin = await tintinModel.getTintinById(id);
            console.log("🚀 ~ patchMovieRate: ~ tintin:", tintin)
            console.log("🚀 ~ patchMovieRate: ~ tintin:", tintin[0].title)
            const cleanedRateMovie = xss(req.body.rate)
            console.log("🚀 ~ exports.patchMovieRateTintin= ~ cleanedRateMovie:", cleanedRateMovie)

            const body = {
                rate: cleanedRateMovie
            }

            const postTintin = await tintinModel.patchMovieRateTintin(id, body);
            console.log("🚀 ~ exports.postTintin= ~ tintin:", postTintin)
            if (postTintin.affectedRows > 0 ) {
                return res.status(200).json({
                    status: 201,
                    msg: `The rate of movie ${tintin[0].title} has been updated !`,
                    results: postTintin
                })
            } 
            } catch (error) {
                console.log('error register route', error.message);
                res.status(500).json({ status: 500, msg: 'The server encountered an error' })
            }
    } else {
        res.json({ status: 401, msg: 'unauthorized !' });
    }

}


exports.deleteTintin = async  (req, res, next) => {
    console.log("🚀 ~ exports.deleteTintin= ~ req.body.rate:", req.body.rate)
    console.log("🚀 ~ exports.deleteTintin= ~ req.id:", req.id)
    console.log("🚀 ~ exports.deleteTintin= ~ req.params.id:", req.params.id)
    let user = await userModel.getRoleUser(req.id)        
    console.log("🚀 ~ exports.deleteTintin= getRoleUser ~ user:", user.role)
    if (user[0].role === 'admin') {
        console.log('User admin !');
        try {
            const id = req.params.id;
            const tintin = await tintinModel.getTintinById(id);
            console.log("🚀 ~ deleteTintin: ~ tintin:", tintin)
            const deleteTintin = await tintinModel.deleteTintin(req.params.id)
            console.log("🚀 ~ deleteTintin: ~ deleteTintin:", deleteTintin)
                     if(deleteTintin.affectedRows > 0 ) {
                         return res.status(200).json({
                             msg: `the movie ${tintin[0].title} has been deleted`,
                             results: tintin
                        })
                     }

            } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
            }
    } else {
         res.json({ status: 401, msg: 'unauthorized !' });
     }

}




