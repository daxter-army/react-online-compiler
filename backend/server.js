import express from 'express'
import { generateFile, executeCode, removeFiles, minToms } from './utility/utility.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// timeout to remove temporary files from directories
setInterval(removeFiles, minToms(30))

app.post('/run', async (req, res) => {
    const { lang, code } = req.body
    const filePath = generateFile(lang, code)

    try {
        const output = await executeCode(filePath, lang)

        res.status(200).send({
            status: 'okay',
            lang,
            stdout: output
        })
    }
    catch(error) {
        res.status(400).send({
            status: 'error',
            lang,
            stdout: error.stderr
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server up on port: ${PORT}`)
})