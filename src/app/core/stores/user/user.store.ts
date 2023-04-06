import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { createStore, propsFactory } from "@ngneat/elf";
import { localStorageStrategy, persistState } from "@ngneat/elf-persist-state";
import { combineLatest, Observable, switchMap } from "rxjs";
import { getDeviceString, getDeviceUuid } from "src/app/shared/plugins/device.plugin";
import { pipeTap, selector } from "src/app/shared/rxjs";
import { environment } from "src/environments/environment";

export interface User {
  Id: number,
  LastName: string,
  FirstName: string,
  CompanyId: number,
  CompanyName: string,
  Colour: string,
  FontColour: string,
  Token: string,
  Pin: string,
  Site: Site,
  DocumentListingTab: "Recent" | "Pinned" | "Issued",
  IsInSupervisorRole: boolean,
  HasRegisteredPlayerId: number,
  HasAssets: boolean,
  HasAssetCreation: boolean,
  HasDocQrCodes: boolean,
  HasHadWifiPreferenceChecked: boolean,
  HasUpdateableDocs: boolean,
  HasDocQueues: boolean,
  HasCompanies: boolean,
  HasDataTouchAreas: boolean,
  HasQueueSupervisors: boolean,
  HasCategoryActioners: boolean,
  UserSites: Site[],
  //UserCompanies: Company[],
  HasDocQRCodes: boolean,
  HasPlanningMeeting: boolean,
  HasReviewMeeting: boolean,
  HasCollabPlanning: boolean,
  HasRandomOperativebarcodes: boolean,
  HasDataWall: boolean,
  HasLiveQueues: boolean,
  HasResAreas:boolean,
  HasHideOperativeScan: boolean,
  HasSites: boolean,
  HasDocDrop: boolean,
  HasBasicOpInfo: boolean,
  HasSimpleSwipes: boolean,
  HasProjectsOnDocDrop: boolean,
  HasCustomLookups: boolean,
  HasTemplateSender: boolean,
  HasMyOpInfo: boolean,
  HasViewDocumentAsSinglePage: boolean,
  HasShowParentAnswersOnChildDoc: boolean,
  HasCompanySelectWithOtherOption:boolean,
  HideSearchOnOperativeInfo: boolean,
  HideSearchOnOperativeAccess: boolean,
  CanAddOperativesToDocsByName: boolean,
  HasRamsList: boolean,
  CanAddAsssetsToDocsByName: boolean,
  ShowWeightingsOnApp: boolean,
  TemplatesLastUpdate: Date,
  Url: string,
  UseFingerReader: boolean,
  SelectedSite: Site,
  NavTab: "Modules" | "Documents",
  NumberOfTemplates: number,
  DownloadedTemplates: number,
  //PermittedCategories: DocCategory[],
  HasOperativeInfo: boolean,
  CanOffHireAssets: boolean,
  CanViewOtherOperativeInfo: boolean,
  CanModifyOperativeQRs: boolean,
  CanAddQRsToAssets: boolean
}

export interface Site {
  Id: number,
  Name: string
}

const {
  withAppUser, 
  selectAppUser, 
  setAppUser
} = propsFactory("appUser", { initialValue: null as User | null });

const store = createStore(
  { name: "user" },
  withAppUser()
);

const userSelector = selector(store.pipe(selectAppUser()));
const sites$ = userSelector(user => user?.UserSites || []);

const setAppUserUpdate = pipeTap<User>(user => store.update(setAppUser(user)));

persistState(store, {
  key: "user",
  storage: localStorageStrategy
});

@Injectable({ providedIn: "root" })
export class UserStore {
  httpClient = inject(HttpClient);

  user$ = store.pipe(selectAppUser());
  sites$ = sites$;

  getUserRequest$ = (action$: Observable<{ token: string, pin: string }>) => combineLatest({
    login: action$,
    deviceId: getDeviceUuid(),
    deviceString: getDeviceString() 
  }).pipe(
    switchMap(({ login, deviceId, deviceString }) => this.httpClient.post<User>(`${environment.siteDocsApi}/LoginApi/LoginSiteDocumentsApp`, {
      deviceId,
      deviceString
    }, {
      headers: {
        appToken: login.token,
        appPin: login.pin
      }
    })),
    setAppUserUpdate()
  );
}