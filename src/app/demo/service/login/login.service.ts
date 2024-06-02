import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../model/SignInOut/login';
import { tap } from 'rxjs';
import * as decoder from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private readonly apiPath = 'https://localhost:7053/api/Login';
    constructor(private http: HttpClient) { }
    ExecuteLogin(login : Login) {
        return this.http.post<any>(this.apiPath + "/login",login).pipe(
            tap((response) => {
              if (response && response.data) {
                localStorage.setItem('jwt_token', response.data);
                console.log(this.getDecodedAccessToken(response.data))
              }
            })
          );
    }
    async logout() {
        await localStorage.removeItem('jwt_token');
    }

      getToken(): string {
        return localStorage.getItem('jwt_token');
      }

      getDecodedAccessToken(token: string): any {
        try {
          return decoder.jwtDecode(token);
        } catch(Error) {
          return null;
        }
      }

      isLoggedIn(): boolean {
        const token = this.getToken();
        return !!token;
      }
}
