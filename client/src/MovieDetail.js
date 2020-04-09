import React from "react";
import {withRouter} from "react-router-dom";
import Table from "./components/table";
import {IMAGE_BASE_URL} from "./config";


class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      cast: [],
      relatedMovies: []
    };
  }

  componentWillMount() {
    const { movieId } = this.props.match.params;
    this.initializeScreen(movieId);
  }

  initializeScreen(movieId) {
    this.callAPI(movieId);
    this.callCastAPI(movieId);
    this.callRelatedAPI(movieId);
  }

  callAPI(movieId) {
    fetch(`http://localhost:9000/movies/${movieId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ details: res })
      });
  }

  callCastAPI(movieId) {
    fetch(`http://localhost:9000/movies/${movieId}/cast`)
      .then(res => res.json())
      .then(res => {
        this.setState({ cast: res.cast })
      });
  }

  callRelatedAPI(movieId) {
    fetch(`http://localhost:9000/movies/${movieId}/related`)
      .then(res => res.json())
      .then(res => {
        this.setState({ relatedMovies: res.results })
      });
  }

  onCastRowClick = (cast) => {

  };

  onRelatedMovieClick = (row) => {
    const { relatedMovies } = this.state;
    const movieId = relatedMovies[row.index].id;
    this.props.history.push(`/${movieId}`)
    this.initializeScreen(movieId);
  };

  render() {
    const { details, cast, relatedMovies } = this.state;
    const castColumns = [
      {
        Header: 'Character',
        accessor: 'col1',
      },
      {
        Header: 'Name',
        accessor: 'col2',
      },
    ];

    const castData = [];
    for (let i = 0; i < cast.length; i++) {
      castData.push({
        col1: cast[i].character,
        col2: cast[i].name,
      })
    }

    const relatedColumns = [
      {
        Header: 'Title',
        accessor: 'col1',
      },
      {
        Header: 'Vote Average',
        accessor: 'col2',
      },
    ];

    const relatedData = [];
    for (let i = 0; i < relatedMovies.length; i++) {
      relatedData.push({
        col1: relatedMovies[i].title,
        col2: relatedMovies[i].vote_average,
      })
    }
    return (
      <div style={styles.outline}>
        {'poster_path' in details && <img style={styles.image} src={`${IMAGE_BASE_URL}/${details.poster_path}`} />}
        <label style={styles.sectionHeader}><b>Movie Info</b></label>
        <label><b>Title: </b>{details.title}</label>
        <label><b>Overview: </b>{details.overview}</label>
        <label><b>Release date: </b>{details.release_date}</label>
        <label style={styles.sectionHeader}><b>Cast</b></label>
        <Table columns={castColumns} data={castData} onRowClick={this.onRowClick}  />
        <label style={styles.sectionHeader}><b>Related Movies</b></label>
        <Table columns={relatedColumns} data={relatedData} onRowClick={this.onRelatedMovieClick}  />
      </div>
    )
  }
}

const styles = {
  outline: {
    marginLeft: 16,
    marginRight: 16,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
  image: {
    width: '20%',
    resizeMode: 'contain',
  },
  sectionHeader: {
    marginTop: 30,
    marginBottom: 30,
    display: 'inline-block',
    fontSize: 24,
  },
};

export default withRouter(MovieDetail)