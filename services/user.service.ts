import {IActiveUser, IAuthenticateUser, IUsersRegister, IValidateUser} from "../Interfaces/users.interface";
import {User} from "../models/user.model";
import SecurityService from "./security.service";
import _ from 'lodash';


export default abstract class UserService {

    public static async registerUser ({name, last_name, email, password}: IUsersRegister){
        // Verificar si el mail ya se encuentra registrado
        let user = await User.findOne({email: email});
        if (user) return {
            ok: false,
            message: `email '${email}' ya se encuentra registrado`
        };

        // Hashear el Password
        const hashedPassword = await SecurityService.generateHash(password);

        user = new User({
            name,
            lastName: last_name,
            password: hashedPassword,
            email
        });
        await user.save();

        // remover campos no necesarios en la respuesta
        const sanitizedUser = _.omit(user.toObject(),
            ['password']);

        return {
            ok: true,
            user: sanitizedUser
        };
    }

    public static async getUser (userId: string){
        const user = await User.findById(userId).select({password: 0, __v: 0});
        if (!user) return {
            ok: false,
            message: "Usuario no encontrado"
        }

        return {
            ok: true,
            user
        };
    }

    public static async authenticateUser({email, password}: IAuthenticateUser){

        let user = await User.findOne({email});
        if (!user) return {
            ok: false,
            message: "Email o Password inválidos."
        };

        // @ts-ignore
        const validPassword = await SecurityService.validateHash(password, user.password);
        if (!validPassword) return {
            ok: false,
            message: "Email o Password inválidos."
        };

        // @ts-ignore
        const token = await user.generateAuthToken();

        return {
            ok: true,
            token
        }
    }


    public static async setValidated (userId: string, { isValidated }: IValidateUser){

        const validated = (isValidated) ? {value: true, validatedDateTime: Date.now()}
        : {value: false, validatedDateTime: null};

        const user = await  User.findByIdAndUpdate(userId, {
            $set: {
                isValidated: validated,
                dateTimeUpdated: Date.now()
            }

        }, {new: true}).select({password: 0});

        if(!user) return {
            ok: false,
            message: "Usuario no encontrado"
        }
        return {
            ok: true,
            user
        }
    }

    public static async setActivated (userId: string, { isActive }: IActiveUser){
        const user = await  User.findByIdAndUpdate(userId, {
            $set: {
                isActive,
                dateTimeUpdated: Date.now()
            }

        }, {new: true}).select({password: 0});

        if(!user) return {
            ok: false,
            message: "Usuario no encontrado"
        }
        return {
            ok: true,
            user
        }
    }
}
