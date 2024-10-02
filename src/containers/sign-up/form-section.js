import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/login/signup";
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
// import AccountNo from "../../../components/accountno";
// import Ifsc from "../../../components/ifsc";
// import UpiId from "../../../components/upiid";
import { Alert, AlertTitle } from "@mui/material";

const FormSection = (props) => {
  const navigate = useNavigate();
  const [[name, isNameValid], setName] = useState(["", false]);
  const [[email, isEmailValid], setEmail] = useState(["", false]);
  const [[password, isPasswordValid], setPassword] = useState(["", false]);
  const [[phoneNo, isPhoneNoValid], setPhoneNo] = useState(["", false]);
  const [[agent_code, isAgentCodeValid], setAgentCode] = useState(["", false]);
  const [[accountNo, isAccountNoValid], setAccountNo] = useState(["", false]);
  const [[ifsc, isIfscValid], setIfsc] = useState(["", false]);
  const [[upiId, isUpiIdValid], setUpiId] = useState(["", false]);
  const [message, setMessage] = useState(null);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    if (
      !checkAllTrue([
        isEmailValid,
        isNameValid,
        isPasswordValid,
        isPhoneNoValid,
        isAgentCodeValid,
        isAccountNoValid,
        isIfscValid,
        isUpiIdValid,
      ])
    ) {
      sendErrorNotification("Form Incomplete - Please fill details below.");
      return;
    }
    const result = await register(
      name,
      email,
      password,
      phoneNo,
      agent_code,
      accountNo,
      ifsc,
      upiId
    );
    if (result.success) {
      sendSuccessNotification(result.message);
      setMessage("We will contact you soon!");
    } else {
      sendErrorNotification(result.message);
    }
  };

  const formComponents = {
    email: (key, props) => (
      <Email
        key={key}
        {...{
          ...props,
          value: email,
          onChange: (value, isValid) => setEmail([value, isValid]),
        }}
      />
    ),
    name: (key, props) => (
      <Name
        key={key}
        {...{
          ...props,
          value: name,
          onChange: (value, isValid) => setName([value, isValid]),
        }}
      />
    ),
    password: (key, props) => (
      <Password
        key={key}
        {...{
          ...props,
          value: password,
          onChange: (value, isValid) => setPassword([value, isValid]),
        }}
      />
    ),
    phoneno: (key, props) => (
      <PhoneNumber
        key={key}
        {...{
          ...props,
          value: phoneNo,
          onChange: (value, isValid) => setPhoneNo([value, isValid]),
        }}
      />
    ),
    agent_code: (key, props) => (
      <AgentCode
        key={key}
        {...{
          ...props,
          value: agent_code,
          onChange: (value, isValid) => setAgentCode([value, isValid]),
        }}
      />
    ),
    accountno: (key, props) => (
      <Accountno
        key={key}
        {...{
          ...props,
          value: accountNo,
          onChange: (value, isValid) => setAccountNo([value, isValid]),
        }}
      />
    ),
    ifsc: (key, props) => (
      <Ifsc
        key={key}
        {...{
          ...props,
          value: ifsc,
          onChange: (value, isValid) => setIfsc([value, isValid]),
        }}
      />
    ),
    upiid: (key, props) => (
      <Upi
        key={key}
        {...{
          ...props,
          value: upiId,
          onChange: (value, isValid) => setUpiId([value, isValid]),
        }}
      />
    ),
    button: (key, props) => (
      <Button className="signup" key={key} {...{ ...props }} />
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