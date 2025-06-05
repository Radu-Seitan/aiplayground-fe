import { ModelBase } from "../Base/BaseModel";

export interface RunModel extends ModelBase<number> {
    modelId: number;
    promptId: number;
    actualResponse: string;
    temperature: number;
    rating: number;
    userRating: number;
}