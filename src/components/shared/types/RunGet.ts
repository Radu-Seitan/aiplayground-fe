import { Model } from "./Model";
import { Prompt } from "./Prompt";

export interface RunGet {
  id: number;
  model: Model;
  prompt: Prompt;
  actualResponse: string;
  temperature: number;
  rating: number;
  userRating: number;
}
