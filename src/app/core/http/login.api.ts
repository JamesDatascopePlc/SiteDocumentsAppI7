import { environment } from "src/environments/environment";
import { Area, Company, Site } from "../stores/user/user.store";
import { AspNetData, createApi } from "./create-api";
import { CategoryActioner } from "../stores/category-actioners/category-actioners.store";
import { memoize } from "lodash-es";
import { track } from "src/app/shared/rxjs";
import { BehaviorSubject, map } from "rxjs";

export interface RamsItem {
  Reference: string,
  Description: string,
  SiteId: number,
  ExpiryDate: Date | null
}

export interface GetCategoryActionerParams {
  categoryId: number
}

export interface ResponsibilityAreaType {
  Id: number,
  TypeName: string,
  AppQuestionText: string,
  Areas: ResponsibilityArea[]
}

export interface ResponsibilityArea {
  Id: number,
  Name: string,
  DocResAreaTypeId: number,
  SiteId?: number
}

export const useLoginApi = createApi({
  baseUrl: `${environment.siteDocsApi}/LoginApi`,
  endpoints: ({ get }) => ({
    getCompanies: get<Company[]>("GetCompanies"),
    getSites: get<Site[]>("GetSites"),
    getAreas: get<Area[]>("GetAreas"),
    getRams: get<AspNetData<RamsItem>[]>("GetRams"),
    getCategoryActioners: get<CategoryActioner[], GetCategoryActionerParams>("GetCategoryActioners"),
    getResAreaTypes: get<ResponsibilityAreaType[]>("GetResAreas")
  })
});

export const useSites = memoize(() => {
  const { getSites } = useLoginApi();

  return track(() => getSites());
});

export const useCompanies = memoize(() => {
  const { getCompanies } = useLoginApi();

  return track(() => getCompanies());
});

export const useAreas = memoize(() => {
  const { getAreas } = useLoginApi();

  return track(() => getAreas());
});

export const useRams = memoize(() => {
  const { getRams } = useLoginApi();

  const rams = track(() => getRams().pipe(
    map(rams => rams.map(r => ({
      ...r,
      ExpiryDate: r.ExpiryDate?.toDate()
    })))
  ));

  return {
    ...rams,
    thatArentExpiredToday: rams.data(items => items.filter(item => item.ExpiryDate == null || item.ExpiryDate.isEqualOrAfterToday()))
  }
});


export const useCategoryActioners = memoize((categoryId: Nullable<number>) => {
  const loginApi = useLoginApi();

  return track(() => categoryId != null 
    ? loginApi.getCategoryActioners({ categoryId })
    : new BehaviorSubject([]))
});

export const useResAreaTypes = memoize(() => {
  const { getResAreaTypes } = useLoginApi();

  const resAreaTypes = track(() => getResAreaTypes());

  return {
    ...resAreaTypes,
    areas: resAreaTypes.data(types => types.flatMap(t => t.Areas))
  }
})