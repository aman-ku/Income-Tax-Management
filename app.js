var express=require('express');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var body=require('body-parser');
var morgan=require('morgan');
var passport=require('passport');
var flash=require('connect-flash');
var app=express();
var bcrypt = require('bcrypt-nodejs');

var mysql = require('mysql')


app.use(body.urlencoded({extended: false}));
app.use(body.json())


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kumar@123',
    database: 'Tax_1'
  })
  
  connection.connect(function(err){
      if(err)
      {
          throw err;
      }
      else{
          console.log("add user database connected succesfully");
      }
  });

  app.post('/add_user',function(req,res,err){
    // console.log("i am in post post add user");
    if(err)
    {
        console.log(err);
    }
    // console.log(req.body);
    var payer={
        f_name:req.body.first,
        l_name:req.body.last,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, null, null),
        dob:req.body.dob,
        aadhar_no:req.body.aadhar,
        mobile:req.body.mobile,
        noe:req.body.employment,
        addr_1:req.body.addr1,
        addr_2:req.body.addr2,
        city:req.body.city,
        state:req.body.state,
        pincode:req.body.pincode
    }
    var insertQuery = "INSERT INTO tax_payer (f_name,l_name,email,password,dob,aadhar_no,mobile,noe,addr_1,addr_2,city,state,pincode) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(insertQuery,[payer.f_name,payer.l_name,payer.email,payer.password,payer.dob,payer.aadhar_no,payer.mobile,payer.noe,payer.addr_1,payer.addr_2,payer.city,payer.state,payer.pincode], function (err, rows, fields) {
    if (err) 
    {
        throw err
    }    
    else{
        payer.person_id = rows.insertId;
        console.log("payer added succesfully");
        res.redirect('/add_user');
    }
    // console.log('The solution is: ', rows[0].solution)
    })
    connection.end();
});




app.set('view engine','ejs');
require('./config/passport.js')(passport);


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



require('./routes/routes.js')(app,passport,mysql,bcrypt,bodyParser);
app.listen(3000,function(){
    console.log('Server Started');
});