import { useContext, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import { createUserEmailPassword, logInWithEmailAndPassword } from '../../firebase/firebase';
import { StateContext } from '../../context/AppContext';
import { ACTIONS } from '../../helpers/utils';
import ErrorModal from '../ErrorModal';

const LoginForm = () => {
  const { state, dispatch } = useContext(StateContext);

  const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [cridentials, setCridentials] = useState({
    email: '',
    password: '',
  });

  function checkCrids() {
    if (cridentials.password.length < 6 && !cridentials.email.match(regexp)) {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: 'Please, check your email and pass length >= 6' });
      throw Error('Everything goes wrong');
    }

    if (!cridentials.email.match(regexp)) {
        dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: 'Please, check your email' });
        throw Error('Email error');
    }

    if (cridentials.password.length < 6) {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: 'Password should be at least 6 symbols' });
      throw Error('Pass error');
    }

  }

  function handleEmailChange(event: string) {
    setCridentials(prev => {
      return {
        ...prev,
        email: event
      }
    });
  }

  function handlePassChange(event: string) {
    setCridentials(prev => {
      return {
        ...prev,
        password: event
      }
    });
  }

  async function handleLogin() {
    checkCrids();
    const log = await logInWithEmailAndPassword(cridentials.email, cridentials.password);
    if (!log.hasOwnProperty('user')) {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: 'Please, check your crids' });
      throw Error('Crids error');
    }
    
  }

  async function handleCreateUser() {
    checkCrids();
    const log = await createUserEmailPassword(cridentials.email, cridentials.password);
    if (!log.hasOwnProperty('user')) {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: 'Please, check your crids' });
      throw Error('Crids error');
    }
  }
  
  return (
    <div>
      {state.errorText.length > 0 && <ErrorModal />} 
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
