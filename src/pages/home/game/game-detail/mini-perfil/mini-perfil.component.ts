import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game, JogoUsuario } from '../../../../../interface/Game';
import { GameService } from '../../../../../service/game.service';
import { listStagger } from '../../../../../animations/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mini-perfil',
  templateUrl: './mini-perfil.component.html',
  styleUrls: ['./mini-perfil.component.scss'],
  imports: [CommonModule],
  animations: [listStagger('300ms')]
})
export class MiniPerfilComponent {
  @Input() color: string = '';
  @Input() jogoUsuario: JogoUsuario | null = null;
  @Input() position: { top: number, left: number } | undefined;
  games: Game[] | null = null;

  constructor(private gameService: GameService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jogoUsuario']) {
      this.buscarJogosDoUsuario(this.jogoUsuario!.usuarioDto!.id);
    }
  }

  buscarJogosDoUsuario(idUsuario: number) {
    this.gameService.buscarJogosDoUsuario(idUsuario).subscribe({
      next: (res: Game[]) => {
        this.games = res;
      }
    })
  }

}
