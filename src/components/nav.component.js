import React from 'react';

import {
  Link,
  Route
} from 'react-router-dom'

const NavLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Link className={match ? "active" : ""} to={to}>{label}</Link>
    )}
  />
);

class Nav extends React.Component {

  render(){
    return(
      <div className="navigation sticky-top">
      <ul>
      <li id="feeds"><NavLink activeOnlyWhenExact={true} to="/feeds" label="Feeds" /></li>
      <li id="player"><NavLink to="/" label="Player" /></li>
      </ul>
      </div>
    )
  }

}

export default Nav
