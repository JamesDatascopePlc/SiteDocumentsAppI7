import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { Area, Company } from "../stores/user/user.store";

@Injectable({ providedIn: "root" })
export class LoginApi {
  http = inject(HttpClient);
  
  getCompanies() {
    return this.http.get<Company[]>(`${environment.siteDocsApi}/LoginApi/GetCompanies`);
  }

  getAreas() {
    return this.http.get<Area[]>(`${environment.siteDocsApi}/LoginApi/GetAreas`);
  }
}