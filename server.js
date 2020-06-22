const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(express.json());
