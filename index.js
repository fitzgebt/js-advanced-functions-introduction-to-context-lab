// Your code here
let createEmployeeRecord = function(col) {
    return {
        firstName: col[0],
        familyName: col[1],
        title: col[2],
        payPerHour: col[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

let createEmployeeRecords = function(empData) {
    return empData.map(function(col) {
        return createEmployeeRecord(col)
    })
};

let createTimeInEvent = function(emp, dateTime) {
    let [date, time] = dateTime.split(" ")
    emp.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(time, 10)
    })
    return emp
};

let createTimeOutEvent = function(emp, dateTime) {
    let [date, time] = dateTime.split(" ")
    emp.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(time, 10)
    })
    return emp
};

let hoursWorkedOnDate = function(emp, date) {
    let timeIn = emp.timeInEvents.find(function(employee) {
        return employee.date === date
    })
    let timeOut = emp.timeOutEvents.find(function(employee) {
        return employee.date === date
    })
    return ((timeOut.hour - timeIn.hour) / 100)
};

let wagesEarnedOnDate = function(emp, date) {
    let hrs = hoursWorkedOnDate(emp, date)
    return hrs * emp.payPerHour
};

let allWagesFor = function(emp) {
    let datesWorked = emp.timeInEvents.map(function(e) {
        return e.date
    })
    let mulah = datesWorked.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(emp, date)
    }, 0)
    return mulah
};

let calculatePayroll = function (empArr) {
    return empArr.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0)
};

let findEmployeeByFirstName = function(arr, name) {
    return arr.find(function(record){
        return record.firstName === name
    })
};