import { execSync } from 'child_process';

const [, , name] = process.argv;

if (!name) {
  throw new Error('missing name argument')
}

execSync(`nx workspace-generator semantic-release ${name}`, {stdio: 'inherit'});
