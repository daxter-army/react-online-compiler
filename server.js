import express from 'express'
import { generateFile, executeCode, removeFiles, minToms } from './utility/utility.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// timeout to remove temporary files from directories
setInterval(removeFiles, minToms(30))

// test point
app.get('/test', (req, res) => {
    const rNumber = Math.floor(Math.random() * 10)
    console.log(rNumber)

    res.status(200).send({
        "status": "connection successful",
        "number": rNumber
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

// for heroku deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.listen(PORT, () => {
    console.log(`Server up on port: ${PORT}`)
})