import React from "react";
import Table from "./components/table";
import {
  withRouter
} from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchText: '',
      searchMovies: [],
    };
  }

  callAPI() {
    fetch("http://localhost:9000/movies")
      .then(res => res.json())
      .then(res => {
        this.setState({ movies: res.results })
      });
  }

  componentWillMount() {
    this.callAPI();
  }

  onRowClick = (row) => {
    const { movies } = this.state;
    const movieId = movies[row.index].id;
    this.props.history.push(`/${movieId}`)
  };

  onSearchRowClick = (row) => {
    const { searchMovies } = this.state;
    const movieId = searchMovies[row.index].id;
    this.props.history.push(`/${movieId}`)
  };

  searchMovie = () => {
    const { searchText } = this.state;
    fetch(`http://localhost:9000/search/${searchText}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ searchMovies: res.results })
      });
  };

  handleChange = (e) => {
    this.setState({ searchText: e.target.value })
  };

  render() {
    const { movies, searchMovies } = this.state;

    const columns = [
      {
        Header: 'Title',
        accessor: 'col1',
      },
      {
        Header: 'Vote Average',
        accessor: 'col2',
      },
    ];

    const dataInput = [];
    for (let i = 0; i < movies.length; i++) {
      dataInput.push({
        col1: movies[i].title,
        col2: movies[i].vote_average,
      })
    }

    const searchDataInput = [];
    for (let i = 0; i < searchMovies.length; i++) {
      searchDataInput.push({
        col1: searchMovies[i].title,
        col2: searchMovies[i].vote_average,
      })
    }

    return (
      <div style={styles.outline}>
        <label style={styles.sectionHeader}><b>Search Movies</b></label>
        <div style={styles.searchOutline}>
          <input
            type="text"
            className="input"
            id="searchInput"
            placeholder="Search for movie..."
            onChange={this.handleChange}
          />
          <button className="button is-info" onClick={this.searchMovie}>
            Search
          </button>
        </div>
        {searchMovies.length > 0 && <Table columns={columns} data={searchDataInput} onRowClick={this.onSearchRowClick}  />}
        <label style={styles.sectionHeader}><b>Popular Movies</b></label>
        <Table columns={columns} data={dataInput} onRowClick={this.onRowClick}  />
      </div>
    );
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
  sectionHeader: {
    marginTop: 30,
    marginBottom: 30,
    display: 'inline-block',
    fontSize: 24,
  },
  searchOutline: {
    flexDirection: 'row',
    marginBottom: 16,
  }
};

export default withRouter(Home)
