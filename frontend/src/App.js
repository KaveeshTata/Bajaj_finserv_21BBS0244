import React, { useEffect, useState } from 'react';
import './App.css';  // You can customize your CSS for the desired styling

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = '21BBS0244';  // Set the title of the webpage
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      console.log("Parsed Input:", parsedInput);  // Debugging: check what is being parsed
  
      const res = await fetch('http://127.0.0.1:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
  
      const data = await res.json();
      if (!res.ok) {
        setError(data.irregularities.join(', '));
        setResponse(null);
      } else {
        setError('');
        setResponse(data);
      }
    } catch (error) {
      setError('Invalid JSON format');
      setResponse(null);
      console.error("JSON Parsing Error:", error);  // Debugging: log any JSON parsing issues
    }
  };
  

  const handleSelection = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;
    return (
      <div style={{ marginTop: '20px' }}>
        <h4>Filtered Response</h4>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          {selectedOptions.includes('Alphabets') && (
            <p>Alphabets: {response.alphabets.join(', ')}</p>
          )}
          {selectedOptions.includes('Numbers') && (
            <p>Numbers: {response.numbers.join(', ')}</p>
          )}
          {selectedOptions.includes('Highest lowercase alphabet') && (
            <p>Highest lowercase alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
          )}
        </pre>
      </div>
    );
  };

  return (
    <div className="App" style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', display: 'block' }}>API Input</label>
        <textarea 
          value={jsonInput} 
          onChange={(e) => setJsonInput(e.target.value)} 
          placeholder='{"data":["M", "1", "334", "4", "B"]}' 
          style={{ width: '100%', height: '80px', padding: '10px', marginTop: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={handleSubmit} 
          style={{
            marginTop: '10px', 
            padding: '10px 20px', 
            backgroundColor: '#007BFF', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </div>

      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {response && (
        <div style={{ marginTop: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block' }}>Multi Filter</label>
          <select 
            multiple 
            onChange={handleSelection} 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '10px' }}
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
