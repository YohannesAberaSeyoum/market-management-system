import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddUpdateCategoryComponent } from './pages/add-update-category/add-update-category.component';
import { AddUpdateProductComponent } from './pages/add-update-product/add-update-product.component';
import { AddUpdateSubcategoryComponent } from './pages/add-update-subcategory/add-update-subcategory.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthEffect } from "./store/effects/auth.effect";
import { userReducer } from "./store/reducers/auth.reducer";
import { errorReducer } from "./store/reducers/error.reducer";

const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "addProduct", component: AddUpdateProductComponent },
  {path: "updateProduct/:name", component: AddUpdateProductComponent },
  {path: "addCategory", component: AddUpdateCategoryComponent },
  {path: "updateCategory/:name", component: AddUpdateCategoryComponent },
  {path: "addSubcategory", component: AddUpdateSubcategoryComponent },
  {path: "updateSubcategory/:name", component: AddUpdateSubcategoryComponent },
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
    CustomInputComponent,
    AddUpdateProductComponent,
    AddUpdateCategoryComponent,
    AddUpdateSubcategoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    StoreModule.forRoot({user: userReducer, error: errorReducer}),
    HttpClientModule,
    EffectsModule.forRoot([AuthEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
