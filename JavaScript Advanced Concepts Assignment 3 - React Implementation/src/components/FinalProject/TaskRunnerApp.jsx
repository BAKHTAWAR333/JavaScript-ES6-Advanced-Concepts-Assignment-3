import React, { useState } from 'react';

function TaskRunnerApp() {
  const [tasks, setTasks] = useState(new Map());
  const [executionLogs, setExecutionLogs] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskAction, setTaskAction] = useState('log');

  const addLog = (message) => {
    setExecutionLogs(prev => [...prev, { 
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now(),
      message 
    }]);
  };

  // Default config for tasks
  const defaultConfig = {
    retryCount: 0,
    logLevel: 'info',
    shouldNotify: false
  };

  // Add task to Map
  const addTask = () => {
    if (!taskName) return;
    
    const taskId = Date.now();
    const task = {
      id: taskId,
      name: taskName,
      action: taskAction,
      config: { ...defaultConfig },
      createdAt: new Date().toISOString()
    };
    
    const newTasks = new Map(tasks);
    newTasks.set(taskId, task);
    setTasks(newTasks);
    
    addLog(`📝 Task added: "${taskName}" (Action: ${taskAction})`);
    setTaskName('');
  };

  // Execute a specific task
  const executeTask = (taskId, customConfig = null) => {
    const task = tasks.get(taskId);
    if (!task) return;
    
    const config = customConfig || task.config;
    
    addLog(`▶️ Executing task: "${task.name}"`);
    addLog(`   Config: ${JSON.stringify(config)}`);
    
    // Execute based on action type
    if (task.action === 'log') {
      addLog(`   📢 LOG: This is a log message from task "${task.name}"`);
    } else if (task.action === 'count') {
      for (let i = 1; i <= 3; i++) {
        addLog(`   🔢 Counting: ${i}`);
      }
    } else if (task.action === 'process') {
      const result = `Processed: ${task.name.toUpperCase()}`;
      addLog(`   ⚙️ Processing result: ${result}`);
    }
    
    // Retry logic using config
    if (config.retryCount > 0) {
      addLog(`   🔄 This task would retry ${config.retryCount} times on failure`);
    }
    
    addLog(`✅ Task "${task.name}" completed`);
  };

  // Execute all tasks
  const executeAllTasks = () => {
    addLog('🚀 EXECUTING ALL TASKS');
    tasks.forEach((task, id) => {
      executeTask(id);
    });
    addLog('🏁 ALL TASKS COMPLETED\n');
  };

  // Execute with different configs (demonstrating default parameters)
  const executeWithCustomConfig = (taskId) => {
    const task = tasks.get(taskId);
    if (!task) return;
    
    addLog(`\n🔄 EXECUTING WITH CUSTOM CONFIG: "${task.name}"`);
    
    // Different configs to test defaults
    const config1 = { retryCount: 3, logLevel: 'debug', shouldNotify: true };
    const config2 = { retryCount: 1 }; // Uses defaults for other fields
    const config3 = null; // Should use task's default config
    
    addLog('Config 1 (all custom):');
    executeTask(taskId, config1);
    
    addLog('\nConfig 2 (partial custom):');
    executeTask(taskId, config2);
    
    addLog('\nConfig 3 (null - uses task defaults):');
    executeTask(taskId, config3);
  };

  // Delete task
  const deleteTask = (taskId) => {
    const newTasks = new Map(tasks);
    const taskName = tasks.get(taskId)?.name;
    newTasks.delete(taskId);
    setTasks(newTasks);
    addLog(`🗑️ Task deleted: "${taskName}"`);
  };

  return (
    <div style={styles.container}>
      <h2>Final Project: JavaScript Task Runner App</h2>
      
      <div style={styles.addTask}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task name"
          style={styles.input}
        />
        <select 
          value={taskAction} 
          onChange={(e) => setTaskAction(e.target.value)}
          style={styles.select}
        >
          <option value="log">Log Action</option>
          <option value="count">Count Action</option>
          <option value="process">Process Action</option>
        </select>
        <button onClick={addTask} style={styles.button}>Add Task</button>
        <button onClick={executeAllTasks} style={{...styles.button, background: '#4CAF50'}}>
          Execute All
        </button>
      </div>

      <div style={styles.tasksList}>
        <h3>Tasks (Map size: {tasks.size})</h3>
        {Array.from(tasks.values()).map(task => (
          <div key={task.id} style={styles.taskItem}>
            <span>
              <strong>{task.name}</strong> (Action: {task.action})
            </span>
            <div>
              <button onClick={() => executeTask(task.id)} style={styles.smallButton}>Run</button>
              <button onClick={() => executeWithCustomConfig(task.id)} style={styles.smallButton}>
                Test Configs
              </button>
              <button onClick={() => deleteTask(task.id)} style={{...styles.smallButton, background: '#ff4444'}}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.logs}>
        <h3>Execution Logs (showing non-obvious behaviors):</h3>
        {executionLogs.map((log, index) => (
          <div key={index} style={styles.logEntry}>
            <span style={styles.time}>[{log.time}]</span> {log.message}
          </div>
        ))}
        
        <div style={styles.observation}>
          <h4>Non-obvious Behaviors Observed:</h4>
          <ol>
            <li>Map preserves insertion order when iterating with forEach</li>
            <li>Default parameters work even when passing null (null overrides default, unlike undefined)</li>
            <li>Tasks with same name but different IDs are treated as different entries in Map</li>
            <li>Config objects are merged shallowly when using defaults</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  addTask: { marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' },
  input: { padding: '8px', fontSize: '14px', flex: 1 },
  select: { padding: '8px', fontSize: '14px', width: '150px' },
  button: { padding: '8px 16px', fontSize: '14px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none' },
  tasksList: { marginBottom: '20px' },
  taskItem: { 
    padding: '10px', 
    margin: '5px 0', 
    background: '#f0f0f0', 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  smallButton: { 
    margin: '0 5px', 
    padding: '5px 10px', 
    fontSize: '12px', 
    cursor: 'pointer',
    background: '#007bff',
    color: 'white',
    border: 'none'
  },
  logs: { 
    marginTop: '20px', 
    background: '#f5f5f5', 
    padding: '15px',
    maxHeight: '400px',
    overflowY: 'auto'
  },
  logEntry: { margin: '5px 0', fontFamily: 'monospace' },
  time: { color: '#666', marginRight: '10px' },
  observation: { marginTop: '20px', padding: '10px', background: '#e8f4e8' }
};

export default TaskRunnerApp;