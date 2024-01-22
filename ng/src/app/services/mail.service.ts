import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = 'http://localhost:3000/mail'; // Adjust the URL to your NestJS server

  constructor(private http: HttpClient) { }

  sendEmail(subject: string, content: string) {
    return this.http.post(this.apiUrl , { subject, content });
  }
}
