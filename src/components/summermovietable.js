import React from "react"
import axios from "axios";
import PlayersPicks from "./playersPicks";
import {
  VictoryBar,
  VictoryGroup,
  VictoryLabel
} from "victory";

const S3_SUMMOVWAG_LOCATION = process.env.GATSBY_SUMMOVWAG_LOC;

class SummerMovieTable extends React.Component {
  state = {
    loading: false,
    error: false,
    sumMovData: {
      players: [],
      upcomingReleases: []
    },
    intervalId: null
  };

  componentDidMount() {
    this.fetchSummerMovieWager();
    this.setState({
      intervalId: setInterval(this.fetchSummerMovieWager, 43200) // 43200 = 12 hours
    });
  }

  componentDidCatch() {
    this.setState({
      intervalId: null
    });
  }

  fetchSummerMovieWager = () => {
    this.setState({ loading: true });
    axios
      .get(S3_SUMMOVWAG_LOCATION)
      .then(response => {
        const {
          players,
          upcoming_releases
        } = response.data;

        this.setState({
          loading: false,
          sumMovData: {
            players,
            upcomingReleases: upcoming_releases
          }
        })
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  }

  barGraphColorFilling = (score) => {
    if (score < 20) {
      return '#4292f4'; // blue
    } else if (score >= 20 && score <= 25) {
      return '#f4f141'; // yellow
    } else if (score > 25) {
      return '#f48e41'; // blood orange
    }
  }

  render() {
    const { players } = this.state.sumMovData;
    const sortedPlayers = players.sort((a , b) => {
      return Number(a.score) - Number(b.score);
    });

    return (
      <React.Fragment>
        <PlayersPicks />
        <VictoryGroup
          domainPadding={25}
          animate={{
            duration: 300,
            onLoad: { duration: 1000 }
          }}
        >
          <VictoryBar
            labels={(d) => `${d.name}\n ${d.score}`}
            data={sortedPlayers}
            x="name"
            y="score"
            style={{
              data: {
                fill: (d) => {
                  return this.barGraphColorFilling(d.score)
                }
              }
            }}
            labelComponent={
              <VictoryLabel
                angle={25}
                style={{
                  fontSize: 5
                }}
              />
            }
          />
        </VictoryGroup>
      </React.Fragment>
    );
  }
}

export default SummerMovieTable
