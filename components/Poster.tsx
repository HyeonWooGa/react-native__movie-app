import React from "react";
import styled from "styled-components/native";
import { PosterProps } from "../interfaces";
import { makeImgPath } from "../utils";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Poster: React.FC<PosterProps> = ({ poster_path }) => {
  return <Image source={{ uri: makeImgPath(poster_path) }} />;
};

export default Poster;
