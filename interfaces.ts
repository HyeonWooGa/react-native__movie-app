export interface SlideProps {
  backdrop_path: string;
  original_title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

export interface PosterProps {
  poster_path: string;
}

export interface HMediaProps {
  poster_path: string;
  original_title: string;
  overview: string;
  release_date?: string;
  vote_average?: number;
}

export interface VMediaProps {
  poster_path: string;
  original_title: string;
  vote_average: number;
}

export interface VotesProps {
  vote_average: number;
}

export interface BaseResponse {
  page?: number;
  total_pages?: number;
  total_results?: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface HListProps {
  title: string;
  data: any[];
}

export interface Tv {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}
