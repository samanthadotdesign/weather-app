const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');
const { resolveSoa } = require('dns');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve 
app.use(express.static(publicDirectoryPath));

// Set up a route to lead to index.hbs page
app.get('', (req, res) => {
  // Renders dynamic file – name just needs to match up without ext
  res.render('index', {
    title: 'Weather app',
    author: 'Samantha Lee'
  })
} )

// Set up a route to lead to about.hbs page
app.get('/about', (req, res) => {
  // Renders dynamic file – name just needs to match up without ext
  res.render('about', {
    title: 'About',
    author: 'Samantha Lee'
  })
} )

// Set up a route to lead to help.hbs page
app.get('/help', (req, res) => {
  // Renders dynamic file – name just needs to match up without ext
  res.render('help', {
    title: 'This is some helpful text',
    author: 'Andrew Mead'
  })
} )

// Gets an address 
app.get('/weather', (req,res)=> {
  if (!req.query.address) {
    return res.send( {
      error: 'You must provide an address'
    })
  }
  
  geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
    if (error ){
      return res.send( { error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error){ 
        return res.send( { error })
      }

      res.send ( {
        forecast: forecastData,
        location, 
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send( {
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: [],
  })
}) 

// 404 pages
// More specific 404 page 
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404', 
    author: '', 
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    author: '',
    errorMessage: 'Page not found'
  })
})

app.listen(3004, () => {
  console.log('server is up on port 3004')
})