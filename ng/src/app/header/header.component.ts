import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
      console.log("Navbar isLoggedIn status:", this.isLoggedIn); // Debugging line
    });
  }

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      console.log("NavbarComponent - isLoggedIn status:", this.isLoggedIn);
    });
  }

  logout() {
    this.authService.logout();

  }
}
