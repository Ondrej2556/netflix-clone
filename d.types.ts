export interface Account {
    imageUrl: string;
    nickname: string;
    id: string;
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