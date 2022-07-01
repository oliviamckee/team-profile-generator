const Manager = require("../lib/Manager");

const generateHtml = (data) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./style.css">
        <title>Team Profile</title>
    </head>
    <body>
        <header>My Team</header>
        <section>
            ${managerCard()}
            ${engineerCard()}
            ${internCard()}
        </section>
    </body>
    </html>
    `;
};

const managerCard = manager => {
    return `
    <div class="card">
                <h1 class="name">${manager.name}</h1>
                <h2 class="role">Manager</h2>
                <div class="details">
                    <p>ID: ${manager.id}</p>
                    <p>Email: ${manager.email}</p>
                    <p>Office number: ${manager.officeNumber}</p>
                </div>
            </div>
    `
}

const engineerCard = engineer => {
    return `
    <div class="card">
                <h1 class="name">${engineer.name}</h1>
                <h2 class="role">Manager</h2>
                <div class="details">
                    <p>ID: ${engineer.id}</p>
                    <p>Email: ${engineer.email}</p>
                    <p>Github: ${engineer.github}</p>
                </div>
            </div>
    `
}

const internCard = intern => {
    return `
    <div class="card">
                <h1 class="name">${intern.name}</h1>
                <h2 class="role">Manager</h2>
                <div class="details">
                    <p>ID: ${intern.id}</p>
                    <p>Email: ${intern.email}</p>
                    <p>School: ${intern.school}</p>
                </div>
            </div>
    `
}

const copyStyleSheet = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./style.css', '../dist/style.css', err => {
            if (err) {
                return;
            }

            resolve({
                ok:true,
                message: 'Stylesheet created!'
            });
        });
    });
};

module.exports = generateHtml;