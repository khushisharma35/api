const {createEmployee, getemployee,deleteemployee,Updateemployee,getemployeebyemail,login} =require('./employee.controller')
const router =require('express').Router();
const {checkToken} =require('/Users/apple/code/node_restapi/middleware/token.validation.js')
router.post("/",createEmployee);
router.get("/",getemployee);
router.get("/:email",getemployeebyemail);
router.patch("/",checkToken,Updateemployee);
router.delete("/",deleteemployee );
router.post("/login",login)

module.exports = router;

