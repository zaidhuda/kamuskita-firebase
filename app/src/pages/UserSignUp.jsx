import React, { useState } from 'react';
import firebase from '../utils/firebase';
import history from '../utils/history';
import Link from '../components/Link';

const SignUp = () => {
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
    firebase.createUser(
      formValues.email,
      formValues.password,
      () => history.push('/'),
    );
  };

  return (
    <main>
      <div className="row">
        <div className="medium-4 medium-offset-4 columns">
          <h3>Sign up</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="medium-12 columns">
                <label htmlFor="email">
                  Email
                  <input
                    name="email"
                    id="email"
                    required
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
                  {' '}
                  <em>(12 characters minimum)</em>
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
              <div className="large-12 columns">
                <div className="callout">
                  <label htmlFor="privacy_policy">
                    <input id="privacy_policy" type="checkbox" required style={{ margin: 0 }} />
                    {' '}
                    I agree to the
                    {' '}
                    <Link target="_blank" to="/privacy">Privacy Policy</Link>
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="medium-12 columns">
                <input type="submit" value="Sign up" className="button" data-disable-with="Sign up" />
              </div>
            </div>
          </form>
          <Link to="/sign_in">Log in</Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
