import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  productUpdateMassage: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
    this.productData=data;
      
    })
  }

  submit(data: Product){
    console.log(data);
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productUpdateMassage="product updated succesfully";
      }
    });
    setTimeout(() => {
      this.productUpdateMassage = undefined;
    }, 3000);
  }
}
