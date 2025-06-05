export interface Run {
    id: number;
    modelId: number;
    promptId: number;
    actualResponse: string;
    temperature: number;
    rating: number;
    userRating: number;
}
