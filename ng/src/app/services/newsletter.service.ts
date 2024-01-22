import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = 'http://localhost:3000/mail'; 

  constructor(private http: HttpClient) { }

  subscribe(email: string) {
    return this.http.post(this.apiUrl + '/subscribe', { email });
  }
}
