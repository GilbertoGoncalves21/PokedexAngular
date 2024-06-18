import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];

  showPokeList: boolean = false;

  selectedGeneration: string = '';

  constructor(private pokemonService: PokeApiService) {}

  ngOnInit(): void {
    const savedGeneration = localStorage.getItem('selectedGeneration');
    console.log(savedGeneration);
    
    if (savedGeneration) {
      this.selectedGeneration = savedGeneration;
      this.loadGeneration(savedGeneration);
    } else {
      this.loadFirstGeneration;
    }
  }

  get loadFirstGeneration() {
    return this.loadPokemonData(0, 151, 'first');
  }

  get loadSecondGeneration() {
    return this.loadPokemonData(151, 100, 'second');
  }

  get loadThirdGeneration() {
    return this.loadPokemonData(251, 135, 'third');
  }

  get loadForthGeneration() {
    return this.loadPokemonData(386, 100, 'forth');
  }

  loadPokemonData(offset: number, limit: number, generation: string) {
    this.showPokeList = false;
    this.pokemons = [];
    this.selectedGeneration = generation;
    localStorage.setItem('selectedGeneration', generation);
    this.pokemonService.getPokemons(offset, limit).subscribe(
      (data) => {
        this.pokemons = data.results;
        this.showPokeList = true;
      },
      (error) => {
        console.error('Erro ao carregar os dados dos Pokémons', error);
        this.showPokeList = false;
      }
    );
  }

  loadGeneration(generation: string) {
    switch (generation) {
      case 'first':
        this.loadFirstGeneration;
        break;
      case 'second':
        this.loadSecondGeneration;
        break;
      case 'third':
        this.loadThirdGeneration;
        break;
      default:
        this.loadFirstGeneration;
    }
  }
}