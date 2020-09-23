const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function managerQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "To get started, let's add a manager. What is your manager's name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's ID?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's e-mail?"
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?"
        },
        {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add an employee?",
            choices: ["Yes: Add an Engineer", "Yes: Add an Intern", "I don't want to add any more employees"],
        }])
}

function engineerQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the engineer's Id?",
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's e-mail?",
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's Github username?",
        },
        {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add another employee?",
            choices: ["Yes: Add an Engineer", "Yes: Add an Intern", "I don't want to add any more employees"]
        }
    ])
}

function internQuestions() {
    return inquirer.prompt(
        [
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's Id?",

            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's e-mail?",

            },
            {
                type: "input",
                name: "internSchool",
                message: "What school does the intern go to??",

            },
            {
                type: "list",
                name: "addEmployee",
                message: "Would you like to add another employee?",
                choices: ["Yes: Add an Engineer", "Yes: Add an Intern", "I don't want to add any more employees"]
            }
        ])
}

const employees = []

async function init() {
    try {
        const data = await managerQuestions();
        employees.push(new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber))
        async function switchBoard(data) {
            switch (data.addEmployee) {
                case "Yes: Add an Engineer":
                    const engData = await engineerQuestions();
                    employees.push(new Engineer(engData.engineerName, engData.engineerId, engData.engineerEmail, engData.engineerGithub))
                    await switchBoard(engData)
                    break;
                case "Yes: Add an Intern":
                    const intData = await internQuestions();
                    employees.push(new Intern(intData.internName, intData.internId, intData.internEmail, intData.internSchool))
                    await switchBoard(intData)
                    break;
                default: console.log("You're done adding employees")
                    break;
            }
        }
        await switchBoard(data)

    } catch (err) {
        console.log(err);
    }
}

async function runPage() {
    try {
        await init();
        const rendered = await render(employees)
        await writeFileAsync(outputPath, rendered)
    }
    catch (err) {
        console.log(err)
    }
}

runPage();