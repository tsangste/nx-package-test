const { join } = require('node:path')

const name = 'nestjs-auth'
const srcRoot = `libs/${name}`

module.exports = {
  pkgRoot: join('..', '..', 'dist',`${srcRoot}`),
  branches: [{ name: 'master' }, { name: 'develop', channel: 'dev', prerelease: 'dev' }],
  tagFormat: name + '-${version}',
  commitPaths: [`${srcRoot}/*`],
  plugins: [
    '@semantic-release/commit-analyzer',
    ["semantic-release-jira-notes", {
      "jiraHost": "test.atlassian.net",
      "ticketPrefixes": ["JIRA"]
    }],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: `release(version): Release ${name} ` + '${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        addReleases: 'bottom',
        successCommentCondition: "<% return issue.user.type !== 'Bot' && issue.body.includes('nestjs-auth'); %>",
        failCommentCondition: '<% return false; %>',
      },
    ],
  ],
}
