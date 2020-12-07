export interface INewGroup  {
    title: string;
    description: string;
}

export interface IUpdateGroup  {
    title: string;
    description: string;
}

export interface IDeleteGroup {
    isDeleted: boolean;
}

export interface IServiceResponse  {
    status: number;
    response: {
        ok: boolean;
        message?: string;
        total?: number;
        group?: {};
        groups?: {}[];
    };
}
