import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Bateau } from '../../model/bateau/bateau';

@Injectable({
  providedIn: 'root'
})
export class BateauService {
  private readonly apiPath = 'https://localhost:7053/api/Bateau';
  constructor(private http : HttpClient) { }
  ExecuteGetAllBateau() {
    return this.http.get<any>(this.apiPath + "/All").pipe(
        tap((response) => {
          if (response && response.data) {
          }
          else
            console.error("no data");
        })
      );
  }
  ExecuteGetAllBateauExtraDataUser(idProprietaire) {
    return this.http.get<any>(`${this.apiPath}/All/extraDataUser/Proprietaire/${idProprietaire}`).pipe(
        tap((response) => {
          if (response && response.data) {
          }
          else
            console.error("no data");
        })
      );
  }
  ExecuteInsertBateau(bateau : Bateau) {
    return this.http.post<any>(this.apiPath,bateau).pipe(
        tap((response) => {
          if (response && response.data) {
          }
          else
            console.error("no data");
        })
      );
  }
  ExecuteUpdateBateau(bateau : Bateau) {
    return this.http.put<any>(this.apiPath,bateau).pipe(
        tap((response) => {
          if (response && response.data) {
          }
          else
            console.error("no data");
        })
      );
  }
  ExecuteDeleteBateau(id : number) {
    return this.http.delete<any>(this.apiPath + "/"+id).pipe(
        tap((response) => {
          if (response && response.data) {
          }
          else
            console.error("no data");
        })
      );
  }
  ExecuteDeleteBateauByConcatId(concatId : string) {
    let form = new FormData();
    form.append("concatId",concatId)
    return this.http.post<any>(this.apiPath + "/List/concatId",form).pipe(
        tap((response) => {
          if (response && response.data) {
          }
          else
            console.error("no data");
        })
      );
  }
}
