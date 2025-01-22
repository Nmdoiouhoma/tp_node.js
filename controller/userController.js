const UserModel = require('../models/UserModel');

class UserController {
    constructor() { }

    createUser = async (req, res, next) => {
        if (!req.body.name || !req.body.email) {
            return res.status(400).json('Email and name are required');
        }
        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar,
        });

        return res.status(201).json(user);
    };

    getAllUsers = async (req, res, next) => {
        const users = await UserModel.findAll();
        return res.status(200).json(users);
    };

    getOneUser = async (req, res, next) => {
        const user = await UserModel.findOne({
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(user);
    };

    deleteUser = async (req, res, next) => {
        await UserModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.status(204).json();
    };

    patchUser = async (req, res, next) => {
        const { name, email } = req.body;
        const { id } = req.params;

        const user = await UserModel.findByPk(id);
        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        return res.status(201).json(user);
    };
}

module.exports = { UserController };