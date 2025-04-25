import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../types';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ProductFormComponent, MatIconModule],
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

  stars = signal(Array.from({ length: 5 }, (_, i) => i + 1));

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

  async delete(id: number) {

    const answer = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    if (!answer.isConfirmed) return;
    this.productService.delete(id).subscribe({
      next: () => {
        this.toast.success('Deleted');
        this.products.set(this.products().filter(p => p.id !== id));
      },
      error: () => this.toast.error('Error deleting product')
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
