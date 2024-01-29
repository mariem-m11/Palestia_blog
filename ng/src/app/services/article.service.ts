import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ReactionType } from '../enums/reaction-type';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  private apiUrl = 'http://localhost:3000/article'; // Adjust the URL to your NestJS server

  constructor(private http: HttpClient,private authservice : AuthService) { }

  postArticle(title: string, description: string): Observable<any> {
      // const params = new HttpParams().set('access_token',this.authservice.getToken());
      //    console.log(params)
         return this.http.post<any>(`${this.apiUrl}/add` , { title, description }); //,{params}
  }
     
  getArticles(): Observable<any>{
          // console.log("hani fl getarticles m service")
          // console.log('apiurl:',this.apiUrl)
         console.log( "hdha howa", this.http.get<any>(`${this.apiUrl}`))
         return this.http.get<any>(`${this.apiUrl}`);
  }
     
  fetchArticleData(articleId: number): Observable<any> {
         return this.http.get<any>(`${this.apiUrl}/${articleId}`);
  }
     
  private  apiUrl2='http://localhost:3000/interactionarticle' ;

  addLike(idArticle: number, idVisiteur: number): Observable<any> {
    return this.http.post(`${this.apiUrl2}/like/${idArticle}/${idVisiteur}`, { reaction: ReactionType.LIKE });
  }

  adddisLike(idArticle: number, idVisiteur: number): Observable<any> {
    return this.http.post(`${this.apiUrl2}/like/${idArticle}/${idVisiteur}`, { reaction: ReactionType.DISLIKE });
  }

  addNote(idArticle: number, idVisiteur: number, note: number): Observable<any> {
    return this.http.post(`${this.apiUrl2}/note/${idArticle}/${idVisiteur}`, { note });
  }


  //nestakhdmouh bch nekhdho mlawl amehi li tkoun selectionné 
  getReaction(idArticle: number, idVisiteur: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/reaction/${idArticle}`);
  } 

  getNoteGenerale(idArticle: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/general/${idArticle}`);
  }


  getLikes(idArticle: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/likes/${idArticle}`);
  }

  getDislikes(idArticle: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/dislikes/${idArticle}`);
  }

  getNote(idArticle: number, idVisiteur: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/note/${idArticle}/${idVisiteur}`);
  }

  getComments(articleId : number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/comment/${articleId}`);
}
  addcomment(commentaire : string , article_id : number , user_id: number):Observable<any>{
    console.log("aslema")
    console.log(commentaire)
    console.log(article_id)
    console.log(this.http.post<any>(`${this.apiUrl2}/comment/${article_id}/${user_id}`,{commentaire, article_id, user_id}));
      return this.http.post<any>(`${this.apiUrl2}/comment/${article_id}/${user_id}`,{commentaire, article_id, user_id});

  }
  
  // addcomment(dto: CreateInteractionarticleDto): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl2}/comment`, dto);
  // }

  DeleteArticle(articleId : number):Observable<any>{
    console.log(this.http.delete<any>(`${this.apiUrl}/${articleId}`))
    return this.http.delete<any>(`${this.apiUrl}/${articleId}`);
  }

  ModifyArticle(articleId : number,title : string , description : string){
    return this.http.patch<any>(`${this.apiUrl}/${articleId}`,{title, description});
  }

}
  

