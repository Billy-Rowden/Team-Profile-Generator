// TODO: Write Code to gather information about the development team members, and render the HTML file.
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const teamMembers = [];

// array of objects for manager questions
const managerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: "Enter team manager's name:",
  },
  {
    type: 'input',
    name: 'id',
    message: "Enter team manager's ID:",
  },
  {
    type: 'input',
    name: 'email',
    message: "Enter team manager's email:",
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: "Enter team manager's office number:",
  },
];

// array of objects for Engineer questions
const engineerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: "Enter engineer's name:",
  },
  {
    type: 'input',
    name: 'id',
    message: "Enter engineer's ID:",
  },
  {
    type: 'input',
    name: 'email',
    message: "Enter engineer's email:",
  },
  {
    type: 'input',
    name: 'github',
    message: "Enter engineer's GitHub username:",
  },
];

// array of objects for Intern questions
const internQuestions = [
  {
    type: 'input',
    name: 'name',
    message: "Enter intern's name:",
  },
  {
    type: 'input',
    name: 'id',
    message: "Enter intern's ID:",
  },
  {
    type: 'input',
    name: 'email',
    message: "Enter intern's email:",
  },
  {
    type: 'input',
    name: 'school',
    message: "Enter intern's school:",
  },
];

function promptManager() {
  inquirer.prompt(managerQuestions).then(answers => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
    promptTeamMember();
  });
}

function promptEngineer() {
  inquirer.prompt(engineerQuestions).then(answers => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);
    promptTeamMember();
  });
}

function promptIntern() {
  inquirer.prompt(internQuestions).then(answers => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);
    promptTeamMember();
  });
}

function promptTeamMember() {
  inquirer.prompt({
    type: 'list',
    name: 'role',
    message: 'Would you like to add another team member, or finish building the team?',
    choices: ['Add an Engineer', 'Add an Intern', 'Finish building the team'],
  }).then(answer => {
    switch(answer.role) {
      case 'Add an Engineer':
        promptEngineer();
        break;
      case 'Add an Intern':
        promptIntern();
        break;
      case 'Finish building the team':
        renderHTML(outputPath);
        break;
    }
  });
}

function renderHTML(outputPath) {
  const html = render(teamMembers);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true});
  fs.writeFile(outputPath, html, err => {
    if (err) {
      console.error('Error writing HTML file:', err);
    } else {
      console.log('HTML file generated successfully.');
    }
  });
}

promptManager();