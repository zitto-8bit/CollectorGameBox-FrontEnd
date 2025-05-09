import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { UsuarioDTO } from '../../../interface/Usuario';
import { slideInOutTopToDown } from '../../../animations/animations';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [slideInOutTopToDown]
})
export class HeaderComponent implements OnInit {

  usuario?: UsuarioDTO | null;
  esterAtivo = false;
  qntCliqueEsterEgg = 0;

  constructor(private authService:AuthService) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }

  isAdmin(): boolean {
    if(this.usuario) {
      return this.authService.isAdmin();
    }
    
    return false;
  }

  somaUmAEsterEgg() {
    if(this.qntCliqueEsterEgg < 5) {
      this.qntCliqueEsterEgg++;
      if(this.qntCliqueEsterEgg == 5) {
        this.esterAtivo = true;
        setTimeout(() => {
          this.qntCliqueEsterEgg = 0;
          this.esterAtivo = false;
        }, 3000);
      }
    } else {
      this.qntCliqueEsterEgg = 0;
    }
  }

}
