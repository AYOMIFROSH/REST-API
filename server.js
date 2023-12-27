require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/my_database`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }).catch((error) => {
    console.log(error);
});

app.get('/users', (req, res) => {
    User.find()
        .then((users) => {
            res.send(users);
        }).catch((error) => {
            console.log(error);
        });
    });

app.post('/users', (req, res) => {
    const newUser = new User(req.body);
    
    newUser.save()
        .then(() => {
            res.send('User added successfully');
        }).catch((error) => {
            console.log(error);
        }); 
    });

app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.send('User updated successfully');
        }).catch((error) => {
            console.log(error);
        });
    });

app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send('User deleted successfully');
        }).catch((error) => {
            console.log(error);
        });
    });
