export interface INewGroupMatch {
    title: string;
    matchDayTime: Date;
    playingField: string;
    playersByTeam: number;
}

export interface IDeleteGroupMatch {
    isDeleted: boolean;
}


export interface IServiceResponse  {
    status: number;
    response: {
        ok: boolean;
        message?: string;
        total?: number;
        match?: {};
        matches?: {}[];
    };
}
