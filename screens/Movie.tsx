import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { movie } from "../interfaces";
import Slide from "../components/Slide";

const API_KEY = "b9a221486250d0601edc387fbf688741";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Movie() {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=kr-KR&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie: movie) => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            original_title={movie.original_title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </Swiper>
    </Container>
  );
}
