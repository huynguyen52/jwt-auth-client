import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { userApi } from '../../api/users-api';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: userApi.register,
    onSuccess: () => {
      navigate('/login');
    },
  });

  const handleRegister = async () => {
    try {
      mutate({ name, email, password });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
      <Link to="/login">Login</Link>
    </div>
  );
}
