import "./App.css";
import SignIn from "../sign-in/sign-in";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import FlightsBrowser from "../flights-browser/flights-browser";

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
      <ReFlights
        path="/flights"
        auth={isLoggedIn}
        component={FlightsBrowser}
      />
    </Switch>
  );
};
const ReSignIn = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/flights" />)}
    />
  );
};
const ReFlights = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/" />)}
    />
  );
};

export default App;
