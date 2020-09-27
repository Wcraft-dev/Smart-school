import {Router} from 'express'
import {addClas, deleteClass, getClas, getClases,updateClas}  from '../controllers/class.controller'
const router = Router();

router.route('/')
    .get(getClases)
    .post(addClas)

router.route('/:id')
    .get(getClas)
    .put(updateClas)
    .delete(deleteClass)

export default router;