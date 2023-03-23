import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
//import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SingUpForm = () => {
  const dispatch = useDispatch()
  const [formFields, setFromFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
 

  const clearFormFields = () => {
    setFromFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
        alert("Password do not match")
        return;
    }

    try {
       dispatch(signUpStart(email, password, displayName))
        clearFormFields()
    } catch (error) {
        if(error.code === 'auth/email-already-in-use'){
            alert("Cannot create user, email already in use")
        }else{
            console.log("User creation encounter an error: ", error.message)
        }
    }

  }
  const handleChange = (event) => {
    const{ name, value } = event.target
    setFromFields({...formFields, [name]: value})
  };
  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
      <span>Sign up with your eamil and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
         label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit" >Sign Up</Button>
      </form>
    </div>
  );
};

export default SingUpForm;
