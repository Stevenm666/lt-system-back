const express = require('express');

const app = express();


app.get('/status',(req,res) => res.send('sapo'))

// listen
app.listen(PORT)

