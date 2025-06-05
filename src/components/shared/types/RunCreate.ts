import { ModelRun } from "./ModelRun";

export interface RunCreate {
    promptId: number;
    modelRuns: ModelRun[];
}