import React from "react";
import { Link, NavLink } from "react-router-dom";
import { account } from "../services/userService";
import { IconContext } from "react-icons";
import { IoBagHandle } from "react-icons/io5";
import "bootstrap/js/src/collapse.js"; // the import is to make the navbar toggle work
import {store} from "../utils/shared-state.js";


export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
}

componentDidMount() {

    this.unsub = store.subscribe(() => this.setState(store.getState()));
}

componentWillUnmount() {
    this.unsub();
}


  async componentDidMount(){
    this.unsub = store.subscribe(() => this.setState(store.getState()));
    const {data} = await account();
    this.setState({ user : data.user});
  }
  componentWillUnmount(){
    this.unsub();
  }

  countItems = () => {
    var totalItems = 0;
    this.state.carts.map(item => 
        totalItems += item.quantity
    )
    return totalItems;
}
  render(){
    const {user} = this.state;
    return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
        NewFlix
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies">
              Films
            </NavLink>
          </li>
          {user && user.isAdmin ? (
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              Clients
            </NavLink>
          </li>):""}
          {user && user.isAdmin ? (
          <li className="nav-item">
            <NavLink className="nav-link" to="/rentals">
              Commandes
            </NavLink>
          </li>
          ):""}
          {!user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Se connecter
                </NavLink>
              </li>
          ) : ""}
          {!user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Inscription
                </NavLink>
              </li>
          ): ""}
          {user ? (
              <li className="nav-item"> 
                <NavLink className="nav-link" to="/account">
                  {user.firstname}
                </NavLink>
              </li>) : ""}
          {user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Se deconnecter
                </NavLink>
              </li>
          ): ""}
        </ul>
        {user && !user.isAdmin ? <Link className="mdl-navigation__link mdl-typography--text-uppercase" to="/cart" activeClassName="active">
        <IconContext.Provider value={{ size: "1.5em" }}><IoBagHandle /> </IconContext.Provider>({this.countItems()})</Link> : ""}
      </div>
    </nav>
  );
          }
};

export default Navbar;
