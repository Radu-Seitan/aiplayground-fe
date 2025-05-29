import { AIPlaygroundApiClient } from "../Base/BaseApiClient";
import { PlatformModel } from "../Models/PlatformModel";

export const PlatformsApiClient = {
  urlPath: "Platforms",

  getAllAsync(): Promise<PlatformModel[]> {
    return AIPlaygroundApiClient.get<PlatformModel[]>(this.urlPath).then(
      (response) => response.data
    );
  },

  getOneAsync(id: number): Promise<PlatformModel> {
    return AIPlaygroundApiClient.get<PlatformModel>(
      this.urlPath + "/" + id
    ).then((response) => response.data);
  },
};
