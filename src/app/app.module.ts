import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainFormComponent } from "./main-form/main-form.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SearchbarComponent } from "./searchbar/searchbar.component";
import { MiddleComponent } from "./middle/middle.component";
import { HealthyContentComponent } from "./healthy-content/healthy-content.component";
import { IceComponent } from "./ice/ice.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressBar, MatProgressBarModule } from "@angular/material";
import { MidBaseComponent } from './mid-base/mid-base.component';
import { RightContentComponent } from './right-content/right-content.component';
import { IceDayComponent } from './ice-day/ice-day.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent,
    NavbarComponent,
    SearchbarComponent,
    MiddleComponent,
    HealthyContentComponent,
    IceComponent,
    MidBaseComponent,
    RightContentComponent,
    IceDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
