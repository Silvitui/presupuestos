import { Component, Input } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title: string = '';  
  @Input() text: string = '';   
 


}
