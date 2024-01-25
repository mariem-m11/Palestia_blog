// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {User} from "./Model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {
    // Set initial login status based on the presence of the token
    this.isLoggedIn.next(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  private apiUrl = 'http://localhost:3000';
  isLoggedIn = new BehaviorSubject<boolean>(false);
  // Expose the observable part of the isLoggedIn subject
  isLoggedIn$ = this.isLoggedIn.asObservable();
    user! : User | null ;


  getUserId(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;  // Assuming 'id' is the field in the token payload that contains the user ID
  }

 /* Login(username: string, password: string): Observable<any> {
    // Implement your login logic here
    // If successful, update the isLoggedIn BehaviorSubject
      console.log("Login successful, isLoggedIn set to true");
      return this.http.post<any>(`${this.apiUrl}/user/login`,{username , password})

  }
  */


  login(credentials: { username: string; password: string }): Observable<any> {

    
    console.log(credentials)
      return this.http.post<any>(`${this.apiUrl}/user/login`, credentials)
      /*.pipe(
        tap((response: any) => {
            localStorage.setItem('access_token', response.access_token);
            const role = this.getUser(response.access_token)?.role;
            console.log("asslemaa")
            console.log(this.user);
        })
    );
    */

  }

     getUser(token: string):User | null{
        if (!token) {
            //console.log("erreur")
            return null;
        }
       // console.log("user user user")
       // console.log(JSON.parse(atob(token.split('.')[1])) as User)
        return JSON.parse(atob(token.split('.')[1])) as User;
    }

    getToken() {
    const access_token = localStorage.getItem('access_token');
        if (!access_token) {return '';

        }
      //console.log("hello ena access_token");
        //console.log(access_token)
      return  access_token;

    }

    register(email: string, password: string, username : string) : Observable<any> {
        // Implement your registration logic here
        // For now, just log the registration and return true
       console.log("hana lenna")
      console.log(this.http.post<any>(`${this.apiUrl}/user`, {username,email,password}))
        return this.http.post<any>(`${this.apiUrl}/user`, {username,email,password})
    }


  logout(): void {
    this.isLoggedIn.next(false);
    console.log(this.getToken())

    localStorage.removeItem('access_token');
    console.log(this.getToken())
    console.log("Logged out, isLoggedIn set to false");

  }



  /*isAuthenticated(): boolean {
    return this.isLoggedIn.value;
  }
*/
  // Méthode pour vérifier si l'utilisateur est connecté
  // isAuthenticated(): boolean {
  //   // Vérifiez si le token est présent dans le stockage local
  //   const storedToken = localStorage.getItem('token');
  //   //(!!) pour convertir la valeur stockée dans la variable storedToken en un booléen.
  //     this. isLoggedIn.next(!!storedToken);
  //     return !!storedToken ;

  // }
    isAdmin() {
        const token =this.getToken();
        const user = this.getUser(token);
        return user?.role === 'admin';

    }


}