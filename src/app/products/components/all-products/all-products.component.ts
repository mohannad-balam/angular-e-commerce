import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { BrowserModule } from '@angular/platform-browser'

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  title: string = 'Categories';
  products: any[] = [];
  categories: any[] = [];
  cartProducts: any[] = [];
  loaded: boolean = false;

  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loaded = true;
    this.service.getAllProducts().subscribe(
      (res: any) => {
        console.log(res);
        this.loaded = false;
        this.products = res;
      },
      error => {
        this.loaded = false;
        console.log(error);
        alert('Something went wrong! Please try again later!')
      }
    )
  }

  getCategories() {
    this.loaded = true;
    this.service.getAllCategories().subscribe(
      (res: any) => {
        console.log(res);
        this.loaded = false;
        this.categories = res;
      },
      error => {
        this.loaded = false;
        alert(error.message);
      }
    )
  }

  filterCategory(event: any) {
    this.loaded = true;
    let value = event.target.value;
    console.log(value);
    this.service.getProductsByCategory(value).subscribe(
      (res: any) => {
        this.loaded = false;
        console.log(res);
        this.products = res;
      }
    )
  }

  addToCart(event: any) {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    //we recieve the current product on the event parameter based on the emitted event on click
    console.log(event);
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      //check if the product in the cart is equal to the current product id (check if repeated)
      let exist = this.cartProducts.find(product => product.product.id! === event.product.id!);
      if (exist) {
        alert('Product already exists in your cart!')
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
