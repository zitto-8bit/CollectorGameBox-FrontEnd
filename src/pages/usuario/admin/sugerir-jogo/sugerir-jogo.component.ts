import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../home/header/header.component';
import { CategoriaService } from '../../../../service/categoria.service';
import { NgxMaskDirective } from 'ngx-mask';
import { GameService } from '../../../../service/game.service';
import { Category, Game } from '../../../../interface/Game';

@Component({
  selector: 'app-sugerir-jogo',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, NgxMaskDirective],
  templateUrl: './sugerir-jogo.component.html',
  styleUrl: './sugerir-jogo.component.scss'
})
export class SugerirJogoComponent {

  jogoForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  synopsisLength: number = 0;
  synopsisMaxLength: number = 300;

  categoriasDisponiveis: Category[] = [];

  plataformasDisponiveis: string[] = [
    'PC',
    'PlayStation 1',
    'PlayStation 2',
    'PlayStation 3',
    'PlayStation 4',
    'PlayStation 5',
    'Xbox 360',
    'Xbox One',
    'Xbox Series X|S',
    'Game Boy',
    'NES',
    'Switch',
    'Nintendo 3DS',
    'Steam Deck',
    'Mobile (iOS/Android)',
  ];  

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private gameService: GameService) {
    this.jogoForm = this.fb.group({
      name: ['', Validators.required],
      plataform: ['', Validators.required],
      release: [null, [Validators.required, Validators.min(1970)]],
      synopsis: ['', Validators.required],
      categories: this.fb.array([], Validators.required),
      adult: [false],
      true: [false],
      imageBase64: [null, Validators.required]
    });

    this.categoriaService.buscarCategorias().subscribe({
      next: (res) => {
        this.categoriasDisponiveis = res;
      }
    })
  }

  updateCharCount(): void {
    this.synopsisLength = this.jogoForm.get('synopsis')?.value?.length || 0;
  }

  onCategoryChange(event: any, category: Category) {
    const categories = this.jogoForm.get('categories') as FormArray;
  
    if (event.target.checked) {
      categories.push(this.fb.control(category)); // Adiciona o objeto completo
    } else {
      const index = categories.controls.findIndex(x => x.value.name === category.name);
      categories.removeAt(index); // Remove o objeto completo
    }
  }  

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
  
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            // Converte para PNG e obtém o Base64
            const pngDataUrl = canvas.toDataURL('image/png');
            this.imagePreview = pngDataUrl;
            this.jogoForm.patchValue({ imageBase64: pngDataUrl });
          }
        };
        img.src = reader.result as string;
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  submit() {
    if (this.jogoForm.get('categories')?.value.length === 0) {
      this.jogoForm.get('categories')?.setErrors({ 'required': true });
    }

    if (this.jogoForm.valid) {
      const game: Game = this.jogoForm.value;
  
      console.log(game);
      this.gameService.sugerir(game).subscribe({
        next: () => {
          console.log("OK");
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.jogoForm.markAllAsTouched();
  
      setTimeout(() => {
        const firstInvalidControl: HTMLElement | null = document.querySelector(
          'form .ng-invalid:not(form):not(fieldset)'
        );
        firstInvalidControl?.focus();
      }, 0);
    }
  }

  alternarAdulto(): void {
    const atual = this.jogoForm.get('adult')?.value;
    this.jogoForm.get('adult')?.setValue(atual === true ? false : true);
  }

}
