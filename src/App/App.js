import "./App.css";
import SignIn from "../sign-in/sign-in";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../dashboard/dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switcher />
      </Router>
    </div>
  );
}

//check auth and redirect if need
const Switcher = () => {
  const { isLoggedIn } = useSelector((state) => state);
  return (
    <Switch>
      <ReSignIn path="/" exact auth={isLoggedIn} component={SignIn} />
      <ReDashboard path="/dashboard" auth={isLoggedIn} component={Dashboard} />
    </Switch>
  );
};
const ReSignIn = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/dashboard" />)}
    />
  );
};
const ReDashboard = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/" />)}
    />
  );
};

export default App;
