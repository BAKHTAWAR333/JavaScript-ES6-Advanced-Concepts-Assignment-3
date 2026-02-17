import React, { useState } from 'react';

function DefaultsWithFunctions() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  // Function with default function and default object
  const complexFunction = (
    name = 'Default Name',
    multiplier = 2,
    callback = (num) => num * multiplier,
    config = { prefix: 'Result: ', showLog: true }
  ) => {
    const calculated = callback(10);
    
    if (config.showLog) {
      addLog(`${config.prefix}${calculated} (using name: ${name})`);
    }
    
    return {
      name,
      multiplier,
      result: calculated,
      config
    };
  };

  const runExperiments = () => {
    addLog('=== EXPERIMENT 1: Using all defaults ===');
    complexFunction();
    
    addLog('\n=== EXPERIMENT 2: Custom callback with default config ===');
    complexFunction(
      'Test',
      3,
      (num) => num * num + 5
    );
    
    addLog('\n=== EXPERIMENT 3: Default callback with custom config ===');
    complexFunction(
      'Modified',
      4,
      undefined,  // Use default callback
      { prefix: 'Custom Prefix >> ', showLog: true }
    );
    
    addLog('\n=== EXPERIMENT 4: Modifying config object ===');
    const customConfig = { prefix: 'Modified: ', showLog: true };
    complexFunction('John', 5, undefined, customConfig);
    
    // Modifying config after function call
    customConfig.prefix = 'This should not affect previous call: ';
    addLog('After modifying config object - previous calls already executed with original values');
    
    addLog('\n=== EXPERIMENT 5: Function with side effects ===');
    let counter = 0;
    const incrementingCallback = (num) => {
      counter++;
      return num * counter;
    };
    
    complexFunction('Counter Test', 1, incrementingCallback);
    complexFunction('Counter Test Again', 1, incrementingCallback);
    addLog(`Counter value after two calls: ${counter} (shows callback maintains state)`);
  };

  return (
    <div style={styles.container}>
      <h2>Task 2.2 - Defaults with Functions & Objects</h2>
      <button onClick={runExperiments} style={styles.button}>Run Experiments</button>
      
      <div style={styles.logs}>
        <h3>Experiment Logs:</h3>
        {logs.map((log, index) => (
          <div key={index} style={styles.logEntry}>
            <span style={styles.time}>[{log.time}]</span> {log.message}
          </div>
        ))}
      </div>
      
      <div style={styles.observation}>
        <h3>What I Learned:</h3>
        <ul>
          <li>Default functions are evaluated each time they're used</li>
          <li>Default objects are created fresh for each call</li>
          <li>Passing undefined uses default, passing null overrides with null</li>
          <li>Functions as defaults can access other parameters</li>
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

export default DefaultsWithFunctions;