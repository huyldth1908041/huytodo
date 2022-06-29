import { useState } from 'react';
import useAuthentication from '../hooks/useAuthentication';
import { useHistory } from 'react-router-dom';
import { privateRoutes } from '../routes';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuthentication();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    try {
      setLoading(true);
      await login(username, password);
      history.push(privateRoutes.home.path);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' />
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
      <button type='submit' disabled={loading}>
        {loading ? 'logging' : 'Login'}
      </button>
      <button type='register' disabled={loading}>
        <Link to='/register'>register</Link>
      </button>
    </form>
  );
};

export default LoginPage;
