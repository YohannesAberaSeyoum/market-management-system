import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { errorRemove } from '../store/actions/error.action';
import { finishStart } from '../store/actions/finish.action';
import { ProductTypes } from '../store/actionTypes/product.type';
import { UserItem } from '../store/models/auth.model';
import { State } from '../store/models/state.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  param : {category: string, subcategory: string, name: string} = {category: "", subcategory: "", name : ""}
  finishObserver: Observable<Boolean> = this.store.select(state => state.finished);
  auth: Observable<UserItem> = this.store.select(state => state.user);
  username: string = ""

  constructor(private router: Router, private store:Store<State>, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.param = {category: this.activatedRoute.snapshot.params['category'], subcategory: this.activatedRoute.snapshot.params['subcategory'], name: this.activatedRoute.snapshot.params['name']}
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

  backToHome(){
    this.router.navigate([""])
  }

  deleteProduct(){
    this.store.dispatch({type: ProductTypes.DELETING, payload: {username: this.username, param: this.param}})
  }

}
