const express = require('express');

const app = express();

// listen
app.listen(PORT || 4000)

app.get('/status',(req,res) => {
    res.send('sapoooo')
})

// Export the Express API
module.exports = app