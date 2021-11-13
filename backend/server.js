import express from 'express'
import { generateFile, executeCode } from './utility/utility.js'

const app = express()

app.use(express.json())

app.get('/test', (req, res) => {
    const rNumber = Math.floor(Math.random() * 10)
    console.log(rNumber)

    res.status(200).send({
        "status": "connection successful",
        "number": rNumber
    })
})

app.post('/input', (req, res) => {
    const rString = (Math.random() + 1).toString(36).substring(7);

    if(req.body.code === "default") {
        res.send({
            "string": "error"
        })
        return
    }

    res.send({
        "string": rString
    })
})

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

app.listen(5000, () => {
    console.log('server up on 5000')
})