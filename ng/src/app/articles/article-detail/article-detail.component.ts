import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ArticleService} from "../../services/article.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import { ReactionType } from '../../enums/reaction-type';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
    article: any;
    newComment: string = '';
    comments: string[] = []; // Array to store comments
    userRating: number = 5;
    selectedRating: number = 0;
    
    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private router: Router,
        private authService : AuthService
    ) {
      // const idVisiteur = this.authService.getUserId();
    }

    ngOnInit(): void {
        const articleIdParam = this.route.snapshot.paramMap.get('id');

        if (articleIdParam) {
            const articleId = +articleIdParam;
            this.articleService.fetchArticleData(articleId).subscribe(
                (data) => {
                    this.article = data;
                },
                (error) => {
                    console.error('Error fetching article data:', error);
                    // Handle the error or navigate to an error page
                }
            );
        } else {
            // Handle the null case
            this.router.navigate(['/error']);
        }
        if (this.article.likes === undefined) {
            this.article.likes = 0;
        }
        if (this.article.dislikes === undefined) {
            this.article.dislikes = 0;
        }
    }

    addComment(): void {
      //console.log("ena l comment",this.newComment)
      const articleIdParam = this.route.snapshot.paramMap.get('id');
      const user = this.authService.getUser(this.authService.getToken())
      if(user && articleIdParam){
       const idUser = user.id ;

       console.log("ena l id hehe",idUser);
       console.log(this.authService.getToken());
       console.log(user);
       console.log('content',this.newComment)
        this.articleService.addcomment(this.newComment,+articleIdParam,+idUser).subscribe(
          (response) =>{
            // this.toastr.success("commentaire ajouté avec succès");

          },
          (error)=>{
            // this.toastr.error("Erreur lors de l'ajout");
          }
        );
      }
    }

    
    // addComment(): void {
    //   const articleIdParam = this.route.snapshot.paramMap.get('id');
    //   const user = this.authService.getUser(this.authService.getToken());
      
    //   if (user && articleIdParam) {
    //     const idUser = user.id;
    //     const dto: CreateInteractionarticleDto = {
    //       commentaire: this.newComment,
    //       article_id: +articleIdParam,
    //       user_id: idUser,
          // Set other fields as needed, like reaction and note
      //   };
    
      //   this.articleService.addcomment(dto).subscribe(
      //     (response) => {
      //       // Handle success
      //     },
      //     (error) => {
      //       // Handle error
      //     }
      //   );
      // }
   
    

    toggleLike() {
    const articleIdParam = this.route.snapshot.paramMap.get('id');
    const user = this.authService.getUser(this.authService.getToken())
    //console.log("user",user?.id)
    if(user && articleIdParam){
     const idUser = user.id ;
     //console.log("ena l id hehe",idUser)
     this.articleService.addLike(+articleIdParam, +idUser).subscribe(
      (response) => {
         if (!this.article.liked) {
            this.article.likes++;
            if (this.article.disliked) {
              this.article.dislikes--;
            }
          } else {
            this.article.likes--;
          }
          this.article.liked = !this.article.liked;
          this.article.disliked = this.article.liked ? false : this.article.disliked;
        });
      }
    }


    toggleDislike() {
      const articleIdParam = this.route.snapshot.paramMap.get('id');
      const user = this.authService.getUser(this.authService.getToken())
      //console.log("user",user?.id)
      if(user && articleIdParam){
       const idUser = user.id ;
       //console.log("ena l id hehe",idUser)
       this.articleService.adddisLike(+articleIdParam, +idUser).subscribe(
        (response) => {
       if (!this.article.disliked) {
          this.article.dislikes++;
          if (this.article.liked) {
            this.article.likes--;
          }
        } else {
          this.article.dislikes--;
        }
        this.article.disliked = !this.article.disliked;
        this.article.liked = this.article.disliked ? false : this.article.liked;
      });
    }
  } 

    updateUserRating(): void {
        // Update the user's rating
        this.article.userRating = this.userRating;
    }



    setRating(rating: number) {
      const idVisiteur = 1; // Replace with the actual visitor/user ID
      this.articleService.addNote(this.article.id, idVisiteur, rating).subscribe(response => {
        // Handle the response
        this.userRating = rating;
      });
    }
  
    // interface CommentData {
    //   id_user: number;
    //   commentaire: string;
    //   // Add other relevant fields here
    // }
    
    // getComments() {
    //   const articleIdParam = this.route.snapshot.paramMap.get('id');
    //   if (articleIdParam) {
    //     this.articleService.getComments(+articleIdParam).subscribe(
    //       (data: CommentData[]) => { // Assuming getComments returns an array of CommentData
    //         data.forEach((commentData: CommentData) => {
    //           this.authservice.getUserbyId(commentData.id_user).subscribe(
    //             (response) => {
    //               // ... rest of your code
    //             },
    //             (error) => {
    //               // Error handling for getUserbyId
    //             }
    //           );
    //         });
    //       },
    //       (error) => {
    //         // Error handling for getComments
    //       }
    //     );
    //   }
    // }
}