import React from 'react';
import LogIn from '../views/LogIn/LogIn';
import SignUp from '../views/SignUp/SignUp';
import ForgotPassword from '../views/ForgotPassword/ForgotPassword';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import VerifyEmail from '../views/VerifyEmail/VerifyEmail';
import Home from '../views/Home/Home';
import ContactMe from '../views/ContactMe/ContactMe';
import Test from '../Tests/Test';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Route path='/login' component={LogIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/home' component={Home} />
      <Route path='/contactMe' component={ContactMe} />
      <Route path='/forgotPassword' component={ForgotPassword} />
      <Route path='/resetPassword/:token' component={ResetPassword} />
      <Route path='/verifyEmail/:token' component={VerifyEmail} />
      <Route path='/test' component={Test} />
      <Route path='/' component={Home} exact />
    </Router>
  );
};

export default App;
