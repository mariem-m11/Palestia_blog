// article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { articles } from './../Model/articles-data';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // private apiUrl = 'http://your-api-url.com/articles'; // Replace with your API URL

  constructor(private http: HttpClient) { }
  fetchArticleData(articleId: number): Observable<any> {
    const foundArticle = articles.find(article => article.id === articleId);

    if (foundArticle) {
      return of(foundArticle); // Use 'of' to emit a value
    } else {
      return throwError('Article not found');
    }
  }


}


