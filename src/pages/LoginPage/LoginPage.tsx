import Input from "../../components/Input";
// import Button from "../../components/Button";
import LoginForm from "../../components/LoginForm";
import SocialLoginButton from "../../components/SocialLoginButton";
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();

  const listenAuth = onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      navigate('/posts');
    }

    return () => {
      listenAuth();
    }
  })

  return (
    <div className="flex flex-column justify-center items-center min-h-screen ">
      <div className="w-full flex-column">
        <div className="w-full">
          <div className="flex flex-row space-x-6 mt-2 ml-2 mr-2 sm:mx-auto  sm:max-w-sm  items-center justify-between">
             <SocialLoginButton name="google" />
             <SocialLoginButton name="facebook" />
             <SocialLoginButton name="github" />
         </div>
        </div>
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
      <div className="w-full hidden lg:block">
        <div className="text-4xl text-indigo-600 font-bold">KOCHANET BLOG</div>
      </div>
    </div>
  )
}

export default LoginPage;