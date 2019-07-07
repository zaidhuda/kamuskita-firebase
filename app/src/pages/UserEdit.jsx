import React, { useState, useEffect } from 'react';
import dig from 'object-dig';
import history from '../utils/history';
import firebase from '../utils/firebase';
import Link from '../components/Link';

const UserEdit = () => {
  const search = new URLSearchParams(history.location.search);
  const mode = search.get('mode');

  const [formValues, setFormValues] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setFormValues({
          displayName: dig(user, 'displayName'),
          email: dig(user, 'email'),
        });
      }
    });
  }, []);
  useEffect(() => () => {}, []);

  const inputValueChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (mode) {
      case 'resetPassword': {
        const oobCode = search.get('oobCode');
        firebase.auth.confirmPasswordReset(oobCode, formValues.password)
          .then(() => {
            history.push('/sign_in');
          }).catch((error) => {
            console.error(error);
          });
        break;
      }
      default: {
        user.updateProfile({
          displayName: formValues.displayName,
        }).then(() => {
          console.info('displayName changed');
        }).catch((error) => {
          console.error(error);
        });
      }
    }
  };

  const handleDeleteAccount = () => {
    user.delete().then(() => {
      history.push('/sign_in');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <main>
      <div className="row">
        <div className="medium-4 medium-offset-4 columns">
          <h3>Update User</h3>
          <form onSubmit={handleSubmit}>
            {
              !mode && user && (
              <div className="row">
                <div className="medium-12 columns">
                  <label htmlFor="displayName">
                    Name
                    <input
                      name="displayName"
                      id="displayName"
                      required
                      autoComplete="off"
                      type="text"
                      onChange={inputValueChange}
                      value={formValues.displayName || ''}
                    />
                  </label>
                </div>
              </div>
              )
            }
            {
              mode === 'resetPassword' && (
              <div className="row">
                <div className="medium-12 columns">
                  <label htmlFor="password">
                    New Password
                    <em>(6 characters minimum)</em>
                    <input
                      name="password"
                      id="password"
                      autoComplete="off"
                      type="password"
                      onChange={inputValueChange}
                      value={formValues.password || ''}
                    />
                  </label>
                </div>
              </div>
              )
            }
            {
              mode === '' && (
                <>
                  <div className="row">
                    <div className="medium-12 columns">
                      <label htmlFor="email">
                        Email
                        <input
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
                      <label htmlFor="current_password">
                        Current password
                        <input
                          name="current_password"
                          id="current_password"
                          autoComplete="off"
                          type="password"
                          onChange={inputValueChange}
                          value={formValues.current_password || ''}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )
            }
            <div className="row">
              <div className="medium-12 columns">
                <input type="submit" value="Update" className="button" />
                {' '}
                <Link to="/" className="button secondary">Cancel</Link>
              </div>
            </div>
          </form>
          {
            !mode && user && (
              <>
                <br />
                <br />
                <hr />
                <br />
                <br />
                <h3>Cancel account</h3>
                <p>
                  We will
                  {' '}
                  <strong>ONLY</strong>
                  {' '}
                  delete your account. All submitted definitions will be kept.
                </p>
                <button className="button alert" type="button" onClick={handleDeleteAccount}>Cancel my account</button>
              </>
            )
          }
        </div>
      </div>
    </main>
  );
};

export default UserEdit;
