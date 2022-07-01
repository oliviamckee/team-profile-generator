const Employee = require("../lib/Employee.js");

test('creates employee object', () => {
    const employee = new Employee('Olivia', '1', 'olivia.mckee97@gmail.com');

    expect(employee.name).toBe('Olivia');
    expect(employee.id).toBe('1');
    expect(employee.email).toBe('olivia.mckee97@gmail.com');
});

test('gets employee name', () => {
    const employee = new Employee('Olivia', '1', 'olivia.mckee97@gmail.com');

    expect(employee.getName()).toEqual('Olivia');
});

test('gets employee id', () => {
    const employee = new Employee('Olivia', '1', 'olivia.mckee97@gmail.com');

    expect(employee.getId()).toEqual('1');
});

test('gets employee email', () => {
    const employee = new Employee('Olivia', '1', 'olivia.mckee97@gmail.com');

    expect(employee.getEmail()).toEqual('olivia.mckee97@gmail.com');
});

test('gets role', () => {
    const employee = new Employee('Olivia', '1', 'olivia.mckee97@gmail.com');

    expect(employee.getRole()).toEqual('Employee');
});