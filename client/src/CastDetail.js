import React from "react";
import {withRouter} from "react-router-dom";
import {IMAGE_BASE_URL} from "./config";


class CastDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
  }

  componentWillMount() {
    const { castId } = this.props.match.params;
    this.initializeScreen(castId);
  }

  initializeScreen(castId) {
    this.callAPI(castId);
  }

  callAPI(castId) {
    fetch(`http://localhost:9000/cast/${castId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ details: res })
      });
  }

  render() {
    const { details } = this.state;
    return (
      <div style={styles.outline}>
        {'profile_path' in details && <img style={styles.image} src={`${IMAGE_BASE_URL}/${details.profile_path}`} />}
        <label style={styles.sectionHeader}><b>Person Info</b></label>
        <label><b>Name: </b>{details.name}</label>
        <label><b>Birthday: </b>{details.birthday}</label>
        <label><b>Popularity: </b>{details.popularity}</label>
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

export default withRouter(CastDetail)