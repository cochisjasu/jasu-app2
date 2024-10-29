const path = require('path');
const fs = require('fs').promises;
const JavaScriptObfuscator = require('javascript-obfuscator');

const validDirectory = (pathName) => {
    const ignoreDirs = ['node_modules', '.idea', '.next', 'public']
    const dirName = pathName.split('/').pop()
    return !ignoreDirs.includes(dirName)
}

const getFiles = async (directory) => {
    const files = await fs.readdir(directory)
    const toTransform = []
    await Promise.all(files.map(async file => {
        const pathToFile = path.join(directory, file)
        const isDirectory = (await fs.stat(pathToFile)).isDirectory()
        if (isDirectory && validDirectory(pathToFile)) {
            
            const files = await getFiles(pathToFile)
            toTransform.push(...files)
        }
        else {
            if (pathToFile.endsWith('.js') || pathToFile.endsWith('.jsx')) {
                const result = await fs.readFile(pathToFile, 'utf-8')
                toTransform.push([pathToFile, result])
            }
        }
        
    }))
    return toTransform
}

const processFiles = (files = []) => {
    return files.map(fileData => {
        const obfuscationResult = JavaScriptObfuscator.obfuscate(fileData[1]);
        const uglyCode = obfuscationResult.getObfuscatedCode()
        return [fileData[0], uglyCode]
    })
}

const saveFiles = async (processed = []) => {
    processed.map(async fileData => {
        await fs.writeFile(fileData[0], fileData[1])
    })
}

const obfuscateCode = async () => {
    const basePath = path.join(__dirname, '..')
    const files = await getFiles(basePath)
    const processed = processFiles(files)
    await saveFiles(processed)
}

obfuscateCode()
