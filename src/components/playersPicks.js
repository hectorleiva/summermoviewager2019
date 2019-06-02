import React from 'react';
import styled from 'styled-components';
import TableLayout from '../components/tableLayout';
import playersPicksList from './playersPicksList';

const SUMMOVWAG_SITE = process.env.GATSBY_SUMMOVWAG_SITE;

const PlayerContainer = styled.div`
    display: flex;
`;

const PlayerDetail = styled.div`
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 33.3333%;
    flex-basis: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImageWrapper = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FilmPosition = styled.div`
    display: grid;
`;

const FilmPlacement = styled.div`
    position: relative;
    left: 0.5rem;
    top: 1.5rem;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    font-size: 2.5rem;
    color: black;
    -webkit-text-stroke: 1px white;
`;

const Summary = styled.div`
    width: 100%;
    text-align: center;
    padding: 1rem;
`;

class PlayersPicks extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Summary>
                    Players and their picks for the Summer Movie Wager. Update to date information is located here at the <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${SUMMOVWAG_SITE}`}>
                            Official Summer Movie Wager site
                    </a>
                </Summary>
                <TableLayout>
                  {Object.keys(playersPicksList).map(player =>
                      <PlayerContainer key={player}>
                          <PlayerDetail>{player}</PlayerDetail>
                          <React.Fragment>
                              {playersPicksList[player].map((pick, index) => 
                                  <FilmPosition key={pick}>
                                      <FilmPlacement>{++index}</FilmPlacement>
                                      <ImageWrapper
                                          key={pick}
                                          src={require(`../images/${pick}.jpg`)}
                                      />
                                  </FilmPosition>
                              )}
                          </React.Fragment>
                      </PlayerContainer>
                  )}
                </TableLayout>
            </React.Fragment>
        );
    }
}

export default PlayersPicks;
