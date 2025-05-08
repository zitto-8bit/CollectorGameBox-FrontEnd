import { Component, OnInit } from '@angular/core';
import { Game } from '../../../../interface/Game';
import { GameService } from '../../../../service/game.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../service/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../home/header/header.component';
import { listStagger } from '../../../../animations/animations';

@Component({
  selector: 'app-admin-game-approval',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './admin-game-approval.component.html',
  styleUrl: './admin-game-approval.component.scss',
  animations: [listStagger('500ms')]
})
export class AdminGameApprovalComponent implements OnInit {
  games: Game[] = [];
  animacaoKey = 0;  // Variável de controle de animação

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    if (!usuario || !this.authService.isAdmin()) {
      this.router.navigate(['/inicio']);
      return;
    }

    this.buscarJogos();
  }

  buscarJogos() {
    this.gameService.buscarNaoAtivos().subscribe(jogos => {
      this.games = jogos;
      this.animacaoKey++;
    });
  }

  aprovarJogo(jogo: Game) {
    if(jogo && jogo.id) {
      this.gameService.aprovarJogo(jogo.id).subscribe({
        next: () => {
          console.log("Ok");
          this.buscarJogos();
        }, error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
