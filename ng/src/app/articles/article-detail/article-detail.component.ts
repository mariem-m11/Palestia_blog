import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const articleIdParam = this.route.snapshot.paramMap.get('id');

    if (articleIdParam) {
      const articleId = +articleIdParam;
      this.article = this.articleService.fetchArticleData(articleId);
    } else {
      // Handle the null case
      this.router.navigate(['/error']);
    }
  }
}
