import { Route } from 'react-router-dom';
import React from 'react';
import DefaultLayout from '../hocs/layout/default/DefaultLayout';
import Landing from '../components/home/Home';
import SignUp from '../components/auth/signup/SignUp';
import LogIn from '../components/auth/login/Login';


const DefaultRoute = () => (
  <DefaultLayout>
    <Route path='/signup' exact component={SignUp} />
    <Route path='/login' exact component={LogIn} />
    <Route path='/' exact component={Landing} />
  </DefaultLayout>
);

export default DefaultRoute;
