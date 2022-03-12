const router = require('express').Router()


const userCtrl = require('../controllers/userController')
const authCtrl = require('../controllers/authController')
const shopCtrl = require('../controllers/shopController')


router.route('/')
  .get(shopCtrl.list)

router.route('/:shopId')
  .get(shopCtrl.read)

router.route('/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, shopCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.listByOwner)

router.route('/:shopId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.remove)

router.param('shopId', shopCtrl.shopByID)
router.param('userId', userCtrl.userByID)

module.exports = router
