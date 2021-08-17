import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var UIkit: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  returnUrl: string = '';
  submitted = false;
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (Object.keys(this.authService.currentUserValue).length != 0) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.authService.login(this.f.email.value, this.f.password.value).subscribe(result => {
      // console.log(result);
      this.submitted = true;
      UIkit.notification({message: 'Successful Login', status: 'success', pos: 'bottom-center'})
      this.router.navigate(['/dashboard']);
    }, error => {
      this.submitted = false;
      console.log(error)
    })
  }


  // onCommentCancel() {
  //   this.loginForm.reset();
  // }

}
