import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.scss';

const Nav = (props) => (
  <div className="nav">
    <Link to="/intake">
      <img src="images/feedingcommunitywhite-501706b0bf803ec56edaa0832a85fed3.png" className="logo" alt="logo in nav"></img>
      {/* <h2 className="nav-title"></h2> */}
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/intake">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Intake Form' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.account_type === 1 && (
        <>
          {/* <Link className="nav-link" to="/intake">
            Intake Form
          </Link> */}
          <Link className="nav-link" to="/drivers">
            Current Route
          </Link>
          <LogOutButton className="nav-link" />
        </>
      )}
      {props.user.account_type === 5 && (
        <>
          <Link className="nav-link" to="/accounts">
            Accounts
          </Link>
          {/* <Link className="nav-link" to="/intake">
            Intake Form
          </Link> */}
          <Link className="nav-link" to="/orders">
            Orders
          </Link>
          <LogOutButton className="nav-link" />
        </>
      )}
      {props.user.account_type === 10 && (
        <>
          <Link className="nav-link" to="/accounts">
            Accounts
          </Link>
          {/* <Link className="nav-link" to="/intake">
            Intake Form
          </Link> */}
          <Link className="nav-link" to="/orders">
            Orders
          </Link>
          <Link className="nav-link" to="/admin">
            Admin
          </Link>
          <LogOutButton className="nav-link" />
        </>
      )}
      {/* Always show this link since the about page is not protected */}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
