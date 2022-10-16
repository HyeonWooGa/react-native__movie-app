import React, { useState } from "react";
import styled from "styled-components/native";

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
  const onChangeText = (text: string) => {
    setQuery(text);
  };
  // console.log(query); // onChangeText 함수 안에 있으면 제대로 적용 안됨
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        returnKeyType="search"
        onChangeText={onChangeText}
      />
    </Container>
  );
}
