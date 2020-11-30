import ServerClass from "../classes/server.class";
import bodyParser from 'body-parser';
import cors from 'cors'
import helmet from 'helmet';
import error from "../middlewares/error.middleware";


// Routes
import users from "../routes/users.route"
import auth from "../routes/auth.route"
import register from "../routes/register.route"
import admin from "../routes/admin.users.route"

// Middlewares
const authValidation = require('../middlewares/auth.middleware');
const isValidated = require('../middlewares/validated.middleware');
const isActive = require('../middlewares/active.middleware');
const isAdmin  = require('../middlewares/admin.middleware');



module.exports = function(server: ServerClass){

    // Helmet
    server.app.use(helmet());

    // BodyParser
    server.app.use( bodyParser.urlencoded({ extended: true}));
    server.app.use(bodyParser.json());

    // CORS
    server.app.use( cors({origin: true, credentials: true }));

    // Routes
    server.app.use('/api/users', [authValidation, isValidated, isActive],users);
    server.app.use('/api/auth', auth);
    server.app.use('/api/register', register);
    server.app.use('/api/admin/users',[authValidation, isValidated, isActive, isAdmin], admin);


    // Error Middleware
    server.app.use(error);

}
