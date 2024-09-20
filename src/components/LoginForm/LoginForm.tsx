import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import { createUserEmailPassword, logInWithEmailAndPassword } from '../../firebase/firebase';

const LoginForm = () => {
  const [cridentials, setCridentials] = useState({
    email: '',
    password: '',
  });

  function handleEmailChange(event: string) {
    setCridentials(prev => {
      return {
        ...prev,
        email: event
      }
    })
  }

  function handlePassChange(event: string) {
    setCridentials(prev => {
      return {
        ...prev,
        password: event
      }
    })
  }

  function handleLogin() {
    logInWithEmailAndPassword(cridentials.email, cridentials.password)
  }

  function handleCreateUser() {
    createUserEmailPassword(cridentials.email, cridentials.password)
  }

  console.log(cridentials);
  

  let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div>

      <div className="space-y-6 mt-2 ml-2 mr-2 sm:mx-auto  sm:max-w-sm">
        <Input name="email" type="email" onChange={handleEmailChange} value={cridentials.email} />
      </div>

      <div className="space-y-6 mt-2 ml-2 mr-2 sm:mx-auto  sm:max-w-sm">
        <Input
          name="pass"
          type="password"
          addition="forgot the pass?"
          value={cridentials.password}
          onChange={handlePassChange}
        />
      </div>

      <div
        className="space-y-6 mt-8 ml-2 mr-2 sm:mx-auto  sm:max-w-sm"
        onClick={handleLogin}
      >
        <Button name="Sign-in" />
      </div>
      <div
        className="space-y-6 mt-8 ml-2 mr-2 sm:mx-auto  sm:max-w-sm"
        onClick={handleCreateUser}
      >
        <Button name="Sign-up" />
      </div>
    </div>
  );
};

export default LoginForm;
