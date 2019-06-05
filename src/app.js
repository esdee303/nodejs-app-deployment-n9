const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT ||  3000

// define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')


// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        mainBody: 'Weather',
        name: 'SDF'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        mainBody: 'About',
        name: 'SDF'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        mainBody: 'Help',
        name: 'SDF'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
             
                return res.send({ error })
            }

            res.json({
                location: transformToUpperCase((req.query.address.charAt(0).toUpperCase() + req.query.address.slice(1)), ['-']),
                forecast: forecastData,
                address: location
            })

        /*    res.render('index', {
             //   location: transformToUpperCase(req.query.address.charAt(0).toUpperCase(), ['-']),
                location: transformToUpperCase((req.query.address.charAt(0).toUpperCase() + req.query.address.slice(1)), ['-']),
                forecast: forecastData,
                // address: req.query.address,
                name: 'SDF'
            })*/
        })
    })
    
 /*   res.render('weather', {
        forecast: 'It is snowing',
        location: 'Heusden-Zolder',
        address: req.query.address,
        name: 'SDF'
    })*/
})

app.get('*', (req, res) => {
    res.render('404', {
        mainBody: '404 Page Not Found',
        name: 'SDF'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})

function transformToUpperCase(str, separators) {
    separators = separators || [ ' ' ]
    var regex = new RegExp('(^|[' + separators.join('') + '])(\\w)', 'g')
    return str.toLowerCase().replace(regex, function(x) {
        return x.toUpperCase()
    })
}


// nodemon src/app.js -e js,hbs,css