import React from 'react';
import { connect } from 'react-redux';
import { getShows, getMovies, setModal, getShow } from '../../../actions';
import _ from 'lodash';

class Book extends React.Component {
  state = {
    sortTitle: false,
    sortLanguage: false,
    sortActive: 'title',
    filterCheck: 'language',
    filterValue: '',
    movies: '',
  };
  componentDidMount() {
    this.props.getShows();
    this.props.getMovies();
  }

  onClickViewDetails = (id) => {
    this.props.getShow(id);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedShow !== this.props.selectedShow) {
      const modal = {
        flag: !this.props.modal.flag,
        show: this.props.selectedShow,
      };
      if (!_.isEmpty(this.props.selectedShow)) {
        this.props.setModal(modal);
      }
    }
    if (prevProps.movies !== this.props.movies) {
      this.setState({ movies: this.props.movies });
    }
  }

  debounce = (cb, delay = 1000) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  filterMovies = this.debounce((text) => {
    this.setState({
      movies: this.props.movies.filter((movie) =>
        _.isArray(movie[this.state.filterCheck])
          ? movie[this.state.filterCheck].some((v) => v.includes(text))
          : movie[this.state.filterCheck].includes(text)
      ),
    });
  });

  renderLocation = (id) => {
    let idx = this.state.movies.findIndex((mov) => mov.id === id);
    let filteredShows = this.props.shows.filter((show) => show.movie_id === id);
    let location = _.isEmpty(filteredShows)
      ? 'No Show Available'
      : filteredShows
          .map((show) => show.location)
          .reduce((a, location) => (a += location + ','), '')
          .slice(0, -1);
    this.state.movies[idx].location = location;
    return location;
  };

  renderRows = () => {
    let movies = [];
    if (this.state.sortActive === 'title') {
      movies = this.state.sortTitle
        ? _.sortBy(this.state.movies, ['title'], [this.state.sortTitle])
        : _.sortBy(
            this.state.movies,
            ['title'],
            [this.state.sortTitle]
          ).reverse();
    } else {
      movies = this.state.sortLanguage
        ? _.sortBy(this.state.movies, ['language'], [this.state.sortLanguage])
        : _.sortBy(
            this.state.movies,
            ['language'],
            [this.state.sortLanguage]
          ).reverse();
    }
    return movies.map((movie) => {
      return (
        <tr key={movie.id}>
          <td>{movie['title']}</td>
          <td>
            {movie['cast'].reduce((a, c) => (a += c + ','), '').slice(0, -1)}
          </td>
          <td>{movie['language']}</td>
          <td>
            {movie['genre'].reduce((a, g) => (a += g + ','), '').slice(0, -1)}
          </td>
          <td>{this.renderLocation(movie.id)}</td>
          <td>
            <button
              onClick={() => this.onClickViewDetails(movie.id)}
              className="ui secondary button"
            >
              View Details
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return _.isEmpty(this.props.movies) ? null : (
      <div>
        <div className="ui segment">
          <div className="ui form">
            <div className="inline fields">
              <label>Filter by?</label>
              <div className="field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="frequency"
                    value="language"
                    onClick={(e) =>
                      this.setState({ filterCheck: e.target.value })
                    }
                    readOnly
                    checked={
                      'language' === this.state.filterCheck ? true : false
                    }
                  />
                  <label>Language</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="frequency"
                    value="location"
                    onClick={(e) =>
                      this.setState({ filterCheck: e.target.value })
                    }
                    readOnly
                    checked={
                      'location' === this.state.filterCheck ? true : false
                    }
                  />
                  <label>Location</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="frequency"
                    value="genre"
                    readOnly
                    onClick={(e) =>
                      this.setState({ filterCheck: e.target.value })
                    }
                    checked={'genre' === this.state.filterCheck ? true : false}
                  />
                  <label>Genre</label>
                </div>
              </div>
            </div>
          </div>
          <div className="ui input">
            <input
              type="text"
              placeholder="filter..."
              value={this.state.filterValue}
              onChange={(e) => {
                this.setState({ filterValue: e.target.value });
                this.filterMovies(e.target.value);
              }}
            />
          </div>
        </div>
        <table
          className="ui striped table"
          style={{ display: 'table', overflow: 'auto', whiteSpace: 'nowrap' }}
        >
          <thead>
            <tr>
              <th
                onClick={() =>
                  this.setState((prevState) => ({
                    sortTitle: !prevState.sortTitle,
                    sortActive: 'title',
                  }))
                }
                style={{ cursor: 'pointer' }}
              >
                Title{' '}
                <i
                  className={`sort ${
                    this.state.sortTitle ? 'up' : 'down'
                  } icon`}
                ></i>
              </th>
              <th>Cast</th>
              <th
                onClick={() =>
                  this.setState((prevState) => ({
                    sortLanguage: !prevState.sortLanguage,
                    sortActive: 'language',
                  }))
                }
                style={{ cursor: 'pointer' }}
              >
                Language{' '}
                <i
                  className={`sort ${
                    this.state.sortLanguage ? 'up' : 'down'
                  } icon`}
                ></i>
              </th>
              <th>Genre</th>
              <th>Locations</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody>
            {!_.isEmpty(this.state.movies) ? this.renderRows() : null}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.dashboard.movies,
    shows: state.dashboard.shows,
    modal: state.dashboard.modal,
    selectedShow: state.dashboard.selectedShow,
  };
};

export default connect(mapStateToProps, {
  getShows,
  getShow,
  getMovies,
  setModal,
})(Book);
