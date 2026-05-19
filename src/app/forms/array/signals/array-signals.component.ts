import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, applyEach, required, min, FormField } from '@angular/forms/signals';

interface Item {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-array-signals',
  templateUrl: './array-signals.component.html',
  styleUrl: './array-signals.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormField],
})
export class ArraySignalsComponent {
  formModel = signal({
    items: [{ name: '', quantity: 1 } as Item],
  });

  form = form(this.formModel, (s) => {
    applyEach(s.items, (item) => {
      required(item?.name, { message: 'Name fehlt' });
      min(item?.quantity, 1, { message: 'Min 1' });
    });
  });

  addItem() {
    this.formModel.update((model) => ({
      ...model,
      items: [...model.items, { name: '', quantity: 1 }],
    }));
  }

  removeItem(index: number) {
    this.formModel.update((model) => ({
      ...model,
      items: model.items.filter((_, i) => i !== index),
    }));
  }
}
