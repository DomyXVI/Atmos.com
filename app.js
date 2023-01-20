var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var emailActivationRouter = require('./routes/email_activation');
var passwordRecoveryRouter = require('./routes/password_recovery');
var passwordResetRouter = require('./routes/reset_password');
var recoverRouter = require('./routes/recover');

require('dotenv').config()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 3_600_000
    },
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/activate', emailActivationRouter);
app.use('/password-recovery', passwordRecoveryRouter);
app.use('/password-reset/', passwordResetRouter);
app.use('/recover/', recoverRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

console.log("\u001b[1;33mConnection Established" + "\u001b[0m");
console.log("\u001b[1;32mServer uptime: " + process.uptime() + " sec\u001b[0m");

app.listen(process.env.PORT || 3000);

function intervalFunc() {
    console.log("\u001b[1;32mServer uptime: " + msToTime(process.uptime()) + " min\u001b[0m");
}

function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days"
}

setInterval(intervalFunc, 300000);