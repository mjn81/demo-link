import React from 'react';
import { Formik, Form } from 'formik';

export const CreateRoom = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({ errors }) => <Form></Form>}
    </Formik>
  );
};

