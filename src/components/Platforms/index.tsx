import { FC, useEffect, useState } from "react";

import { Platform } from "../shared/types/Platform";

import "./Platforms.css";
import { PlatformsApiClient } from "../../api/Clients/PlatformsApiClient";
import { PlatformModel } from "../../api/Models/PlatformModel";
import { ModelModel } from "../../api/Models/ModelModel";
import { Model } from "../shared/types/Model";

export const Platforms: FC = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  const fetchPlatforms = async () => {
    try {
      const res = await PlatformsApiClient.getAllAsync();

      const fetchedPlatforms = res.map(
        (e: PlatformModel): Platform => ({
          id: e.id,
          name: e.name,
          imageUrl: e.imageUrl,
          models: e.models.map(
            (model: ModelModel): Model => ({
              id: model.id,
              name: model.name,
              averageRating: model.averageRating,
            })
          ),
        })
      );

      setPlatforms(fetchedPlatforms);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  console.log(platforms);

  return <>Platforms</>;
};
