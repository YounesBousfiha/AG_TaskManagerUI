import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

firstname: string = '';
lastname: string = '';
email: string = '';

formSubmit() {
  console.log(this.firstname);
  console.log(this.lastname);
}
}
