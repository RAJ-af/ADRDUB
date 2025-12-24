import { useState } from 'react';

function Admin() {
  const [password, setPassword] = useState('');
  const [config, setConfig] = useState({
    appName: '',
    heroTitle: '',
    features: []
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, config })
    });
    
    if (res.ok) {
      alert('Config updated!');
    } else {
      alert('Wrong password!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <input 
        placeholder="App Name"
        value={config.appName}
        onChange={(e) => setConfig({...config, appName: e.target.value})}
      />
      
      <input 
        placeholder="Hero Title"
        value={config.heroTitle}
        onChange={(e) => setConfig({...config, heroTitle: e.target.value})}
      />
      
      <button type="submit">Update Config</button>
    </form>
  );
}

export default Admin;
