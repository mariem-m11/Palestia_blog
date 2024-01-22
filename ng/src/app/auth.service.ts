// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  // Expose the observable part of the isLoggedIn subject
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private router: Router, private http: HttpClient) { } // Inject Router, not AuthService

  login(email: string, password: string): Observable<any> {
    // If successful, update the isLoggedIn BehaviorSubject
    this.isLoggedIn.next(true);
    console.log("Login successful, isLoggedIn set to true");
    this.router.navigate(['/']);
    return this.http.post<any>('your-api-endpoint', { email, password });
  }

  logout(): void {
    this.isLoggedIn.next(false);
    console.log("Logged out, isLoggedIn set to false");

  }

  isAuthenticated(): boolean {
    return this.isLoggedIn.value;
  }


  register(email: string, password: string): boolean {
    // Implement your registration logic here
    // For now, just log the registration and return true
    console.log("Registration successful for:", email);
    return true;
  }
}