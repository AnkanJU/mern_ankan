// frontend/src/components/TaskForm.jsx
import { useState } from 'react';
import API from '../services/api';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/tasks', { title, description, priority });
      onTaskCreated(res.data.data);
      setTitle('');
      setDescription('');
      setPriority('Medium');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f4f6f8', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
      <h4>Create New Ticket</h4>
      {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="text" 
          placeholder="Task Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea 
          placeholder="Task Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '60px' }}
        />
      </div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '6px' }}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Add Task
      </button>
    </form>
  );
}