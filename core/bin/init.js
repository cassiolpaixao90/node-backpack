#!/usr/bin/env node

const conductor = require('../commands/conductor')
const prodCommand = require('../commands/command.prod')
const devCommand = require('../commands/command.dev')

const argvs = !process.argv[2] ? 'dev' : process.argv[2]

switch (argvs) {
  case 'prod':
    conductor.run(new prodCommand(argvs))
    break

  case 'dev':
    conductor.run(new devCommand(argvs))
    break

  default:
    console.log(`${argvs} command not found!`)
}
