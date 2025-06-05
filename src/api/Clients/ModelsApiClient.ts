import { AIPlaygroundApiClient } from "../Base/BaseApiClient";
import { ModelModel } from "../Models/ModelModel";

export const ModelsApiClient = {
  urlPath: "Models",

  async getAllAsync(): Promise<ModelModel[]> {
    return AIPlaygroundApiClient.get<ModelModel[]>(this.urlPath).then(
      (response) => response.data
    );
  },
};
