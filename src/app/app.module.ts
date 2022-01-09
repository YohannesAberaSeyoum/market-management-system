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
import { DeleteComponent } from './delete/delete.component';
import { AddUpdateCategoryComponent } from './pages/add-update-category/add-update-category.component';
import { AddUpdateProductComponent } from './pages/add-update-product/add-update-product.component';
import { AddUpdateSubcategoryComponent } from './pages/add-update-subcategory/add-update-subcategory.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthEffect } from "./store/effects/auth.effect";
import { CategoryEffect } from "./store/effects/category.effect";
import { ProductEffect } from "./store/effects/product.effect";
import { SubcategoryEffect } from "./store/effects/subcategory.effect";
import { userReducer } from "./store/reducers/auth.reducer";
import { categoryReducer } from "./store/reducers/category.reducer";
import { errorReducer } from "./store/reducers/error.reducer";
import { finishReducer } from "./store/reducers/finish.reducer";
import { productReducer } from "./store/reducers/product.reducer";
import { subcategoryReducer } from "./store/reducers/subcategory.reducer";

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "addProduct", component: AddUpdateProductComponent },
  {path: "updateProduct/:category/:subcategory/:name", component: AddUpdateProductComponent },
  {path: "deleteProduct/:category/:subcategory/:name", component: DeleteComponent },
  {path: "addCategory", component: AddUpdateCategoryComponent },
  {path: "updateCategory/:name", component: AddUpdateCategoryComponent },
  {path: "addSubcategory/:category", component: AddUpdateSubcategoryComponent },
  {path: "updateSubcategory/:category/:name", component: AddUpdateSubcategoryComponent },
  {path: "signin", component: SigninComponent},
  {path: "register", component: RegisterComponent}
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
    AddUpdateSubcategoryComponent,
    RegisterComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    StoreModule.forRoot({user: userReducer, error: errorReducer, finished: finishReducer, categories: categoryReducer, subcategories: subcategoryReducer, products: productReducer}),
    HttpClientModule,
    EffectsModule.forRoot([AuthEffect, CategoryEffect, SubcategoryEffect, ProductEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
