import React from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../../../actions';
import ReactPaginate from 'react-paginate';
import LazyImage from './LazyImage';
import _ from 'lodash';

class Movie extends React.Component {
  componentDidMount() {
    this.props.getMovies();
  }

  renderImage() {
    return this.props.movies.map((movie) => (
      // <div className="ui segment" key={movie.id}>
      //   <div className="ui one column grid">
      <div className="ui card">
        <img src={`${movie.image}`} height={500} />
        {/* <LazyImage thumbnailUrl={photo.thumbnailUrl} src={photo.url} /> */}
        <div className="content">
          <div className="header">{movie.title}</div>
          <div className="meta">
            <a>
              {movie.genre.reduce((a, g) => (a += g + ','), '').slice(0, -1)}
            </a>
          </div>
        </div>
        <div className="extra content">
          <span className="right floated">
            <i className="heart icon"></i>
            {movie.rating}
          </span>
          <span>{movie.language}</span>
        </div>
      </div>
      //   </div>
      // </div>
    ));
  }

  render() {
    return !_.isUndefined(this.props.movies) ? (
      <div className="ui four doubling stackable cards">
        {this.renderImage()}
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.dashboard.movies,
  };
};

export default connect(mapStateToProps, { getMovies })(Movie);
