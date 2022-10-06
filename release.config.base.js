module.exports = {
  branches: [
    { name: 'master' },
    { name: 'release/*', channel: 'beta', prerelease: 'beta' },
    { name: 'develop', channel: 'alpha', prerelease: 'alpha' },
  ],
  extends: 'semantic-release-npm-github-publish',
}
