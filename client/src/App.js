import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import './App.css';
import { bindActionCreators } from 'redux';
import * as chatActionCreators from './actions/actionCreators';

function App () {
  const { messages, isFetching, error } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const { getMessagesAction, createMessageAction } = bindActionCreators(
    chatActionCreators,
    dispatch
  );

  //получаем сообщения первоначально при открытии страницы
  useEffect(() => {
    //генерируем экшн на получение всех сообщений
    getMessagesAction();
  }, []);

  return (
    <>
      <h1>Test Chat</h1>
      <ol>
        {messages.map(m => (
          <li>
            {m.createdAt} {m.author}: {m.body}
          </li>
        ))}
      </ol>
      {error && <div>ERROR!!!</div>}
      {isFetching && <div>Wait.. data loading!</div>}
      <Formik
        initialValues={{ author: '', body: '' }}
        onSubmit={(values, formikBag) => {
          //сгенерируем экшн на создание сообщений
          createMessageAction(values);
          formikBag.resetForm();
        }}
      >
        {formik => (
          <Form>
            <Field name='author'></Field>
            <Field name='body'></Field>
            <button type='submit'>Send</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default App;
