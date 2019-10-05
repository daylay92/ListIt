import { Route } from 'react-router-dom';
import React from 'react';

const AuthRoute = () => (
    <div className="container">
    <Route path='' exact render={() => <p>How far dashboard</p>} />
    </div>
);

export default AuthRoute;