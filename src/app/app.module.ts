import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserReducer } from "./store/reducers/user.reducer";

const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "", redirectTo: "/home", pathMatch:"full"},
  {path:"signin", component: SigninComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainContentComponent,
    ProductItemComponent,
    CustomButtonComponent,
    HomepageComponent,
    SigninComponent,
    CustomInputComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    StoreModule.forRoot({user: UserReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
