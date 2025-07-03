import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import "prismjs/components/prism-javascript";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <>
      <main>
  <div className="nav">
    <h1>Codoo</h1>
  </div>
  <div className="line">
    <p>
      You write the code. Codoo makes sure it's ready for the world.
    </p>
    <p>Because every line deserves a Little Love.</p>
  </div>
  <div className="editor-container">
    <div className="left">
      <div className="code">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            backgroundColor: "transparent",
            color: "#e2e8f0",
            outline: "none",
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <div onClick={reviewCode} className="review">Review</div>
    </div>
    <div className="right">
      <Markdown rehypePlugins={[rehypeHighlight]}>
        {review}
      </Markdown>
    </div>
  </div>
</main>

    </>
  )
}



export default App