import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {

  cartProducts: any[] = [];
  total: any = 0;
  loaded: boolean = false;
  constructor(private service: CartsService) { }

  ngOnInit(): void {
    this.getCartproducts();
  }

  getCartproducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    console.log(this.cartProducts);
    this.getCartTotalPrice();
  }

  getCartTotalPrice() {
    this.total = 0;
    for (let i in this.cartProducts) {
      this.total += this.cartProducts[i].product.price * this.cartProducts[i].quantity;
    }
  }

  minusAmount(index: number) {
    this.cartProducts[index].quantity > 1 ?
      this.cartProducts[index].quantity-- :
      this.cartProducts[index].quantity = 1;
    this.getCartTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  plusAmount(index: number) {
    this.cartProducts[index].quantity < 99 ?
      this.cartProducts[index].quantity++ :
      this.cartProducts[index].quantity = 99;
    this.getCartTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  detectChanges() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotalPrice();
  }

  deleteCartProduct(index: any) {
    this.cartProducts.splice(index, 1);
    this.getCartTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  clearCart() {
    this.cartProducts = [];
    this.getCartTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  orderCart() {
    let products = this.cartProducts.map(
      product => {
        return {
          productId: product.product.id,
          quantity: product.quantity,
        }
      }
    );
    let cart = {
      userId: 5,
      date: new Date(),
      products: products,
    }

    this.service.addNewCart(cart).subscribe(
      res => {
        this.clearCart();
        this.loaded = true;
      },
      error => {
        alert(error.message);
      }
    )
    console.log(cart);
  }

}
