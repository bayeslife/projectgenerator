#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const _ = require('lodash')
const debug = require('debug')('app')

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'projectchoice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'projectname',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const CURR_DIR = process.cwd();

inquirer.prompt(QUESTIONS)
  .then(answers => {
    const projectChoice = answers['projectchoice'];
    const projectName = answers['projectname'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;

    debug(answers)

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    function createDirectoryContents (templatePath, newProjectPath) {

      debug(`create directory contents ${templatePath} ${newProjectPath}`)

      const filesToCreate = fs.readdirSync(templatePath);

      filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isDirectory()) {
          let dir = `${newProjectPath}/${file}`
          debug(`create directory ${dir}`)
          fs.mkdirSync(dir);
          createDirectoryContents(origFilePath,dir)
        }
        if (stats.isFile()) {
          debug(`Template from: ${origFilePath}`)
          const template = fs.readFileSync(origFilePath, 'utf8');

          _.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
          // _.templateSettings = {
          //   evaluate:    /\{\{(.+?)\}\}/g,
          //   interpolate: /\{\{=(.+?)\}\}/g,
          //   escape:      /\{\{-(.+?)\}\}/g
          // };
          var compiled = _.template(template)

          var generated = compiled(answers) //This incorporate the answers into the template

          const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
          fs.writeFileSync(writePath, generated, 'utf8');
        }
      });
    }


    createDirectoryContents(templatePath, projectName);
  });
