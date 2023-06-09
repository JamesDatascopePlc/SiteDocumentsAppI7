import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { memoize } from "lodash-es";
import { Function } from "src/app/shared/types";
import { dependencyTrack } from "src/app/shared/rxjs/track";
import { of } from "rxjs";

export interface HotspotProject {
  ID: number,
  Name: string,
  ProjectType: number,
  SiteId: number
}

export const useCollabPlanApi = createApi({
  baseUrl: `${environment.siteDocsApi}/CollabPlanApi`,
  endpoints: ({ get }) => ({
    getProjects: get<HotspotProject[], { siteId: number }>("GetProjects")
  })
});

export const useProjects = memoize((binding: Function<{ siteId?: number }>) => {
  const { getProjects } = useCollabPlanApi();

  const track = dependencyTrack({
    binding,
    fn: params => params.siteId != null 
      ? getProjects({
        siteId: params.siteId
      })
      : of<HotspotProject[]>([])
  });

  track.fetch();

  return track;
});