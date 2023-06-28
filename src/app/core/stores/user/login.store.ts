import { memoize } from "lodash-es"

export interface Login {
  loginId: number,
  typeId: number,
  siteId: number,
  hotspotId: number,
  parentDocId: number,
  tokenId?: number,
  issuedToId?: number
}

export const useLogin = memoize(() => {
  
});