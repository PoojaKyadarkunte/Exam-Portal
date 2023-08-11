import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  isLoggedIn=false;
  user: null | any;
  
  constructor(public login:LoginService,
    private router:Router){}

  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
    })
    console.log("Modify kela re baba!!");
  }

  public logout(){
     this.login.logout();
     window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }

  getProfileLink(){
    //alert("hghj : "+this.user.authorities[0].authority)
    if (this.user.authorities[0].authority === 'Admin') {
      this.router.navigate(['/admin/profile']);
    } else {
      this.router.navigate(['/user-dashboard/profile']);
  
    }
  }
  
}
