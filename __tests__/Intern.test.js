const Intern = require("../lib/Intern.js");

test('gets intern github', () => {
    const intern = new Intern('Olivia', '1', 'olivia.mckee97@gmail.com', 'U of M');

    expect(intern.school).toBe('U of M');
});

test('gets intern github username', () => {
    const intern = new Intern('Olivia', '1', 'olivia.mckee97@gmail.com', 'U of M');

    expect(intern.getSchool()).toEqual('U of M');
})

test('gets intern role/overrides employee role', () => {
    const intern = new Intern('Olivia', '1', 'olivia.mckee97@gmail.com', 'U of M');

    expect(intern.getRole()).toEqual('Intern');
});