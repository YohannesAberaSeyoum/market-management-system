import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { btn } from 'src/app/Models/button';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() btn: btn = {
    text: ""
  }
  @Output() customClick = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  takeAction(){
    this.customClick.emit()
  }

}
