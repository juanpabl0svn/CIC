import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../types';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {


  constructor(private productService: ProductService, private toast: HotToastService) {
    this.fetchProducts();
  }

  products = signal<IProduct[]>([]);
  search = signal('');
  showForm = signal(false);
  selected = signal<IProduct | null>(null);

  filtered = computed(() => {
    const term = this.search().toLowerCase();
    return this.products().filter(p =>
      p.title.toLowerCase().includes(term)
    );
  });

  fetchProducts() {
    this.productService.getAll().subscribe({
      next: res => this.products.set(res),
      error: () => this.toast.error('Error loading products')
    });
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(id).subscribe({
      next: () => {
        this.toast.success('Deleted');
        this.products.set(this.products().filter(p => p.id !== id));
      },
      error: () => this.toast.error('Error deleting')
    });
  }

  openForm(product?: IProduct) {
    this.selected.set(product || null);
    this.showForm.set(true);
  }

  closeForm(refresh: boolean) {
    this.showForm.set(false);
    this.selected.set(null);
    if (refresh) this.fetchProducts();
  }

  onSearchChange(value: string) {
    this.search.set(value);
  }
}
