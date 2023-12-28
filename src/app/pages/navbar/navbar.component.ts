import { Component,OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { Product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menutype:string='default';
  sellerName: string='';
  searchResult: undefined|Product[];
  userName: string="";
  constructor(private route: Router, private product: ProductService){ }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          //console.log('seller area')
            let sellerStore=localStorage.getItem('seller');
            let sellerData= sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName=sellerData.name;
            this.menutype='seller';
          }
           else if(localStorage.getItem('user')){
            let userStore=localStorage.getItem('user');
            let userData= userStore && JSON.parse(userStore);
            this.userName=userData.name;
            this.menutype='user';
          }
        else{
          //console.log('not area')
          this.menutype="default";
        }
      }
    });
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['//user-auth']);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element=query.target as HTMLInputElement;
      //console.log(element.value);
      this.product.searchProducts(element.value).subscribe((result)=>{
        //console.log(result);
        if(result.length>5){
          result.length=5;
        }
        
        this.searchResult=result;
      })
    }

  }

  hideSearch(){
    this.searchResult=undefined;
  }

  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id]);
  }

  submitSearch(val:string){
    //console.log(val);
    this.route.navigate([`search/${val}`])
  }

}
