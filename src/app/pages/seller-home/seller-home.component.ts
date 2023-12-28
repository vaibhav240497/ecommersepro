import { Component,OnInit } from '@angular/core';
import { Product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined|Product[];
  productMassage: undefined|string;
  icon= faTrash;
  editIcon= faEdit;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id:number){
    console.log(id)
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMassage="product is deleted";
        this.list();
      }
    })

    setTimeout(() => {
      this.productMassage=undefined
    }, 3000);
  }
  list(){
    this.product.productList().subscribe((result)=>{
      this.productList=result;
    })
  }
}
