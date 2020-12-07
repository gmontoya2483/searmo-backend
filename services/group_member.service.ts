import {IServiceResponse, INewGroupMember, IDeleteGroupMember} from "../Interfaces/groups_memebers.interfaces";
import {GroupMember} from "../models/group_members.model";


export default abstract class GroupMemberService {

    public static async newGroupMember (groupId: string, {userId:memberUserId}: INewGroupMember) : Promise<IServiceResponse> {

        const criteria = {
            group: groupId,
            user: memberUserId
        };

        let member = await GroupMember.findOne(criteria)


        if (member) return {
            status: 400,
            response: {
                ok: false,
                message: "El usuario ya es miembro del grupo"
            }
        };

        member = new GroupMember({
            group: groupId,
            user: memberUserId
        });

        await member.save();

        return {
            status: 201,
            response: {
                ok: true,
                member
            }
        }
    }


    public static async getAllMembers(groupId: string,  showDeleted: boolean = false) : Promise<IServiceResponse>{

        let criteria = {};
        criteria = {
            ... criteria,
            group: groupId
        }

        // Verificar si se muestran los marcados como borrados
        if (!showDeleted){
            criteria = {
                ... criteria,
                'isDeleted.value': false
            }
        }

        const members = await GroupMember.find(criteria)
            .select({group: 0, __v: 0})
            .populate('user', {name: 1, lastName: 1});

        const total = members.length
        return {
            status: 200,
            response: {
                ok: true,
                total,
                members
            }
        }
    }


    public static async getSingleGroupMember (groupId: string, memberUserId: string) : Promise<IServiceResponse> {

        const criteria = {
            group: groupId,
            user: memberUserId
        };

        const member = await GroupMember.findOne(criteria).populate('user', {name: 1, lastName: 1})


        if (!member) return {
            status: 404,
            response: {
                ok: false,
                message: "Miembro no encontrado"
            }
        };


        return {
            status: 200,
            response: {
                ok: true,
                member
            }
        };
    }

    public static async setDeleted (groupId: string, memberUserId: string, { isDeleted }: IDeleteGroupMember) : Promise<IServiceResponse>{

        const criteria = {
            group: groupId,
            user: memberUserId
        };

        const deleted = (isDeleted) ? {value: true, validatedDateTime: Date.now()}
            : {value: false, validatedDateTime: null};

        const isActive = !isDeleted;

        const member = await GroupMember.findOneAndUpdate(criteria, {
            $set: {
                isDeleted: deleted,
                isActive,
                dateTimeUpdated: Date.now()
            }
        },{new: true}).populate('user', {name: 1, lastName: 1});

        if(!member) return {
            status: 404,
            response: {
                ok: false,
                message: "Miembro no encontrado"
            }
        };

        return {
            status: 200,
            response: {
                ok: true,
                member
            }
        };

    }

}
