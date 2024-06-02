import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Equipage } from '../../model/equipage/equipage';

@Injectable({
  providedIn: 'root'
})
export class EquipageService {

    private readonly apiPath = 'https://localhost:7053/api/Equipage';
    constructor(private http : HttpClient) { }
    ExecuteGetAllBateau() {
      return this.http.get<any>(this.apiPath + "/All").pipe(
          tap((response) => {
            if (response && response.data) {
            }
            else
              console.error(response);
          })
        );
    }
    ExecuteGetAllBateauIdProprietaire(idProprietaire) {
        return this.http.get<any>(`${this.apiPath}/All/Proprietaire/${idProprietaire}`).pipe(
            tap((response) => {
              if (response && response.data) {
              }
              else
                console.error(response);
            })
          );
    }
    ExecuteGetAllEquipageByIdBateau(idBateau : number) {
      return this.http.get<any>(`${this.apiPath}/All/Bateau/${idBateau}`).pipe(
          tap((response) => {
            if (response && response.data) {
            }
            else
              console.error("no data");
          })
        );
    }
    ExecuteInsertEquipage(equipage : Equipage) {
      return this.http.post<any>(this.apiPath,equipage).pipe(
          tap((response) => {
            if (response && response.data) {
            }
            else
              console.error("no data");
          })
        );
    }
    ExecuteUpdateEquipage(equipage : Equipage) {
      return this.http.put<any>(this.apiPath,equipage).pipe(
          tap((response) => {
            if (response && response.data) {
            }
            else
              console.error("no data");
          })
        );
    }
    ExecuteDeleteEquipage(id : number) {
      return this.http.delete<any>(this.apiPath + "/"+id).pipe(
          tap((response) => {
            if (response && response.data) {
            }
            else
              console.error("no data");
          })
        );
    }
    ExecuteDeleteEquipageByConcatId(concatId : string) {
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
