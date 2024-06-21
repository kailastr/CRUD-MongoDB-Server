// const express = require('express');
import express from 'express';

import connectMongoDBFn from './db/dbConnect.js';

const app = express();

const PORT = 4000;

app.listen(PORT, () => {
    connectMongoDBFn();
    console.log(`Server started at PORT  - ${PORT}`);
});