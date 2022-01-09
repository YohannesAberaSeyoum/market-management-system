import { Component, Input, OnInit } from '@angular/core';
import { btn } from 'src/app/Models/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() links: String[] = [];
  @Input() btn: btn = {text: ""};
  @Input() btnClick: any = ""

  constructor() { }

  ngOnInit(): void {
  }
  

}
