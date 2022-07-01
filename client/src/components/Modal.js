import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button, Modal as Mod } from 'semantic-ui-react';

class Modal extends React.Component {
  render() {
    console.log(this.props);
    return ReactDOM.createPortal(
      <div
        className="ui dimmer modals visible active"
        onClick={this.props.onDismiss}
      >
        <div
          className="ui standard modal visible active"
          onClick={(e) => e.stopPropagation()}
        >
          <i className="close icon" onClick={this.props.onDismiss}></i>
          <div className="ui link cards">
            <div className="ui centered card">
              <div className="image">
                <img src={this.props.show.imageUrl} height={500} />
              </div>
              <div className="content">
                <div className="header">{this.props.show.name}</div>
                <div className="meta">
                  <a>
                    Timings{' '}
                    {this.props.show.timings
                      .reduce((a, t) => (a += t + ','), '')
                      .slice(0, -1)}
                  </a>
                </div>
                <div className="description">Price {this.props.show.price}</div>
              </div>
              <div className="extra content">
                <span>{this.props.show.location}</span>

                <span className="right floated">
                  <button className="ui secondary button">Book</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Modal);
