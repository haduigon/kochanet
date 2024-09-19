import Input from "../../components/Input";
import Button from "../../components/Button";
import LoginForm from "../../components/LoginForm";
import SocialLoginButton from "../../components/SocialLoginButton";
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();

  const listenAuth = onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      navigate('/posts')
    }

    return () => {
      listenAuth();
    }
  })

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full flex-column">
        <div className="w-full">
          <div className="flex flex-row space-x-6 mt-2 ml-2 mr-2 sm:mx-auto  sm:max-w-sm  items-center justify-center">
             <SocialLoginButton name="Login with Google" />
             <SocialLoginButton name="Login with Facebook" />
             <SocialLoginButton name="Login with Github" />
         </div>
        </div>
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
      <div className="w-full hidden lg:block">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage;