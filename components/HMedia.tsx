import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { HMediaProps } from "../interfaces";
import Poster from "./Poster";
import Votes from "./Votes";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  width: 80%;
  color: ${(props) => props.theme.textColorOpacity};
`;

const Release = styled.Text`
  font-size: 12px;
  margin: 10px 0;
  font-weight: 500;
  color: ${(props) => props.theme.textColorOpacity};
  opacity: 0.6;
`;

const Title = styled.Text`
  font-weight: 600;
  margin-top: 7px;
  color: ${(props) => props.theme.textColor};
`;

const HMedia: React.FC<HMediaProps> = ({
  poster_path,
  original_title,
  overview,
  release_date,
  vote_average,
}) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };

  return (
    <Pressable
      onPress={goToDetail}
      style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1 }]}
    >
      <HMovie>
        <Poster poster_path={poster_path} />
        <HColumn>
          <Title>
            {original_title.length > 30
              ? `${original_title.slice(0, 30)}...`
              : original_title}
          </Title>
          {release_date ? (
            <Release>
              {new Date(release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          {vote_average ? <Votes vote_average={vote_average} /> : null}
          <Overview>
            {!overview || overview.length > 140
              ? `${overview.slice(0, 140)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </Pressable>
  );
};

export default HMedia;
