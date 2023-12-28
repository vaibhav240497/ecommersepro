import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string="";
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp) {
    this.user.userSignup(data)
  }

  login(data: Login) {
    //console.log(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.log("hii", result);
      if(result){
        this.authError="please enter valid user details";
      }
      
    })
    
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true
  }
}
