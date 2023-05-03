// Goal: Setup two new routes //
// 1. Setup an about route and render a page title 
// 2. Setup a weather route and render a page title 
// 3. Test your work by visiting both in the browser
//
// Goal: Update routes //
// 1. Setup about route to render a title with HTML 
// 2. Setup a weather route to send back JSON 
//	- Object with forecast and location strings
// 3. Test your work by visiting both in the browser
//
// Goal: Create two more HTML files //
// 1. Create a html page for about with "About" title 
// 2. Create a html page for help with "Help" title 
// 3. Remove the old route handlers for both 
// 4. Visit both in the browser to test your work|

//
// Goal: Create a template for help page //
// 1. Setup a help template to render a help message to the screen
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print)

//
// Goal: Create a partial for the footer //
// 1. Setup the template for the footer partial "Created by Some Name" 
// 2. Render the partial at the bottom of all three pages 
// 3. Test your work by visiting all three pages|

//
// Goal: Create and render a 404 page with handlebars //
//	1.	Setup the template	to	render	the header	and	footer
//	2.	Setup the template	to	render	an error	message	in	a paragraph
// 3. Render the template for both 404 routes //	- Page not found.
//	- Help article not	found.
// 4. Test your work. Visit /what and /help/units


//core module before npm modules to stay organized
const path = require('path')

//npm modules
const express = require('express')
const hbs = require('hbs')

//local
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// //dirname = directory name, used to get the path to the public directory
// console.log(__dirname)
// //console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()

//define paths for Express Config
//default path is web-werver/view. here it's customized for templates
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setting up handlebars engine (hbs) for dynamic templates for the website
//setting up views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
//customize the server
//static takes the path to the folder we want to serve up
app.use(express.static(publicDirectoryPath))

//root url ie. app.com
//req = request, res = response
// app.get('', (req, res) => {
//     res.send('<h1>Hello express! Woo Woo!</h1>')
// })

// //app.com/help
// app.get('/help', (req, res) => {
//     res.send('Help Page')
// })

// //app.com/about 
// app.get('/about', (req, res) => {
//     res.send('<h2>About</h2>')
// })

//rendering dynamic index page
//adding dynamic info for home page: title and name
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Splazio'
    })
})

//adding dynamic page for about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Splazio'
    })
})

//adding dynamic page for help
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Splazio'
    })
})

//
// Goal: Update weather endpoint to accept address //
// 1. No address? Send back an error message 
// 2. Address? Send back the static JSON
//	- Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=philadelphia

//
// Goal: Wire up /weather //
// 1. Require geocode/forecast into app.js 
// 2. Use the address to geocode 
// 3. Use the coordinates to get forecast 
// 4. Send back the real forecast and location

//app.com/weather
app.get('/weather', (req, res) => {
    // res.send({
    //     forecast: 'It is sunny.',
    //     location: 'Westminster'
    // })

    if(!req.query.address) {
        return res.send({
            // error: 'You must provide an address term in the url like: "http://localhost:3000/weather?address=philadelphia".'
            error: 'You must provide an address location like "Boston".'

        })
    }
    //assigning default value as undefined with " = {}"
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })       
    })
    //console.log(req.query)
    // res.send({
    //     forecast: 'It is sunny.',
    //     location: 'Westminster',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term in the url like: "http://localhost:3000/products?search=game".'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

//help 404 error page
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article Not Found',
        title: '404',
        name: 'Splazio'
    })
})


//404 error page, always put last
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        title: '404',
        name: 'Splazio'
    })
})

//start up the server with port number 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})


