import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }

  userSignup(user:SignUp){
    this.http.post("http://localhost:3000/user",user,{observe:'response'}).subscribe((result)=>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
      
    })

  }
  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, {observe: 'response'}
    ).subscribe((result)=> {
      if(result && result.body?.length){
      //console.log(result);
      this.invalidUserAuth.emit(false)
      localStorage.setItem('user',JSON.stringify(result.body[0]))
      this.router.navigate(['/'])
    }else{
      this.invalidUserAuth.emit(true)
    }
      
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
