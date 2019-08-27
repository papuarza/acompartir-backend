require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash      = require("connect-flash");
    

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  var whitelist = ['http://localhost:4200', 'http://papuarza.github.io', 'https://papuarza.github.io']
  var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};


const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
  
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  next();
});
  
  // Middleware Setup
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});
  
app.locals.title = 'acompartir';
app.locals.datos = {
  personasAyudadas: 600000,
  toneladas: 900,
  ongs: 300
}

app.use(session({
  secret: 'acompartir',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);

app.get('/api', (req, res, next) => {
  res.send({status: 200, data: app.locals.datos});
});

app.post('/api', (req, res, next) => {
  const {personasAyudadas, toneladas, ongs} = req.body.data;
  app.locals.datos = {
    personasAyudadas, toneladas, ongs
  }
  res.send({status: 200, data: app.locals.datos});
});
    
const index = require('./routes/index');
app.use('/api', index);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const categoryRoutes = require('./routes/category');
app.use('/api/category', categoryRoutes);

const productRoutes = require('./routes/product');
app.use('/api/product', productRoutes);

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

const entityRoutes = require('./routes/entity');
app.use('/api/entity', entityRoutes);

const companyRoutes = require('./routes/company');
app.use('/api/company', companyRoutes);

const donacionRoutes = require('./routes/donacion');
app.use('/api/donacion', donacionRoutes);
      

module.exports = app;
