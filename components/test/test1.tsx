import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const SignupForm = () => {
  const isPasswordValid = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&+=]/.test(password);

    return {
      valid: hasUpperCase && hasNumber && hasSpecialChar,
      errors: {
        hasUpperCase: hasUpperCase,
        hasNumber: hasNumber,
        hasSpecialChar: hasSpecialChar,
      },
    };
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .test('password-validation', 'Invalid password', value => {
        const validation = isPasswordValid(value || '');

        if (!validation.valid) {
          return validation.errors;
        }

        return true;
      }),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      // Your form submission logic
      console.log(values);
    },
    validateOnChange: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div>
            {formik.errors.password.hasUpperCase ||
              'Must contain at least one uppercase letter.'}
            <br />
            {formik.errors.password.hasNumber ||
              'Must contain at least one number.'}
            <br />
            {formik.errors.password.hasSpecialChar ||
              'Must contain at least one special character (!@#$%^&+=).'}

            {!formik.errors.password.hasUpperCase ||
              !formik.errors.password.hasNumber ||
              !formik.errors.password.hasSpecialChar ||
              'Password must meet all requirements.'}
          </div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
