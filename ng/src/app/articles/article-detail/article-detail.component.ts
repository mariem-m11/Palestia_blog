import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ArticleService} from "../../services/article.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import { ReactionType } from '../../enums/reaction-type';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Reaction } from '../../Model/reaction';

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
    likesCount! : number  ;

    hasLiked: boolean = false;
    hasDisliked: boolean = false;

     private streamSubscription!: Subscription;

    
    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private router: Router,
        public authService : AuthService,
        private toastr : ToastrService,

    ) {}


    ngOnInit(): void {
      this.article = { likes: 0, dislikes: 0 };
        const articleIdParam = this.route.snapshot.paramMap.get('id');
        this.getComments();

        if (articleIdParam) {
            const articleId = +articleIdParam;
            const user = this.authService.getUser(this.authService.getToken())
            //console.log(this.authService.getToken());
            
            
            ////////////////NOTE//////////////////
            if(user && articleIdParam){


              this.checkUserReaction(articleId, user.id);
              console.log("nedit ccheck reaction")


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
            ////////////////COMMENTS//////////////////

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

  //   checkUserReaction(articleId: number, userId: number) {
  //     this.articleService.getReaction(articleId, userId).subscribe(
  //         (reaction) => {
  //           console.log("reaction ahiiiiii", reaction)


  //             if (reaction.likeStatus === 'like') {
  //                 this.hasLiked = true;
  //             } else if (reaction.likeStatus === 'dislike') {
  //                 this.hasDisliked = true;
  //             }
  //         },
  //         (error) => {
  //             console.error('Error fetching reaction:', error);
  //         }
  //     );
  // }
  
  
  // checkUserReaction(articleId: number, userId: number) {
  //   this.articleService.getReaction(articleId, userId).subscribe(
  //     (reactions: Reaction[]) => {
  //       console.log("reactions", reactions);
  //       // Check if the reactions array is empty
  //       if (!reactions.length) {
  //         this.hasLiked = false;
  //         this.hasDisliked = false;
  //       } else {
  //         // Get the last reaction, which represents the current state
  //         const latestReaction = reactions[reactions.length - 1];
  //         console.log(latestReaction)
  
  //         // Determine the state based on the latest reaction
  //         switch (latestReaction.reaction) {
  //           case 'like':
  //             this.toggleLikeState(true);
  //             console.log("aamel like")
  //             break;
  //           case 'dislike':
  //             this.toggleLikeState(false, true);
  //             console.log("aamel dislike")

  //             break;
  //           default:
  //             // Handle any other unexpected case
  //             this.hasLiked = false;
  //             this.hasDisliked = false;
  //             break;
  //         }
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching reaction:', error);
  //     }
  //   );
  // }
  
  
  checkUserReaction(articleId: number, userId: number) {
    this.articleService.getReaction(articleId, userId).subscribe(
      (reactions: Reaction[]) => {
        if (!reactions.length) {
          this.hasLiked = false;
          this.hasDisliked = false;
          return;
        }
        // Get the last reaction which represents the current state
        const latestReaction = reactions[reactions.length - 1];
        if (latestReaction.reaction === 'like') {
          this.toggleLike1();  // Call without triggering API call
        } else if (latestReaction.reaction === 'dislike') {
          this.toggleDislike();  // Call without triggering API call
        }
      },
      (error) => {
        console.error('Error fetching reaction:', error);
      }
    );
  }
  
  toggleLikeState(isLiked: boolean, isDisliked: boolean = false) {
    // Set the state based on the parameters
    this.hasLiked = isLiked;
    this.hasDisliked = isDisliked;
    // Update the article's liked and disliked properties
    this.article.liked = this.hasLiked;
    this.article.disliked = this.hasDisliked;
  }

  

    toggleLike1() {
      const articleIdParam = this.route.snapshot.paramMap.get('id');
      const user = this.authService.getUser(this.authService.getToken());

      if (user && articleIdParam) {
          const idUser = user.id;

          // Utilisez la fonction addLike pour ajouter le like
          this.articleService.addLike(+articleIdParam, +idUser).subscribe(
              () => {
                  //  obtenir le nombre de likes mis à jour
                  this.articleService.getLikes(+articleIdParam).subscribe(
                      (likesCount) => {
                          console.log('Likes count after like added:', likesCount);

                          // Mettez à jour les compteurs de likes et dislikes
                          if (!this.article.liked) {
                              this.article.likes = likesCount;
                              if (this.article.disliked) {
                                  this.article.dislikes--;
                              }
                          } else {
                              // Si déjà liké, le nouveau like est en réalité un dislike
                              this.article.likes--;
                          }

                          // Inversez le statut liked/disliked
                          this.article.liked = !this.article.liked;
                          this.article.disliked = this.article.liked ? false : this.article.disliked;

                      },
                      (error) => {
                          console.error('Erreur lors de la demande de likes après ajout :', error);
                      }
                  );
              },
              (error) => {
                  console.error('Erreur lors de l\'ajout de like :', error);
              }
          );

          this.toggleLikeState(!this.hasLiked);
        }
  }
    
    toggleDislike() {
      const articleIdParam = this.route.snapshot.paramMap.get('id');
      const user = this.authService.getUser(this.authService.getToken());

      if (user && articleIdParam) {
          const idUser = user.id;

          // Utilisez la fonction adddisLike pour ajouter le dislike
          this.articleService.adddisLike(+articleIdParam, +idUser).subscribe(
              (response) => {
                  // obtenir le nombre de likes mis à jour
                  this.articleService.getDislikes(+articleIdParam).subscribe(
                      (dislikesCount) => {
                          console.log('Likes count after dislike added:', dislikesCount);

                          // Mettez à jour les compteurs de likes et dislikes
                          if (!this.article.disliked) {
                              this.article.dislikes = dislikesCount;
                              if (this.article.liked) {
                                  this.article.likes--;
                              }
                          } else {
                              // Si déjà disliké, le nouveau dislike est en réalité un like
                              this.article.dislikes--;
                          }

                          // Inversez le statut liked/disliked
                          this.article.disliked = !this.article.disliked;
                          this.article.liked = this.article.disliked ? false : this.article.liked;
                      },
                      (error) => {
                          console.error('Erreur lors de la demande de likes après ajout de dislike:', error);
                      }
                  );
              }
          );
          this.toggleLikeState(this.hasLiked, !this.hasDisliked);
        }
  }


  updateUserRating(): void {
      // Update the user's rating
      this.article.userRating = this.userRating;
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
          this.getComments()
        },
        (error)=>{
          this.toastr.error("Erreur lors de l'ajout");
        }
      );
    }

    this.newComment = '';

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

// processCommentsOnebyOne(data: any[], index: number) {
//   if (index < data.length) {
//     const comment = data[index];
//     console.log('hdha user', comment.id_user)

//     // Call the service to get the user by ID
//     this.authService.getUserbyId(comment.id_user).subscribe(
//       (userResponse) => {
//         // Find the user object from the response
//         const user = userResponse.find((u: { id: any; }) => u.id === comment.id_user);
//         console.log('hdha user', user)
//         // If user is found, prepare the comment text with the username
//         if (user && user.username) {
//           const commentText = `${user.username}: ${comment.commentaire}`;
//           this.comments.unshift(commentText);
//         } else {
//           // Handle the case where user is not found or username is not available
//           this.toastr.error("User not found or username is missing");
//         }

//         // Process the next comment regardless of success or failure
//         this.processCommentsOnebyOne(data, index + 1);
//       },
//       (error) => {
//         // Handle the error scenario
//         console.error(error);
//         this.toastr.error("Error getting user details");
//         this.processCommentsOnebyOne(data, index + 1);
//       }
//     );
//   } else {
//     // All comments processed
//     // Additional actions if needed after processing all comments
//   }
// }


processCommentsOnebyOne(data: any[], index: number) {
  if (index < data.length) {
    const comment = data[index];
    console.log("ena id taa user ",comment.id_user);
    this.authService.getUserbyId(comment.id_user).subscribe(
      (response) => {
        //amalna -1 khater tab fih decalage taa id donc na9sou 1 bch njiw bethabt
        //response[0] atana l usrname taa id 1

        const username = response[(comment.id_user)].username;
        //const username = response[7].username ;
        console.log("salut username",username)
        const commentText = ` ${username} :  ${comment.commentaire}`;
        this.comments.unshift(commentText);

        // Process the next comment
        this.processCommentsOnebyOne(data, index + 1);
      },
      (error) => {
        this.toastr.error("Erreur getting comments");

        // Skip to the next comment even if there's an error
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