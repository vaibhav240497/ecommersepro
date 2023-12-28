import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: Product){
    return this.http.post('http://localhost:3000/products',data);
  }

  productList(){
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product:Product){
    return this.http.put(`http://localhost:3000/products/${product.id}`,product)
  }

  popularProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3');
  }

  treandyProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data:Product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
  }
}
