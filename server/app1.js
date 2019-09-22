const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const https = require('https');
const http = require('https');

const cors = require("cors");
const CLIENT_ORIGIN = "https://localhost:3000";


//Graphql
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const graphqlHttp = require('express-graphql');
//middleware
const isAuth = require('./middleware/is-auth');
//passport
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const keys = require("./config/")
//Visually pleasing messages;
const chalk = require('chalk');
const warn = chalk.bgYellow.black;
const log = chalk.bgWhite.black;
const fs = require('fs');
const Session = require('cookie-session');
const { transformListItem } = require('./graphql/resolvers/merge');

let localuser = {

};
const options ={
  key: fs.readFileSync('tans-key.pem'),
  cert:fs.readFileSync('tans-cert.pem')
};


app.use(Session({
    maxAge: 24*60*60*1000,
    keys:['iuncwuindcwiu']
}));


passport.serializeUser(  (user,cb) =>{
  cb(null,user);
} )


passport.deserializeUser(  (user,cb) =>{
  cb(null,user);
} )

const User = require('./models/socialuser');
passport.use(new FacebookStrategy({
  clientID: keys.Facebook.clientID,
  clientSecret: keys.Facebook.clientSecret,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
(accessToken,refreshToken,profile,cb)=> {
  // localuser = {...profile};
  // console.log(log(JSON.stringify(profile)));
  // http://localhost:3001/auth/facebook
  User.findOne({socialID:profile.id}).then((currentUser)=>{
      if(!currentUser){
      // console.log(warn(profile.photos[0].value));
        currentUser = new User({
          Display: profile.displayName,
          socialID: profile.id,
          Photo:profile.photos[0].value,
        }).save().then((newUser) => {
          console.log(log('new user created:'+ newUser))
        });
      }else{
        console.log(localuser);

        console.log(currentUser);
        localuser = currentUser;
        // console.log(currentUser);
      }
  })
  
  return cb(null,profile);
}
))

passport.use(new GoogleStrategy({
  clientID: keys.Google.clientID,
  clientSecret: keys.Google.clientSecret,
  callbackURL: "/auth/google/callback",

},
(accessToken,refreshToken,profile,cb)=> {
  // console.log(log(JSON.stringify(profile)));
  // console.log("REACHED!");
  User.findOne({socialID:profile.id}).then((currentUser)=>{
    if(!currentUser){
      currentUser = new User({
        Display: profile.displayName,
        socialID: profile.id,
        Photo:profile.picture,
      }).save().then((newUser) => {
        // console.log(log('new user created:'+ newUser))
      });
    }
    localuser = currentUser;
})
  // console.log(localuser);
  return cb(null,profile);
}
))

https.createServer(options, app).listen(443,function(){
  console.log(warn('HTTPS listening on 443'));
});



app.use(bodyParser.json());
app.use((req,res,next)=>{
  console.log(warn("App output"));
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  if(req.method === "OPTIONS"){
    return res.sendStatus(200);
  }
  // console.log(localuser);

  next();
})


app.use(isAuth);
app.use(cors({
  origin: CLIENT_ORIGIN
})) 

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.session({ 
//   secret: process.env.SESSION_SECRET, 
//   resave: true, 
//   saveUninitialized: true 
// }))
app.get("/auth/facebook",passport.authenticate("facebook"));
app.get("/auth/facebook/callback",
    passport.authenticate("facebook"), 
    // { successRedirect: '/boom/',failureRedirect: '/login' })
    (req,res)=>{
      res.redirect("https://localhost:3000/");
      
    }
  )

  app.get('/auth/google',
  passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: 'https://localhost:3000/',
        failureRedirect: '/auth/google/failure'
}));

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://`+keys.MongoDB.user+`:`+keys.MongoDB.pass+`@cluster0-agabb.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser: true }
    
    )
  .then(() => {
    app.listen(3001);
    console.log(log('Listening on port: 3001'));
  })
  .catch(err => {
      console.log(warn(err));
      // console.log(process.env.MONGO_PASSWORD);
  });

  app.get("/user",(req,res)=>{
    // console.log(log("getting userdata"));
    res.send(localuser);
  })

  app.get("/auth/logout",(req,res)=>{
    console.log(log("logging out user"));
    localuser= {};
    res.redirect("/");
  })