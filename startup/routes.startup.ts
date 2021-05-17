import ServerClass from "../classes/server.class";
import bodyParser from 'body-parser';
import cors from 'cors'
import helmet from 'helmet';
import error from "../middlewares/error.middleware";


// Routes
import users from "../routes/users.route"
import auth from "../routes/auth.route"
import register from "../routes/register.route"
import adminUsers from "../routes/admin.users.route"
import groups from "../routes/groups.route"
import groupsMembers from "../routes/groups.members.route"
import groupsMatches from "../routes/group_matches.route"

// Middlewares
import  {isActive} from '../middlewares/active.middleware';
import  {isAdmin}  from '../middlewares/admin.middleware';
import { isAuthenticated } from '../middlewares/auth.middleware';
import  {isValidated} from '../middlewares/validated.middleware';
import {isGroupMember} from "../middlewares/group_member.middleware";


module.exports = function(server: ServerClass){

    // Helmet
    server.app.use(helmet());

    // BodyParser
    server.app.use( bodyParser.urlencoded({ extended: true}));
    server.app.use(bodyParser.json());

    // CORS
    server.app.use( cors({origin: true, credentials: true }));

    // Routes
    server.app.use('/api/users', [isAuthenticated, isValidated, isActive],users);
    server.app.use('/api/auth', auth);
    server.app.use('/api/register', register);
    server.app.use('/api/admin/users',[isAuthenticated, isValidated, isActive, isAdmin], adminUsers);
    server.app.use('/api/groups', [isAuthenticated, isValidated, isActive],groups);
    server.app.use('/api/groups', [isAuthenticated, isValidated, isActive],groups);
    server.app.use('/api/groups/:groupId/members', [isAuthenticated, isValidated, isActive, isGroupMember],groupsMembers);
    server.app.use('/api/groups/:groupId/matches', [isAuthenticated, isValidated, isActive, isGroupMember],groupsMatches)


    // Error Middleware
    server.app.use(error);

}
