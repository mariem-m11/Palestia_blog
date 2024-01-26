import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  
  articles = [
    { title: 'Article 1', likes: 120, dislikes: 30 },
    { title: 'Article 2', likes: 80, dislikes: 60 },
    // ... more articles
  ];



  searchText: string = '';
  users: any[] = [];
  filteredUsers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;


  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.loadUsers()
  }

  getLikePercentage(article: { likes: number; dislikes: any; }): number {
    const total = article.likes + article.dislikes;
    return total ? Math.round((article.likes / total) * 100) : 0;
  }

  getDislikePercentage(article: { likes: any; dislikes: number; }): number {
    const total = article.likes + article.dislikes;
    return total ? Math.round((article.dislikes / total) * 100) : 0;
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
    });
  }

  searchUser(searchTerm: string): void {
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to first page after search
  }
}
