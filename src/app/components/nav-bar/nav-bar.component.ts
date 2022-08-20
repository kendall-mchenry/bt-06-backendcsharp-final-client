import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // HOW TO GET CERTAIN THINGS TO SHOW BASED ON IF THE USER IS SIGNED IN??????

  currentUser: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

  }

  signout() {
    this.userService.signout();
    window.alert("User Signed Out");
    this.router.navigate(['signin']);
  }

}
