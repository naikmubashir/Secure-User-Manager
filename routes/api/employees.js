const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/')
    .get(employeeController.getAllEmployees) //all roles can send a ger request
    .post(verifyRoles(ROLES_LIST.Editor,ROLES_LIST.Admin),employeeController.createNewEmployee) //only editor and admin can send a post and put request
    .put( verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeeController.updateEmployee)
    .delete( verifyRoles(ROLES_LIST.Admin) ,employeeController.deleteEmployee) //only admin can send a delete request

router.route('/:id')
    .get(employeeController.getEmployee)

module.exports = router