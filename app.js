const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


// Local modules
const config = require('./config')
const dbConnect = require('./database')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const shopRoute = require('./routes/shop')
const orderRoute = require('./routes/order')

// App Setup
const app = express()
app.set('port', config.port)
// Database Setup
dbConnect()
// App middleware
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
// App Routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/shops', shopRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)



// Catch unauthorised errors
app.use((err, req, res, next) => {
      res.status(500).json({"error" : err.name + ": " + err.message})
      console.log(err)
    
  })
  


// Start app server
app.listen(app.get('port'), () => {
    console.log('Backend Server running')
})