import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AnyObjectSchema } from 'yup';
import { Input } from 'components/core';

export enum FormFieldTypes {
  input,
  // file,
  // select,
  // multiSelect,
  // color,
}

export type FieldsType = {
  fieldType: FormFieldTypes;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  [inp: string]: any;
}[];

export type GeneratorProps = {
  submit: (data: any, helpers: any) => any;
  initialValues: {
    [inp: string]: any;
  };
  validator: AnyObjectSchema;
  fields: FieldsType;
  submitBtn: React.ReactNode | string;
  options?: React.ReactNode;
  optionsClass?: string;
};

export const Generator = ({
  initialValues,
  fields,
  validator,
  submitBtn,
  submit,
  options,
  optionsClass,
}: GeneratorProps) => {
  return (
    <section className="form-control">
      <Formik
        initialValues={initialValues}
        validationSchema={validator}
        onSubmit={submit}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            {fields.map(({ fieldType, ...other }, index) => (
              <FieldGenerator
                key={index}
                fieldType={fieldType}
                {...other}
              />
            ))}
            {Object.keys(errors).length > 0 && (
              <ul className="form-error">
                {Object.keys(errors).map(
                  (key, index) =>
                    touched[key] && (
                      <li className="text-error" key={`er_${index}`}>
                        <ErrorMessage name={key} />
                      </li>
                    ),
                )}
              </ul>
            )}
            <section className={optionsClass}>
              <button type="submit" disabled={isSubmitting} className="btn primary">
                {submitBtn}
              </button>
              {options}
            </section>
          </Form>
        )}
      </Formik>
    </section>
  );
};

type FieldProps = {
  fieldType: FormFieldTypes;
  name: string;
  [input: string]: any;
};

const FieldGenerator = ({ fieldType, ...others}: FieldProps) => {
  switch (fieldType) {
    case FormFieldTypes.input:
      return <Field as={Input} {...others} />;
    // case FormFieldTypes.select:
    //   return <SelectField name={name} {...others} />;
    // case FormFieldTypes.multiSelect:
    //   return <MultiSelectField name={name} {...others} />;
    // case FormFieldTypes.file:
    //   return <FileDropField name={name} />;
    // case FormFieldTypes.color:
    //   return <ColorPickerField name={name} {...others} />;
  }
};
