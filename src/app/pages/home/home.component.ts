import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly _first: string = 'first';
  private readonly _second: string = 'second';
  private readonly _third: string = 'third';
  private readonly _forth: string = 'forth';
  private _pokemons: any[] = [];
  private _showPokeList: boolean = false;
  private _selectedGeneration: string = this._first;
  
  constructor(private pokemonService: PokeApiService) { }

  ngOnInit(): void {
    const savedGeneration = localStorage.getItem('selectedGeneration');

    if (savedGeneration) {
      this._selectedGeneration = savedGeneration;
      this.loadGeneration(savedGeneration);
    } else {
      this.loadFirstGeneration;
    }
  }

  get pokemons(): any {
    return this._pokemons;
  }

  get showPokeList(): boolean {
    return this._showPokeList;
  }

  get first(): string {
    return this._first;
  }

  get second(): string {
    return this._second;
  }

  get third(): string {
    return this._third
  }

  get forth(): string {
    return this._forth
  }

  get selectedGeneration(): string {
    return this._selectedGeneration;
  }

  get loadFirstGeneration(): void {
    return this.loadPokemonData(0, 151, this._first);
  }

  get loadSecondGeneration(): void {
    return this.loadPokemonData(151, 100, this._second);
  }

  get loadThirdGeneration(): void {
    return this.loadPokemonData(251, 135, this._third);
  }

  get loadForthGeneration(): void {
    return this.loadPokemonData(386, 100, this._forth);
  }

  loadPokemonData(offset: number, limit: number, generation: string): void {
    this._showPokeList = false;
    this._pokemons = [];
    this._selectedGeneration = generation;
    localStorage.setItem('selectedGeneration', generation);
    this.pokemonService.getPokemons(offset, limit).subscribe(
      (data) => {
        this._pokemons = data.results;
        this._showPokeList = true;
      },
      (error) => {
        console.error('Erro ao carregar os dados dos Pokémons', error);
        this._showPokeList = false;
      }
    );
  }

  loadGeneration(generation: string): void {
    switch (generation) {
      case this._first:
        this.loadFirstGeneration;
        break;
      case this._second:
        this.loadSecondGeneration;
        break;
      case this._third:
        this.loadThirdGeneration;
        break;
      case this._forth:
        this.loadForthGeneration;
        break;
      default:
        this.loadFirstGeneration;
    }
  }
}