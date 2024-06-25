// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import connectMongoDBFn from './db/dbConnect.js';

//import model
import UserModel from './Model/User.Model.js';
import { get } from 'mongoose';

const app = express();
dotenv.config();
app.use(express.json());
const PORT = 4000;

// app.get('/', (req, res) => {
//     console.log("Server reached to the path of / ");
//     res.send("Reached to path /");
// });


// path : /Create
// Method : POST
// Desription: to create new user
// paramaters: none
app.post('/create', async (req, res) => {
    // res.send("Create route");
    try {
        //console.log(req.body);
        const user = new UserModel(req.body);
        await user.save();

        res.status(200).json({ "success message": user });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//path: /getall
//Method: GET
// Description : to get all the user details from the DB
// parameter: none
app.get('/getall', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//path: /user/:id
// Method : get
// Description: To get a specific user details based on their id
// parameter: :id
app.get('/user/:id', async (req, res) => {
    //console.log(req);
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ "message": "User Not found with this id" });
        }

        res.status(200).json({ "Successfully Collected User Data": user });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//path: /update/:id
// method: PUT
// Description : To update a specific user data
//parameters: :id
app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newData = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!newData) {
            return res.status(404).send("User not found !!");
        }

        res.status(200).json({ "Successfully Updated": newData });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

//path: /delete/:id
//method: DELETE
// Description : To delete a specific user based on id
// parameters: :id
app.delete('/delete/:id', async (req, res) => {
    try {
        //const { id } = req.params
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(400).send("User Not Found With this id");
        }

        res.status(200).json({ "Successfully Deleted  ": user });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    connectMongoDBFn();
    console.log(`Server started at PORT  - ${PORT}`);
});