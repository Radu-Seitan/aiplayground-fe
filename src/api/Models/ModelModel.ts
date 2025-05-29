import { ModelBase } from "../Base/BaseModel";

export interface ModelModel extends ModelBase<number> {
  name?: string;
  averageRating: number;
}
