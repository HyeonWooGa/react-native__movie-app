import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ScrollView, RefreshControl } from "react-native";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

export default function Tv() {
  const queryClient = useQueryClient();
  const {
    data: todayData,
    isLoading: isLoadingToday,
    isRefetching: isRefetchingToday,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    data: topData,
    isLoading: isLoadingTop,
    isRefetching: isRefetchingTop,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const {
    data: trendingData,
    isLoading: isLoadingTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery(["tv", "trending"], tvApi.trending);
  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };

  const loading = isLoadingToday || isLoadingTop || isLoadingTrending;
  const refreshing = isRefetchingToday || isRefetchingTop || isLoadingTrending;

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
}
