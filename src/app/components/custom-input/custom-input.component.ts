import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inp } from 'src/app/Models/input';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {
  @Input() inp: inp = {};
  @Input() label:String = "";
  @Input() name:String = "";
  @Input() type:String = "text";
  @Input() inputModel: String = "";
  @Input() placeholder:String = "";
  @Output() inputModelChange = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

}
