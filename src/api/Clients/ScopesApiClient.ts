import { AIPlaygroundApiClient } from "../Base/BaseApiClient";
import { ScopeModel } from "../Models/ScopeModel";

export const ScopesApiClient = {
  urlPath: "Scopes",

  getAllAsync(): Promise<ScopeModel[]> {
    return AIPlaygroundApiClient.get<ScopeModel[]>(this.urlPath).then(
      (response) => response.data
    );
  },

  getOneAsync(id: number): Promise<ScopeModel> {
    return AIPlaygroundApiClient.get<ScopeModel>(this.urlPath + id).then(
      (response) => response.data
    );
  },

  createOneAsync(model: ScopeModel): Promise<ScopeModel> {
    return AIPlaygroundApiClient.post<ScopeModel>(this.urlPath, model).then(
      (response) => response.data
    );
  },

  updateOneAsync(model: ScopeModel): Promise<ScopeModel> {
    return AIPlaygroundApiClient.patch<ScopeModel>(
      this.urlPath + "/" + model.id,
      model
    ).then((response) => response.data);
  },

  deleteOneAsync(id: number): Promise<ScopeModel> {
    return AIPlaygroundApiClient.delete<ScopeModel>(
      this.urlPath + "/" + id
    ).then((response) => response.data);
  },
};
