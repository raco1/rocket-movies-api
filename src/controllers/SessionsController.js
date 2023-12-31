const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController{
    async create(request, response){
        const { email, password } = request.body;

        const user = await knex("users").where({ email }).first();

        if(!user){
            throw new AppError("Incorrect e-mail or password", 401)
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError("Incorrect e-mail or password", 401)
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        response.cookie("token", token, {
            sameSite: 'none',
            maxAge: 10 * 60 * 1000,
            httpOnly: true,
            secure: true,
        })

        delete user.password
        
        return response.json({ user, token })
    }
}

module.exports = SessionsController;