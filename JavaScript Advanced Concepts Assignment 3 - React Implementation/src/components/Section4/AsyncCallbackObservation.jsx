import React, { useState } from 'react';

function AsyncCallbackObservation() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const runAsyncExperiment = () => {
    clearLogs();
    
    addLog('🚀 START OF PROGRAM - Written order');
    
    // Timer 1 - 2 seconds
    setTimeout(() => {
      addLog('⏰ TIMER 1 (2s) - This runs after 2 seconds');
    }, 2000);
    
    // Timer 2 - 0 seconds (should be immediate)
    setTimeout(() => {
      addLog('⚡ TIMER 2 (0s) - This runs after current stack clears');
    }, 0);
    
    // Timer 3 - 1 second
    setTimeout(() => {
      addLog('⏰ TIMER 3 (1s) - This runs after 1 second');
    }, 1000);
    
    // Immediate execution
    addLog('📝 IMMEDIATE - This runs right now');
    
    // Nested timers
    setTimeout(() => {
      addLog('🎯 NESTED OUTER (1.5s) - Starting nested timer');
      setTimeout(() => {
        addLog('🎯 NESTED INNER - This runs after outer completes');
      }, 500);
    }, 1500);
    
    // Promise-like behavior with setTimeout
    addLog('🔄 Adding more immediate logs');
    
    // This runs after all synchronous code
    setTimeout(() => {
      addLog('📌 FINAL TIMER - This is the last thing to execute');
    }, 2500);
    
    addLog('🏁 END OF PROGRAM - Written order completed');
    
    // Explanation of what happened
    setTimeout(() => {
      addLog('\n📊 ANALYSIS:');
      addLog('Written order: START → IMMEDIATE → END → TIMERS');
      addLog('Actual order: START → IMMEDIATE → END → TIMER2(0s) → TIMER3(1s) → NESTED → TIMER1(2s) → FINAL');
      addLog('Timers with same delay execute in order they were registered');
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <h2>Task 4.2 - Asynchronous Callback Observation</h2>
      <button onClick={runAsyncExperiment} style={styles.button}>Run Async Experiment</button>
      <button onClick={clearLogs} style={{...styles.button, marginLeft: '10px', background: '#ff4444'}}>Clear Logs</button>
      
      <div style={styles.logs}>
        <h3>Execution Logs (with timestamps):</h3>
        {logs.map((log, index) => (
          <div key={index} style={styles.logEntry}>
            <span style={styles.time}>[{log.time}]</span> {log.message}
          </div>
        ))}
      </div>
      
      <div style={styles.observation}>
        <h3>Key Observations:</h3>
        <ul>
          <li>setTimeout(0) doesn't run immediately - waits for call stack to clear</li>
          <li>Written order ≠ execution order with async code</li>
          <li>Timers with same delay run in registration order</li>
          <li>Nested timers wait for outer timer to complete before starting</li>
          <li>All async code waits for synchronous code to finish</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', borderBottom: '1px solid #ccc' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
  logs: { marginTop: '20px', background: '#f5f5f5', padding: '10px', maxHeight: '400px', overflowY: 'auto' },
  logEntry: { margin: '5px 0', fontFamily: 'monospace' },
  time: { color: '#666', marginRight: '10px' },
  observation: { marginTop: '20px', padding: '10px', background: '#e8f4e8' }
};

export default AsyncCallbackObservation;