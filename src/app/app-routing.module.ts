import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { SignupComponent } from "./signup/signup.component";
import { CareerComponent } from "./career/career.component";
import { GuardsService } from "./_services/guards.service";
import { PostsComponent } from "./posts/posts.component";
import { UserListComponent } from "./user-list/user-list.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "careers", component: CareerComponent, canActivate: [GuardsService] },
  { path: "posts", component: PostsComponent, canActivate: [GuardsService] },
  {
    path: "userList",
    component: UserListComponent,
    canActivate: [GuardsService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
