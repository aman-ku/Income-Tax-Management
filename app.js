var express=require('express');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var passport=require('passport');
var flash=require('connect-flash');
var app=express();

app.set('view engine','ejs');
require('./config/passport.ejs');


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));



app.use(session({
    secret:'Believe in the fight',
    resave:true,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/routes.js')(app,passport);
app.listen(3000,function(){
    console.log('Server Started');
});