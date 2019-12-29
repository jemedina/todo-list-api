const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Constants = require('./Constants')

class App {

    constructor() {
        this.express = express()
        
        this.database()
        this.middleware()
        this.routes()
        
        let port = process.env.PORT || Constants.APP_PORT;
        this.express.listen(port, function() {
            console.log("App runing on port " + port)
        })
    }

    database() {
        mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
        mongoose.connection.on('error', () => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.')
        })
    }

    middleware() {
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token')
            next()
        })
    }

    routes() {
        this.express.use( require('./routes/index') )
    }
}

new App()