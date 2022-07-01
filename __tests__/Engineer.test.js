const Engineer = require("../lib/Engineer.js");

test('gets engineer github', () => {
    const engineer = new Engineer('Olivia', '1', 'olivia.mckee97@gmail.com', 'oliviamckee');

    expect(engineer.github).toBe('oliviamckee');
});

test('gets engineer github username', () => {
    const engineer = new Engineer('Olivia', '1', 'olivia.mckee97@gmail.com', 'oliviamckee');

    expect(engineer.getGithub()).toEqual('oliviamckee');
})

test('gets engineer role/overrides employee role', () => {
    const engineer = new Engineer('Olivia', '1', 'olivia.mckee97@gmail.com', 'oliviamckee');

    expect(engineer.getRole()).toEqual('Engineer');
});