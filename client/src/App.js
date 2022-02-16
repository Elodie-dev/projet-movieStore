import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import User from "./components/user";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navbar";
import Cart from "./components/cart.jsx";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Footer from "./components/footer";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
  }
  state = {};

  async componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    
    
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/cart" component={Cart} />
            <ProtectedRoute
              path="/account"
              render={(props) => <User {...props} user={user} />}
            />
            <ProtectedRoute path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
