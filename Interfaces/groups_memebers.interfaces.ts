export interface INewGroupMember  {
    userId: string;
}

export interface IServiceResponse  {
    status: number;
    response: {
        ok: boolean;
        message?: string;
        total?: number;
        member?: {};
        members?: {}[];
    };
}

export interface IDeleteGroupMember {
    isDeleted: boolean;
}
