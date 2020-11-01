'user strict';
var sql = require('./Database.js');

var Employee = function (employee) {
  this.name = employee.name;
  this.dept = employee.dept;
  this.post = employee.post;
  this.salary = employee.salary;
  this.status = employee.status;
  this.createdat = new Date().toISOString().substring(0, 19).replace('T', ' ');
};

// http://localhost:8081/full/accounts                                            //  GET ONE  #1                       
Employee.getAll = function (result) {
  sql.query("Select * from BANK1", function (err, res) {
    if (err) { console.log("error: ", err); result(null, err); }
    else { console.log('employees : ', res); result(null, res); }
  });
};

// http://localhost:8081/full/accounts                                           // GET ONE  #2
Employee.getByTaskId = function (employeeX, result) {
  sql.query("Select * from BANK1 where id = ? ", employeeX, function (err, res) {
    if (err) { console.log("error: ", err); result(err, null); }
    else { console.log('chosen employee : ', res); result(null, res); }
  });
};

// http://localhost:8081/full/accounts/:id                                     // DELETE ONE  #3
Employee.removeEmployee = function (id, result) {
  sql.query("DELETE FROM BANK1 WHERE id = ?", [id], function (err, res) {
    if (err) { console.log("error: ", err); result(null, err); }
    else {
      console.log(res, 'Employeed ID #', id, ' has been deleted: ');
      result(null, res);
    }
  });
};

// http://localhost:8081/full/accounts/:id                                     // UPDATE ONE   #4
Employee.updateByTaskId = function (id, employee, result) {
  sql.query("UPDATE BANK1 SET post=?,name=?,dept=?,salary=? WHERE id = ?",
    [id, employee.post, employee.name, employee.dept, employee.salary], function (err, res) {
      if (err) { console.log("error: ", err); result(null, err); }
      else {
        console.log('Employee ID # ', id, 'has been updated: res ', id);
        result(null, res);
      }
    });
};

// http://localhost:8081/full/accounts                                        // POST EMPLOYEE  #5
Employee.createEmployee = function (newEmployee, result) {
  sql.query("INSERT INTO BANK1 set ?", newEmployee, function (err, res) {
    if (err) { console.log("error: ", err); result(err, null); }
    else {
      console.log('Employee ID #', res.insertId, ' Has been created', res);
      result(null, res.insertId);
    }
  });
};

module.exports = Employee;