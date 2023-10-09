import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modalexito',
  template: `
    <div class="modal">
      <div class="modal-content">
        <h1>Modal Title</h1>
        <p>Modal Content Goes Here</p>
        <button (click)="closeModal()">Close Modal</button>
      </div>
    </div>
  `,
})
export class ModalexitoComponent {
  closeModal() {
    // Logic to close the modal (e.g., set a flag to hide the modal)
    // You can emit an event to inform the parent component to close the modal
  }
}
