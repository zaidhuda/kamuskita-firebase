import React, { useState } from 'react';
import firebase from '../utils/firebase';
import history from '../utils/history';
import Link from '../components/Link';

const SignIn = () => {
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
    firebase.signIn(
      formValues.email,
      formValues.password,
      () => history.push('/'),
    );
  };

  return (
    <main>
      <div className="row">
        <div className="medium-4 medium-offset-4 columns">
          <h3>Log in</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="medium-12 columns">
                <label htmlFor="email">
                  Email
                  <input
                    name="email"
                    id="email"
                    required
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
                <label htmlFor="password">
                  Password
                  <input
                    name="password"
                    id="password"
                    required
                    autoComplete="off"
                    type="password"
                    onChange={inputValueChange}
                    value={formValues.password || ''}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="medium-12 columns">
                <input type="submit" value="Log in" className="button" />
              </div>
            </div>
          </form>
          <Link to="/sign_up">Sign up</Link>
          <br />
          <Link to="/recover">Forgot password?</Link>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
