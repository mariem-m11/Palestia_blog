import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:3000/article'; // Adjust the URL to your NestJS server

  constructor(private http: HttpClient) { }


  postArticle(title: string, content: string): Observable<any> {
    return this.http.post(this.apiUrl + '/add' , { title, content });
  }

  getArticle(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  fetchArticleData(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${articleId}`);
  }
}
