import fs from 'fs'
import { v4 as uuid } from 'uuid'
import { dirname, join, basename } from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'

const parentDir = dirname(fileURLToPath(import.meta.url)).replace('utility', '')
const codeDir = join(parentDir, 'codefiles')
const outputDir = join(parentDir, 'outputfiles')

// checking if the codefiles directory exists or not
if(!fs.existsSync(codeDir)) {
    // if the folder do not exists
    fs.mkdirSync(codeDir, { recursive: true })
}

// checking if the codefiles directory exists or not
if(!fs.existsSync(outputDir)) {
    // if the folder do not exists
    fs.mkdirSync(outputDir, { recursive: true })
}

// for generating code file with code in it
const generateFile = (lang, code) => {
    const fileId = uuid()
    let filename = ""

    if(lang === "cpp") {
        filename = `${fileId}.cpp`
    }
    
    else if(lang === "py") {
        filename = `${fileId}.py`
    }

    const fileDir = join(codeDir, filename)

    // console.log(chalk.green(lang))
    // console.log(chalk.blue(fileDir))
    fs.writeFileSync(fileDir, code)
    return fileDir
}

const executeCode = (filePath, lang) => {
    const fileId = basename(filePath).split(".")[0]
    const compileFilePath = join(outputDir, `${fileId}`)
    // console.log('fileId: ', fileId)
    // console.log('compileFilePath: ', compileFilePath)
    // console.log('filePath: ', filePath)

    return new Promise(( resolve, reject ) => {
        let command = ""
        // let format = ""
        
        if(lang === "cpp") {
            command = `g++ "${filePath}" -o "${compileFilePath}" && "${compileFilePath}"`
            // format = "cpp"
        }
        else if(lang === "py") {
            command = `python "${filePath}"`
            // format = "py"
        }

        // executing desired command
        exec(command, (error, stdout, stderr) => {
            if(error || stderr) {
                // format stderr first
                let formattedStderr = stderr.replace(/"/g, "'")
                formattedStderr = formattedStderr.replace(/\\/g, "%2F")

                const substr = formattedStderr.substr(0, formattedStderr.indexOf(lang))

                if(formattedStderr.startsWith('Traceback')){
                    formattedStderr = formattedStderr.replace(substr, "'main.")
                }else {
                    const substrRegex = new RegExp(substr, 'g')
                    formattedStderr = formattedStderr.replace(substrRegex, "'main.")
                }

                return reject({ stderr: formattedStderr })
            }

            return resolve(stdout)
        })
    })
}

// minutes to ms
const minToms = (mins) => {
    return mins*60*1000
}

// function to delete files after one hour
const removeFiles = (req, res) => {
    try {
        // for dir codefiles
        fs.readdir(codeDir, (err, files) => {
            if (err) throw err;

            files.forEach((file) => {
                fs.unlink(join(codeDir, file), err => {
                    if (err) throw err;
                })
            })

            console.log('files removed')
        })

        // for dir outputfiles
        fs.readdir(outputDir, (err, files) => {
            if (err) throw err;

            files.forEach((file) => {
                fs.unlink(join(outputDir, file), err => {
                    if (err) throw err;
                })
            })

            console.log('files removed')
        })
    }
    catch(err) {
        console.log(chalk.red(err))
    }
}

export {
    generateFile,
    executeCode,
    removeFiles,
    minToms
}