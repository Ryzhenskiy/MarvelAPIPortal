import { useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charForm.scss';

const setContent = (process, Component, results, updateChar) => {
  switch (process) {
    case 'waiting':
      return (
        <Component
          results={results}
          updateChar={updateChar}
          process={process}
        />
      );

    case 'loading':
      return <Spinner />;

    case 'error':
      return <ErrorMessage />;

    default:
      throw new Error('Unexpected process state');
  }
};

export const CharForm = () => {
  const { process, setProcess, getCharacterByName, clearError } =
    useMarvelService();
  const [char, setChar] = useState(null);

  const onCharacterLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name)
      .then(onCharacterLoaded)
      .then(() => setProcess('waiting'));
  };

  const results = !char ? null : char.length > 0 ? (
    <div className="success_block">
      <span className="success">
        Success, we found him! Visit {char[0].name} page?
      </span>
      <Link
        to={`/characters/${char[0].id}`}
        className="button button__secondary"
      >
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="char__form">
      {setContent(process, View, results, updateChar)}
    </div>
  );
};

const View = ({ results, updateChar, process }) => {
  return (
    <>
      <span className="char__form_title">Or find a character by name:</span>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required field!'),
        })}
        onSubmit={(values) => updateChar(values.name)}
      >
        <Form className="char__form_mainblock">
          <div className="char__form_mainblock_inputblock">
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Enter name"
              className="input"
            />
            <button
              className="button button__main button__short"
              type="submit"
              disabled={process === 'loading'}
            >
              <div className="inner">Find</div>
            </button>
          </div>
          <div className="error"></div>
          <FormikErrorMessage className="error" name="name" component="div" />
          {results}
        </Form>
      </Formik>
    </>
  );
};
