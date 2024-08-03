export const validatePhoneNumber = (phoneNumber) => {
    // This regex allows for various formats, including international numbers
    const phoneRegex = /^[+]?[(]?\d{1,4}[)]?[-.\s]?[(]?\d{1,4}[)]?[-.\s]?\d{1,9}[-.\s]?\d{1,9}$/;
    
    return phoneRegex.test(phoneNumber);
  };
  