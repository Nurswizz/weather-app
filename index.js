const express = require('express');
const dotenv = require('dotenv');
dotenv.config() 

const PORT = process.env.PORT;

const app = express();
const data = [10, 12, 14, 16, 18, 20, -10];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('index', {
        data: data,
        days: days
});
})

app.listen(PORT, () => {
    console.log('App is listening on port ' + PORT);
});