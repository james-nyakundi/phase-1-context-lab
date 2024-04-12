/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */// Define a function to create an employee record
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Define a function to create employee records from an array of arrays
function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
}

// Define a function to add a timeIn event to an employee's record
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// Define a function to add a timeOut event to an employee's record
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// Define a function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Define a function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

// Define a function to calculate all wages for an employee
function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    return dates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0);
}

// Mock data for testing
const employeesData = [
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Assistant", 20]
];

// Create employee records
const employees = createEmployeeRecords(employeesData);

// Add timeIn and timeOut events for testing
createTimeInEvent(employees[0], "2024-04-12 09:00");
createTimeOutEvent(employees[0], "2024-04-12 17:00");

// Test the functions
console.log(hoursWorkedOnDate(employees[0], "2024-04-12")); // Should output 8
console.log(wagesEarnedOnDate(employees[0], "2024-04-12")); // Should output 200
console.log(allWagesFor(employees[0])); // Should output 200

// Calculate payroll for all employees
const totalPayroll = employees.reduce((total, employee) => total + allWagesFor(employee), 0);
console.log("Total Payroll:", totalPayroll);


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

