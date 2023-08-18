const fs = require('fs');
const path = require('path');

const writeImportPackage = (type, path) => {
    return `import ${type}, { ${type}Props } from '${path}';`
}

const componentsPath = path.join(__dirname, './src/systems/Component');
const entitiesPath = path.join(__dirname, './src/systems/Entity/Entities');
const componentTypes= fs.readdirSync(path.join(componentsPath,'Components')).map((fileName)=>fileName.split(".")[0])
let ComponentTypesString = componentTypes.map(type => writeImportPackage(type, `@systems/Component/Components/${type}`)).join('\n')
ComponentTypesString += `

export const Components = {
    ${componentTypes.join(',\n\t')}
}

export type ComponentPropsMap = {
${componentTypes.map(type =>`\t${type}: ${type}Props`).join(',\n')}
}

export type ComponentTypesMap = {
${componentTypes.map(type =>`\t${type}: ${type}`).join(',\n')}
}

export type ComponentProp = ComponentPropsMap[keyof ComponentPropsMap]
export type ComponentType = ComponentTypesMap[keyof ComponentTypesMap]

`;

fs.writeFileSync(path.join(componentsPath, 'ComponentTypes.ts'), ComponentTypesString);