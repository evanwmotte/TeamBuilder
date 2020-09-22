const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

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



    async function init() {
        try {
          const data = await managerQuestions();
       
            async function switchBoard(data) {
                switch (data.addEmployee) {
                    case "Yes: Add an Engineer":
                        const engData = await engineerQuestions();
                        switchBoard(engData)
                    break;
                    case "Yes: Add an Intern":
                        const intData = await internQuestions();
                        switchBoard(intData)
                    break;
                    default: console.log("You're done adding employees")
                    break;
            }
        }

        switchBoard(data)

         
        
        } catch(err) {
          console.log(err);
        }
      }
    init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
