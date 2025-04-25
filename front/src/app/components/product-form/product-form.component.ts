import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';

import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../types';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  @Input() product: IProduct | null = null;
  @Output() closed = new EventEmitter<boolean>();

  toast = inject(HotToastService);
  productService = inject(ProductService);

  formData: Omit<IProduct, 'id'> = {
    title: '',
    price: 0,
    description: '',
    category: 'electronics',
    image: '',
    rate: 0,
    count: 0
  };

  categories = [
    'electronics',
    'jewelry',
    "man's clothing",
    "woman's clothing"
  ];

  ngOnInit() {
    if (this.product) {
      const { id, ...rest } = this.product;
      this.formData = { ...rest };
    }
  }

  save() {
    if (this.product) {
      this.productService.update(this.product.id, this.formData).subscribe({
        next: () => {
          this.toast.success('IProduct updated');
          this.closed.emit(true);
        },
        error: () => this.toast.error('Update failed')
      });
    } else {
      this.productService.create(this.formData).subscribe({
        next: () => {
          this.toast.success('IProduct created');
          this.closed.emit(true);
        },
        error: () => this.toast.error('Creation failed')
      });
    }
  }

  cancel() {
    this.closed.emit(false);
  }
}
