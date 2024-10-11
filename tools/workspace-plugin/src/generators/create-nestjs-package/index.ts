import { join } from 'node:path'

import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  readProjectConfiguration,
  Tree,
  updateJson,
} from '@nx/devkit'
import { libraryGenerator } from '@nx/nest'
import { parse, stringify } from 'yaml'

interface SemanticReleaseOptions {
  name: string
}

export default async function (tree: Tree, schema: SemanticReleaseOptions) {
  await libraryGenerator(tree, { name: schema.name, directory: 'libs', importPath: `@tsangste/${schema.name}`, publishable: true })

  const libraryRoot = readProjectConfiguration(tree, schema.name).root

  generateFiles(tree, joinPathFragments(__dirname, './files'), libraryRoot, schema)

  updateJson(tree, join(libraryRoot, 'package.json'), pkgJson => {
    pkgJson.version = '0.0.0-semantic-release'
    return pkgJson
  })

  updateJson(tree, join(libraryRoot, 'project.json'), prJson => {
    prJson.targets.release = {
      executor: 'nx:run-commands',
      outputs: [],
      options: {
        command: `npx semantic-release-plus --extends ./libs/${schema.name}/release.config.js`,
        parallel: false,
      },
      dependsOn: [
        {
          projects: 'self',
          target: 'build',
        },
      ],
    }

    return prJson
  })

  updateYaml(tree, join('.github', 'workflows', 'release.yml'), yml => {
    yml.on.workflow_dispatch.inputs.package.options.push(schema.name)
    return yml
  })

  await formatFiles(tree)

  return () => {
    installPackagesTask(tree)
  }
}

function updateYaml(tree: Tree, path: string, updater: (yml) => any) {
  const updatedYaml = updater(readYaml(tree, path))
  writeYaml(tree, path, updatedYaml)
}

function readYaml(tree: Tree, path: string) {
  if (!tree.exists(path)) {
    throw new Error(`Cannot find ${path}`)
  }
  try {
    return parse(tree.read(path, 'utf-8'))
  } catch (e) {
    throw new Error(`Cannot parse ${path}: ${e.message}`)
  }
}

function writeYaml(tree: Tree, path: string, value: any) {
  tree.write(path, stringify(value))
}
