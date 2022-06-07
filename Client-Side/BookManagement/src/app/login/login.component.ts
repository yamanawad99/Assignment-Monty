import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm=this.formBuilder.group({
    username:['',Validators.required],pwd:['',Validators.required]
  })
  constructor(private router:Router,private formBuilder:FormBuilder,private service:SharedService ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("onsubmit")
    let username=this.loginForm.controls["username"].value;
    let pwd=this.loginForm.controls["pwd"].value;
    this.service.login(username,pwd).subscribe((data:any)=>{
      
      localStorage.setItem("userInfo",JSON.stringify(data));
      this.router.navigate(["/book"])
    },err=>{
      console.log("error",err);
    })
  }
}