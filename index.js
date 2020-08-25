// switch case of inquirer prompts
var mysql = require("mysql");
var inquirer = require("inquirer");
var express = require("express");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Mrniceguy911",
  database: "employees"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
    promptAction();
});

function promptAction(){
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What action would you like to perfrom?",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add employee",
            "pdate role of employee",
            "Quit/Exit"
        ]
    }).then(function(chosen) {
        if (chosen === "view all departments"){
            viewAllDepartments();
        
    } else if (chosen === "view all roles") {
        viewAllRoles();
    } else if (chosen === "view all employees"){
        viewAllEmployees();
    }else if (chosen === "add a department"){
        addDepartment();
    }else if (chosen === "add a role"){
        addRole();
    }else if (chosen === "add employee"){
        addEmployee();
    }else if (chosen === "Update role of employee"){
        updateEmployee();
    }else if (chosen === "Quit/Exit"){
        connection.end();
    }
 
});
};

function viewAllDepartments(){
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res){
        console.log("All Departments:")
        res.forEach(department => {
            console.log(`ID: {department.id} | Name: {department.name}`)
        });
        promptAction();
    });
};

// function viewAllRoles(){
//     var query = "SELECT * FROM roles";
//     connection.query(query, function(err, res){
//         console.log("All Roles:");
//         res.forEach(role => {
//             console.log(`ID: {role.id} |Title: {role.title} |Salary: {role.salary}`)
//         });
//         promptAction();
//     });
// };

// function viewAllEmployees(){
//     var query = "SELECT * FROM employee";
//     connection.query(query, function(err, res){
//         console.log("All Employees:")
//         res.forEach(employee => {
//             console.log(`ID: {employee.id} | Name: {employee.name}`)
//         });
//         promptAction();
//     });
// };
