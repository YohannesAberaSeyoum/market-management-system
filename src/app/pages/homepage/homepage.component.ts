import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { btn } from 'src/app/Models/button';
import { signOut } from 'src/app/store/actions/auth.action';
import { errorRemove } from 'src/app/store/actions/error.action';
import { UserItem } from 'src/app/store/models/auth.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  auth: Observable<UserItem> = this.store.select(state => state.user);
  headerLinks : String[] = ["Home", "About", "Contact Us"];
  signOutBtn : btn = {
    text: "Signout",
    color: "danger"
  }

  constructor(private router: Router, private store: Store<{user: UserItem}>) { 
  }

  ngOnInit(): void {
    this.store.dispatch(errorRemove())
    this.auth.subscribe((item) => {
      if (!item.isSignedIn){
        this.router.navigate(["/signin"])
      }
    })
  }

  signOut = () => {
    this.store.dispatch(signOut())
    window.location.reload();
  }

}
