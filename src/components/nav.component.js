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
  constructor(props) {
    super(props)
    console.log(this.props);
  }

  render(){
    return(
      <div className="nav">
      <ul>
      <li id="feeds"><NavLink activeOnlyWhenExact={true} to="/" label="Feeds" /></li>
      <li id="player"><NavLink to="/player" label="Player" /></li>
      </ul>
      </div>
    )
  }

}

export default Nav
