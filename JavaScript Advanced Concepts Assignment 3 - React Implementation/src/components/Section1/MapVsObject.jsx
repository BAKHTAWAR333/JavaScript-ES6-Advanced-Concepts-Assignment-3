import React, { useState } from 'react';

function MapVsObject() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  const runComparison = () => {
    // Using plain object
    const myObject = {};
    myObject['name'] = 'John';
    myObject[1] = 'number one';
    myObject[true] = 'boolean true';
    
    // Using Map
    const myMap = new Map();
    myMap.set('name', 'John');
    myMap.set(1, 'number one');
    myMap.set(true, 'boolean true');
    
    // Using non-string keys in object vs map
    const keyObj = { id: 1 };
    const keyFunc = function() {};
    const keyArray = [1, 2, 3];
    
    myObject[keyObj] = 'object key in object'; // This becomes "[object Object]"
    myMap.set(keyObj, 'object key in map');
    myMap.set(keyFunc, 'function key in map');
    myMap.set(keyArray, 'array key in map');
    
    addLog('=== OBJECT BEHAVIOR ===');
    addLog(`Object keys: ${Object.keys(myObject)}`);
    addLog(`Object has 'name': ${myObject['name']}`);
    addLog(`Object has number key 1: ${myObject[1]}`);
    addLog(`Object has boolean key true: ${myObject[true]}`);
    addLog(`Object with object key: ${myObject[keyObj]} (key became "[object Object]")`);
    
    addLog('\n=== MAP BEHAVIOR ===');
    addLog(`Map size: ${myMap.size}`);
    addLog(`Map has 'name': ${myMap.get('name')}`);
    addLog(`Map has number key 1: ${myMap.get(1)}`);
    addLog(`Map has boolean key true: ${myMap.get(true)}`);
    addLog(`Map with object key: ${myMap.get(keyObj)}`);
    addLog(`Map with function key: ${myMap.get(keyFunc)}`);
    addLog(`Map with array key: ${myMap.get(keyArray)}`);
    
    // Checking if keys are preserved
    addLog(`\nCan we access map with similar object? ${myMap.get({ id: 1 }) || 'No - different reference'}`);
  };

  return (
    <div style={styles.container}>
      <h2>Task 1.2 - Map vs Object Comparison</h2>
      <button onClick={runComparison} style={styles.button}>Compare</button>
      
      <div style={styles.logs}>
        <h3>Comparison Logs:</h3>
        {logs.map((log, index) => (
          <div key={index} style={styles.logEntry}>
            <span style={styles.time}>[{log.time}]</span> 
            <span style={log.message.includes('===  ') ? styles.bold : {}}>{log.message}</span>
          </div>
        ))}
      </div>
      
      <div style={styles.observation}>
        <h3>Key Differences Observed:</h3>
        <ul>
          <li>Object converts all keys to strings</li>
          <li>Map preserves key types (numbers, booleans, objects)</li>
          <li>Map has .size property, object needs Object.keys().length</li>
          <li>Objects have prototype, Map doesn't</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', borderBottom: '1px solid #ccc' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
  logs: { marginTop: '20px', background: '#f5f5f5', padding: '10px' },
  logEntry: { margin: '5px 0', fontFamily: 'monospace', whiteSpace: 'pre-wrap' },
  time: { color: '#666', marginRight: '10px' },
  bold: { fontWeight: 'bold' },
  observation: { marginTop: '20px', padding: '10px', background: '#e8f4e8' }
};

export default MapVsObject;