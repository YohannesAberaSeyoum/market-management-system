import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { btn } from 'src/app/Models/button';
import { errorRemove } from 'src/app/store/actions/error.action';
import { finishStart } from 'src/app/store/actions/finish.action';
import { CategoryTypes } from 'src/app/store/actionTypes/category.type';
import { UserItem } from 'src/app/store/models/auth.model';
import { CategoryItem } from 'src/app/store/models/category.model';
import { ErrorModel } from 'src/app/store/models/error.model';
import { State } from 'src/app/store/models/state.model';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.css']
})
export class AddUpdateCategoryComponent implements OnInit {
  categories: Observable<{[name: string] : CategoryItem}> = this.store.select(state => state.categories);
  auth: Observable<UserItem> = this.store.select(state => state.user);
  errorObserver: Observable<ErrorModel> = this.store.select(state => state.error);
  finishObserver: Observable<Boolean> = this.store.select(state => state.finished);
  param : {name: string} = {name : ""}
  name: string = "";
  description: string = ""
  username: string = ""
  error: string = ""
  headerLinks : String[] = ["Home", "About", "Contact Us"];

  signOutBtn : btn = {
    text: "Signout",
    color: "danger"
  }

  addBtn: btn = {
    text: "Add Category",
    color: "primary",
    sm: "12",
    type: "submit"
  }

  updateBtn: btn = {
    text: "Update Category",
    color: "primary",
    sm: "12",
    type: "submit"
  }

  selectedBtn: btn = this.addBtn;
  selectedFnc = this.addCategory

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store:Store<State>) {
    this.activatedRoute.params.subscribe(params => this.ngOnInit())
   }

  ngOnInit(): void {
    this.store.dispatch(errorRemove())
    this.param = { name: this.activatedRoute.snapshot.params['name']}
    if (this.param.name){
      this.selectedBtn = this.updateBtn;
      this.selectedFnc = this.updateCategory
      this.store.dispatch({type: CategoryTypes.FETCHING, payload: {param: this.param, username: this.username}})
          this.categories.subscribe(item => {;
      for (const i in item) {
        if(i === this.param.name){
          this.name = item[i].name
          this.description = item[i].description || ""
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
  }

  addCategory(){
    this.store.dispatch({type: CategoryTypes.ADDING, payload: {body: {username: this.username, name: this.name, description: this.description}}})
  }

  updateCategory(){
    this.store.dispatch({type: CategoryTypes.UPDATING, payload: {body: {username: this.username, name: this.name, description: this.description},param: this.param}})
  }

  updateCategorydescription(e: Event){
    this.description = (e.target as HTMLInputElement).value;
  }

  updateCategoryname(e: Event){
    this.name = (e.target as HTMLInputElement).value;
  }
}
