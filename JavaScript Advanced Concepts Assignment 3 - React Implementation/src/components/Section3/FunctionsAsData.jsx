import React, { useState } from 'react';

function FunctionsAsData() {
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  // 1. Functions stored in variables
  const add = function(a, b) {
    return a + b;
  };

  const multiply = function(a, b) {
    return a * b;
  };

  // 2. Functions in an array
  const operations = [add, multiply];

  // 3. Function that returns a function
  const createGreeter = (greeting) => {
    return (name) => {
      return `${greeting}, ${name}!`;
    };
  };

  // 4. Function that takes a function as argument
  const calculateAndLog = (operation, a, b) => {
    const result = operation(a, b);
    addLog(`Operation result: ${result}`);
    return result;
  };

  const runDemonstration = () => {
    addLog('=== 1. FUNCTIONS IN VARIABLES ===');
    const addResult = add(10, 5);
    const multiplyResult = multiply(10, 5);
    addLog(`add(10,5) = ${addResult}`);
    addLog(`multiply(10,5) = ${multiplyResult}`);

    addLog('\n=== 2. FUNCTIONS IN ARRAY ===');
    operations.forEach((op, index) => {
      const result = op(6, 3);
      addLog(`operations[${index}](6,3) = ${result}`);
    });

    addLog('\n=== 3. FUNCTIONS RETURNING FUNCTIONS ===');
    const sayHello = createGreeter('Hello');
    const sayHi = createGreeter('Hi');
    addLog(sayHello('John'));
    addLog(sayHi('Jane'));

    addLog('\n=== 4. FUNCTIONS AS ARGUMENTS ===');
    calculateAndLog(add, 20, 5);
    calculateAndLog(multiply, 20, 5);
    
    // Passing anonymous function
    calculateAndLog(function(a, b) { return a - b; }, 20, 5);

    addLog('\n=== 5. STORING FUNCTIONS IN OBJECT ===');
    const mathTools = {
      add: add,
      multiply: multiply,
      currentOp: add
    };
    addLog(`mathTools.add(8,2): ${mathTools.add(8,2)}`);
    addLog(`mathTools.currentOp(8,2): ${mathTools.currentOp(8,2)}`);
    
    // Changing the stored function
    mathTools.currentOp = multiply;
    addLog(`After changing currentOp to multiply: ${mathTools.currentOp(8,2)}`);
  };

  return (
    <div style={styles.container}>
      <h2>Task 3.1 - Functions as Data</h2>
      <button onClick={runDemonstration} style={styles.button}>Run Demo</button>
      
      <div style={styles.logs}>
        <h3>Demonstration Logs:</h3>
        {logs.map((log, index) => (
          <div key={index} style={styles.logEntry}>
            <span style={styles.time}>[{log.time}]</span> {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', borderBottom: '1px solid #ccc' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
  logs: { marginTop: '20px', background: '#f5f5f5', padding: '10px' },
  logEntry: { margin: '5px 0', fontFamily: 'monospace' },
  time: { color: '#666', marginRight: '10px' }
};

export default FunctionsAsData;