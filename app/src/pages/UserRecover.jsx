import React, { useState } from 'react';
import firebase from '../utils/firebase';
import history from '../utils/history';
import Link from '../components/Link';

const Recover = () => {
  const [formValues, setFormValues] = useState({});

  const inputValueChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth
      .sendPasswordResetEmail(formValues.email)
      .then(() => history.push('/sign_in'));
  };

  return (
    <main>
      <div className="row">
        <div className="medium-4 medium-offset-4 columns">
          <h3>Forgot Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="medium-12 columns">
                <label htmlFor="email">
                  Email
                  <input
                    required
                    name="email"
                    id="email"
                    autoComplete="off"
                    type="email"
                    onChange={inputValueChange}
                    value={formValues.email || ''}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="medium-12 columns">
                <input type="submit" value="Get reset password email" className="button" />
              </div>
            </div>
          </form>
          <Link to="/sign_in">Log in</Link>
          <br />
          <Link to="/sign_up">Sign up</Link>
          <br />
        </div>
      </div>
    </main>
  );
};

export default Recover;
