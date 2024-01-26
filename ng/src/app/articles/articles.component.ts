import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import {ToastrService} from "ngx-toastr";
// import { fadeIn, cardAnimation } from './../animations'; // Update with your actual path

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  // animations: [fadeIn, cardAnimation]

})
export class ArticlesComponent implements OnInit {
  // isLoading = false;
  // hovering = false;
  articles:any[] = [];

  filteredArticles:any[] = [...this.articles];

  readonly staticImages: string[] = [
    './../../assets/images/bg1.jpg',
    './../../assets/images/bg3.jpg',
    './../../assets/images/bg4.jpg',
    './../../assets/images/header.jpg',
    './../../assets/images/bg2.jpg',
    // ... other images
  ];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pages: number[] = [];
  paginatedArticles: any[] = [];

  getImageForArticle(index: number): string {
    return this.staticImages[index % this.staticImages.length];
  }
  constructor(private router: Router, private articleService: ArticleService,private toastr : ToastrService) {
  }

  ngOnInit(): void {
    this.loadArticles()
    this.calculatePages();
    this.loadPage(1);
  }


  
  loadArticles(): void {
    this.articleService.getArticles().subscribe((data: any) => {
     this.articles=data;
    },
        (error)=>{
          this.toastr.error( 'Error');

        });
    console.log("haw tab")
    console.log(this.articles)
  }



  searchArticles(searchTerm: string): void {
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  viewArticleDetail(articleId: number): void {
    this.router.navigate(['/article', articleId]);
  }

  getSummary(content: string): string {
    const firstSentence = content.split(/(?<=[.?!])\s/, 1)[0];
    return firstSentence;
  }


  calculatePages(): void {
    const totalPages = Math.ceil(this.articles.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  loadPage(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    this.paginatedArticles = this.articles.slice(startIndex, startIndex + this.itemsPerPage);
    this.currentPage = pageNumber;
  }

  changePage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.loadPage(pageNumber);
    }
  }


  
}