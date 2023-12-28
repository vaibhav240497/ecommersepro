import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
productData:undefined|Product;
productQuantity:number=1
  constructor( private activeRoute: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId=this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.log(result);
      this.productData=result;
      
    })
    
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='max'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){
        //console.log(this.productData);
        this.product.localAddToCart(this.productData);
      }
      
      
    }
  }

}
