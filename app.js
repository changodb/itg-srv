const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var db = require('./mongo');
const cors = require('cors');

const app = express();
if (process.env.NODE_ENV === 'production') {
   var corsOrigin = 'https://www.fitupyourstyle.com/';
} else {
   var corsOrigin = 'http://localhost:3001';
}

const corsOptions = {
    origin: corsOrigin
};

const fs = require('fs')

if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
   var mongoUrl = process.env.MONGO_URL;
}
if (process.env.NODE_ENV === 'production') {
   const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
   const client = new SecretManagerServiceClient();

   async function accessSecretVersion() {
      const [version] = await client.accessSecretVersion({
         name: 'projects/716644706008/secrets/mongo-url/versions/latest',
      });
   
      // Extract the payload as a string.
      const payload = version.payload.data.toString();
      console.log(payload);
   }
   var mongoUrl = payload;
}



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
// Make our db accessible to our router
app.use(function(req, res, next){
    db.connect(mongoUrl, next);
});

// MAIN APP ROUTE ENTRYPOINT
const routes = require('./routes');
app.use('/api', routes);


module.exports = app;
