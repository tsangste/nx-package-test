import {
  Tree,
  installPackagesTask,
  updateJson,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration
} from '@nrwl/devkit'

interface SemanticReleaseArgs {
  name: string
}

export default async function (tree: Tree, schema: SemanticReleaseArgs) {
  const libraryRoot = readProjectConfiguration(tree, schema.name).root

  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    libraryRoot,
    schema
  )

  updateJson(tree, 'package.json', pkgJson => {
    pkgJson.version = '0.0.0-semantic-release'
    return pkgJson
  })

  updateJson(tree, 'project.json', prJson => {
    prJson.targets.release = {
      "executor": "nx:run-commands",
      "outputs": [],
      "options": {
        "command": `npx semantic-release-plus --extends ./libs/${schema.name}/release.config.js`,
        "parallel": false
      },
      "dependsOn": [
        {
          "projects": "self",
          "target": "build"
        }
      ]
    }

    return prJson
  })

  return () => {
    installPackagesTask(tree)
  }
}
