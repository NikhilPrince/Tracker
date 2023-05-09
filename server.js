//Dependencies found here
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",

  password: "pokemon",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

//What the user will first see once logged into node
function prompt() {
  inquirer
    .prompt({
      type: "list",
      message: [
        "Remove role",
        "Add role",
        "Add employee",
        "Remove employee",
        "show departments",
        "show roles",
        "show employees",
        "Update employee role",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"
    })
    .then(function(result) {
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "Remove role":
          removeRole();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "show departments":
          showDepartment();
          break;
        case "show roles":
          showRoles();
          break;
        case "show employees":
          showEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        
          case "Quit":
            connection.quit();
            break;
      }
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Role name?",
        name: "roleName"
      },
      {
        type: "input",
        message: "Salary?",
        name: "salary"
      },
      {
        type: "input",
        message: "ID?",
        name: "deptID"
      }
    ])
    .then(function(see) {


      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [see.roleName, see.salaryTotal, see.deptID], function(err, res) {
        if (err) throw err;
        console.table(res);
        prompt();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "employee's first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "employee's last name?",
        name: "lastName"
      },
      {
        type: "input",
        message: "employee's id?",
        name: "roleID"
      },
    ])

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "eeUpdate"
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ])
    .then(function(see) {
      // const query = `INSERT INTO department (name) VALUES ("${see.deptName}")`
      //const query = `'UPDATE employee SET role_id=${see.updateRole} WHERE first_name= ${see.eeUpdate}`;
      //console.log(query);

      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[see.updateRole, see.eeUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        prompt();
      });
    });
}

function showDepartment() {
  // select from the db
  const query = "SELECT department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    prompt();
  });
  // show the result to the user (console.table)
}

function showRoles() {
  // select from the db
  const query = "SELECT role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    prompt();
  });
  // show the result to the user (console.table)
}

function showEmployees() {
  // select from the db
  const query = "SELECT employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    prompt();
  });
  // show the result to the user (console.table)
}

function quit() {
  connection.end();
  process.exit();
}