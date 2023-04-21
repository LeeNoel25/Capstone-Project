import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../../AuthPage/LoginForm.jsx';
import SignUpForm from '../../AuthPage/SignUpForm.jsx';
import ForgetPassword from '../../AuthPage/ForgetPass.jsx';

const LoginRouter = ({ setMember }) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm setMember={setMember} />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
    </Routes>
  );
};

export default LoginRouter;