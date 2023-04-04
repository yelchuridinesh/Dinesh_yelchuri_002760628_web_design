const userController=require('../controller/userController.js')
const router=require('express').Router();


router.post('/',userController.adduser)

router.put('/',userController.updateuser)

router.get('/:emailId',userController.getuserbyemailId)

router.get ('/',userController.getuser);

router.delete ('/:emailId',userController.deleteuser);

module.exports=router;