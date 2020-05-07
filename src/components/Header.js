import React from "react";
import { Link } from "react-router-dom";
import { startLogout } from "../actions/auth";
import { connect } from "react-redux";

const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className='header__content'>
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button onClick={startLogout} className='button button--link'>Log out</button>
      </div>
    </div>
  </header>
);
const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});
export default connect(undefined, mapDispatchToProps)(Header);
