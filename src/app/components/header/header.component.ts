import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { signOut } from 'src/app/store/actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  signOut(){
    this.store.dispatch(signOut())
  }

}
