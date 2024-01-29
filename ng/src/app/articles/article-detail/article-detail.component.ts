import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ArticleService} from "../../services/article.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import { ReactionType } from '../../enums/reaction-type';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {CommentService} from "../../services/comment.service";

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
    isModifying = false; // Boolean variable to track whether modification mode is active
    commentsToShow :number =3 ;
     private streamSubscription!: Subscription;

    
    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private router: Router,
        private authService : AuthService,
        private toastr : ToastrService,

    ) {
      // const idVisiteur = this.authService.getUserId();
    }


    ngOnInit(): void {
      this.article = { likes: 0, dislikes: 0 };
        const articleIdParam = this.route.snapshot.paramMap.get('id');
        this.getComments();

        if (articleIdParam) {
            const articleId = +articleIdParam;
            const user = this.authService.getUser(this.authService.getToken())
            //console.log(this.authService.getToken());
            
            if(user && articleIdParam){
             const idUser = user.id ;
             //console.log(idUser);
             console.log(+articleIdParam);
            this.articleService.getNote(+articleIdParam,+idUser).subscribe(
              (note) => {
                  // Assuming the API returns an array of notes, and you need the first one.
                  this.userRating = note.length ? note[0].note : 0;
                  this.selectedRating = this.userRating; // Initialize the rating stars
              },
              (error) => {
                  console.error('Error fetching user note:', error);
                  this.userRating = 0;
                  this.selectedRating = 0;
              }
          );
            this.articleService.getComments(articleId);
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
  }
    
  incrementLikes(): void {
      this.article.likes++;
  }

  incrementDislikes(): void {
      this.article.dislikes++;
  }


    addComment(): void {
      //console.log("ena l comment",this.newComment)
      const articleIdParam = this.route.snapshot.paramMap.get('id');
      const user = this.authService.getUser(this.authService.getToken())
      if(user && articleIdParam){
       const idUser = user.id ;

      //  console.log("ena l id hehe",idUser);
      //  console.log(this.authService.getToken());
      //  console.log(user);
      //  console.log('content',this.newComment)
        this.articleService.addcomment(this.newComment,+articleIdParam,+idUser).subscribe(
          (response) =>{
            this.toastr.success("commentaire ajouté avec succès");

          },
          (error)=>{
            this.toastr.error("Erreur lors de l'ajout");
          }
        );
      }

      this.newComment = '';

    }

    


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


  setRating(rating: number): void {
    const articleIdParam = this.route.snapshot.paramMap.get('id');
    const user = this.authService.getUser(this.authService.getToken());

    if (user && articleIdParam) {
      const idUser = user.id;

      if (this.selectedRating === rating) {
        // If the user clicks the same star again, reset the rating
        this.selectedRating = 0;
      } else {
        // Update the selected rating
        this.selectedRating = rating;
      }

      // Call the API to add/update the rating
      this.articleService.addNote(+articleIdParam, idUser, this.selectedRating).subscribe(
        (response) => {
            // Handle the response, e.g., update the userRating
            this.userRating = this.selectedRating;
        },
        (error) => {
            console.error('Error updating user note:', error);
            // Optionally reset the rating if the update fails
            this.selectedRating = this.userRating;
        }
      );
    }
  }
  getComments2() {
    const articleIdParam = this.route.snapshot.paramMap.get('id');
    if(articleIdParam){
      this.articleService.getComments(+articleIdParam).subscribe(
        (data) =>{
            for (let pas = 0; pas < data.length; pas++) {
              //console.log("ena data hehe",data)
              //console.log("ena data[pas]",data[pas].id_user)
              this.authService.getUserbyId(data[pas].id_user).subscribe(
                (response) =>{
                  //console.log("id " ,data[pas].id_user) //shih
                 // console.log("username",response[data[pas].id_user].username)
                 // console.log("response",response[pas].username)
                 //console.log("ena username",response[pas]);
                  //console.log("ena l commentaire mte3ou " ,data[pas].commentaire )
                  const comment = "Username " + response[(data[pas].id_user) - 1].username + "commentaire      " + data[pas].commentaire;
                  this.comments.unshift(comment)
                },
                (error)=>{
                  this.toastr.error("Erreur getting comments")

                }
              );
              //unshift afin d'afficher les récents commentaires au début
              // Manually trigger change detection
             // console.log("username" +user.username + " commentaire" + data[pas].commentaire)
            }

        },
        (error)=>{
          this.toastr.error("Erreur getting comments")
        }
      );
    }
  }



deleteArticle() {
  const articleIdParam = this.route.snapshot.paramMap.get('id');
  if(articleIdParam){
    console.log("hello ena f delete")
    this.articleService.DeleteArticle(+articleIdParam).subscribe(
      (response)=>{
        console.log(response)
        this.toastr.success("Deleted successfully")
        this.router.navigate(['/articles']);

      },
      (error)=>{
        this.toastr.error("Error deleting")
      }
    )

  }
}





getComments() {
  const articleIdParam = this.route.snapshot.paramMap.get('id');

  if (articleIdParam) {
    this.comments =[];
    console.log("im in get comments")
    this.articleService.getComments(+articleIdParam).subscribe(
      (data) => {
        // Start processing comments sequentially
        this.processCommentsOnebyOne(data, 0);

      },
      (error) => {
        this.toastr.error("Erreur getting comments");
      }
    );
  }
}

processCommentsOnebyOne(data: any[], index: number) {
  if (index < data.length) {
    const comment = data[index];
    console.log('hdha user', comment.id_user)

    // Call the service to get the user by ID
    this.authService.getUserbyId(comment.id_user).subscribe(
      (userResponse) => {
        // Find the user object from the response
        const user = userResponse.find((u: { id: any; }) => u.id === comment.id_user);
        console.log('hdha user', user)
        // If user is found, prepare the comment text with the username
        if (user && user.username) {
          const commentText = `${user.username}: ${comment.commentaire}`;
          this.comments.unshift(commentText);
        } else {
          // Handle the case where user is not found or username is not available
          this.toastr.error("User not found or username is missing");
        }

        // Process the next comment regardless of success or failure
        this.processCommentsOnebyOne(data, index + 1);
      },
      (error) => {
        // Handle the error scenario
        console.error(error);
        this.toastr.error("Error getting user details");
        this.processCommentsOnebyOne(data, index + 1);
      }
    );
  } else {
    // All comments processed
    // Additional actions if needed after processing all comments
  }
}

/*************** section Modify *********************/

modifyArticle(): void {
  this.isModifying = true;
}

saveModification(): void {
  // Implement logic to save the modified description
  // You can use this.modifiedDescription to get the modified value
  const articleIdParam = this.route.snapshot.paramMap.get('id');
  if(articleIdParam){
  this.articleService.ModifyArticle(+articleIdParam,this.article.title,this.article.description).subscribe(
    (response)=>{
      console.log("modified title");
    },
    (error)=>{
      console.log("hhehe ghalet")
    }
  )


}
  this.isModifying = false;

}

cancelModification(): void {
  this.isModifying = false;
}

/*************** section Modify *********************/




loadMoreComments() {
  this.commentsToShow += 3; // Augmentez le nombre de commentaires à afficher lors du clic sur "Show more"
}
showLessComments() {
  this.commentsToShow = 3; // Réinitialisez le nombre de commentaires à afficher lors du clic sur "Show less"
}




deleteComment(comment : string){}
modifyComment(comment : string){}
}