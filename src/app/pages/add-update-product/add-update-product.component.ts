import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { btn } from 'src/app/Models/button';
import { errorRemove } from 'src/app/store/actions/error.action';
import { finishStart } from 'src/app/store/actions/finish.action';
import { ProductTypes } from 'src/app/store/actionTypes/product.type';
import { UserItem } from 'src/app/store/models/auth.model';
import { CategoryItem } from 'src/app/store/models/category.model';
import { ErrorModel } from 'src/app/store/models/error.model';
import { ProductItem } from 'src/app/store/models/product.model';
import { State } from 'src/app/store/models/state.model';
import { SubcategoryItem } from 'src/app/store/models/subcategory.model';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {
   products: Observable<{[name: string] : ProductItem}> = this.store.select(state => state.products);
  auth: Observable<UserItem> = this.store.select(state => state.user);
    categories: Observable<{[name: string] : CategoryItem}> = this.store.select(state => state.categories);
  subcategories: Observable<{[name: string] : SubcategoryItem}> = this.store.select(state => state.subcategories)
    errorObserver: Observable<ErrorModel> = this.store.select(state => state.error);
  finishObserver: Observable<Boolean> = this.store.select(state => state.finished);
  subcategoryList: SubcategoryItem[] = []
  categoryList: CategoryItem[] = []
  param : {category: string, subcategory: string, name: string} = {category: "", subcategory: "", name : ""}
  selectedCategory: String = ""
  selectedSubcategory: String = ""
  name: string = "";
  quantity: number = 1;
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
  selectedFnc = this.addProduct

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store:Store<State>) { }

  ngOnInit(): void {
    this.param = {category: this.activatedRoute.snapshot.params['category'], subcategory: this.activatedRoute.snapshot.params['subcategory'], name: this.activatedRoute.snapshot.params['name']}
    if (this.param.name){
      this.selectedBtn = this.updateBtn;
      this.selectedFnc = this.updateProduct
      this.store.dispatch({type: ProductTypes.FETCHING, payload: {param: this.param, username: this.username}})
          this.products.subscribe(item => {;
      for (const i in item) {
        console.log("bire", i)
        console.log("sis", `${this.param.category}#${this.param.subcategory}#${this.param.name}`)
        if(i === `${this.param.category}#${this.param.subcategory}#${this.param.name}`){
          this.name = item[i].name
          this.description = item[i].description || ""
          this.selectedCategory = item[i].category_name
          this.fetchSubFromCat()
          this.selectedSubcategory = item[i].subcategory_name
          this.quantity = item[i].quantity
        }
      }})
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
  }

  fetchSubFromCat(){
this.subcategories.subscribe(item => {
      this.subcategoryList = [];
      for (const i in item) {
        if(item[i].category_name === this.selectedCategory){
          this.subcategoryList.push(item[i])
        }
      }
    })
  }

  changeCategorySelect(e: Event){
    const value = (e.target as HTMLInputElement).value
    this.selectedCategory = value
    this.fetchSubFromCat()
  }

  changeSubcategorySelect(e: Event){
    const value = (e.target as HTMLInputElement).value;
    this.selectedSubcategory = value
  }

  toAddCategory = () => {
    this.router.navigate(["/addCategory"])
  }

  toAddSubcategory = () => {
    this.router.navigate(["/addSubcategory"])
  }

  addProduct(){
    this.store.dispatch({type: ProductTypes.ADDING, payload: {body: {username: this.username, category_name: this.selectedCategory, subcategory_name: this.selectedSubcategory, name: this.name, quantity: this.quantity, description: this.description}}})
  }

  updateProduct(){
    console.log("sister and brother", this.quantity)
    this.store.dispatch({type: ProductTypes.UPDATING, payload: {body: {username: this.username, category_name: this.selectedCategory, subcategory_name: this.selectedSubcategory, name: this.name, quantity: this.quantity, description: this.description},param: this.param}})
  }

  updateProductdescription(e: Event){
    this.description = (e.target as HTMLInputElement).value;
  }
  updateProductquantity(e: Event){
    this.quantity = parseInt((e.target as HTMLInputElement).value);
  }
  updateProductname(e: Event){
    this.name = (e.target as HTMLInputElement).value;
  }

}
