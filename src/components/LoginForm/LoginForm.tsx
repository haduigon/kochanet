import Button from "../Button";
import Input from "../Input";

const LoginForm = () => {
  return (
          <div>
      <div className="space-y-6 mt-2 ml-2 mr-2 sm:mx-auto  sm:max-w-sm">
        <Input name='name' type="text"/>
      </div>

      <div className="space-y-6 mt-2 ml-2 mr-2 sm:mx-auto  sm:max-w-sm">
        <Input name='email' type="email" />
      </div>

      <div className="space-y-6 mt-2 ml-2 mr-2 sm:mx-auto  sm:max-w-sm">
        <Input name='pass' type="password" addition="forgot the pass?" />
      </div>
      
      <div className="space-y-6 mt-8 ml-2 mr-2 sm:mx-auto  sm:max-w-sm">
        <Button name='Sign-in' />
      </div>
      </div>
  )
}

export default LoginForm;