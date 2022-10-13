import React from "react";
import styled from "styled-components/native";
import { VotesProps } from "../interfaces";

const Text = styled.Text`
  font-size: 10px;
  color: ${(props) => props.theme.textColorOpacity};
`;

const Votes: React.FC<VotesProps> = ({ vote_average }) => (
  <Text>
    {vote_average ? `⭐️ ${vote_average.toFixed(1)}/10` : `Coming soon`}
  </Text>
);
export default Votes;
