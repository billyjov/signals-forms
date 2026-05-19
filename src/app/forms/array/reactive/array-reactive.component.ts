import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-array-reactive',
  templateUrl: './array-reactive.component.html',
  styleUrl: './array-reactive.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ArrayReactiveComponent {
  items = new FormArray([
    new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.min(1))
    })
  ]);

  addItem() {
    this.items.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        quantity: new FormControl(1, Validators.min(1))
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
