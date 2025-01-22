/*

const authRouter = express.Router()
const express = require('express')
var jwt = require('jsonwebtoken');

authRouter.post('/users', async (req, res) => {
    const name, email, password = req.body
    if (!name || email) {
        return res.status(200).json('email, password and name are required')
    }
    if (password.lenght(8)) {
        return res.status(400).json('password lenght lust be > 0')
    }

    return res.status(201).json('tu es inscrit')
})

// regex test saisi mail 

const userModel = await userModel.create({
    email,
    name,
    password: hash
})

const token = jwt.sign(user.id, process.env.JWT_TOKEN)
const user = await
module.exports = { UserRouter }



*/