const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express to serve content
const pathToPublic = path.join(__dirname, '../public')
const pathToViews = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', pathToViews)
hbs.registerPartials(partialsPath)

//Setup static direcetory to serve
app.use(express.static(pathToPublic))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Caleb Tarleton'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Caleb Tarleton'
    })
})
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to search for'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Docs',
        info: 'how to use the app',
        name: 'Caleb Tarleton'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        message: 'Help Article Not Found',
        name: 'Caleb Tarleton'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        message: 'Page Not Found :(',
        name: 'Caleb Tarleton'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})