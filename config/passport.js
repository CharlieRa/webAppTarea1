// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
//sqlite
var fs = require("fs");
var file = "tarea1.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
//fin sqlite
// var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
// var dbconfig = require('./database');
// var connection = mysql.createConnection(dbconfig.connection);

console.log(db.serialize());
db.serialize(function(){
  if(!exists) {
    db.run('\
    CREATE TABLE `users`( \
        `id` INTEGER PRIMARY KEY AUTOINCREMENT, \
        `username` VARCHAR(100) NOT NULL, \
        `password` VARCHAR(255) NOT NULL \
    )');
  }
})

// function lastId(db)
// {
//   db.each("SELECT id FROM users ORDER BY id desc LIMIT 1;", function(err, row)
//   {
//     // console.log("laldsasdasdaa: "+row.id + ": ");
//     // newUserMysql.id = row.id;
//     return row.id
//   });
// }

// connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        // connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
        //     done(err, rows[0]);
        // });
        // db.run("SELECT * FROM users WHERE id = ? ",[id], function(error){
        //     done(error);
        // });
        db.each("SELECT * FROM users WHERE id = ? ",[id], function(err, row) {
          // console.log("lala: "+row.id + ": ");
          done(err, row.id);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            // });
            // connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows)
            // {
            // console.log("lala");
            db.all("SELECT * FROM users WHERE username = ? LIMIT 1;",[username], function(error, rows)
            {
                if (error)
                    return done(error);
                if (rows.length)
                {
                  return done(null, false, req.flash('signupMessage', 'Ese usuario ya existe. Escoge otro.'));
                } else
                {
                  /* Si no existe, creaer un usuario nuevo */
                  var newUserMysql =
                  {
                    username: username,
                    password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                  };
                    // var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";
                    //
                    // connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows)
                    // {
                    //     newUserMysql.id = rows.insertId;
                    //     return done(null, newUserMysql);
                    // });
                    /* sqlite */
                  var insertQuery = "INSERT INTO users (rowid, username, password ) values (null, ?,?)";
                  db.serialize(function(){
                  db.run(insertQuery,[newUserMysql.username, newUserMysql.password], function(error)
                  {
                      console.log("error:"+error);
                  });
                  db.each("SELECT id FROM users ORDER BY id desc LIMIT 1;", function(error, row)
                  {
                    newUserMysql.id = row.id;
                    console.log("user: "+newUserMysql.id);
                    return done(null, newUserMysql);
                  });
                  });
                }
            });
        })
    );
    // LOCAL LOGIN =============================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
          db.all("SELECT * FROM users WHERE username = ? LIMIT 1;",[username], function(error, rows)
          {
            // connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (error)
                    return done(error);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No existe usuario')); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Constraseña incorrecta')); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
