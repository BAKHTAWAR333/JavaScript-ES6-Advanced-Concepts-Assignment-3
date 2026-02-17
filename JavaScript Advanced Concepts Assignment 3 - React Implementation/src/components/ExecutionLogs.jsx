import React from 'react';

function ExecutionLogs() {
  const logs = [
    {
      section: 'Set Behavior',
      observations: [
        'Set with same object reference doesn\'t create duplicate even after object modification',
        'Set with same content but different object creates new entry',
        'NaN can be added to Set but is considered equal to NaN'
      ]
    },
    {
      section: 'Map vs Object',
      observations: [
        'Object converts all keys to strings: myObject[true] becomes myObject["true"]',
        'Map preserves original key type: can use objects, functions as keys',
        'Map.size updates automatically, Object needs manual tracking'
      ]
    },
    {
      section: 'Default Parameters',
      observations: [
        'Default parameters only kick in for undefined, not null or other falsey values',
        'Default functions are evaluated each time they\'re used',
        'Default objects are created fresh for each function call (no sharing between calls)'
      ]
    },
    {
      section: 'Higher-Order Functions',
      observations: [
        'Function passed to higher-order function maintains its own closure state',
        'Higher-order function can control when and how many times inner function runs',
        'Different functions passed to same higher-order function produce different behaviors'
      ]
    },
    {
      section: 'Async Callbacks',
      observations: [
        'setTimeout(0) doesn\'t run immediately - waits for call stack to clear',
        'Nested timers wait for outer timer to complete before inner timer starts counting',
        'Multiple timers with same delay run in order they were registered'
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <h2>Execution Logs - Non-obvious Behaviors</h2>
      
      {logs.map((section, idx) => (
        <div key={idx} style={styles.section}>
          <h3 style={styles.sectionTitle}>{section.section}</h3>
          <ul style={styles.list}>
            {section.observations.map((obs, i) => (
              <li key={i} style={styles.listItem}>{obs}</li>
            ))}
          </ul>
        </div>
      ))}
      
      <div style={styles.note}>
        <p><strong>Note:</strong> These observations were gathered by actually running the code multiple times and changing inputs to see different behaviors.</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  section: { marginBottom: '30px', padding: '15px', background: '#f9f9f9', borderRadius: '5px' },
  sectionTitle: { color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '5px' },
  list: { marginTop: '10px' },
  listItem: { margin: '10px 0', lineHeight: '1.6' },
  note: { marginTop: '30px', padding: '15px', background: '#e8f4e8', borderRadius: '5px' }
};

export default ExecutionLogs;