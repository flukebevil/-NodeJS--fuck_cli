#!/usr/bin/env node
const chalk = require("chalk");
const { spawn } = require("child_process");
const logUpdate = require("log-update");
const shelljs = require("shelljs");

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
  if (shelljs.exec("git remote").code !== 0) {
    log(`\n You need to use follow this first \n`);
    log(`👉🏻 ${chalk.green("git init")}`);
    log(`👉🏻 ${chalk.green("git remote add origin <remote repository URL>")}`);
    log(`👉🏻 ${chalk.green('git commit -m <"commit message">')}`);
    log(`👉🏻 ${chalk.green("Final git push --set-upstream origin master")}`);
    log(
      chalk.blue.bgRed.bold(
        `\n\n🗣 ${chalk.white(" For next time you can use just ")} ${chalk.green(
          'fuck <"message"> \n'
        )}`
      )
    );
    process.exit(1);
  } else {
    shell("git", ["add", "."]).then(_ => {
      logUpdate(`\n ${chalk.green("✔")} Git added! `);
      const commitMessage = helperSeletion
        .filter((res, index) => index > 0).toString()
      shell("git", ["commit", "-m", commitMessage]).then(_ => {
        logUpdate(`\n ${chalk.green("✔")} Git commited! `);
        shell("git", ["push"]).then(_ => {
          logUpdate(`\n ${chalk.green("✔")} finished! \n`);
        });
      });
    });
  }
} else {
  log(`
    ${chalk.green("Usage")} : fuck <"message">
    `);
}
