import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: User = new User();

  viewUser: User = new User();
  viewUserId: number = 0;

  username?: string = '';

  postList: Post[] = [];

  constructor(private userService: UserService, private postService: PostService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // HOW TO ALLOW CURRENT USER TO ACCESS EDIT & DELETE??

    this.viewUserId = Number(this.actRoute.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.viewUserId).subscribe((user) => {
      this.viewUser = user;
    });

    // I may not need this?
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    // How to make sure these are authenticated and the view allows for edit & delete?
    if (this.currentUser.userId == this.viewUserId) {
      this.postService.getCurrentUserPosts(this.currentUser.userId).subscribe(posts => {
        this.postList = posts;
      });

      this.username = this.currentUser.username;

    } else {
      this.postService.getPostsByUserId(this.viewUserId).subscribe(posts => {
        this.postList = posts;
      });

      this.username = this.viewUser.username;
    }

    // I don't think this is working. & it may also not be necessary...
    if (this.postList == []) {
      let placeholder: Post = {
        content: "No posts to display"
      };
      
      this.postList.push(placeholder);
    }


  }

  // Do I need some sort of IF statement here that determines what to show based on if the user is signed in or not?

  

}
