// react imports
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// default data
import Logo from './assets/logo.svg'
import data from './data';

// styles
import styles from './App.module.css';

function App() {
  // state variables
  const [loading, setLoading] = useState(false)
  // const [timeoutUpdate, setTimeoutUpdate] = useState()
  const [compiling, setCompiling] = useState(false)
  const [error, setError] = useState(false)
  const [text, setText] = useState(data)
  const [lang, setLang] = useState('cpp')
  const [output, setOutput] = useState()

  // ref
  const codeRef = useRef()

  // for registering keybindings
  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    
    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  })

  const keydownHandler = (event) => {
    if(event.keyCode === 13 && event.ctrlKey) {
      if(!compiling) {
        setCompiling(true)
        resultHandler()
        return
      }
      
      console.log('wait for the program to finish compilation process!!!')
    }

    if(event.keyCode === 16 && event.ctrlKey) {
      lang === 'cpp' ? setLang('py') : setLang('cpp')
    }
  }

  const langHandler = (input) => {
    setLang(input)
  }

  const resultHandler = () => {
    setLoading(true)  
    axios.post('/run', {
      "lang": lang,
      "code": codeRef.current.value.trim()
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      // console.log(res.data)
      setLoading(false)
      setError(false)
      setOutput(res.data.stdout)
      setCompiling(false)
    }).catch((err) => {
      setLoading(false)
      setCompiling(false)
      setError(true)
      setOutput(err.response.data.stdout)
      // console.log(err.response.data.stdout)
    })
  }

  const changeHandler = (event) => {
    // optimise the state updation of written code
    // clearTimeout(timeoutUpdate)
    
    // setTimeoutUpdate(setTimeout(() => {
      // console.log('updating code state')
      setText(event.target.value)
    // }, 400))
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.logo_image} src={Logo} alt="logo"/>
        </div>
        <div className={styles.lang_selection}>
          <button className={ `${styles.lang_cpp} ${lang === "cpp" ? styles.lang_cpp_active : null}`} onClick={() => langHandler('cpp')}>
            .cpp
          </button>
          <button className={ `${styles.lang_python} ${lang === "py" ? styles.lang_python_active : null}`} onClick={() => langHandler('py')}>
            .py
          </button>
        </div>
      </header>
      <div className={styles.tags}>
        <div className={styles.textarea_header} id={styles.editor_header}><div id={styles.editor_heading}>Main.{lang}</div><div className={styles.tooltip}><kbd>Ctrl + Enter</kbd> to execute code</div></div>
        <div className={`${styles.textarea_header} ${ compiling ? styles.program_compiling : null}`} id={styles.compilation_header}><div id={styles.compilation_heading}>Output</div><div className={styles.tooltip}><kbd>Ctrl + Shift</kbd> to change language</div></div>        
      </div>
      <div className={styles.textarea_wrapper}>
        <div id={styles.textarea_wrapper_editor}>
          <textarea spellCheck="false" ref={codeRef} className={styles.textarea} id={styles.textarea_editor} value={text} onChange={changeHandler} />
        </div>
        <div id={styles.textarea_wrapper_compilation}>
          <textarea readOnly className={styles.textarea} id={styles.textarea_compilation} value={loading ? 'compiling...' : output ? output : error ? 'Unable to connect to server!...please try again' : ''} />
        </div>
      </div>
    </div>
  );
}

export default App;