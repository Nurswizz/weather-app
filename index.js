const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000; 
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error('API_KEY is missing in the environment variables.');
}

const app = express();

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    let city = req.query.city;
    
    if (typeof city !== 'string' || city.trim() === '') {
        return res.render('index', { data: null, error: 'City name is required' });
    }

    city = city.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`;
    
    try {
        const response = await axios.get(url);
        return res.render('index', { data: response.data, error: null });
    } catch (error) {
        return res.render('index', { data: null, error: 'City not found or API error' });
    }
});

app.listen(PORT, () => {
    console.log('App is listening on port ' + PORT);
});
