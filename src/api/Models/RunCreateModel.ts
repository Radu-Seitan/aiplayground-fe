import { ModelRunModel } from "./ModelRunModel";

export interface RunCreateModel {
  promptId?: number;
  modelRuns: ModelRunModel[];
}
