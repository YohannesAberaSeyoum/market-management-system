import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() color:String = "";
  @Input() text:String = "";
  @Input() col:String = "";
  @Input() mx:String = "";
  @Input() type:String = "button";
  @Output() customClick = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  takeAction(){
    this.customClick.emit()
  }

}
