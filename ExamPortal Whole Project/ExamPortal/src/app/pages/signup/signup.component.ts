import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService,private snack:MatSnackBar ){}

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };
  ngOnInit(): void {}

  formSubmit()
  {
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null){
      this.snack.open("User name is required!",'ok',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center'
      });
      return;
    }

    //validation



    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        //alert('success');
        Swal.fire('Success!!', 'User is registered!', 'success');
  
      },
      (error)=>{
        console.log(error);
        //alert('Something went wrong!');
        this.snack.open('User with this username is already there in DB!!Try with unique username!!!!','ok',{
          duration:3000,
        })
  
      }
    )
    
    //add
  }

  //this.user
  


}
