import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signin() {
    this.userService.signin(this.username, this.password).subscribe((response: any) => {
      // OR do these routes want to just be .navigate
      this.router.navigateByUrl('/posts');
    }, error => {
      console.log('Error: ', error);
      window.alert("Unsuccessful Login");
      this.router.navigateByUrl('/signin');
    });
  }

}
