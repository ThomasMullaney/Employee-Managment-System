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
  database: "employees",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  promptAction();
});

function promptAction() {
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
        "update role of employee",
        "Quit/Exit",
      ],
    })
    .then(function (chosen) {
      if (chosen.action === "view all departments") {
        viewAllDepartments();
      } else if (chosen.action === "view all roles") {
        viewAllRoles();
      } else if (chosen.action === "view all employees") {
        viewAllEmployees();
      } else if (chosen.action === "add a department") {
        addDepartment();
      } else if (chosen.action === "add a role") {
        addRole();
      } else if (chosen.action === "add employee") {
        addEmployee();
      } else if (chosen.action === "Update role of employee") {
        updateEmployee();
      } else if (chosen.action === "Quit/Exit") {
        connection.end();
      }
    });
}

function viewAllDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    console.log("All Departments:");
    res.forEach((department) => {
      console.log(`ID: ${department.id} | Name: ${department.name}`);
    });
    promptAction();
  });
}

function viewAllRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    console.log("All Roles:");
    res.forEach((role) => {
      console.log(
        `ID: ${role.id} |Title: ${role.title} |Salary: ${role.salary} |Department ID: ${role.department_id}`
      );
    });
    promptAction();
  });
}

function viewAllEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    console.log("All Employees:");
    res.forEach((employee) => {
      console.log(
        `First Name: ${employee.first_name} | Last Name: ${employee.last_name} | Role Id: ${employee.role_id} | Manager Id: ${employee.manager_id}`
      );
    });
    promptAction();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the new department's name?",
    })
    .then(function (answer) {
      var query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, answer.department, function (err, res) {
        console.log(`Inserting new Department: ${answer.department}`);
      });
      viewAllDepartments();
    });
}

function addRole() {
    connection.query("SELECT * FROM department", function(err, res){
        if (err){throw err};

  inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the salary for the new role?",
      },
      {
        name: "departmentChoice",
        type: "list",
        message: "What department is this role part of?",
        // create function to update choices with any added departments
        choices: function () {
          var choicesArray = [];
          res.forEach((res) => {
            choicesArray.push(res.name);
          });
          return choicesArray;
        },
      },
    ])
    // create code to grab the corresponding ID
    .then(function (answer) {
      const department = answer.name;
      connection.query("SELECT * FROM department WHERE ?",{name: answer.departmentChoice}, function (err, res) {
        if (err) {
          throw err;
        }
        console.log(res[0].id);
        connection.query("INSERT INTO role SET ?", {
            title: answer.roleTitle,
            salary: parseInt(answer.roleSalary),
            department_id: parseInt(res[0].id)
        });
        console.log("\n Role has been added to database...\n");
        viewAllRoles();
      });
    });
});
}

// function addEmployee(){

// }
