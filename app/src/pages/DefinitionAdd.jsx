import React, { useState } from 'react';
import firebase from '../utils/firebase';
import history from '../utils/history';
import Link from '../components/Link';

const AddDefinition = () => {
  const search = new URLSearchParams(history.location.search);
  const word = search.get('word');

  const [formValues, setFormValues] = useState({ word });

  const inputValueChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.addDefinition(formValues, key => history.push(`/${key}`));
  };

  return (
    <div className="row">
      <div className="medium-12 columns">
        <main>
          <h3>New definition</h3>
          <div className="callout secondary">
            <h6>
              Adding definition
              {' '}
              <strong>anonymously</strong>
              .
              <br />
              <Link to="/sign_in">Login</Link>
              {' '}
              or
              {' '}
              <Link to="/sign_up">sign up</Link>
              {' '}
              to enable editing.
            </h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="large-12 columns">
                <label htmlFor="word">
                  Word
                  <input
                    onChange={inputValueChange}
                    required
                    type="text"
                    name="word"
                    id="word"
                    value={formValues.word || ''}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="large-12 columns">
                <label htmlFor="definition">
                  Definition
                  <textarea
                    onChange={inputValueChange}
                    rows="5"
                    required
                    name="definition"
                    id="definition"
                    value={formValues.definition || ''}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="large-12 columns">
                <label htmlFor="example">
                  Example
                  <textarea
                    onChange={inputValueChange}
                    rows="5"
                    name="example"
                    id="example"
                    value={formValues.example || ''}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="large-12 columns">
                <div className="callout">
                  <p>
                    Enclose words in definition and example within
                    {' '}
                    <code>[</code>
                    {' '}
                    <code>]</code>
                    {' '}
                    for automatic definition linking.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="large-12 columns">
                <label htmlFor="tags">
                  Tags (comma separated)
                  <input
                    onChange={inputValueChange}
                    type="text"
                    name="tags"
                    id="tags"
                    value={formValues.tags || ''}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="large-12 columns">
                <div className="callout">
                  <label htmlFor="word_confirmation">
                    <input type="checkbox" id="word_confirmation" required style={{ margin: 0 }} />
                    {' '}
                    Submit definition for
                    {' '}
                    <strong>{formValues.word}</strong>
                  </label>
                  <label htmlFor="agreement">
                    <input type="checkbox" id="agreement" required style={{ margin: 0 }} />
                    {' '}
                    I agree to the
                    {' '}
                    <Link target="_blank" to="/privacy">Privacy Policy</Link>
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="large-12 columns">
                <input type="submit" value="Submit" className="button" />
                {' '}
                <Link className="button secondary" to="/">Cancel</Link>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddDefinition;
