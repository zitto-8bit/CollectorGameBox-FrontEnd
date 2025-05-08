import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Game, JogoUsuario } from '../../../../interface/Game';
import { Router } from '@angular/router';
import { FastAverageColor } from 'fast-average-color';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../service/auth.service';
import { UsuarioDTO } from '../../../../interface/Usuario';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../../../service/game.service';
import { fadeInOut, fadeSlideIn, listStagger, slideInOut } from '../../../../animations/animations';
import { MiniPerfilComponent } from './mini-perfil/mini-perfil.component';
import { Vibrant } from "node-vibrant/browser";
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule, FormsModule, MiniPerfilComponent, HeaderComponent],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss',
  animations: [slideInOut, fadeInOut, listStagger('500ms'), fadeSlideIn],
})
export class GameDetailComponent implements OnInit {
  game: Game;
  usuario: UsuarioDTO | null = null;
  titleColor: string = '';
  shadowUserColor: string = '';
  starsArray: number[] = [1, 2, 3, 4, 5];
  editandoComentario = false;
  comentarioEditado = '';
  salvandoJogo = false;
  usuariosJogo: JogoUsuario[] | null = null;
  usuarioSelecionado: JogoUsuario | null = null;
  usuarioPosition: { [key: number]: { top: number, left: number } } = {};
  notaJogo: number = 0;

  @ViewChild('autoResizeTextarea')
  autoResizeTextarea?: ElementRef<HTMLTextAreaElement>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private gameService: GameService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.game = navigation?.extras.state?.['game'];

    if (!this.game) this.router.navigate(['/inicio']);

    if (this.authService.isLoggedIn())
      this.usuario = this.authService.getUsuario();
  }

  ngOnInit(): void {
    this.extractTitleColor(this.game.imageBase64);
    this.buscarUsuariosJogo();
  }

  getCategorias(): string {
    return this.game!.categories?.map((c) => c.name).join(', ') || '';
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }

  extractTitleColor(imagem:string) {
    const fac = new FastAverageColor();
    const image = new Image();
    image.src = 'data:image/jpeg;base64,' + imagem;

    image.onload = () => {
      const color = fac.getColor(image);
      this.titleColor = `rgb(${color.value[0]}, ${color.value[1]}, ${color.value[2]})`;
    };
  }

  setNotaUsuario(nota: number) {
    if (this.game.jogoUsuario.nota != nota) {
      this.game.jogoUsuario.nota = nota;
      this.salvaJogo();
    }
  }

  getMediaNota() {
    if (!this.usuariosJogo || this.usuariosJogo.length === 0) {
      this.notaJogo = 0;
      return;
    }
  
    const total = this.usuariosJogo.filter(u => u.nota != null).reduce((sum: number, j: any) => sum + (j.nota || 0), 0);
    this.notaJogo = total / this.usuariosJogo.filter(u => u.nota != null).length;
  }

  editarComentario() {
    this.editandoComentario = true;
    this.comentarioEditado = this.game.jogoUsuario.comentario;

    setTimeout(() => {
      if (this.autoResizeTextarea?.nativeElement) {
        this.autoResize(this.autoResizeTextarea.nativeElement);
      }
    });
  }

  salvarJogado(valor: boolean) {
    this.game.jogoUsuario.isPossui = valor;
    this.salvaJogo();
  }

  salvarComentario() {
    let comentario;
    if(this.comentarioEditado)
      comentario = this.comentarioEditado.trim();
    else {
      this.editandoComentario = false;
      return;
    }  
  
    if (comentario && (this.game.jogoUsuario.comentario !== comentario)) {
      this.game.jogoUsuario.comentario = comentario;
      this.salvaJogo();
    }
  
    this.editandoComentario = false;
  }

  autoResize(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.focus();
  }

  salvaJogo() {
    if (!this.salvandoJogo) {
      this.salvandoJogo = true;
      if (this.game.jogoUsuario) {
        this.game.jogoUsuario.usuarioDto = this.authService.getUsuario()!;
        this.gameService.saveGame(this.game).subscribe({
          next: () => {
            this.salvandoJogo = false;
            this.buscarUsuariosJogo();
          },
          error: () => {
            this.salvandoJogo = false;
          },
        });
      }
    } else {
      console.log('Aguarde um momento...');
    }
  }

  buscarUsuariosJogo() {
    this.gameService.buscarUsuariosJogo(this.game).subscribe({
      next: (res) => {
        this.usuariosJogo = res;
        this.getMediaNota();
      }
    });
  }

  existeComentarios() {
    return this.usuariosJogo?.filter(g => g.comentario) ?? [];
  }

  extractStrongestColor(base64: string | null) {
    const imageUrl = 'data:image/jpeg;base64,' + base64;
  
    Vibrant.from(imageUrl).getPalette().then(palette => {
      const swatches = Object.values(palette).filter(swatch => swatch);
  
      if (swatches.length > 0) {
        swatches.sort((a, b) => (b!.hsl[1] ?? 0) - (a!.hsl[1] ?? 0));
        const strongest = swatches[0];
        const [r, g, b] = strongest!.rgb;
        this.shadowUserColor = `rgb(${r}, ${g}, ${b})`;
      }
    }).catch(err => console.error('Erro ao extrair cor:', err));
  }

  togglePopover(jogoUsuario: JogoUsuario, event: MouseEvent) {
    this.extractStrongestColor(jogoUsuario.usuarioDto.icone);

    if (this.usuarioSelecionado?.usuarioDto?.id === jogoUsuario.usuarioDto.id) {
      this.usuarioSelecionado = null;
    } else {
      this.usuarioSelecionado = jogoUsuario;
      
      const avatarElement = event.target as HTMLElement;
      const rect = avatarElement.getBoundingClientRect();

      this.usuarioPosition[jogoUsuario.usuarioDto.id] = {
        left: rect.right + 10,
        top: rect.top - 100
      };
    }
  }

}
