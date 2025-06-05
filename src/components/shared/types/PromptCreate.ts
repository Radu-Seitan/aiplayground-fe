export type PromptCreate = {
    scopeId?: number;
    name?: string;
    systemMessage?: string;
    userMessage?: string;
    expectedResult?: string;
};