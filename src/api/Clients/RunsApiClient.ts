import { AIPlaygroundApiClient } from "../Base/BaseApiClient";
import { RunCreateModel } from "../Models/RunCreateModel";
import { RunModel } from "../Models/RunModel";

export const RunsApiClient = {
  urlPath: "Runs",

  async runAsync(model: RunCreateModel): Promise<RunModel[]> {
    return AIPlaygroundApiClient.post<RunModel[]>(this.urlPath, model).then(
      (response) => response.data
    );
  },
};
