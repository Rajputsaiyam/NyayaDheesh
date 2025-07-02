const JWT = require('jsonwebtoken');
const hash = require('../utils/hash');
const AppError = require('../errors/index');
const crypto = require('crypto');
const User = require('../models/User.model');

// Use environment variables for security
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '$a!yam@2025';

if (!JWT_SECRET_KEY || JWT_SECRET_KEY === '') {
    throw new Error('Forgot to set JWT_SECRET_KEY in your environment file');
}

class UserService {
    /**
     * @function generateUserToken
     * @param {{_id:string, role:'admin'|'user'|'lawyer'}} payload 
     * @returns {string} JWT Signed token
    */
    static generateUserToken(payload) {
        console.log("Generating user token");
        console.log(payload);
        return JWT.sign(payload, JWT_SECRET_KEY);
    }

    /**
     * @function signupWithEmailAndPassword
     * @param {{name: string, email: string, password: string}} data 
     * @returns {Promise<string>}
    */
    static async signupWithEmailAndPassword(data) {
        const { name, email, password,role="user" } = data;
        console.log(data);

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = hash(password, salt);

        try {
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                salt,
                role
            });

            const token = UserService.generateUserToken({ _id: user._id, role: user.role });
            return token;

        } catch (err) {
            if (err.code === 11000) {
                throw new AppError("Email already exists", 400);
            }
            throw new AppError("Internal Server Error", 500);
        }
    }

    /**
     * @function signinWithEmailAndPassword
     * @param {{email: string, password: string}} data 
     * @returns {Promise<string>}
    */
    static async signinWithEmailAndPassword(data) {
        const { email, password } = data;
        console.log(data);

        const userInDB = await User.findOne({ email });
        if (!userInDB) throw new AppError(`User with email ${email} does not exist`, 404);

        const hashPassword = hash(password, userInDB.salt);

        if (hashPassword !== userInDB.password) {
            throw new AppError("Invalid email or password", 401);
        }

        const token = UserService.generateUserToken({
            _id: userInDB._id,
            role: userInDB.role
        });

        return token;
    }

    /**
     * @function decodeUserToken
     * @param {string} token 
     * @returns {object|boolean}
    */
    static async decodeUserToken(token) {
        try {
            return JWT.verify(token, JWT_SECRET_KEY);
        } catch (e) {
            return false;
        }
    }
}

module.exports = UserService;
