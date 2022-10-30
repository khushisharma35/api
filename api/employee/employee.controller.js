const { get } = require('./employee.router');
const {create,getemployee,getemployeebyemail, Updateemployee,deleteemployee} = require('./employee.service')
const {genSaltSync,hashSync,compareSync} = require("bcrypt");
const {sign} =require('jsonwebtoken')



module.exports ={
    createEmployee: (req,res) =>{
        const body =req.body;

        create(body
            ,(err, results) => {
                if(err){
                    
                    return res.status(500).json({
                        success:0,
                        message: "Database connection error"
                    });
                }
                return res.status(201).json({
                    success:1,
                    data: results,
                });
        });
    },
    getemployee:(req,res)=>{
        getemployee((err,results)=>{
            if(err){
                return;
            }
            return res.json({
                success:1,
                data: results
            });
        });
    },
    getemployeebyemail:(req,res)=>{
        const id =req.params.id;
        console.log("hello");
        getemployeebyemail(id,(err,results) => {
            if(err){
                console.log(err,'some error occured');
                return;
            }
            if(!results) {
                return res.status(404).json({
                    success:0,
                    message: "Record is not found"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
                
            });
            console.log(data);
        });
    },
    Updateemployee:(req,res) => {
        const body= req.body;
        // console.log("upadeUserBody:",body);
        Updateemployee(body,(err , results) =>{
            if(err){
                console.log(err);
                return false;
            }
            console.log("result from service",results)
            if(!results){
                return res.status(404).json({
                    success:0,
                    message: "failed to update user"
                });
            }
            return res.status(200).json({
                success:1,
                message:"updated successfully"
            });
        });

    },
    deleteemployee:(req,res) =>{
        const data = req.body.param;
        deleteemployee(body,(err,results)=>{
            if(err){
                return;
            }
            if(!results) {
                return res.status(404).json({
                    success:0,
                    message: "record not found"
                });
            }
            return res.json({
                success:1,
                message:"user deleted successfully"
            });   
        });
    },
    login:(req, res) => {
        const body =req.body;
        getemployeebyemail(body.employeeEmail,(err,results) => {
            if (err) {
                console.log(err);
            }console.log(results);
            if(!results) {
                return res.json({
                    success:0,
                    message:"invalidemail or passcode"
                });
            }
            const result = compareSync(body.employeePassword,results.employeePassword);
            // console.log(body.passcode);
            // console.log(results.passcode)
            // console.log(result);
            if(result){
                results.passcode = undefined;
                const jsontoken = sign({ result:results}, "qwe1234" );
                return res.status(200).json({
                    success:1,
                    message:"login successfully done",
                    token: jsontoken
                });
            } else{
            return res.status(401).json({
                success:0,
                data: "invalid email or passcode}}}"

            }); 
        }

        });
    },
    

    
}    