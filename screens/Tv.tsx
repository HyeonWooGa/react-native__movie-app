import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

export default function Tv() {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { data: todayData, isLoading: isLoadingToday } = useQuery(
    ["tv", "today"],
    tvApi.airingToday
  );
  const { data: topData, isLoading: isLoadingTop } = useQuery(
    ["tv", "top"],
    tvApi.topRated
  );
  const { data: trendingData, isLoading: isLoadingTrending } = useQuery(
    ["tv", "trending"],
    tvApi.trending
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = isLoadingToday || isLoadingTop || isLoadingTrending;

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
