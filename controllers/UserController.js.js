const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db/db');
const saltRounds = 10;
const xss = require('xss');


exports.getUserById = async (req, res, next) => {
    console.log("🚀 ~ exports.getUserById= ~ req:", req.params.id)
    
        try {
            const id = req.params.id;
            const user = await UserModel.getUserById(id);
            console.log("🚀 ~ exports.getUserById = ~ results:", user)
            if (user) {
                return res.status(200).json({
                    status: 200,
                    msg: 'User found',
                    results: user
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    msg: 'User not found',
                    results: user
                })
    
            }
            
    
        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
        }
    }    
    
exports.getUserByEmail = async (req, res, next) => {
    console.log("🚀 ~ exports.getUserByEmail= ~ req:", req.body.email)
    
        try {
            const email = req.body.email;
            const user = await UserModel.getUserByEmail(email);
            console.log("🚀 ~ exports.getUserById = ~ results:", user)
            if (user) {
                return res.status(200).json({
                    status: 200,
                    msg: 'User found',
                    results: user
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    msg: 'User not found',
                    results: user
                })
        
            }
                
        
        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
        }
    }  
    
    exports.login  = async (req, res, next) => {
        console.log("🚀 ~ exports.login= ~ req:", req.body.email)
        console.log("SECRET SECRET CSRF", process.env.SECRET_CSRF);
        console.log("🚀 ~ saveOneUser ~ req.headers - x-csrf-token:", req.headers['x-csrf-token'])


        try {
            const cleanedEmail = xss(req.body.email)
            console.log("🚀 ~ exports.login= ~ cleanedEmail:", cleanedEmail)
            const password = req.body.password;
            console.log("🚀 ~ exports.login= ~ password:", password)

           const checkUserEmail = await  UserModel.getUserByEmail(cleanedEmail);
           console.log("🚀 ~ exports.login= ~ checkUserEmail:", checkUserEmail)
           if (checkUserEmail.length === 0) {
            console.log('we had a problem');
            res.status(404).json({ status: 404, msg: 'Email does not exist, please register' });
            return;
        }

        const hashedPassword = checkUserEmail.hashPassword;
        console.log("🚀 ~ exports.login= ~ hashedPassword:", hashedPassword)
        const same = await bcrypt.compare(password, hashedPassword);
        console.log("🚀 ~ exports.login= ~ same:", same)

        if(same) {
            console.log('same pass');
            const { id, email, firstName, lastName, role } = checkUserEmail;
            const payload = { id, email, firstName, lastName, role };
            const token = jwt.sign({payload}, process.env.SECRET_TOKEN);
            console.log("🚀 ~ exports.login= ~ payload:", payload)
            console.log("🚀 ~ exports.login= ~ token:", token)

              // Stockez les données sensibles dans la session de manière sécurisée
              req.session.firstname = firstName;
              req.session.lastname = lastName;
              req.session.email = cleanedEmail;
              req.session.role = role;
              req.session.token = token;

              res.status(200).json({
                status: 200,
                firstname: firstName,
                lastname: lastName,
                msg: `You are well connected ${firstName} ${lastName}`,
                token: token,
                role: role,
                session: JSON.stringify(req.session)
            });

        } else {
            res.status(404).json({
                status: 404,
                msg: 'Bad requests incorrect email or password'
            });
        }

        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
        }
    }

    exports.register = async  (req, res, next) => {
        console.log("🚀 ~ exports.register= ~ req:", req.body)
        try {
            const cleanedEmail = xss(req.body.email)
            const cleanedFirstname = xss(req.body.firstname)
            const cleanedLastname = xss(req.body.lastname)
            const checkUserEmail = await UserModel.getUserByEmail(cleanedEmail)

            console.log("🚀 ~ file: UserController.js:9 ~ exports.saveOneUser= ~ checkUserEmail:", checkUserEmail) // recoit un objet
            
            if (checkUserEmail) {

                console.log('same email !!!');
                return res.status(400).json({ status: 400, msg: 'Email already exists' })
                
            } else {
                
                const body = {
                    email: cleanedEmail,
                    firstname: cleanedFirstname,
                    lastname: cleanedLastname,
                    password: req.body.password
                    
                }
                const newUser = await UserModel.saveOneUser(body)
                console.log("🚀 ~ exports.register= ~ newUser:", newUser)
    
                if(newUser) {
    
                    console.log("La nouvelle utilisateur a été insérée avec succès:", newUser);
                    return res.status(201).json({
                        status: 201,
                        msg: `You are well registered ${body.firstname} ${body.lastname}`,
                        results: newUser
                    })
        
                } 
    
            }

            
    
        } catch (error) {
            console.log('error register route', error.message);
            return res.status(500).json({ status: 500, msg: 'The server encountered an error' })

        }
    }

    exports.logout = async (req, res, next) => {
        try {

            // const token = req.headers.authorization.split(' ')[1]
            const token = req.headers['x-access-token'];
            console.log("🚀 ~ exports.logout= ~ token:", token)
            const decodedToken  = jwt.verify(token, process.env.SECRET_TOKEN)
            console.log("🚀 ~ exports.logout= ~ decodedToekn:", decodedToken)

            req.session.destroy((err) => {
                if (err) {
                    console.error('Error disconnecting :', err);
                    res.status(500).json({ status: 500, msg: 'Error disconnecting' });
                } else {
                    console.log('Déconnexion réussie');
                    res.status(200).json({ status: 200, msg: 'Logout successful' });
                }
            });
        } catch (error) {
            console.log('error register route', error.message);
            return res.status(500).json({ status: 500, msg: 'The server encountered an error' })
        }
    }


        