import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUrl } from "../../utils/fetchUrl";
import { checkAllTrue } from "../../utils/check-all";
import {
  sendErrorNotification,
  sendSuccessNotification,
} from "../../services/notifications";
import Email from "../../components/email";
import Accountno from "../../components/accountno";
import Ifsc from "../../components/ifsc";
import Upi from "../../components/upi";
import Password from "../../components/password";
import Name from "../../components/name";
import Button from "../../components/button";
import PhoneNumber from "../../components/phoneno";
import AgentCode from "../../components/agentcode";
import { Alert, AlertTitle } from "@mui/material";

const FormSection = (props) => {
  const navigate = useNavigate();

  // Refactor state management using objects
  const [formState, setFormState] = useState({
    name: { value: "", isValid: false },
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    phoneNo: { value: "", isValid: false },
    agent_code: { value: "", isValid: false },
    accountNo: { value: "", isValid: false },
    ifsc: { value: "", isValid: false },
    upiId: { value: "", isValid: false },
  });

  const [message, setMessage] = useState(null);

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    if (
      !checkAllTrue([
        formState.email.isValid,
        formState.name.isValid,
        formState.password.isValid,
        formState.phoneNo.isValid,
        formState.agent_code.isValid,
        formState.accountNo.isValid,
        formState.ifsc.isValid,
        formState.upiId.isValid,
      ])
    ) {
      sendErrorNotification("Form Incomplete - Please fill in all details.");
      return;
    }

    try {
      const url = process.env.REACT_APP_BASE_URL + '/api/employee/signup';
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const body = JSON.stringify({
        name: formState.name.value,
        email: formState.email.value,
        password: formState.password.value,
        phoneNo: formState.phoneNo.value,
        agent_code: formState.agent_code.value,
        accountNo: formState.accountNo.value,
        ifsc: formState.ifsc.value,
        upiId: formState.upiId.value
      });

      const requestOptions = { method: 'POST', headers, body };
      const response = await fetchUrl(url, requestOptions);

      // Assuming fetchUrl returns a JSON response
      console.log(response);

      if (response.success) {
        sendSuccessNotification("Success Account created successfully");
        setMessage("We will contact you soon!");
      } else {
        sendErrorNotification("An error occurred.");
      }
    } catch (error) {
      console.error("Error in Form Submission:", error);
      sendErrorNotification("An error occurred while submitting the form.");
    }
  };

  const formComponents = {
    email: (key, props) => (
      <Email
        key={key}
        {...{
          ...props,
          value: formState.email.value,
          onChange: (value, isValid) => setFormState(prev => ({ ...prev, email: { value, isValid } })),
        }}
      />
    ),
    name: (key, props) => (
      <Name
        key={key}
        {...{
          ...props,
          value: formState.name.value,
          onChange: (value, isValid) => setFormState(prev => ({ ...prev, name: { value, isValid } })),
        }}
      />
    ),
    password: (key, props) => (
      <Password
        key={key}
        {...{
          ...props,
          value: formState.password.value,
          onChange: (value, isValid) => setFormState(prev => ({ ...prev, password: { value, isValid } })),
        }}
      />
    ),
    phoneno: (key, props) => (
      <PhoneNumber
        key={key}
        {...{
          ...props,
          value: formState.phoneNo.value,
          onChange: (value, isValid) => setFormState(prev => ({ ...prev, phoneNo: { value, isValid } })),
        }}
      />
    ),
    agent_code: (key, props) => (
      <AgentCode
        key={key}
        {...{
          ...props,
          value: formState.agent_code.value,
          onChange: (value, isValid) => setFormState(prev => ({ ...prev, agent_code: { value, isValid } })),
        }}
      />
    ),
    accountno: (key, props) => (
      <Accountno
        key={key}
        {...{
          ...props,
          value: formState.accountNo.value,
          onChange: (value, isValid) => setFormState(prev => ({ ...prev, accountNo: { value, isValid } })),
        }}
      />
    ),
    ifsc: (key, props) => (
      <Ifsc
        key={key}
        {...{
          ...props,
          value: formState.ifsc.value,
          onChange: (value, isValid) => setFormState(prev => ({ ...prev, ifsc: { value, isValid } })),
        }}
      />
    ),
    upiid: (key, props) => (
      <Upi
        key={key}
        {...{
          ...props,
          value: formState.upiId.value,
          onChange: (value, isValid) => setFormState(prev => ({ ...prev, upiId: { value, isValid } })),
        }}
      />
    ),
    button: (key, props) => (
      <Button className="signup" key={key} {...props} />
    ),
    link: (key, props) => (
      <Link key={key} className="signin-link" {...props}>
        {props.text}
      </Link>
    ),
  };

  return (
    <>
      {!message ? (
        <div className="form-section">
          <form onSubmit={onSubmitHandle}>
            {props.inputComponents.map(({ component, details }, index) => {
              const key = `form-component-${component}-${index}`;
              return formComponents[component](key, details);
            })}
          </form>
          <div className="bottom-text">
            {props.bottomText}
            <Link to={props.signUpLink}>{props.linkText}</Link>
          </div>
        </div>
      ) : (
        <Alert severity="info">
          <AlertTitle>Thank you!</AlertTitle>
          {message}
        </Alert>
      )}
    </>
  );
};

export default FormSection;
