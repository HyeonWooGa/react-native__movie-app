import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import { Movie, MovieResponse } from "../interfaces";

const Container = styled.FlatList``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  color: ${(props) => props.theme.textColor};
`;

const TrendingScroll = styled.FlatList`
  margin-bottom: 40px;
  margin-top: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const {
    data: nowPlayingData,
    isLoading: isLoadingNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    data: upcomingData,
    isLoading: isLoadingUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const {
    data: trendingData,
    isLoading: isLoadingTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };
  const renderVMedia = ({ item }: { item: Movie }) => (
    <VMedia
      key={item.id}
      poster_path={item.poster_path || ""}
      original_title={item.original_title}
      vote_average={item.vote_average}
    />
  );
  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      poster_path={item.poster_path || ""}
      original_title={item.original_title}
      overview={item.overview}
      release_date={item.release_date}
    />
  );
  const movieKeyExtractor = (item: Movie) => item.id + "";
  const loading = isLoadingNowPlaying || isLoadingUpcoming || isLoadingTrending;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  return loading ? (
    <Loader />
  ) : (
    <Container
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData
              ? nowPlayingData.results.map((movie) => (
                  <Slide
                    key={movie.id}
                    backdrop_path={movie.backdrop_path || ""}
                    poster_path={movie.poster_path || ""}
                    original_title={movie.original_title}
                    vote_average={movie.vote_average}
                    overview={movie.overview}
                  />
                ))
              : null}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          {trendingData ? (
            <TrendingScroll
              data={trendingData.results}
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 30 }}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            />
          ) : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
          {upcomingData ? (
            <TrendingScroll
              data={upcomingData.results}
              keyExtractor={movieKeyExtractor}
              ItemSeparatorComponent={HSeparator}
              renderItem={renderHMedia}
            />
          ) : null}
        </>
      }
    />
  );
};

export default Movies;
