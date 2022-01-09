import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { btn } from 'src/app/Models/button';
import { ProductTypes } from 'src/app/store/actionTypes/product.type';
import { UserItem } from 'src/app/store/models/auth.model';
import { ProductItem } from 'src/app/store/models/product.model';
import { State } from 'src/app/store/models/state.model';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  products: Observable<{[name: string] : ProductItem}> = this.store.select(state => state.products);
  user: Observable<UserItem> = this.store.select(state => state.user);
  param : {category: string, subcategory: string} = {category: "", subcategory: ""}
  username: String = "";
  productList : ProductItem[] =[];

  addProductBtn : btn = {
    text: "Add Product",
    color: "secondary",
    sm: "12",
    md: "8",
    my: "2"
  }

  searchBtn : btn = {
    text: "Search",
    color: "primary",
    sm: "12",
    lg: "6"  
  }

  constructor(private router: Router, private store: Store<State>, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => this.ngOnInit())
   }

  ngOnInit(): void {
    this.user.subscribe(item => this.username = item.username)
    this.param = {category: this.activatedRoute.snapshot.params['category'], subcategory: this.activatedRoute.snapshot.params['subcategory']}
    if (this.param.subcategory){
      this.store.dispatch({type: ProductTypes.FETCHING_BY_SUBCATEGORY, payload: {param: this.param, username: this.username}})
      this.products.subscribe(item => {;
      this.productList = [];
      for (const i in item) {
        if(i === `${this.param.category}#${this.param.subcategory}#${item[i].name}`){
          this.productList.push(item[i])
        }
      }})
    }
    else if (this.param.category){
      this.store.dispatch({type: ProductTypes.FETCHING_BY_CATEGORY, payload: {param: this.param, username: this.username}})
      this.products.subscribe(item => {;
      this.productList = [];
      for (const i in item) {
        if(i === `${this.param.category}#${item[i].subcategory_name}#${item[i].name}`){
          this.productList.push(item[i])
        }
      }})
    }else{
      this.products.subscribe(item => {this.productList = [];
        for (const i in item) {
          console.log(i)
          if(item[i].name !== ""){
            this.productList.push(item[i])
            console.log(item[i])
          }
        }})
        this.store.dispatch({type: ProductTypes.FETCHING_ALL, payload: {username: this.username}})
    }
  }

   toAddProduct(){
    this.router.navigate(["/addProduct"])
  }

}
