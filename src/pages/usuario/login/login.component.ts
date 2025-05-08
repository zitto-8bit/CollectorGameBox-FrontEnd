import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginDTO } from '../../../interface/Usuario';
import { Router, RouterModule } from '@angular/router';
import { ValidationErrorResponse } from '../../../interface/Error';
import { AuthService } from '../../../service/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fadeInOut } from '../../../animations/animations';
import { HeaderComponent } from '../../home/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, 
    CommonModule, 
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderComponent],
  animations: [fadeInOut]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginInvalido: boolean = false; 

  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    const dadosLogin: LoginDTO = this.loginForm.value;
    this.auth.logar(dadosLogin).subscribe({
      next: () => {
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        const validationErrorResponse: ValidationErrorResponse = err.error;
        const erros = validationErrorResponse.erros;

        if(!erros) {
          this.loginInvalido = true;
          setTimeout(() => {
            this.loginInvalido = false;
          }, 4000);
          return;
        }

        const campos = Object.keys(erros);
        campos.forEach((campo) => {
          const control = this.loginForm.get(campo);
          if (control) {
            control.setErrors({ backend: erros[campo] });
          }
        });
      },
    });
  }

}
