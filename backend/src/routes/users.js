const {Router} = require('express');
const router = Router();
const { getUsersData, deleteUser, loginUser , newUser } = require('../controllers/user.controller')

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

module.exports = router;