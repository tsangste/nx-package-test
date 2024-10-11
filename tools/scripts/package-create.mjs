import { execSync } from 'child_process';

const [, , name] = process.argv;

if (!name) {
  throw new Error('missing name argument')
}

execSync(`nx generate create-nestjs-package ${name}`, {stdio: 'inherit'});
