import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { btn } from 'src/app/Models/button';
import { errorRemove } from 'src/app/store/actions/error.action';
import { finishStart } from 'src/app/store/actions/finish.action';
import { SubcategoryTypes } from 'src/app/store/actionTypes/subcategory.type';
import { UserItem } from 'src/app/store/models/auth.model';
import { CategoryItem } from 'src/app/store/models/category.model';
import { ErrorModel } from 'src/app/store/models/error.model';
import { State } from 'src/app/store/models/state.model';
import { SubcategoryItem } from 'src/app/store/models/subcategory.model';

@Component({
  selector: 'app-add-update-subcategory',
  templateUrl: './add-update-subcategory.component.html',
  styleUrls: ['./add-update-subcategory.component.css']
})
export class AddUpdateSubcategoryComponent implements OnInit {
  auth: Observable<UserItem> = this.store.select(state => state.user);
  categories: Observable<{[name: string] : CategoryItem}> = this.store.select(state => state.categories);
  subcategories: Observable<{[name: string] : SubcategoryItem}> = this.store.select(state => state.subcategories)
  errorObserver: Observable<ErrorModel> = this.store.select(state => state.error);
  finishObserver: Observable<Boolean> = this.store.select(state => state.finished);
  categoryList: CategoryItem[] = []
  param : {category: string, name: string} = {category: "", name : ""}
  selectedCategory: String = ""
  name: string = "";
  description: string = ""
  username: string = ""
  error: string = ""
  headerLinks : String[] = ["Home", "About", "Contact Us"];
  signOutBtn : btn = {
    text: "Signout",
    color: "danger"
  }

  addCategoryBtn: btn = {
    text: "Add Category",
    color: "secondary"
  }
  addSubcategoryBtn: btn = {
    text: "Add Subcategory",
    color: "secondary"
  }

  addBtn: btn = {
    text: "Add Product",
    color: "primary",
    sm: "12",
    type: "submit"
  }

  updateBtn: btn = {
    text: "Update Product",
    color: "primary",
    sm: "12",
    type: "submit"
  }

  selectedBtn: btn = this.addBtn;
  selectedFnc = this.addSubcategory

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store:Store<State>) { 
    this.activatedRoute.params.subscribe(params => this.ngOnInit())
  }

  ngOnInit(): void {
    this.store.dispatch(errorRemove())
    this.param = {category: this.activatedRoute.snapshot.params['category'], name: this.activatedRoute.snapshot.params['name']}
    if (this.param.name){
      this.selectedBtn = this.updateBtn;
      this.selectedFnc = this.updateSubcategory
      this.store.dispatch({type: SubcategoryTypes.FETCHING, payload: {param: this.param, username: this.username}})
          this.subcategories.subscribe(item => {
      for (const i in item) {
        if(i === `${this.param.category}#${this.param.name}`){
          this.name = item[i].name
          this.description = item[i].description || ""
          this.selectedCategory = item[i].category_name
        }
      }
    })
    }
    this.errorObserver.subscribe((item) => {
      if(item.msg){
        this.error = item.msg
      }
    })
    this.finishObserver.subscribe((item) => {
      if(item){
        this.store.dispatch(errorRemove())
        this.store.dispatch(finishStart())
        this.router.navigate([""])
      }
    })
    this.auth.subscribe((item) => {
      if (!item.isSignedIn){
        this.router.navigate(["/signin"])
      }
      else{
        this.username = item.username
      }
    })
    this.categories.subscribe(item => {
      this.categoryList = [];
      for (const i in item) {
        if(i){
        this.categoryList.push(item[i])
        }
      }
    })
    this.selectedCategory = this.selectedCategory ? this.selectedCategory : this.categoryList[0].name
  }

  changeCategorySelect(e: Event){
    const value = (e.target as HTMLInputElement).value
    this.selectedCategory = value
  }

  toAddCategory = () => {
    this.router.navigate(["/addCategory"])
  }

  addSubcategory(){
    this.store.dispatch({type: SubcategoryTypes.ADDING, payload: {body: {username: this.username, category_name: this.selectedCategory, name: this.name, description: this.description}}})
  }

  updateSubcategory(){
    this.store.dispatch({type: SubcategoryTypes.UPDATING, payload: {body: {username: this.username, category_name: this.selectedCategory, name: this.name, description: this.description},param: this.param}})
  }

  updateSubcategorydescription(e: Event){
    this.description = (e.target as HTMLInputElement).value;
  }

  updateSubcategoryname(e: Event){
    this.name = (e.target as HTMLInputElement).value;
  }

}
