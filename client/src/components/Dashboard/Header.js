import React from 'react';
import { logout, onClickHamburger } from '../../actions';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
      <div className="ui secondary  menu">
        <div className="item">
          <img
            style={{ cursor: 'pointer' }}
            src={
              this.props.isHamburgerActive
                ? 'https://cdn4.iconfinder.com/data/icons/lightly-2-essential/24/menu-vertical-512.png'
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'
            }
            alt="hamburger_icon"
            onClick={() => {
              this.props.onClickHamburger();
            }}
          />
        </div>
        <div className="right menu">
          <div className="item">{`Hey, ${this.props.user.username}`}</div>
          <div className="item">
            <button
              className="ui button"
              onClick={() => {
                this.props.logout();
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth,
    isHamburgerActive: state.header.isHamburgerActive,
  };
};

export default connect(mapStateToProps, {
  logout,
  onClickHamburger,
})(Header);
