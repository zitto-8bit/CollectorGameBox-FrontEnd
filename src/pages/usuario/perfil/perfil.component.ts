import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioDTO } from '../../../interface/Usuario';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-perfil',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  usuario?: UsuarioDTO | null;
  isUsuarioLogado: boolean = false;
  alteracaoUsuario: UsuarioDTO;
  selectedIcon: string | undefined;

  @ViewChild('biografiaTextArea') biografiaRef!: ElementRef<HTMLTextAreaElement>;

  icons = [
    '/icon/user/robo-icon.png',
    '/icon/user/alan-icon.png',
    '/icon/user/lui-icon.png',
    '/icon/user/alien-icon.png',
    '/icon/user/x-icon.png',
    '/icon/user/priya-icon.png',
    '/icon/user/maethe-icon.png',
    '/icon/user/niko-icon.png',
    '/icon/user/pan-icon.png',
    '/icon/user/cuca-icon.png',
    '/icon/user/lary-icon.png',
    '/icon/user/jinx-icon.png',
    '/icon/user/vanda-icon.png',
  ];

  constructor(private authService:AuthService, 
              private usuarioService:UsuarioService,
              private router: Router) {
    this.usuario = this.authService.getUsuario();

    this.alteracaoUsuario = {
      id: this.usuario!.id,
      nome: this.usuario!.nome,
      biografia: this.usuario!.biografia,
      icone: null,
      email: this.usuario!.email,
      token: this.usuario!.token,
      acesso: this.usuario!.acesso
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const textarea = document.getElementById('biografia') as HTMLTextAreaElement;
      if (textarea) {
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
      }
    });
  }

  salvarPerfil() {
    if(this.selectedIcon) {
      this.convertToBase64(this.selectedIcon).then((base64: string) => {
        this.alteracaoUsuario.icone = base64.replace(/^data:image\/[a-z]+;base64,/, '');;
      }).finally(() => {
        this.salvaPerfil();
      });
    } else {
      this.salvaPerfil();
    }
  }

  salvaPerfil() {
    this.usuarioService.atualizar(this.alteracaoUsuario).subscribe({
      next: (usuarioAtualizado: UsuarioDTO) => {
        this.authService.updateUsuarioSession(usuarioAtualizado);
      }, error: (res) => {
        console.log(res);
        this.router.navigate(['/login']);
      }
    })
  }

  selecionarAvatar(path: string) {
    this.selectedIcon = path;
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  private convertToBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas nnão suportado');

        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };

      img.onerror = () => reject('Erro ao carregar imagem');
    });
  }

  desconectar() {
    this.authService.logout();
  }

}
