import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './loginService';


function LoginForm() {
  let history = useNavigate();
  history('/mainpage');
  return (
    <div>
      <input type="text" placeholder='Username'/>
      <input type="text" placeholder='Password'/>
      <button onClick={() => { history("/mainpage");} }
      >  Login  </button>
    </div>
  );
}

export default LoginForm


// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const history = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       history('/');
//     } catch (error) {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       {error && <div>{error}</div>}
//       <button type="submit">Login</button>
//     </form>
//   );
// }