import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { SlideProps } from "../interfaces";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"};
`;

const Average = styled(Overview)`
  font-size: 12px;
`;

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View>
      <BgImg
        source={{ uri: makeImgPath(backdrop_path) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={20}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster poster_path={poster_path} />
          <Column>
            <Title>{original_title}</Title>
            {vote_average ? (
              <Average isDark={isDark}>⭐️{vote_average}/10</Average>
            ) : null}
            <Overview isDark={isDark}>{overview.substring(0, 80)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
