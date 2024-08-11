const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { Users } = require('../db/models');

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const checkEmail = await Users.findOne({
                where: { email: email },
            });

            if (checkEmail) {
                const checkPassword = bcrypt.compareSync(password, checkEmail.password);
                if (checkPassword) {
                    const token = jwt.sign({
                        users: {
                            id: checkEmail.id,
                            email: checkPassword.email,
                            username: checkPassword.username,
                        }
                    }, 'secret');

                    return res.status(200).json({
                        error: false,
                        message: 'Success Login',
                        data: token
                    });
                } else {
                    return res.status(400).json({
                        error: false,
                        message: 'Password and Email dont match'
                    })
                }
            } else {
                return res.status(404).json({
                    error: false,
                    message: 'Password and Email dont match'
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message
            });
        }
    },
    register: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            const checkEmail = await Users.findOne({
                where: { email: email },
            });

            if (checkEmail) {
                return res.status(400).json({
                    error: false,
                    message: 'Email Has Registered'
                });
            }

            const users = await Users.create({
                username, email, password: bcrypt.hashSync(password, 10)
            });

            return res.status(200).json({
                error: false,
                message: 'Success Create users',
                data: users
            });
        } catch (error) {
            res.status(500).json({
                error: false,
                message: error.message
            });
        }
    }
}