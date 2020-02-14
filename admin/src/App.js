import React, { useContext, useEffect } from 'react'; 
import {
  Router,
  Switch
} from "react-router-dom";
import routes from './constants/routes.json';
import { LoginContext } from './contexts/LoginContext';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './containers/LoginPage';
import DashboardPage from './containers/DashboardPage';
import MembersPage from './containers/MembersPage';
import CategoryPage from './containers/CategoryPage';
import history from './utils/history';
import DefaultLayout from './containers/DefaultLayout';
import 'typeface-roboto';

function App() {
  const loginStore = useContext(LoginContext)
  console.log(loginStore)
  useEffect(() => {
    loginStore.validateToken()
  },[])
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute exact path={routes.LOGIN} component={LoginPage}/>
        <DefaultLayout>
          <PrivateRoute exact path={routes.DASHBOARD} component={DashboardPage}/>
          <PrivateRoute exact path={routes.MEMBERS} component={MembersPage}/>
          <PrivateRoute exact path={routes.CATEGORY} component={CategoryPage}/>
        </DefaultLayout>
      </Switch>
    </Router>
  );
}

export default App;
