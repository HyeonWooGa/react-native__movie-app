import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import { movie } from "../interfaces";

const Container = styled.FlatList``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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
  const {
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    isLoading: isLoadingNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["nowPlaying"], moviesApi.nowPlaying);
  const {
    data: upcomingData,
    refetch: refetchUpcoming,
    isLoading: isLoadingUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(["upcoming"], moviesApi.upcoming);
  const {
    data: trendingData,
    refetch: refetchTrending,
    isLoading: isLoadingTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery(["trending"], moviesApi.trending);
  const onRefresh = async () => {
    refetchNowPlaying();
    refetchUpcoming();
    refetchTrending();
  };
  const renderVMedia = ({ item }) => (
    <VMedia
      key={item.id}
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      overview={item.overview}
      release_date={item.release_date}
    />
  );
  const movieKeyExtractor = (item) => item.id + "";
  const loading = isLoadingNowPlaying || isLoadingUpcoming || isLoadingTrending;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
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
            {nowPlayingData.results.map((movie: movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          <TrendingScroll
            data={trendingData.results}
            horizontal
            keyExtractor={movieKeyExtractor}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 30 }}
            ItemSeparatorComponent={VSeparator}
            renderItem={renderVMedia}
          />
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
          <TrendingScroll
            data={upcomingData.results}
            keyExtractor={movieKeyExtractor}
            ItemSeparatorComponent={HSeparator}
            renderItem={renderHMedia}
          />
        </>
      }
    />
  );
};

export default Movies;
