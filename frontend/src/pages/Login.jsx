import { useState } from 'react';
import API from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login';
      const payload = isRegistering ? { name, email, password } : { email, password };
      
      const response = await API.post(endpoint, payload);
      const { token, data } = response.data;
      
      localStorage.setItem('devflow_token', token);
      localStorage.setItem('devflow_user', JSON.stringify(data));
      
      onLoginSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2>{isRegistering ? 'DevFlow Portal Register' : 'DevFlow Portal Login'}</h2>
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div style={{ marginBottom: '15px' }}>
            <label>Name:</label><br />
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
        )}
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '10px' }}>
          {isRegistering ? 'Register Account' : 'Login'}
        </button>
      </form>

      <button 
        onClick={() => { setIsRegistering(!isRegistering); setError(''); }} 
        style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', padding: 0, textDecoration: 'underline', width: '100%', textAlign: 'center' }}
      >
        {isRegistering ? 'Already have an account? Login here' : "Don't have an account? Register here"}
      </button>
    </div>
  );
}