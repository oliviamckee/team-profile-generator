const Manager = require("../lib/Manager.js");

test('gets manager office number', () => {
    const manager = new Manager('Olivia', '1', 'olivia.mckee97@gmail.com', '15');

    expect(manager.officeNumber).toBe('15');
});

test('gets manager role/overrides employee role', () => {
    const manager = new Manager('Olivia', '1', 'olivia.mckee97@gmail.com', '15');

    expect(manager.getRole()).toEqual('Manager');
});