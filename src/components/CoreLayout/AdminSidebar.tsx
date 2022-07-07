import * as React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

function Header(): any {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
        <li>
          <Link to="/product">product</Link>
        </li>
        <li>
          <Link to="/order">Order</Link>
        </li>
      </ul>
    </Router>
  );
}

export default Header;
