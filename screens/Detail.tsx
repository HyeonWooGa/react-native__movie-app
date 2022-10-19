import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Linking,
  Pressable,
  useColorScheme,
  Share,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import Poster from "../components/Poster";
import { Movie, Tv } from "../interfaces";
import { makeImgPath } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  Detail: Movie | Tv;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
  align-self: flex-end;
  flex-shrink: 1;
  margin-left: 15px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 20px 0px;
`;

const VideoBtn = styled.Pressable`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === "dark";
  const isMovie = "original_title" in params;

  const { isInitialLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV",
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareBtn />,
      });
    }
  }, [data]);

  const openYTLink = async (videoID: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data?.imdb_id}`
      : data?.hompage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out:${homepage}`,
        title: isMovie ? params.original_title : params.original_name,
      });
    } else {
      await Share.share({
        message: isMovie ? params.original_title : params.original_name,
        url: homepage,
      });
    }
  };

  const ShareBtn = () => (
    <Pressable
      onPress={shareMedia}
      style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1 }]}
    >
      <Ionicons
        name="share-outline"
        color={isDark ? "white" : "black"}
        size={24}
      />
    </Pressable>
  );

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", "black"]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster poster_path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isInitialLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn
            key={video.key}
            style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1 }]}
            onPress={() => openYTLink(video.key)}
          >
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
