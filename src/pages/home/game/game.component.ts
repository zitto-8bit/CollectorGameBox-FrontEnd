import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../service/game.service';
import { Category, Game } from '../../../interface/Game';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { fadeInOut, listStagger } from '../../../animations/animations';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../service/categoria.service';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [listStagger('500ms'), fadeInOut],
})
export class GameComponent implements OnInit {
  games?: Game[];
  animacaoKey = 0; // Variável de controle de animação
  loading = true;

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.categoriaService.buscarCategorias().subscribe({
      next: (res) => {
        this.categoriasDisponiveis = res;
      }
    })
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.gameService
        .getAllUserGames(this.authService.getUsuario()!)
        .subscribe({
          next: (games: Game[]) => {
            this.loading = false;
            this.games = games;
            this.animacaoKey++; // Força a animação com a lista atualizada
          },
        });
    } else {
      this.gameService.getAllGames().subscribe({
        next: (games: Game[]) => {
          this.loading = false;
          this.games = games;
          this.animacaoKey++; // Força a animação com a lista atualizada
        },
      });
    }
  }

  filtroNome: string = '';
  filtroCategoria: string = '';
  categoriasDisponiveis: Category[] = [];

  
  meusJogosFiltrados() {
    return this.meusJogos().filter(
      (jogo) =>
        (!this.filtroNome ||
          jogo.name.toLowerCase().includes(this.filtroNome.toLowerCase())) &&
        (!this.filtroCategoria ||
          jogo.categories?.some((c) => c.name === this.filtroCategoria))
    );
  }

  outrosJogosFiltrados() {
    return this.outrosJogos().filter(
      (jogo) =>
        (!this.filtroNome ||
          jogo.name.toLowerCase().includes(this.filtroNome.toLowerCase())) &&
        (!this.filtroCategoria ||
          jogo.categories?.some((c) => c.name === this.filtroCategoria))
    );
  }

  meusJogos(): Game[] {
    return this.games?.filter((g) => g.jogoUsuario?.isPossui) ?? [];
  }

  outrosJogos(): Game[] {
    return this.games?.filter((g) => !g.jogoUsuario?.isPossui) ?? [];
  }

  abrirDetalhe(game: Game) {
    this.router.navigate(['/game', game.name], { state: { game } });
  }
}
