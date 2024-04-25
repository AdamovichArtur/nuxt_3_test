/* eslint-disable no-console */
/*
  Component Scaffolding Script
  This is a script that enables scaffolding a new JSS component using `jss scaffold <componentname>`.
  Edit this script if you wish to use your own conventions for component storage in your JSS app.
*/

const readline = require('readline')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const _ = require('lodash')

const useSubfolders = true

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Path to create components in
let componentRootPath = 'src/components'

// Check that a component name was provided by the user
let componentName = process.argv[2]

if (!componentName) {
  throw 'Component name was not passed. Usage: jss scaffold <ComponentName>'
}

rl.question('Is this a child component? [y/N] ', (answer) => {
  switch (answer.toLowerCase()) {
    // Child component
    case 'y': {
      rl.question('Write the name of the parent component: ', (parentComponentName) => {
        if (checkParentComponentExists(parentComponentName)) {
          // Ensure component follows the child component naming convention
          componentName = buildChildComponentName(componentName, parentComponentName)
          // Get parent component name and location
          parentComponentName = buildParentComponentName(parentComponentName)
          componentRootPath += '/' + parentComponentName

          // Scaffold the child component
          const componentOutputPath = scaffoldComponent()
          console.log()
          console.log(`Child component created in ${chalk.green(componentOutputPath)}`)

          // Scaffold the unit test for the child component
          const componentTestOutputPath = scaffoldTestForChild(parentComponentName)
          console.log(
            `Child component's test script created in parent component file in ${chalk.green(
              componentTestOutputPath
            )}`
          )
        } else {
          console.error(`${chalk.red(`The provided parent component doesn't exist`)}`)
        }
        rl.close()
      })
      break
    }
    // Parent component
    case 'n':
    default: {
      // Ensure component follows the parent component naming convention
      componentName = buildParentComponentName(componentName)

      // Create folder for the parent component
      if (useSubfolders) {
        componentRootPath += '/' + componentName
        fs.mkdirSync(componentRootPath)
      }

      // Scaffold the parent component
      const componentOutputPath = scaffoldComponent()

      // Scaffold the unit test for the parent component
      const componentTestOutputPath = scaffoldTest()
      console.log()
      console.log(`Parent component created in ${chalk.green(componentOutputPath)}`)

      if (componentTestOutputPath) {
        console.log(`Component's test script created in ${chalk.green(componentTestOutputPath)}`)
      }
      console.log()
      rl.close()
      break
    }
  }
})

/*
  HELPER FUNCTIONS
*/

/**
 * Used for both child and parent components, the function ensures the
 * name provided will fit the naming convention established
 * @param {string} name - component name provided by user
 * @returns {string} cleaned version of the component name
 */
function cleanComponentName(name) {
  const nameItems = name.toLowerCase().split('component')
  name = nameItems.filter((n) => n).join()
  name = name.replace(/[^a-z]/g, '')
  name = name.charAt(0).toUpperCase() + name.slice(1)

  return name
}

/**
 * Transforms the component name provided by the user to follow the parent
 * component naming convention
 * @param {string} componentName - component name provided by user
 * @returns {string} component name that follows the parent component naming convention
 */
function buildParentComponentName(componentName) {
  return cleanComponentName(componentName) + 'Component'
}

/**
 * Transforms the component name provided by the user to follow the child
 * component naming convention which builds upon the parent component
 * @param {string} childComponentName - child component name provided by user
 * @param {string} parentComponentName - parent component name provided by user
 * @returns {string} component name that follows the child component naming convention
 */
function buildChildComponentName(childComponentName, parentComponentName) {
  childComponentName = cleanComponentName(childComponentName)
  parentComponentName = cleanComponentName(parentComponentName)
  return '_' + parentComponentName + childComponentName
}

/**
 * Checks that the parent component name provided by the user is a valid
 * and existing parent component
 * @param {string} componentName - parent component name provided by user
 * @returns {boolean} true if the component exists and false if the component doesn't exist
 */
function checkParentComponentExists(componentName) {
  // Ensure inputted name for parent component is valid
  componentName = buildParentComponentName(componentName)

  // Get list of parent components
  const parentComponentList = []
  fs.readdirSync(componentRootPath).forEach((file) => {
    if (file.includes('Component')) {
      parentComponentList.push(file)
    }
  })

  // Check if the parent component provided exists in the list of parent components
  let itExists = false
  parentComponentList.forEach((parentComponent) => {
    if (parentComponent.includes(componentName)) {
      itExists = true
    }
  })

  return itExists
}

/*
  TEMPLATING FUNCTIONS
*/

/**
 * Force to use `crlf` line endings, we are using `crlf` across the project.
 * Replace: `lf` (\n), `cr` (\r)
 * @param {string} content
 */
function editLineEndings(content) {
  return content.replace(/\r|\n/gm, '\r\n')
}

function scaffoldComponent() {
  const componentNameCCased = _.camelCase(cleanComponentName(componentName))
  const componentTemplate = `<template>
  <div class="${componentNameCCased}">
    <span class="${componentNameCCased}__example">${componentName}</span>
  </div>
</template>

<script setup lang="ts">
import { Text as ScText } from '@sitecore-jss/sitecore-jss-vue'

const props = defineProps({
  fields: {
    type: Object,
    required: false,
    default: () => {},
  },
})
</script>

<style scoped lang="scss">
.${componentNameCCased} {
  background: orange;
}
.${componentNameCCased} {
  &__example {
    background: magenta;
  }
}
</style>
`

  const outputDirectoryPath = componentRootPath
  const outputFilePath = path.join(outputDirectoryPath, `${componentName}.vue`)

  if (fs.existsSync(outputFilePath)) {
    throw `Component path ${outputFilePath} already exists. Not creating component.`
  }

  fs.writeFileSync(outputFilePath, editLineEndings(componentTemplate), 'utf8')

  return outputFilePath
}

function scaffoldTest() {
  const componentNameCCased = _.camelCase(cleanComponentName(componentName))
  const componentTestTemplate = `import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ${componentName} from 'src/components/${componentName}/${componentName}.vue'

const props = {
  fields: {
    heading: {
      value: 'Test heading',
    },
  },
}

let wrapper: any

describe('${componentName}', () => {
  test('Component can be mounted', async () => {
    expect(${componentName}).toBeTruthy()
    wrapper = mount(${componentName}, {
      props: props,
    })
  })

  test('Component is using the expected class', async () => {
    expect(wrapper.attributes().class == '${componentNameCCased}').toBeTruthy()
  })
})
`
  const outputDirectoryPath = componentRootPath
  const outputFilePath = path.join(outputDirectoryPath, `${componentName}.test.ts`)

  if (fs.existsSync(outputFilePath)) {
    throw `Test file path ${outputFilePath} already exists. Not creating test.`
  }

  fs.writeFileSync(outputFilePath, editLineEndings(componentTestTemplate), 'utf8')

  return outputFilePath
}

function scaffoldTestForChild(parentComponentName) {
  const componentNameCCased = _.camelCase(cleanComponentName(componentName))
  const componentTestTemplate = `
import ${componentName} from 'src/components/${parentComponentName}/${componentName}.vue'

describe('${componentName}', () => {
  test('Component can be mounted', async () => {
    expect(${componentName}).toBeTruthy()
    wrapper = mount(${componentName}, {
      props: props,
    })
  })

  test('Component is using the expected class', async () => {
    expect(wrapper.attributes().class == '${componentNameCCased}').toBeTruthy()
  })
})
`

  const outputDirectoryPath = componentRootPath
  const outputFilePath = path.join(outputDirectoryPath, `${parentComponentName}.test.ts`)

  fs.appendFileSync(outputFilePath, editLineEndings(componentTestTemplate), 'utf8')

  return outputFilePath
}
