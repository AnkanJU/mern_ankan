import { useState, useEffect } from 'react';
import Login from './pages/Login';
import TaskForm from './components/TaskForm';
import API from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('devflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get('/tasks');
      setTasks(res.data.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await API.put(`/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map((task) => (task._id === id ? res.data.data : task)));
    } catch (err) {
      console.error('Failed to update task status', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('devflow_token');
    localStorage.removeItem('devflow_user');
    setUser(null);
    setTasks([]);
  };

  if (!user) {
    return <Login onLoginSuccess={(userData) => { setUser(userData); fetchTasks(); }} />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        <h2>DevFlow Dashboard</h2>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, <strong>{user.name}</strong></span>
          <button onClick={handleLogout} style={{ padding: '6px 12px', background: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </header>

      <main style={{ marginTop: '20px' }}>
        <TaskForm onTaskCreated={handleTaskCreated} />

        <h3>Task Tickets</h3>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found. Create your first ticket above!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map((task) => (
              <li key={task._id} style={{ border: '1px solid #eee', padding: '15px', marginBottom: '10px', borderRadius: '6px', background: '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong>{task.title}</strong> 
                  <span style={{ marginLeft: '10px', fontSize: '12px', background: task.priority === 'High' ? '#ffcccc' : '#e2e3e5', padding: '2px 6px', borderRadius: '4px' }}>
                    {task.priority}
                  </span>
                  <p style={{ margin: '5px 0 5px 0', color: '#555', fontSize: '14px' }}>{task.description || 'No description provided.'}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>Status:</span>
                    <select 
                      value={task.status} 
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      style={{ padding: '4px', fontSize: '12px' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In-Progress">In-Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => handleDeleteTask(task._id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}