const fs = require('fs');
const inquirer = require("inquirer");
const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");

const managerQuestions = [
    {
        type: "text",
        name: "managerName",
        message: "What is your manager's name?"
    },
    {
        type: "number",
        name: "managerId",
        message: "What is your managers employee id?"
    },
    {
        type: "text",
        name: "managerEmail",
        message: "What is your manager's email address?"
    },
    {
        type: "text",
        name: "managerOffice",
        message: "What is your manager's office number?"
    }
];

const engineerQuestions = [
    {
        type: "text",
        name: "engineerName",
        message: "What is your engineer's name?"
    },
    {
        type: "number",
        name: "engineerId",
        message: "What is your engineer's employee id?"
    },
    {
        type: "text",
        name: "engineerEmail",
        message: "What is your engineer's email address?"
    },
    {
        type: "text",
        name: "engineerGithub",
        message: "What is your engineer's Github username?"
    }
];

const internQuestions = [
    {
        type: "text",
        name: "internName",
        message: "What is your intern's name?"
    },
    {
        type: "number",
        name: "internId",
        message: "What is your intern's employee id?"
    },
    {
        type: "text",
        name: "internEmail",
        message: "What is your intern's email address?"
    },
    {
        type: "text",
        name: "internSchool",
        message: "What school does your intern attend?"
    }
];

const menuQuestion = [
    {
        type: "checkbox",
        name: "menu",
        message: "Would you like to add an engineer or intern?",
        choices: ["Engineer", "Intern", "Done"]
    }
];

const promptManager = () => {
    return inquirer
    .prompt(managerQuestions)
    .then((answers) => {
        new Manager(answers);
        return promptMenu();
    })
    .catch(err => {
        console.log(err);
    });
};

const promptMenu = () => {
    return inquirer
    .prompt(menuQuestion)
    .then((answers) => {
        if (answers.menu == "Engineer") {
            return promptEngineer();
        };
        if (answers.menu == "Intern") {
            return promptIntern();
        };
        if (answers.menu == "Done") {
            writetoFile();
            copyStyleSheet();
            return;
        };
    })
    .catch(err => {
        console.log(err);
    });
};

const promptEngineer = () => {
    return inquirer
    .prompt(engineerQuestions)
    .then((answers) => {
        new Engineer(answers);
        return promptMenu();
    })
    .catch(err => {
        console.log(err);
    });
};

const promptIntern = () => {
    return inquirer
    .prompt(internQuestions)
    .then((answers) => {
        new Intern(answers);
        return promptMenu();
    })
    .catch(err => {
        console.log(err);
    });
};

function writetoFile(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/team-profile.html', data, err => {
            if (err) {
                reject(err);
                return; 
            }
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

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

promptManager();