import {IUsersRegisterInterface} from "../../Interfaces/users.register.interface";
import {User} from "../../models/user.model";
import Security from "../../classes/security.class";
import _ from 'lodash';

export async function registerUser ({name, last_name, email, password}: IUsersRegisterInterface){

    // Verificar si el mail ya se encuentra registrado
    let user = await User.findOne({email: email});
    if (user) return {
        ok: false,
        message: `email '${email}' ya se encuentra registrado`
    };

    // Hashear el Password
    const hashedPassword = await Security.generateHash(password);

    user = new User({
        name,
        lastName: last_name,
        password: hashedPassword,
        email
    });
    await user.save();

    // remover campos no necesarios en la respuesta
    const sanitizedUser = _.omit(user.toObject(),
        ['password', 'isDeleted', '__v', 'dateTimeCreated', "dateTimeUpdated"]);

    return {
        ok: true,
        user: sanitizedUser
    };
}
