const express = require('express');

const app = express();


app.get('/status',(req,res) => res.send('sapoooo'))

// listen
app.listen(PORT)

