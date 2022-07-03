// import required modules
const fs = require('fs');
const inquirer = require("inquirer");
const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");

//create empty arrays for each type of employee
const managerArr = [];
const engineerArr = [];
const internArr = [];

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

const init = () => {
    promptManager();
}

const promptManager = () => {
    return inquirer
    .prompt(managerQuestions)
    .then((answers) => {
        managerArr.push(new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice));
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
            console.log(managerArr);
            console.log(engineerArr);
            console.log(internArr);
            return;
        };
    })
    .then(generateHtml)
    .then(pageData => {
        return writetoFile(pageData);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyStyleSheet();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });
};

const promptEngineer = () => {
    return inquirer
    .prompt(engineerQuestions)
    .then((answers) => {
        engineerArr.push(new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub));
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
        internArr.push(new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool));
        return promptMenu();
    })
    .catch(err => {
        console.log(err);
    });
};

const generateHtml = () => {
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
            <div class="card">
                <h1 class="name">${managerArr[0].name}</h1>
                <h2 class="role">Manager</h2>
                <div class="details">
                    <p>ID: ${managerArr[0].id}</p>
                    <p>Email: <a href = "mailto: ${managerArr[0].email}">${managerArr[0].email}</a></p>
                    <p>Office number: ${managerArr[0].officeNumber}</p>
                </div>
            </div>

        ${engineerCard()}
        ${internCard()}

        </section>
    </body>
    </html>
    `;
};


const engineerCard = engineer => {
    let engineers = "";
    engineerArr.forEach((Engineer) => {
        let engineer = `
        <div class="card">
                    <h1 class="name">${Engineer.name}</h1>
                    <h2 class="role">Engineer</h2>
                    <div class="details">
                        <p>ID: ${Engineer.id}</p>
                        <p>Email: <a href = "mailto: ${Engineer.email}">${Engineer.email}</a></p>
                        <p>Github: <a href = "http://github.com/${Engineer.github}">${Engineer.github}</a></p>
                    </div>
                </div>
        `
    engineers += engineer;
    })
    return engineers;
};

const internCard = intern => {
    let interns = "";
    internArr.forEach((Intern) => {
        let intern = `
        <div class="card">
                    <h1 class="name">${Intern.name}</h1>
                    <h2 class="role">Intern</h2>
                    <div class="details">
                        <p>ID: ${Intern.id}</p>
                        <p>Email: <a href = "mailto: ${Intern.email}">${Intern.email}</a></p>
                        <p>School: ${Intern.school}</p>
                    </div>
                </div>
        `
    interns += intern;
    })
    return interns;
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

function copyStyleSheet() {
    return new Promise((resolve, reject) => {
        fs.copyFile('src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok:true,
                message: 'Stylesheet created!'
            });
        });
    });
};

init();