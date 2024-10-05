import { useState } from "react";
import { ExclamationMark } from "../icons";

import "./styles.scss";

const AgentCode = (props) => {
  const { onChange, isValid, ...rest } = props;
  const [isError, setIsError] = useState(false);

  const onChangeAgentCode = ({ target }) => {
    const isValid = target.value !== "";
    setIsError(!isValid);
    props.onChange(target.value, !!isValid);
  };

  const onBlurAgentCode = ({ target }) => {
    const isValid = target.value !== "";
    setIsError(!isValid);
  };

  const onFocusAgentCode = () => {
    setIsError(false);
  };

  return (
    <div className={`name-component ${isError ? "error" : ""}`}>
      <div className="name-wrapper">
        <div className="text">Employee ID</div>
        <input
          className="name-input"
          type="text"
          value={props.value}
          onBlur={onBlurAgentCode}
          onFocus={onFocusAgentCode}
          onChange={onChangeAgentCode}
          {...rest}
        />
        <div className="error-icon">
          {" "}
          <ExclamationMark />{" "}
        </div>
      </div>
    </div>
  );
};

export default AgentCode;
