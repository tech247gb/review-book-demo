export interface Book {
    id?: number;  // Optional id for some cases
    title: string;
    author: string;
    review: string;
    coverImage: string;
    rating: number;
    featured?:boolean
}
