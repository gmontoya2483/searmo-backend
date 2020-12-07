import {Request, Response, Router} from "express";

const router = Router();

router.get('/', [], async (req:Request, res: Response)=>{
    return res.status(200).json({Members :'Lista de miembros'});
});


router.get('/:idUser', [], async (req:Request, res: Response)=>{
    return res.status(200).json({Members :'Miembro'});
});

router.post('/', [], async (req:Request, res: Response)=>{
    return res.status(201).json({Members :'Se agrego el Miembro al grupo'});
});

router.put('/:idUSer/delete', [], async (req:Request, res: Response)=>{
    return res.status(200).json({Members :'Se marco como borrado'});
});

export default router;
