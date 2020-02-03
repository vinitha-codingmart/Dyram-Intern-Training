import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

import { Post } from "../Interfaces/post";
import { User } from "../Interfaces/user";
import { UserPost } from "../Interfaces/postUser";
import { Followers } from "../Interfaces/followers";
import { UserName } from "../Interfaces/userName";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private addPostUrl = "http://localhost:3000/addPost";
  private getPostUrl = "http://localhost:3000/getPost";
  private addUserUrl = "http://localhost:3000/addUser";
  private loginUrl = "http://localhost:3000/loginUser";
  private getUsersUrl = "http://localhost:3000/getUsers";
  private getUserUrl = "http://localhost:3000/getUser";
  private addFollowerUrl = "http://localhost:3000/addFollower";
  private getFollowerUrl = "http://localhost:3000/getFollower";

  constructor(private http: HttpClient) {}

  public addPost(post: Post, user: UserPost): Observable<Post[]> {
    let posts = this.http.post<Post[]>(
      this.addPostUrl,
      { post: post, user: user },
      httpOptions
    );
    return posts;
  }

  public getPost(user: UserName): Observable<Post[]> {
    let posts = this.http.post<Post[]>(this.getPostUrl, user, httpOptions);
    return posts;
  }

  public getFollowers(user: UserName): Observable<Post[]> {
    let followers = this.http.post<Post[]>(
      this.getFollowerUrl,
      user,
      httpOptions
    );
    return followers;
  }

  public addUser(user: User, followers: Followers): Observable<User[]> {
    let users = this.http.post<User[]>(
      this.addUserUrl,
      { user: user, followers: followers },
      httpOptions
    );
    return users;
  }

  public loginUser(user: User): Observable<User[]> {
    let users = this.http.post<User[]>(this.loginUrl, user, httpOptions);
    return users;
  }

  public getUsers(): Observable<User[]> {
    let users = this.http.get<User[]>(this.getUsersUrl);
    return users;
  }

  public getUser(users: User): Observable<User[]> {
    let user = this.http.post<User[]>(this.getUserUrl, users, httpOptions);
    return user;
  }

  public addFollower(followers: Followers): Observable<User[]> {
    let users = this.http.post<User[]>(
      this.addFollowerUrl,
      followers,
      httpOptions
    );
    return users;
  }
}
