import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { btn } from 'src/app/Models/button';
import { CategoryTypes } from 'src/app/store/actionTypes/category.type';
import { SubcategoryTypes } from 'src/app/store/actionTypes/subcategory.type';
import { UserItem } from 'src/app/store/models/auth.model';
import { CategoryItem } from 'src/app/store/models/category.model';
import { State } from 'src/app/store/models/state.model';
import { SubcategoryItem } from 'src/app/store/models/subcategory.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: Observable<{[name: string] : CategoryItem}> = this.store.select(state => state.categories);
  subcategories: Observable<{[name: string] : SubcategoryItem}> = this.store.select(state => state.subcategories)
  user: Observable<UserItem> = this.store.select(state => state.user);
  username : String = "";
  categoryList : CategoryItem[] = [];
  subcategoryList : SubcategoryItem[] = [];

  addCategoryBtn : btn = {
    text: "Add Category",
    color: "danger",
    sm: "12",
  }


  constructor(private store:Store<State>, private router:Router) {     
  }

  ngOnInit(): void {
    this.subcategories.subscribe(item => {
      this.subcategoryList = [];
      for (const i in item) {
        if(i){
          this.subcategoryList.push(item[i])
          console.log(item[i])
        }
      }
    })
    console.log(this.subcategoryList)
    this.categories.subscribe(item => {
      this.categoryList = [];
      for (const i in item) {
        if(i){
        this.categoryList.push(item[i])
        }
      }
    })
    this.user.subscribe(item => this.username = item.username)
    this.store.dispatch({type: CategoryTypes.FETCHING_ALL, payload:{username: this.username}});
    this.store.dispatch({type: SubcategoryTypes.FETCHING_ALL, payload:{username: this.username}})
    console.log("subcategory",this.subcategoryList)
  }

  updateCategory(name:string){
    this.router.navigate([`updateCategory/${name}`])
  }
  updateSubcategory(name:string){
    this.router.navigate([`updateSubcategory/${name}`])
  }
  }
