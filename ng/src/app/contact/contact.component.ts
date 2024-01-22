import { Component } from '@angular/core';
import  { MailService } from '../services/mail.service'
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{
  email = {
    subject: '',
    content: ''
  };

  constructor(private mailService: MailService) {}

  onSubmit() {
    this.mailService.sendEmail(this.email.subject, this.email.content).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
  
}

