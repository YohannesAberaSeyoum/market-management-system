import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  products: Observable<{[name: string] : ProductItem}> = this.store.select(state => state.products);
  user: Observable<UserItem> = this.store.select(state => state.user);
  username: String = "";
  productList : ProductItem[] =[];

  addProductBtn : btn = {
    text: "Add Product",
    color: "secondary"
  }

  searchBtn : btn = {
    text: "Search",
    color: "primary"
  }

  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit(): void {
    this.user.subscribe(item => this.username = item.username)
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

   toAddProduct(){
    this.router.navigate(["/addProduct"])
  }

}
