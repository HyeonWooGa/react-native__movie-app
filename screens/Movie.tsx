import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { movie } from "../interfaces";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "b9a221486250d0601edc387fbf688741";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  color: ${(props) => props.theme.textColor};
`;

const ScrollTrending = styled.ScrollView`
  margin-top: 20px;
`;

const MovieTrending = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 13px;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.textColor};
`;

const Average = styled.Text`
  color: ${(props) => props.theme.textColorOpacity};
  font-size: 12px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Movie() {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpComing(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=kr-KR&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
  };
  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
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
        containerStyle={{
          marginBottom: 30,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
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
      <ListTitle>Trending Movies</ListTitle>
      <ScrollTrending
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 10 }}
      >
        {trending.map((movie: movie) => (
          <MovieTrending key={movie.id}>
            <Poster poster_path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>
            <Average>⭐️{movie.vote_average.toFixed(1)}/10</Average>
          </MovieTrending>
        ))}
      </ScrollTrending>
    </Container>
  );
}
