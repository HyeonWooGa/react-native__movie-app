import React from "react";
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
  return (
    <Container>
      <SearchBar placeholder="Search for Movie or TV Show" />
    </Container>
  );
}
