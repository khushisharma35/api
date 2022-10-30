const pool = require("../../config/connection");
const { hashSync, hash } = require("bcrypt");


module.exports = {
    create: (data,callback) => {
        console.log(data);
        data.employeePassword=hashSync(data.employeePassword,10)
        pool.query(
            "insert into employee(employeeName,employeeDesignation,employeeEmail,employeePassword) values(?,?,?,?)",
            [
                data.employeeName,
                data.employeeDesignation,
                data.employeeEmail,
                data.employeePassword
            ],
            (error,results,fields) =>{
                if(error){
                    console.log(error);
                    return callback(error,null);
                }
                return callback(null,results);
            }
        );
    },
    getemployee: (callback) =>{
        pool.query(
            "select * from employee",
            (error,results,fields) =>{
                if(error){
                    return callback(error,null);
                }
                return callback(null,results);
            }
        );
    },
    getemployeebyemail:  (data,callBack) => {
        pool.query(
            "select * from employee where  employeeEmail =?",
            [data],
            (error,results,fields) => {
                if(error) {
                    console.log(error);
                    return callBack(error,null);
                }
                return callBack(null,results[0]);
            }
        );
    },
    Updateemployee: (data,callBack) => {
        console.log({data});
        // data.passcode = hashSync(data.passcode, 10)
        pool.query(
            "update employee set employeeName=?,employeeDesignation=?,employeeEmail=? where employeeId =?",
            [   data.employeeName,
                data.employeeDesignation,
                data.employeeEmail,
                // data.employeePassword,
                data.employeeid
            ],
            (error,results,fields) => {
                if(error) {
                    return callBack(error,null);
                }
                return callBack(null,results);
            },
        );
    },
    deleteemployee: (id,callBack)=> {
        pool.query(
            "delete from employee where employeeId=?",
            [id],
            (error,results,fields) => {
                if(error) {
                   return  callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    }
    
}
