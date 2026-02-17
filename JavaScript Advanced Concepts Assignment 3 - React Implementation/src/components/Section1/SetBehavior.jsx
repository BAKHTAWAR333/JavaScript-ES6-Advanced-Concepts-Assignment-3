import React, { useState } from 'react';

function SetBehavior() {
  const [logs, setLogs] = useState([]);
  const [mySet, setMySet] = useState(new Set());

  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  const runExperiment = () => {
    const set = new Set();
    
    // Adding different types
    set.add(42);
    set.add("hello");
    set.add(true);
    
    // Adding object and array
    const myObject = { name: "John", age: 25 };
    const myArray = [1, 2, 3];
    
    set.add(myObject);
    set.add(myArray);
    
    addLog(`Initial size: ${set.size}`);
    addLog(`Contents: ${JSON.stringify([...set])}`);
    
    // Trying to add duplicates
    set.add(42);
    set.add("hello");
    
    addLog(`After adding duplicates - size: ${set.size} (still ${set.size})`);
    
    // Modifying stored object
    myObject.age = 30;
    addLog(`After modifying object - set still contains: ${JSON.stringify([...set])}`);
    
    // Trying to add same object reference vs new object
    set.add({ name: "John", age: 30 }); // New object
    addLog(`After adding new similar object - size: ${set.size}`);
    
    setMySet(set);
  };

  return (
    <div style={styles.container}>
      <h2>Task 1.1 - Set Behavior Investigation</h2>
      <button onClick={runExperiment} style={styles.button}>Run Experiment</button>
      
      <div style={styles.logs}>
        <h3>Execution Logs:</h3>
        {logs.map((log, index) => (
          <div key={index} style={styles.logEntry}>
            <span style={styles.time}>[{log.time}]</span> {log.message}
          </div>
        ))}
      </div>
      
      <div style={styles.observation}>
        <h3>What I Observed:</h3>
        <ul>
          <li>Set automatically removes duplicates of primitive values</li>
          <li>Objects and arrays are compared by reference, not by content</li>
          <li>Modifying an object inside set doesn't create duplicate</li>
          <li>Same content but different object = new entry in set</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', borderBottom: '1px solid #ccc' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
  logs: { marginTop: '20px', background: '#f5f5f5', padding: '10px' },
  logEntry: { margin: '5px 0', fontFamily: 'monospace' },
  time: { color: '#666', marginRight: '10px' },
  observation: { marginTop: '20px', padding: '10px', background: '#e8f4e8' }
};

export default SetBehavior;