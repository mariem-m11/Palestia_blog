import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../Model/articles';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchText: string = '';

  
  users: any[] = [];
  filteredUsers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  pages: number[] = [];

  articles: Article[] = [];
  filteredArticles: Article[] = [];
  pages2: number[] = [];
  currentPage2: number = 1;
  pageSize2: number = 6;

  searchTextArticles: string = '';

  



  constructor(private userService: UserService,
    private route: ActivatedRoute,
     private articleService: ArticleService, 
     private authService: AuthService,
      private router: Router,
      private toastr :ToastrService,
    ) { }
  
  ngOnInit(): void {
    this.loadUsers();
    this.loadArticles();
    // const articleIdParam = this.route.snapshot.paramMap.get('id');
    // this.getArticleLikes(+articleIdParam);

  }



  loadArticles(): void {
    this.articleService.getArticles().subscribe((articles: Article[]) => {
      this.articles = articles;
      this.articles.forEach(article => {
        this.getArticleLikes(article);
        this.getArticleDislikes(article);
      });
      this.filteredArticles = articles;
      this.calculatePages2(); // Corrected method name

      this.filteredArticles.forEach(article => {
        this.getNoteGenerale(article);
      });
    });
  }

  changePage2(page: number): void {
    this.currentPage2 = page;
  }

  calculatePages2(): void {
    const totalPages2 = Math.ceil(this.filteredArticles.length / this.pageSize2);
    this.pages2 = Array.from({ length: totalPages2 }, (_, i) => i + 1);
  }


  getArticleLikes(article: Article): void {
    this.articleService.getLikes(article.id).subscribe(
      (likeCount: number) => {
        article.likes = likeCount;
        this.calculatePercentages(article);
      },
      (error) => {
        console.error('Error loading likes for article', article.id, error);
      }
    );
  }

  // getNoteGenrale(article: Article): void {
  //   this.articleService.getNoteGenrale(article.id).subscribe(
  //     (note : number) => {
  //       article.gnote = note;
  //     },
  //     (error) => {
  //         console.error('Error fetching user note:', error);
  //     }
  // );
  //   }
  
  getNoteGenerale(article: Article): void {
    console.log("wslt");
    this.articleService.getNoteGenerale(article.id).subscribe(
      (note: number) => {
        article.gnote = Math.round(note); // Round the note value
        console.log("wslt");
        console.log(article.gnote);
      },
      (error) => {
        console.error('Error fetching user note:', error);
      }
    );
  }

  getStarsArray(note: number | undefined): string[] {
    let stars = [];
    let noteValue = Math.min(5, Math.max(0, note ?? 0)); // Ensure note is between 0 and 5
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= noteValue ? 'filled' : 'empty');
    }
    return stars;
  }
    // getStarsArray(note: number | undefined): string[] {
    //   let stars = [];
    //   let noteValue = note ?? 0; // If note is undefined, use 0 as default
    //   for (let i = 1; i <= 5; i++) {
    //     stars.push(i <= noteValue ? 'filled' : 'empty');
    //   }
    //   return stars;
    // }

  getArticleDislikes(article: Article): void {
    this.articleService.getDislikes(article.id).subscribe(
      (dislikeCount: number) => {
        article.dislikes = dislikeCount;
        this.calculatePercentages(article);
      },
      (error) => {
        console.error('Error loading dislikes for article', article.id, error);
      }
    );
  }
  calculatePercentages(article: Article): void {
    const totalReactions = (article.likes || 0) + (article.dislikes || 0);
    if (totalReactions > 0) {
      article.likePercentage = (article.likes || 0) / totalReactions * 100;
      article.dislikePercentage = (article.dislikes || 0) / totalReactions * 100;
    } else {
      article.likePercentage = 0;
      article.dislikePercentage = 0;
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
    });
  }

  searchUser(searchTerm: string): void {
    this.currentPage = 1; // Reset to first page
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.calculatePages();
  }

  
  searchArticles(searchTerm: string): void {
    this.currentPage2 = 1; // Reset to first page
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.calculatePages2();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.filteredUsers = data;
      this.calculatePages();
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
  }


  calculatePages(): void {
    const totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
