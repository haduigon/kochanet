import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { loginWithGoogle } from '../../firebase/firebase';

type Props = {
  name: 'google' | 'facebook' | 'github'
}

const SocialLoginButton: React.FC<Props> = ({ name }) => {
    // const dispatch = useAppDispatch();

  const google = new GoogleAuthProvider();
  const facebook = new FacebookAuthProvider();
  const github = new GithubAuthProvider();
  
  const providers = {
    "facebook" : facebook,
    "google" : google,
    "github" : github,
  }

  // const images = {
  //   "facebook" : facebookPicture,
  //   "google" : googlePicture,
  //   "github" : githubPicture,
  // }

  function googleLogin() {
    loginWithGoogle(providers[name] )
  }
  return (
    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-lg bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300"
        onClick={googleLogin}
      >
        <div className="flex-column">
          <div>Login with</div>
        <div>{name}</div>
        </div>
      </button>
      </div>
  )
}

export default SocialLoginButton;