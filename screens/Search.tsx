import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.grayColor,
}))`
  background-color: ${(props) => props.theme.textColor};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

export default function Search() {
  const [query, setQuery] = useState("");
  const {
    isLoading: isLoadingMovies,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: isLoadingTv,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchMovies", query], tvApi.search, {
    enabled: false,
  });

  const onChangeText = (text: string) => {
    setQuery(text);
  };

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  console.log(isLoadingMovies, isLoadingTv);
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </Container>
  );
}
