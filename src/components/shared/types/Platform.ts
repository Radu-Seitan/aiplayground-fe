import { Model } from "./Model";

export type Platform = {
  id: number;
  name?: string;
  imageUrl?: string;
  models: Model[];
};
