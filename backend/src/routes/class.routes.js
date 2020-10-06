import {Router} from 'express'
import {addClas, deleteClass, getClas, getClases,updateClas}  from '../controllers/class.controller'
import {accessByToken}  from "../middlewares/auth.validator"
const router = Router();

router.route('/')
    .get(accessByToken,getClases)
    .post(accessByToken,addClas)

router.route('/:id')
    .get(accessByToken,getClas)
    .put(accessByToken,updateClas)
    .delete(accessByToken,deleteClass)

export default router;