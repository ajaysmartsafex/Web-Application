import React from 'react'
import { Link } from 'react-router-dom';

const EmailSupport = () => {
  return (
    <div className="eml_us">
      <p>Email for any inquiries Or Support:</p>
      <Link className='suppor_email' to="mailto:support@dpbossess.com">support@dpbossess.com</Link>
    </div>
  );
}

export default EmailSupport
