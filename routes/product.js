const router = require('express').Router()


const productCtrl = require('../controllers/productController')
const authCtrl = require('../controllers/authController')
const shopCtrl = require('../controllers/shopController')


router.route('/by/:shopId')
  .post(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.create)
  .get(productCtrl.listByShop)

router.route('/categories')
  .get(productCtrl.listCategories)

router.route('/')
  .get(productCtrl.list)

router.route('/:productId')
  .get(productCtrl.read)

router.route('/:shopId/:productId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.remove)

router.param('shopId', shopCtrl.shopByID)
router.param('productId', productCtrl.productByID)


module.exports = router;