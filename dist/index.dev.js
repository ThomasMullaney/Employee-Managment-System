"use strict";

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
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  promptAction();
});

function promptAction() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What action would you like to perfrom?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add employee", "update role of employee", "remove an employee", "Quit/Exit"]
  }).then(function (chosen) {
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
    } else if (chosen.action === "update role of employee") {
      updateEmployee();
    } else if (chosen.action === "remove an employee") {
      removeEmployee();
    } else if (chosen.action === "Quit/Exit") {
      connection.end();
    }
  });
} // VIEW FUNCTIONS FOR THE THREE TABLES


function viewAllDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    console.log("All Departments:");
    res.forEach(function (department) {
      console.log("ID: ".concat(department.id, " | Name: ").concat(department.name));
    });
    promptAction();
  });
}

function viewAllRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    console.log("All Roles:");
    res.forEach(function (role) {
      console.log("ID: ".concat(role.id, " |Title: ").concat(role.title, " |Salary: ").concat(role.salary, " |Department ID: ").concat(role.department_id));
    });
    promptAction();
  });
}

function viewAllEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    console.log("All Employees:");
    res.forEach(function (employee) {
      console.log("First Name: ".concat(employee.first_name, " | Last Name: ").concat(employee.last_name, " | Role Id: ").concat(employee.role_id, " | Manager Id: ").concat(employee.manager_id));
    });
    promptAction();
  });
} // ADD FUNCTIONS FOR THE THREE TALBES


function addDepartment() {
  inquirer.prompt({
    name: "department",
    type: "input",
    message: "What is the new department's name?"
  }).then(function (answer) {
    var query = "INSERT INTO department (name) VALUES (?)";
    connection.query(query, answer.department, function (err, res) {
      console.log("Inserting new Department: ".concat(answer.department));
    });
    viewAllDepartments();
  });
}

function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) {
      throw err;
    }

    inquirer.prompt([{
      name: "roleTitle",
      type: "input",
      message: "What is the title of the new role?"
    }, {
      name: "roleSalary",
      type: "input",
      message: "What is the salary for the new role?"
    }, {
      name: "departmentChoice",
      type: "list",
      message: "What department is this role part of?",
      // create function to update choices with any added departments
      choices: function choices() {
        var choicesArray = [];
        res.forEach(function (res) {
          choicesArray.push(res.name);
        });
        return choicesArray;
      }
    }]).then(function (answer) {
      var department = answer.name;
      connection.query("SELECT * FROM department WHERE ?", {
        name: answer.departmentChoice
      }, function (err, res) {
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

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) {
      throw err;
    }

    inquirer.prompt([{
      name: "firstName",
      type: "input",
      message: "What is employee's first name?"
    }, {
      name: "lastName",
      type: "input",
      message: "What is the last name of the new employee?"
    }, {
      name: "roleChoice",
      type: "list",
      message: "What is the role of the new employee?",
      // create function to update choices with any added departments
      choices: function choices() {
        var choicesArray = [];
        res.forEach(function (res) {
          choicesArray.push(res.title);
        });
        return choicesArray;
      }
    }]).then(function (answer) {
      connection.query("SELECT * FROM role WHERE (?)", {
        title: answer.roleChoice
      }, function (err, res) {
        if (err) {
          throw err;
        }

        console.log(res[0].id);
        connection.query("INSERT INTO employee SET ?", {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: res[0].id
        });
        console.log("\n Employee has been added to database...\n");
        viewAllEmployees();
      });
    });
  });
} // UPDATE ROLE


function updateEmployee() {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) {
      throw err;
    }

    inquirer.prompt([{
      name: "employeeName",
      type: "list",
      message: "What employee's role are you changing?",
      choices: function choices() {
        var choicesArray = [];
        result.forEach(function (result) {
          choicesArray.push(result.last_name);
        });
        return choicesArray;
      }
    }]).then(function (answer) {
      console.log(answer);
      var name = answer.employeeName;
      connection.query("SELECT * FROM role", function (err, res) {
        inquirer.prompt([{
          name: "role",
          type: "list",
          message: "what is the employee's new role?",
          choices: function choices() {
            var choicesArray = [];
            res.forEach(function (res) {
              choicesArray.push(res.title);
            });
            return choicesArray;
          }
        }]).then(function (rolesAnswer) {
          var role = rolesAnswer.role;
          console.log(rolesAnswer.role);
          connection.query("SELECT * FROM role WHERE title = ?", [role], function (err, res) {
            if (err) {
              throw err;
            }

            var roleId = res[0].id;
            var query = "UPDATE employee SET role_id ? WHERE last_name ?";
            var values = [roleId, name];
            console.log(values);
            connection.query(query, values, function (err, res, fields) {
              console.log("you have updated ".concat(name, "'s role to ").concat(role, "."));
            });
            viewAllEmployees();
          });
        });
      });
    });
  });
} // REMOVE FUNCTIONS FOR THE THREE TABLES


function removeEmployee() {
  inquirer.prompt([{
    name: "firstName",
    type: "input",
    message: "what is the first name of the employee you would like to remove?"
  }, {
    name: "lastName",
    type: "input",
    message: "what is the last name of the employee you would like to remove?"
  }]).then(function (answer) {
    connnection.query("DELETE FROM employee WHERE first_name = ? and last_name = ?", [answer.firstName, answer.lastName], function (err) {
      if (err) {
        throw err;
      }

      console.log("".concat(answer.firstName).concat(answer.lastName, " has been removed from the database."));
      viewAllEmployees();
    });
  });
} // function removeRole(){
//   inquirer
//   .prompt ([
//     {
//       name: "firstName",
//       type: "input",
//       message:"what is the first name of the employee you would like to remove?"
//     },
//     {
//       name: "lastName",
//       type: "input",
//       message:"what is the last name of the employee you would like to remove?"
//     }
//   ]).then(function (answer){
//     connnection.query("DELETE FROM employee WHERE first_name = ? and last_name = ?",
//     [answer.firstName, answer.lastName],function(err){
//       if (err){throw err};
//       console.log(`${answer.firstName}${answer.lastName} has been removed from the database.`)
//       viewAllEmployees();
//     })
//   })
// }