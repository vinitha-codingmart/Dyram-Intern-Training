import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

import { Post } from "../Interfaces/post";
import { User } from "../Interfaces/user";

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

  constructor(private http: HttpClient) {}

  public addPost(post: Post): Observable<Post[]> {
    let posts = this.http.post<Post[]>(this.addPostUrl, post, httpOptions);
    return posts;
  }

  public getPost(): Observable<Post[]> {
    let posts = this.http.get<Post[]>(this.getPostUrl);
    return posts;
  }

  public addUser(user: User): Observable<User[]> {
    let users = this.http.post<User[]>(this.addUserUrl, user, httpOptions);
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
}
