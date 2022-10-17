import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { VMediaProps } from "../interfaces";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
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
}) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        original_title,
      },
    });
  };

  return (
    <Pressable
      onPress={goToDetail}
      style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1.0 }]}
    >
      <Movie>
        <Poster poster_path={poster_path} />
        <Title>
          {original_title.slice(0, 12)}
          {original_title.length > 12 ? "..." : null}
        </Title>
        <Votes vote_average={vote_average} />
      </Movie>
    </Pressable>
  );
};

export default VMedia;
