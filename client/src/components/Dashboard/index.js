import React from 'react';
import { connect } from 'react-redux';
import { setModal } from '../../actions';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import Modal from '../Modal';

class Dashboard extends React.Component {
  state = {
    activeItem: 'movies',
  };
  onClickTab = (e) => {
    this.setState({
      ...this.state,
      activeItem: e.target.name,
    });
  };
  render() {
    return (
      <div>
        <Header />
        <div
          className="ui segment pushable"
          style={{
            height: '800px',
          }}
        >
          <div
            className={`ui inverted vertical labeled icon ui push left thin ${
              this.props.isHamburgerActive ? 'visible' : ''
            } sidebar menu`}
          >
            <Link
              to="/movies"
              className={`${
                this.state.activeItem === 'movies' ? 'active' : ''
              } item`}
              name="movies"
              onClick={this.onClickTab}
            >
              <i aria-hidden="true" className="video icon"></i>Movies
            </Link>
            <Link
              to="/book"
              className={`${
                this.state.activeItem === 'book' ? 'active' : ''
              } item`}
              name="book"
              onClick={this.onClickTab}
            >
              <i aria-hidden="true" className="play circle outline icon"></i>
              Book Tickets
            </Link>
          </div>
          <div
            className="pusher"
            style={{
              width: this.props.isHamburgerActive
                ? 'calc(100% - 150px)'
                : '100%',
            }}
          >
            <div
              className="ui basic segment"
              style={{ overflow: 'auto', height: '800px' }}
            >
              <Outlet />
            </div>
          </div>
        </div>
        {this.props.modal.flag && this.props.modal.show ? (
          <Modal
            show={this.props.modal.show}
            onDismiss={() => {
              this.props.setModal({
                flag: !this.props.modal.flag,
                show: {},
              });
            }}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isHamburgerActive: state.header.isHamburgerActive,
    modal: state.dashboard.modal,
  };
};

export default connect(mapStateToProps, { setModal })(Dashboard);
