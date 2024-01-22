import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust the path as per your project structure
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Bind these properties with ngModel in your template
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  // This method now doesn't expect any arguments
  login() {
    if (this.email && this.password) {
      // Perform the login action
      const success = this.authService.login(this.email, this.password);
      if (success) {
        this.toastr.success('Login successful', 'Success');
        console.log('Login Successful');
        // Here you can navigate to another route or perform additional actions
      } else {
        console.log('Login Failed');
        this.toastr.error('Login Failed :(', 'Error');
        // Handle login failure
      }
    } else {
      // Form is invalid
      console.log('Form is Invalid');
      this.toastr.error('Please fill in all fields', 'Error');
    }
  }
}

