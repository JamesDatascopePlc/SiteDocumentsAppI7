import { environment } from "src/environments/environment";
import { createApi } from "./create-api";
import { memoize } from "lodash-es";
import { track } from "src/app/shared/rxjs/track";
import { BehaviorSubject } from "rxjs";

export interface HotspotProject {
  ID: number,
  Name: string,
  ProjectType: number,
  SiteId: number
}

export interface HighRiskActivity {
  Id: number,
  AreaName: string,
  SiteId: number
}

export const useCollabPlanApi = createApi({
  baseUrl: `${environment.siteDocsApi}/CollabPlanApi`,
  endpoints: ({ get }) => ({
    getProjects: get<HotspotProject[], { siteId: number }>("GetProjects"),
    getHighRiskActivities: get<HighRiskActivity[], { siteId: number }>("GetHighRiskActivities")
  })
});

export const useProjects = memoize((siteId: Nullable<number>) => {
  const { getProjects } = useCollabPlanApi();

  return track(() => siteId != null 
    ? getProjects({ siteId })
    : new BehaviorSubject([])
  );
});

export const useHighRiskActivities = memoize((siteId: Nullable<number>) => {
  const { getHighRiskActivities } = useCollabPlanApi();

  return track(() => siteId != null
    ? getHighRiskActivities({ siteId })
    : new BehaviorSubject([])
  );
})