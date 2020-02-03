import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HeaderComponent } from "./header/header.component";
import { ServicesComponent } from "./services/services.component";
import { TechComponent } from "./tech/tech.component";
import { WorkComponent } from "./work/work.component";
import { ThoughtComponent } from "./thought/thought.component";
import { ContactComponent } from "./contact/contact.component";
import { LoginComponent } from "./login/login.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { SignupComponent } from "./signup/signup.component";
import { CareerComponent } from "./career/career.component";
import { PostsComponent } from "./posts/posts.component";
import { ApiService } from "./_services/api.service";
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ServicesComponent,
    TechComponent,
    WorkComponent,
    ThoughtComponent,
    ContactComponent,
    LoginComponent,
    HomePageComponent,
    SignupComponent,
    CareerComponent,
    PostsComponent,
    UserListComponent,
    UserCardComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
