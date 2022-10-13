export interface movie {
  id: string;
  backdrop_path: string;
  original_title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

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
