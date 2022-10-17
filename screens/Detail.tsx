import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  useEffect(() => {
    setOptions({
      title: params.original_title ?? "No Title",
    });
  }, []);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};

export default Detail;
