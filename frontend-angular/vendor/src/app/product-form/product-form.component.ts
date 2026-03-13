import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  activeSection: string = 'add';

  // Add product fields
  product_name: any;
  description: any;
  price: any;
  quantity: any;
  image_url: any;
  selectedImagePreview: string = '';

  // Edit product fields
  edit_id: any;
  edit_product_name: any;
  edit_description: any;
  edit_price: any;
  edit_quantity: any;
  edit_image_url: any;
  editSelectedImagePreview: string = '';

  // Delete
  delete_product_name: any;

  products: any[] = [];

  constructor(private api: ApiService, private router: Router) {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (err) => {
        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    });
  }

 
  onImageFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image_url = e.target.result;
        this.selectedImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  
  onEditImageFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.edit_image_url = e.target.result;
        this.editSelectedImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct() {
    let data = {
      product_name: this.product_name,
      description: this.description,
      price: this.price,
      quantity: this.quantity,
      image_url: this.image_url
    };
    this.api.addProduct(data).subscribe({
      next: () => {
        alert('Product Added Successfully');
        this.loadProducts();
        this.product_name = this.description = this.price = this.quantity = this.image_url = '';
        this.selectedImagePreview = '';
      },
      error: (err) => {
        console.error('Add failed:', err);
        alert('Failed to add product! Error: ' + err.status);
      }
    });
  }

  onProductSelectForEdit() {
    const selected = this.products.find(
      p => p.product_name.toLowerCase() === this.edit_product_name.toLowerCase()
    );
    if (selected) {
      this.edit_id = selected.id;
      this.edit_description = selected.description;
      this.edit_price = selected.price;
      this.edit_quantity = selected.quantity;
      this.edit_image_url = selected.image_url;
      this.editSelectedImagePreview = selected.image_url || '';
    }
  }

  updateProduct() {
    if (!this.edit_id) {
      alert('Product not found! Make sure you typed the exact product name first.');
      return;
    }
    let data = {
      product_name: this.edit_product_name,
      description: this.edit_description,
      price: this.edit_price,
      quantity: this.edit_quantity,
      image_url: this.edit_image_url
    };
    this.api.updateProduct(this.edit_id, data).subscribe({
      next: () => {
        alert('Product Updated Successfully');
        this.loadProducts();
        this.editSelectedImagePreview = '';
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Update failed! Error: ' + err.status);
      }
    });
  }

  deleteProduct() {
    if (this.products.length <= 2) {
      alert('You need more than 2 products to delete!');
      return;
    }
    const selected = this.products.find(
      p => p.product_name.toLowerCase() === this.delete_product_name.toLowerCase()
    );
    if (!selected) return alert('Product not found!');
    if (confirm('Are you sure you want to delete this product?')) {
      this.api.deleteProduct(selected.id).subscribe({
        next: () => {
          alert('Product Deleted Successfully');
          this.loadProducts();
          this.delete_product_name = '';
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Delete failed! Error: ' + err.status);
        }
      });
    }
  }

}