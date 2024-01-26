import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mini-word',
  templateUrl: './mini-word.component.html',
  styleUrls: ['./mini-word.component.css'],
})
export class MiniWordComponent {
  textColor: string = '';
  fontSize: number = 16;
  fontFamily: string = 'Arial';
  editableText = 'This is an example of text.'; // Default text for the editable area
  highlightedWords = ['Palestine', 'peace', 'free']; // Words to highlight
articleTitle: any;

  constructor(
    private router: Router,
    private articleService: ArticleService, // Inject the ArticleService
    private toastr : ToastrService,
  ) {}

  textStyle: any = {};

  applyStyle(): void {
    this.textStyle = {
      'color': this.textColor,
      'font-size': `${this.fontSize}px`,
      'font-family': this.fontFamily,
    };
  }

  toggleStyle(style: string): void {
    document.execCommand(style, false);
  }

  updateText(event: Event): void {
    const element = event.target as HTMLElement;
    this.editableText = element.innerText;
  }

  applyBold(): void {
    document.execCommand('bold', false);
  }

  applyItalic(): void {
    document.execCommand('italic', false);
  }

  publishArticle(): void {
    const articleContent = this.editableText;
    // Basic Validation ll mini word
    if (!this.articleTitle.trim()) {
      this.toastr.error('Please enter a title for the article.');
      return;
    }

    if (!this.editableText || !this.editableText.trim()) {
      this.toastr.error('Please enter content for the article.');
      return;
    }

    // console.log('Content:', this.editableText); // Debugging hehe
    this.articleService.postArticle(this.articleTitle,articleContent).subscribe(
      (response) =>{
        this.toastr.success('Article successfully added');
        // redirect to the articles page
        this.router.navigate(['/articles']);

      },
    (error) =>{
      this.toastr.error('Error adding article ');

    }
    )

  }

  }
