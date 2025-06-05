export interface PromptCreateModel {
    scopeId: number;
    name: string;
    systemMessage: string;
    userMessage: string;
    expectedResult: string;
}