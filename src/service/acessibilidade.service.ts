import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../interface/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AcessibilidadeService {

  constructor() { }

  private styleTagId = 'acessibilidade-focus-style';

  aplicarEstiloSeNecessario(usuario: UsuarioDTO | null): void {
    if (!usuario) return;

    const jaExiste = document.getElementById(this.styleTagId);
    if (usuario.acessibilidade === 'S' && !jaExiste) {
      const style = document.createElement('style');
      style.id = this.styleTagId;
      style.innerHTML = `
        /* Realce de foco sem alterar o design */
        *:focus {
          outline: 3px dashed #66ff66 !important;
          outline-offset: 4px;
        }

        /* Realce acessível para elementos interativos */
        button:focus, a:focus {
          box-shadow: 0 0 0 3px #66ff66 !important;
        }

        /* Melhor espaçamento entre linhas para leitura */
        body, p, label, input, textarea {
          line-height: 1.5;
        }

        /* Cursor claro em elementos interativos */
        button, a, input[type="submit"] {
          cursor: pointer;
        }

        /* Tamanho de fonte mínimo para legibilidade */
        body, input, textarea, button {
          font-size: 1rem;
        }

        /* Aumenta contraste de texto dentro de buttons/links ao focar, sem mudar bg */
        button:focus-visible, a:focus-visible {
          color: #66ff66 !important;
        }

        button, a, [role="button"], .icon-button, .clickable-icon {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
      `;
      document.head.appendChild(style);
    } else if (usuario.acessibilidade !== 'S' && jaExiste) {
      jaExiste.remove();
    }
  }
}
