// react imports
import { useState, useEffect } from 'react'
import axios from 'axios'

// default code
import data from './data';

// styles
import './App.module.css';

function App() {
  // state variables
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState(data)
  const [output, setOutput] = useState()

  const keydownHandler = (event) => {
    if(event.keyCode === 13 && event.ctrlKey) {
      resultHandler()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    
    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  })

  const resultHandler = () => {
    setLoading(true)
    axios.post('/run', {
      "lang": "cpp",
      "code": text.trim()
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      console.log(res.data)
      setLoading(false)
      setOutput(res.data.stdout)
    }).catch((err) => {
      setLoading(false)
      setOutput(err.response.data.stdout)
      console.log(err.response.data)
    })
  }

  const changeHandler = (event) => {
    setText(event.target.value)
  }

  return (
    <div className="App">
      <button onClick={resultHandler}>Get result</button>
      <textarea value={text} onChange={changeHandler} />
      <textarea value={loading ? 'loading' : output} />
    </div>
  );
}

export default App;
