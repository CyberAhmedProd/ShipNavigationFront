import { Injectable } from '@angular/core';
import { Register } from '../../model/SignInOut/register';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly apiPath = 'https://localhost:7053/api/Login';
  constructor(private http : HttpClient) { }

  ExecuteRegister(register : Register) {
    register.telephone = register.telephone.toString()
    register.cin = register.cin.toString()
    register.role = register.role["code"];
    return this.http.post<any>(this.apiPath + "/register",register).pipe(
        tap((response) => {
          if (response && response.success) {
            console.log(response.data)
          }
        })
      );
}
}
