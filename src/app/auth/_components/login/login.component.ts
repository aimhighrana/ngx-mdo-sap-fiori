import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


export enum ErrorState {
  empty_username_password='empty_username_password',
  invalid_username_password='invalid_username_password'
}

@Component({
  selector: 'pros-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  $loginForm: FormGroup;

  @ViewChild('username') username: ElementRef | undefined;
  
	@ViewChild('password') password: ElementRef | undefined;

  error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.$loginForm = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }


  ngOnInit(): void {
    this.$loginForm.valueChanges.subscribe({
      next:(val)=>{
        console.log(val);
      }
    })
  }


  public signIn() {
    const username = (this.username as any)?.value || '';
    const password = (this.password as any)?.value || '';
    if(!username || !password) {
      this.error = ErrorState.empty_username_password.valueOf();
      return;
    }
    this.error = '';
    this.authService.signIn(username, password).subscribe({
      next:(res)=>{
        Object.keys(res?.body || {}).forEach(f=>{
          localStorage.setItem(f, res?.body?.[f]);
        });

        // navigate to home page... 
        this.router.navigate(['home']);
      }, 
      error:(error)=>{
        this.error = ErrorState.invalid_username_password.toString()
      }
    })
    
  }

}
