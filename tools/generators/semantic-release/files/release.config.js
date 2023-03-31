const name = '<%=name%>'
const srcRoot = `libs/${name}`

module.exports = {
  extends: 'release.config.base.js',
  pkgRoot: `dist/${srcRoot}`,
  branches: [
    { name: 'master' },
    { name: 'develop', channel: 'dev', prerelease: 'dev' },
  ],
  tagFormat: name + '-${version}',
  commitPaths: [`${srcRoot}/*`],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `${srcRoot}/CHANGELOG.md`,
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: [`${srcRoot}/package.json`, `${srcRoot}/CHANGELOG.md`],
        message: `release(version): Release ${name} ` + '${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
}
