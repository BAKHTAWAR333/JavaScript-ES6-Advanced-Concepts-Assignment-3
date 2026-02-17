import React, { useState } from 'react';

function SyncCallbackFlow() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  // Step functions
  const step1 = (callback) => {
    addLog('START: Step 1 - Reading file');
    // Simulate work
    for(let i = 0; i < 1000000; i++) {} // small delay
    addLog('END: Step 1 - File read complete');
    callback('data from step1');
  };

  const step2 = (data, callback) => {
    addLog('START: Step 2 - Processing data');
    addLog(`Processing: ${data}`);
    for(let i = 0; i < 1000000; i++) {} // small delay
    addLog('END: Step 2 - Processing complete');
    callback('processed ' + data);
  };

  const step3 = (data, callback) => {
    addLog('START: Step 3 - Saving data');
    addLog(`Saving: ${data}`);
    for(let i = 0; i < 1000000; i++) {} // small delay
    addLog('END: Step 3 - Save complete');
    callback('final result');
  };

  // Version 1: Normal order
  const runNormalOrder = () => {
    addLog('=== NORMAL ORDER (1 → 2 → 3) ===');
    step1((data1) => {
      step2(data1, (data2) => {
        step3(data2, (result) => {
          addLog(`✅ FINAL: ${result}`);
        });
      });
    });
  };

  // Version 2: Reordered callbacks
  const runReordered = () => {
    addLog('=== REORDERED (3 called first, but needs data from previous steps) ===');
    addLog('This will fail because step3 needs data from previous steps');
    addLog('Demonstrates that callbacks must be in logical order');
    
    // This would fail - trying to demonstrate the concept
    addLog('❌ Cannot run step3 before step1 and step2 - need data');
  };

  // Version 3: Different flow
  const runDifferentFlow = () => {
    addLog('=== DIFFERENT FLOW (Process after step1, skip step2) ===');
    step1((data1) => {
      addLog(`Got data: ${data1}`);
      addLog('Skipping step2, going directly to step3');
      step3(data1, (result) => {
        addLog(`✅ FINAL with different flow: ${result}`);
      });
    });
  };

  return (
    <div style={styles.container}>
      <h2>Task 4.1 - Synchronous Callback Flow</h2>
      <div style={styles.buttonGroup}>
        <button onClick={runNormalOrder} style={styles.button}>Normal Order</button>
        <button onClick={runReordered} style={styles.button}>Reordered (Demo)</button>
        <button onClick={runDifferentFlow} style={styles.button}>Different Flow</button>
      </div>
      
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
          <li>Callbacks execute in the order they're called, not where they're written</li>
          <li>Each step waits for previous step to finish</li>
          <li>Changing callback order changes execution flow</li>
          <li>This is "callback hell" - nested callbacks are hard to read</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', borderBottom: '1px solid #ccc' },
  buttonGroup: { display: 'flex', gap: '10px', marginBottom: '20px' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
  logs: { marginTop: '20px', background: '#f5f5f5', padding: '10px' },
  logEntry: { margin: '5px 0', fontFamily: 'monospace' },
  time: { color: '#666', marginRight: '10px' },
  observation: { marginTop: '20px', padding: '10px', background: '#e8f4e8' }
};

export default SyncCallbackFlow;