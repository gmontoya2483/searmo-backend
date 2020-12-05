import {IUsersRegister} from "../Interfaces/users.interface";
import {INewGroup} from "../Interfaces/groups.intefaces";
import {Group} from "../models/group.model";
import {GroupMember} from "../models/group_members.model";


export default abstract class GroupService {


    public static async newGroup (ownerId: string, {title, description}: INewGroup){

        console.log(ownerId);

        const group = new Group({
            title,
            description,
            owner : ownerId
         });

        await group.save();

        const groupMember = new GroupMember({
            group: group._id,
            user: ownerId,
            isAdmin: true
        });

        await groupMember.save();

        return {
            ok: true,
            group
        };





    }

}
