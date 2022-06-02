
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { use } = require('express/lib/application');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

require('dotenv/config');
const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());


//Routers
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');
const orderRouter = require('./routers/orders');


//MiddleWare
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler)

//
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, orderRouter);

const password = encodeURIComponent('Eb@hkjzMqJ4n7@u');

//DB connection
mongoose.connect(`mongodb+srv://spiceegurupos:${password}@cluster0.421j7.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'spiceegurupos-db'
})
.then(() =>{
    console.log('Connection is Ready')
})
.catch((err) =>{
    console.log(err);
})

//Server
app.listen(3000, ()=>{
    console.log(api);
    console.log('Server is running');
});