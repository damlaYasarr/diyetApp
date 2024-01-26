import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [assistantResponses, setAssistantResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question }),
      });
  
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
  
      const data = await response.text();

      setAssistantResponses([
        ...assistantResponses,
        { role: 'User', content: question },
        { role: 'Assistant', content: data },
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [assistantResponses]);

  return (
    <div className='App'>
    <div className="container" style={{padding:'5rem'}}>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="question"
            placeholder="Ask a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            aria-describedby="button-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Ask
            </button>
          </div>
        </div>
      </form>
      <div className="mt-3" style={{ fontSize: '19px' }}>
  {assistantResponses.map((response, index) => (
  
      <p key={index}>{response.role}: {response.content}</p>
 
  ))}
  {loading && <p>Let's do something for you...</p>}
</div>
    </div>
    </div>
  );
}

export default App;
