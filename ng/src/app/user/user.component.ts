import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: any[] = [];
  filteredUsers: any[] = [];

  constructor(private userService: UserService) { }

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
  }
}
