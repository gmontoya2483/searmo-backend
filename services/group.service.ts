import {IDeleteGroup, INewGroup, IUpdateGroup, IServiceResponse} from "../Interfaces/groups.intefaces";
import {Group} from "../models/group.model";
import {GroupMember} from "../models/group_members.model";
import logger from "../startup/logger.startup";

const mongoose = require('mongoose');
const Fawn = require('fawn');

// Init fawn for using transactions
Fawn.init(mongoose, 'trxGroupGroupMembers');


export default abstract class GroupService {


    public static async newGroup (ownerId: string, {title, description}: INewGroup) : Promise<IServiceResponse> {

        try {
            const group = new Group({
                title,
                description,
                owner : ownerId
            });

            const groupMember = new GroupMember({
                group: group._id,
                user: ownerId,
                isAdmin: true
            });

            new Fawn.Task()
                .save('groups', group)
                .save('groupmembers',  groupMember)
                .run({useMongoose: true});

            return {
                status: 201,
                response: {
                    ok: true,
                    group
                }
            };

        } catch (e) {
            logger.error("Error al crear un nuevo grupo", e);
            return {
                status: 500,
                response: {
                    ok: false,
                    message: `Internal Server Error.`
                }
            };
        }
    }


    public static async getAllGroups(search: any, showDeleted: boolean = false) : Promise<IServiceResponse>{

        let criteria = {};

        // Verificar criterio de Búsqueda
        if (search) {
            criteria = {
                $or : [
                    {title: {$regex:  `.*${search}.*`, $options:'i'}},
                    {description: {$regex: `.*${search}.*`, $options:'i'}}
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

        const groups = await Group.find(criteria).populate('owner', {name: 1, lastName: 1});
        const total = groups.length
        return {
            status: 200,
            response: {
                ok: true,
                total,
                groups
            }
        }
    }

    public static async getSingleGroup (groupId: string){
        const group = await Group.findById(groupId).populate('owner', {name: 1, lastName: 1});
        if (!group) return {
            status: 404,
            response: {
                ok: false,
                message: "Grupo no encontrado"
            }
        };

        return {
            status: 200,
            response: {
                ok: true,
                group
            }

        };
    }


    public static async updateGroup(userId: string, groupId: string, {title, description}: IUpdateGroup) : Promise<IServiceResponse> {

        const group = await Group.findById(groupId);

        if(!group) {
            return {
                status: 404,
                response: {
                    ok: false,
                    message: "Grupo no entontrado"
                }
            };
        }

        // @ts-ignore
        if (!group.owner.equals(userId)){
            return {
                status: 403,
                response: {
                    ok: false,
                    message: "El Usuario no es owner del Grupo"
                }
            };
        }


        // @ts-ignore
        group.title = title;
        // @ts-ignore
        group.description = description;
        // @ts-ignore
        group.dateTimeUpdated = Date.now();
        // @ts-ignore
        group.save();

        return {
            status: 200,
            response: {
                ok: true,
                group
            }
        };
    }

    public static async setDeleted (userId: string, groupId: string, { isDeleted }: IDeleteGroup) : Promise<IServiceResponse>{

        const group = await Group.findById(groupId);

        if(!group) {
            return {
                status: 404,
                response: {
                    ok: false,
                    message: "Grupo no entontrado"
                }
            };
        }

        // @ts-ignore
        if (!group.owner.equals(userId)){
            return {
                status: 403,
                response: {
                    ok: false,
                    message: "El Usuario no es owner del Grupo"
                }
            };
        }

        const deleted = (isDeleted) ? {value: true, validatedDateTime: Date.now()}
            : {value: false, validatedDateTime: null};

        const isActive = !isDeleted;


        // @ts-ignore
        group.isDeleted = deleted;
        // @ts-ignore
        group.isActive = isActive;
        // @ts-ignore
        group.dateTimeUpdated = Date.now();
        // @ts-ignore
        group.save();

        return {
            status: 200,
            response: {
                ok: true,
                group
            }
        };
    }



}
