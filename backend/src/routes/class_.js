const {Router} = require('express');
const router = Router();
const { addClas, deleteClass, getClases , getClas, updateClas } = require('../controllers/class.controller')

router.route('/')
    .get(getClases)
    .post(addClas)

router.route('/:id')
    .get(getClas)
    .put(updateClas)
    .delete(deleteClass)

module.exports = router;