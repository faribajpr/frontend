import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from "../helper/mustMatch.validator";
declare var UIkit: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  returnUrl: string = '';
  submitted = false;
  registerForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: [MustMatch]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    this.authService.register(this.f.username.value, this.f.email.value, this.f.password.value).subscribe(result => {
      console.log(result);
      UIkit.notification({ message: 'Successful Register', status: 'success', pos: 'bottom-center' })
      this.router.navigate(['/login']);
    }, error => {
      // this.submitted = false;
      console.log(error)
    })
  }




}
