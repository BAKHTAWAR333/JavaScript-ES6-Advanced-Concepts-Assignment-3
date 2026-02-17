import React, { useState } from 'react';

function HigherOrderFunction() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  // Higher-order function that controls how many times and when a function runs
  const runControlled = (fn, times, delay, shouldStop) => {
    let count = 0;
    let results = [];
    
    addLog(`Starting controlled execution - will run ${times} times with ${delay}ms delay`);
    
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (count < times && !shouldStop(count)) {
          const result = fn(count);
          results.push(result);
          addLog(`Run #${count + 1}: ${result}`);
          count++;
        } else {
          clearInterval(interval);
          if (shouldStop(count - 1)) {
            addLog(`Execution stopped early by condition at run #${count}`);
          } else {
            addLog(`Completed all ${times} runs`);
          }
          resolve(results);
        }
      }, delay);
    });
  };

  // Different functions to pass
  const square = (n) => `Square of ${n + 1} is ${(n + 1) ** 2}`;
  
  const fibonacci = (() => {
    let prev = 0, curr = 1;
    return () => {
      const result = curr;
      [prev, curr] = [curr, prev + curr];
      return `Fibonacci #${result}`;
    };
  })();

  const runExperiments = async () => {
    addLog('=== EXPERIMENT 1: Run square function 5 times, no stop condition ===');
    await runControlled(square, 5, 500, () => false);
    
    addLog('\n=== EXPERIMENT 2: Run fibonacci with stop condition (stop after 3) ===');
    await runControlled(fibonacci, 10, 300, (count) => count >= 3);
    
    addLog('\n=== EXPERIMENT 3: Run with custom function and immediate stop ===');
    await runControlled((n) => `Count: ${n + 1}`, 10, 200, (count) => count >= 1);
    
    addLog('\n=== EXPERIMENT 4: Passing different functions demonstrates ===');
    addLog('Higher-order functions can control ANY function we pass to them');
  };

  return (
    <div style={styles.container}>
      <h2>Task 3.2 - Higher-Order Function Controller</h2>
      <button onClick={runExperiments} style={styles.button}>Run Experiments</button>
      
      <div style={styles.logs}>
        <h3>Experiment Logs:</h3>
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

export default HigherOrderFunction;