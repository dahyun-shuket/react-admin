import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken, getTokenCookie} from './Common';

// handle the public routes
// function PublicRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/admin' }} />}
//     />
//   )
// }

// export default PublicRoute;

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      // render={(props) => (getToken() && restricted ? <Redirect to='/admin' /> : <Component {...props} />) }
      render={(props) => (getTokenCookie() && restricted ? <Redirect to='/admin' /> : <Component {...props} />) }
      
    />
  );
};

export default PublicRoute;