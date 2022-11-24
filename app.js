// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();



// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");



const path = require("path");

const app = express();

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));

require('./config/session.config')(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Bookflix & chill";

app.locals.appTitle = `${capitalize(projectName)}`;
/* app.locals.userInSession = session.currentUser */

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRouter = require('./routes/auth.routes'); 
app.use('/', authRouter); 

const bookRouter = require('./routes/book.routes'); 
app.use('/', bookRouter); 

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
