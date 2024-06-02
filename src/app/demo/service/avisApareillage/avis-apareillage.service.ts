import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AvisApareillage } from '../../model/avisApareillage/avis-apareillage';

@Injectable({
  providedIn: 'root'
})
export class AvisApareillageService {
    private readonly apiPath = 'https://localhost:7053/api/AvisApareillage';
    constructor(private http : HttpClient) { }
    ExecuteGetAllAvis() {
      return this.http.get<any>(this.apiPath + "/All").pipe(
          tap((response) => {
            if (response && response.data) {
            }
            else
              console.error("no data");
          })
        );
    }

    ExecuteInsertAvis(avisApareillage : AvisApareillage) {
        return this.http.post<any>(this.apiPath,avisApareillage).pipe(
            tap((response) => {
              if (response && response.data) {
              }
              else
                console.error("no data");
            })
          );
    }

    ExecuteDeleteAvis(id : number) {
        return this.http.delete<any>(this.apiPath + "/"+id).pipe(
            tap((response) => {
              if (response && response.data) {
              }
              else
                console.error("no data");
            })
          );
      }

}
