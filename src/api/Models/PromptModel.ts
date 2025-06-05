import { ModelBase } from "../Base/BaseModel";

export interface PromptModel extends ModelBase<number> {
    name: string;
    systemMessage: string;
    userMessage: string;
    expectedResult: string;
}