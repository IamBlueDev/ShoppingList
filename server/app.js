var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mysql = require('mysql');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);




/* PRODUCTS SECTION*/
app.get('/product/:id', (req,res) =>{
  console.log("Fetching user with id:"+req.params.id)
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'react'
  });
  const userId = req.params.id;
  console.log("UserID is :" +userId )
  const queryString = "SELECT * FROM products WHERE id = ?"
  connection.query(queryString,[userId],(err,rows,fields) =>{
    if (err){
   // console.log("WOOOPS"+err)
    res.sendStatus(500)
    res.end()
    return
    }
    const products = rows.map((row) => {
      return {Product_name: row.name,
        Item_ammount: row.amount,
        Item_Cal:row.cal,  
        showinfo:'false', 
        keyToUse:row.id, 
};
    });

    res.json(products);
  });
  
});



app.get('/productname/:name', (req,res) =>{
  console.log("Fetching products with the name:"+ req.params.name)
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'react'
  });
  const PD = req.params.name;
  const queryString = "SELECT * FROM products WHERE name LIKE CONCAT('%', ?, '%') ;"
  connection.query(queryString,[PD],(err,rows,fields) =>{
    if (err){
      console.log(err)
    res.sendStatus(500)
    res.end()
    return
    }
    const products = rows.map((row) => {
      return {Product_name: row.name,
              Item_ammount: row.amount,
              Item_Cal:row.cal,
              showinfo:'false',
              keyToUse:row.id,   
      };

    });

    res.json(products);
  });
  
});

app.get('/productname/', (req,res) =>{
  console.log("Fetching ALL products")
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'react'
  });
  const queryString = "SELECT * FROM products"
  connection.query(queryString,(err,rows,fields) =>{
    if (err){
    res.sendStatus(500)
    res.end()
    return
    }
    const products = rows.map((row) => {
      return {Product_name: row.name,
              Item_ammount: row.amount,
              Item_Cal:row.cal,
              showinfo:'false',
              keyToUse:row.id,  
      };

    });

    res.json(products);
  });
  
});

app.post('/insert/', function(req,res,next){
  //var newBook = JSON.parse(req.body.data)
  console.log(req.body.prodName)

// var item={
//   title:req.params.BookId,
// };
// console.log(req.params.BookId)
})

app.post('/update', function(req,res,next){
  
})

app.post('/delete', function(req,res,next){
  
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
