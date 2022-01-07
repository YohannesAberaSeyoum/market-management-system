import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserItem } from 'src/app/store/models/auth.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  auth: Observable<UserItem> = this.store.select(state => state.user);

  constructor(private router: Router, private store: Store<{user: UserItem}>) { 
  }

  ngOnInit(): void {
    this.auth.subscribe((item) => {
      if (!item.isSignedIn){
        this.router.navigate(["/signin"])
      }
    })
  }

}
