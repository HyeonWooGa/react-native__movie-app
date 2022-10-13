import React from "react";
import styled from "styled-components/native";
import { VMediaProps } from "../interfaces";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.textColor};
`;

const VMedia: React.FC<VMediaProps> = ({
  poster_path,
  original_title,
  vote_average,
}) => (
  <Movie>
    <Poster poster_path={poster_path} />
    <Title>
      {original_title.slice(0, 13)}
      {original_title.length > 13 ? "..." : null}
    </Title>
    <Votes vote_average={vote_average} />
  </Movie>
);

export default VMedia;
