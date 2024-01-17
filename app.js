const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const https = require('https');
const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: true }));

