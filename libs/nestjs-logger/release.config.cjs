const { join } = require('node:path')

const name = 'nestjs-logger'
const srcRoot = `libs/${name}`

module.exports = {
  pkgRoot: join('..', '..', 'dist',`${srcRoot}`),
  branches: [{ name: 'master' }, { name: 'develop', channel: 'dev', prerelease: 'dev' }],
  tagFormat: name + '-${version}',
  commitPaths: [`${srcRoot}/*`],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
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
        successComment: false,
        failTitle: false,
      },
    ],
  ],
}