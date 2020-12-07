import {
    IActiveUser, IAdminUser,
    IAuthenticateUser,
    IDeleteUser, IUpdateUser,
    IUsersRegister,
    IValidateUser,
    IServiceResponse
} from "../Interfaces/users.interface";
import {User} from "../models/user.model";
import SecurityService from "./security.service";
import _ from 'lodash';
import * as QueryString from "querystring";


export default abstract class UserService {

    public static async registerUser ({name, lastName, email, password}: IUsersRegister) : Promise<IServiceResponse>{
        // Verificar si el mail ya se encuentra registrado
        let user = await User.findOne({email: email});
        if (user) return {
            status: 400,
            response: {
                ok: false,
                message: `email '${email}' ya se encuentra registrado`
            }
        };

        // Hashear el Password
        const hashedPassword = await SecurityService.generateHash(password);

        user = new User({
            name,
            lastName,
            password: hashedPassword,
            email
        });
        await user.save();

        // remover campos no necesarios en la respuesta
        const sanitizedUser = _.omit(user.toObject(),
            ['password']);

        return {
            status: 201,
            response: {
                ok: true,
                user: sanitizedUser
            }
        };
    }

    public static async updateUser(userId: string, {email, name, lastName}: IUpdateUser) : Promise<IServiceResponse>{
        // Verificar que el email no este duplicado
        const userWithSameEmail = await User.findOne({email: email, _id: {$ne: userId }});
        if (userWithSameEmail) return {
            status: 400,
            response: {
                ok: false,
                message: `email '${email}' ya se encuentra registrado`
            }

        }

        const user = await  User.findByIdAndUpdate(userId, {
            $set: {
                name,
                email,
                lastName,
                dateTimeUpdated: Date.now()
            }

        }, {new: true}).select({password: 0, __v:0});

        if(!user) return {
            status: 400,
            response: {
                ok: false,
                message: "Usuario no encontrado"
            }

        };

        return {
            status: 200,
            response: {
                ok: true,
                user
            }
        }
    }


    public static async getSingleUser (userId: string) : Promise<IServiceResponse> {
        const user = await User.findById(userId).select({password: 0, __v: 0});
        if (!user) return {
            status: 404,
            response: {
                ok: false,
                message: "Usuario no encontrado"
            }
        };

        return {
            status: 200,
            response: {
                ok: true,
                user
            }
        };
    }

    public static async getAllUsers(search: any, showDeleted: boolean = false) : Promise<IServiceResponse> {
        let criteria = {};

        // Verificar criterio de Búsqueda
        if (search) {
            criteria = {
                $or : [
                    {name: {$regex:  `.*${search}.*`, $options:'i'}},
                    {lastName: {$regex: `.*${search}.*`, $options:'i'}},
                    {email: {$regex: `.*${search}.*`, $options:'i'}}
                ]
            }
        }

        // Verificar si se muestran los marcados como borrados
        if (!showDeleted){
            criteria = {
                ... criteria,
                'isDeleted.value': false
            }
        }

        const users = await User.find(criteria).select({password: 0, __v:0});
        const total = users.length
        return {
            status: 200,
            response: {
                ok: true,
                total,
                users
            }
        };
    }


    public static async authenticateUser({email, password}: IAuthenticateUser) : Promise<IServiceResponse>{

        let user = await User.findOne({email});
        if (!user) return {
            status: 400,
            response: {
                ok: false,
                message: "Email o Password inválidos."
            }
        };

        // @ts-ignore
        const validPassword = await SecurityService.validateHash(password, user.password);
        if (!validPassword) return {
            status: 400,
            response: {
                ok: false,
                message: "Email o Password inválidos."
            }
        };

        // @ts-ignore
        const token = await user.generateAuthToken();

        return {
            status: 200,
            response: {
                ok: true,
                token
            }
        };
    }


    public static async setValidated (userId: string, { isValidated }: IValidateUser) : Promise<IServiceResponse> {

        const validated = (isValidated) ? {value: true, validatedDateTime: Date.now()}
        : {value: false, validatedDateTime: null};

        const user = await  User.findByIdAndUpdate(userId, {
            $set: {
                isValidated: validated,
                dateTimeUpdated: Date.now()
            }

        }, {new: true}).select({password: 0, __v:0});

        if(!user) return {
            status: 404,
            response: {
                ok: false,
                message: "Usuario no encontrado"
            }
        };

        return {
            status: 200,
            response: {
                ok: true,
                user
            }
        };
    }

    public static async setActivated (userId: string, { isActive }: IActiveUser) : Promise<IServiceResponse>{
        const user = await  User.findByIdAndUpdate(userId, {
            $set: {
                isActive,
                dateTimeUpdated: Date.now()
            }

        }, {new: true}).select({password: 0, __v:0});

        if(!user) return {
            status: 404,
            response: {
                ok: false,
                message: "Usuario no encontrado"
            }
        };

        return {
            status: 200,
            response: {
                ok: true,
                user
            }
        };
    }

    public static async setDeleted (userId: string, { isDeleted }: IDeleteUser) : Promise<IServiceResponse> {

        const deleted = (isDeleted) ? {value: true, validatedDateTime: Date.now()}
            : {value: false, validatedDateTime: null};

        const isActive = !isDeleted;

        const user = await  User.findByIdAndUpdate(userId, {
            $set: {
                isDeleted: deleted,
                isActive,
                dateTimeUpdated: Date.now()
            }

        }, {new: true}).select({password: 0, __v:0});

        if(!user) return {
            status: 404,
            response: {
                ok: false,
                message: "Usuario no encontrado"
            }
        };

        return {
            status: 200,
            response: {
                ok: true,
                user
            }
        };
    }

    public static async setAdmin (userId: string, { isAdmin }: IAdminUser) : Promise<IServiceResponse> {
        const user = await  User.findByIdAndUpdate(userId, {
            $set: {
                isAdmin,
                dateTimeUpdated: Date.now()
            }

        }, {new: true}).select({password: 0, __v:0});

        if(!user) return {
            status: 404,
            response: {
                ok: false,
                message: "Usuario no encontrado"
            }
        };

        return {
            status: 200,
            response: {
                ok: true,
                user
            }
        };
    }


}
