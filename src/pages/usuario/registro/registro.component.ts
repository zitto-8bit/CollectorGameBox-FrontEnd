import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { RegistroDTO } from '../../../interface/Usuario';
import { ValidationErrorResponse } from '../../../interface/Error';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { fadeInOut } from '../../../animations/animations';
import { HeaderComponent } from '../../home/header/header.component';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  imports: [ReactiveFormsModule, 
    CommonModule, 
    RouterModule,
    NgxMaskDirective,
    HeaderComponent,
    LoadingComponent],
    animations: [fadeInOut],
  providers: [provideNgxMask()]
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  msgErroGenerica: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      dataNasc: ['', Validators.required],
      acessibilidade: ['N', Validators.pattern(/^[SN]$/)],
    });
  }

  ngOnInit(): void {
    this.limparErrosBackendAoAlterar();
  }

  private limparErrosBackendAoAlterar(): void {
    const campos = ['nome', 'email', 'senha', 'dataNasc', 'acessibilidade'];

    campos.forEach((campo) => {
      this.registroForm.get(campo)?.valueChanges.subscribe(() => {
        const control = this.registroForm.get(campo);
        if (control?.hasError('backend')) {
          control.setErrors(null);
        }
        this.msgErroGenerica = '';
      });
    });
  }

  onSubmit(): void {
    this.loading = true;
    const dadosLogin: RegistroDTO = this.registroForm.value;
    this.usuarioService.registrar(dadosLogin).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        const validationErrorResponse: ValidationErrorResponse = err.error;
        const erros = validationErrorResponse.erros;

        if(!erros) {
          this.msgErroGenerica = err.error.localizedMessage;
          return;
        }

        const campos = Object.keys(erros);
        campos.forEach((campo) => {
          const control = this.registroForm.get(campo);
          if (control) {
            control.setErrors({ backend: erros[campo] });
          }
        });
      },
    });
  }

  alternarAcessibilidade(): void {
    const atual = this.registroForm.get('acessibilidade')?.value;
    this.registroForm.get('acessibilidade')?.setValue(atual === 'S' ? 'N' : 'S');
  }
  
}
