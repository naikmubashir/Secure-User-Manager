const Employee = require('../model/Employee');

const getAllEmployees = async (req,res)=>{
    const employee= await Employee.findAll();
    if(!employee) return res.status(204).json({"message":"No employee found..."});
    res.json(employee);
}

const createNewEmployee= async (req, res)=>{
    if(!req?.body?.firstname || !req?.body?.lastname) return res.status(400).json({"message":"Firstname and lastname are required..."});
    try{
        const newEmployee = Employee.create(
            {
                firstname: req.body.firstname,
                lastname:req.body.lastname
            }
        );
        res.status(201).json(newEmployee);
    }
    catch(err){
        console.log(err);
    }
}

const updateEmployee = async (req,res)=>{
    if(!req?.body?.id) return res.status(400).json({"message":"ID params are required..."});
    const employee= await Employee.findOne({ _id : req.body.id}).exec();
    if(!employee) return res.status(204).json({"message":`No employee matches the ID ${req.body.id}`});

    if(req?.body?.firstname) employee.firstname = req.body.firstname;
    if(req?.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.status(201).json(result);
}

const deleteEmployee = async (req,res)=>{
    if(!req?.body?.id) return res.status(400).json({"mesage":"Employee ID required..."});
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if(!employee) return res.status(204).json({"message":"No Employee matches such ID ."});
    const result= await Employee.deleteOne({_id: req.body.id});
    res.json(result);
}

const getEmployee = async (req,res)=>{
    if(!req?.params?.id) return res.status(400).json({"message":"Employee ID is required..."});
    const employee = await Employee.findOne({_id : req.params.id}).exec();
    if(!employee) return res.status(204).json({"message":"No employee matches the given ID..."});
    res.json(employee);
}

 module.exports = {getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee}