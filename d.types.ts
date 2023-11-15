export interface movieRating {
    movieId: string;
    movieRating: "dislike" | "like" | "superlike" | "unset";
}

export interface Account {
    imageUrl: string;
    nickname: string;
    id: string;
    likedMoviesId: string[];
    movieRating: movieRating[];
}

export interface Movie {
    id: string;
    categoryId: number;
    movieName: string;
    thumbNailUrl:  string;
    properties:   string[];
    match:        string;
    minAge:        number;
    seriesCount:   number;
    quality:       string;
    new:         boolean;
    releaseYear: number;
    actors: string[];
    genres: string[];
    duration: string;
    description: string;
}