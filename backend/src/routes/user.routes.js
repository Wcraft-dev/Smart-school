import {Router} from 'express'
import  { getUsersData, deleteUser, loginUser , newUser } from '../controllers/user.controller'
const router = Router();

router.route('/')
    .get((req, res) => res.send('Login form'))
    .post(loginUser)

router.route('/register')
    .get((req, res) => res.send('Register form'))
    .post(newUser)

router.route('/admin')
    .get(getUsersData)

router.route('/:id')
    .delete(deleteUser)

export default router;