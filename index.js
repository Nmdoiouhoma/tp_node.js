console.log('Hello ');

const express = require('express');
const dotenv = require('dotenv/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const { faker } = require('@faker-js/faker');


const app = express()
const port = process.env.PORT
const dbPassword = process.env.DB_PASSWORD


app.get('/users', (req, res) => {
    const users = []
    for (let i = 0; i < 10; i++) {
        users.push({
            id: faker.string.uuid(),
            email: faker.internet.email(),
            name: faker.internet.username(),
            avatar: faker.image.avatar(),
        })
    }
    res.status(200).json(users)
})

app.post('/users', (req, res) => {
    const { name, email } = req.body
    if (!email || !name) {
        return res.status(400).json(users)
    }

    const user = {
        id: faker.string.uuid(),
        name,
        email,
        avatar: faker.image.avatar()
    };
    res.status(201).json(user)
})

app.patch('users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = {
        id: faker.string.uuid(),
        name,
        email,
        avatar: faker.image.avatar()
    };
    res.status(200).json(user)
})

app.delete('/users/:id', (_, res) => {

    res.status(204).json(user)
})
app.use("*", (_, res) => {

    if (!passeword || 'authorization') {
        next()
    }
    else {
        return res.status(401).json({ message: '401: not found' })
    }
})

app.listen(process.env.PORT || 80, () => {
    console.log(`Le serveur fonctionne  ${process.env.PORT || 80}`)
})

