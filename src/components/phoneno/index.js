import { useState } from 'react';
import { validatePhoneNumber } from '../../utils/phone-number-validator'; // Assuming you have a phone number validation function
import { ExclamationMark } from '../icons';
import './styles.scss';

const PhoneNumber = (props) => {
  const { onChange, isValid, ...rest } = props;
  const [isError, setIsError] = useState(false);

  const onChangePhoneNumber = ({ target }) => {
    const isValid = validatePhoneNumber(target.value); // Replace with your actual phone number validation logic
    setIsError(!isValid);
    props.onChange(target.value, !!isValid);
  };

  const onBlurPhoneNumber = ({ target }) => {
    const isValid = validatePhoneNumber(target.value); // Replace with your actual phone number validation logic
    setIsError(!isValid);
  };

  const onFocusPhoneNumber = () => {
    setIsError(false);
  };

  return (
    <div className={`phone-number-component ${isError ? 'error' : ''}`}>
      <div className='phone-number-wrapper'>
        <div className="text">
          {props.label}
        </div>
        <input
          className='phone-number-input'
          type="tel"
          value={props.value}
          onBlur={onBlurPhoneNumber}
          onFocus={onFocusPhoneNumber}
          onChange={onChangePhoneNumber}
          {...rest}
        />
        <div className="error-icon"> <ExclamationMark/> </div>
      </div>
    </div>
  );
};

export default PhoneNumber;
