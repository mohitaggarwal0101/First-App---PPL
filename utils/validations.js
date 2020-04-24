const emailCheck = {
    email: email => {
      const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      return re.test(email);
    },
  };
  
  export default emailCheck;