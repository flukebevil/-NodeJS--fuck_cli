#!/usr/bin/env node
const chalk = require("chalk");
const { spawn } = require("child_process");
const logUpdate = require("log-update");

const log = console.log;
const helperSeletion = process.argv;

const shell = (command, subCommand) => {
  return new Promise(resolve => {
    const gitPush = spawn(command, subCommand);
    gitPush.stdout.on("data", data => {
      log(chalk.green(data));
    });

    gitPush.stderr.on("data", data => {
      log(chalk.green(data));
    });

    gitPush.on("close", _ => {
      resolve();
    });
  });
};

if (helperSeletion[2] !== undefined) {
  shell("git", ["add", "."]).then(_ => {
    logUpdate(`\n ${chalk.green("✔")} Git added! `);
    shell("git", ["commit", "-m", helperSeletion[2]]).then(_ => {
      logUpdate(`\n ${chalk.green("✔")} Git commited! `);
      shell("git", ["push"]).then(_ => {
        logUpdate(`\n ${chalk.green("✔")} finished! \n`);
      });
    });
  });
} else {
  log(`
    ${chalk.green("Usage")} : fuck <"message">
    `);
}
