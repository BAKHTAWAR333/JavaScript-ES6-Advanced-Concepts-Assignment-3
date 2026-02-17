import React, { useState } from 'react';

function DefaultValueTraps() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  // Function with default parameters
  const testDefaults = (name = 'Guest', age = 25, city = 'Unknown') => {
    return { name, age, city };
  };

  const runTests = () => {
    addLog('=== TESTING DIFFERENT INPUTS ===');
    
    // Test 1: No arguments
    const result1 = testDefaults();
    addLog(`No arguments: ${JSON.stringify(result1)}`);
    
    // Test 2: Passing undefined
    const result2 = testDefaults(undefined, undefined, undefined);
    addLog(`Passing undefined: ${JSON.stringify(result2)} (defaults still work)`);
    
    // Test 3: Passing null
    const result3 = testDefaults(null, null, null);
    addLog(`Passing null: ${JSON.stringify(result3)} (null overrides default)`);
    
    // Test 4: Mix of values
    const result4 = testDefaults('John', undefined, 'NYC');
    addLog(`Mix (John, undefined, NYC): ${JSON.stringify(result4)}`);
    
    // Test 5: Falsey values
    const result5 = testDefaults('', 0, false);
    addLog(`Falsey values: ${JSON.stringify(result5)} (empty string, 0, false)`);
    
    addLog('\n=== IMPORTANT OBSERVATION ===');
    addLog('Default parameters only work when value is undefined, not null or other falsey values');
  };

  return (
    <div style={styles.container}>
      <h2>Task 2.1 - Default Value Traps</h2>
      <button onClick={runTests} style={styles.button}>Run Tests</button>
      
      <div style={styles.logs}>
        <h3>Test Results:</h3>
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

export default DefaultValueTraps;