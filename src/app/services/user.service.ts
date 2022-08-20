import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Use for AuthService methods: signup, sign in
  authBaseUrl: string = "https://localhost:7217/api/auth";

  // Use for UserRepository methods
  userBaseUrl: string = "https://localhost:7217/api/users"

  tokenKey: string = "myUserToken";

  constructor(private http: HttpClient) { }

  // Auth Methods -----------------------------------------------------------
  
  // POST create new user
  signup(newUser: User): Observable<any> {
    return this.http.post(`${this.authBaseUrl}/signup`, newUser);
  }

  // POST sign in user
  signin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authBaseUrl}/signin`, {username, password}, {responseType: 'text'})
      .pipe(tap((response: any) => {
        localStorage.setItem('myUserToken', response);
      }));
  }

//   public isLoggedIn() {
//     return moment().isBefore(this.getExpiration());
// }

// How can I tell if the user is signed in and allow certain elements to be viewed if so? -- do localstorate.getitem and tell if true or not?
// Then can add ngif if this is true?

  signout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // logout() {
  //   this.tokenSubscription.unsubscribe();
  //   this.authToken = null;
  //   this.user = null;
  //   sessionStorage.clear();
  // }
  
  // User Methods -----------------------------------------------------------

  // GET all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userBaseUrl);
  }

  // GET one user by id (use on "view other users" profile page)
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.userBaseUrl}/${userId}`);
  }

  // AUTH / GET current user
  getCurrentUser(): Observable<User> {

    // Need to add something like to only return the user's information for the user that is signed in -- set userId to current userId? -- OR does this automatically detect the user that is signed in because of the API route controller method?

    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.get<User>(`${this.userBaseUrl}/current`, { headers: reqHeaders });
  }

  // AUTH / PUT edit user
  editCurrentUser(editUser: User): Observable<User> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.put<User>(`${this.userBaseUrl}/current/edit`, { headers: reqHeaders });
  }
}
