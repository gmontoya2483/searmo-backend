import {IDeleteGroupMatch, INewGroupMatch, IServiceResponse} from "../Interfaces/group_matches.interfaces";
import { GroupMatch } from "../models/group_matches.model";

export default abstract class GroupMatchService {

    public static async newGroupMatch (groupId: string, {title, matchDayTime, playingField, playersByTeam}: INewGroupMatch) : Promise<IServiceResponse> {

        const match = new GroupMatch({
            group: groupId,
            title,
            matchDayTime,
            playingField,
            playersByTeam
        });

        await match.save();

        return {
            status: 201,
            response: {
                ok: true,
                match
            }
        }
    }


    public static async getAllMatches(groupId: string,  showDeleted: boolean = false) : Promise<IServiceResponse>{

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

        const matches = await GroupMatch.find(criteria)
            .select({group: 0, __v: 0});

        const total = matches.length
        return {
            status: 200,
            response: {
                ok: true,
                total,
                matches
            }
        }
    }


    public static async getSingleMatch (groupId: string, matchId: string) : Promise<IServiceResponse> {

        const criteria = {
            group: groupId,
            _id: matchId
        };

        const match = await GroupMatch.findOne(criteria);


        if (!match) return {
            status: 404,
            response: {
                ok: false,
                message: "Partido no encontrado"
            }
        };


        return {
            status: 200,
            response: {
                ok: true,
                match
            }
        };
    }


    public static async setDeleted (groupId: string, matchId: string, { isDeleted }: IDeleteGroupMatch) : Promise<IServiceResponse>{

        const criteria = {
            group: groupId,
            _id: matchId
        };

        const deleted = (isDeleted) ? {value: true, validatedDateTime: Date.now()}
            : {value: false, validatedDateTime: null};

        const isActive = !isDeleted;

        const match = await GroupMatch.findOneAndUpdate(criteria, {
            $set: {
                isDeleted: deleted,
                isActive,
                dateTimeUpdated: Date.now()
            }
        },{new: true});

        if(!match) return {
            status: 404,
            response: {
                ok: false,
                message: "Partido no encontrado"
            }
        };

        return {
            status: 200,
            response: {
                ok: true,
                match
            }
        };

    }


}
