import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnChanges {
  private setAllPokemons: any = null;
  private _getAllPokemons: any = null;
  private _apiError: boolean = false;

  constructor(
    private pokeApiService: PokeApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  @Input() pokemons: any[] = [];

  get getAllPokemons(): any {
    return this._getAllPokemons;
  }
  
  get apiError(): boolean {
    return this._apiError;
  }

  ngOnChanges(): void {
    if (this.pokemons) {
      this.setAllPokemons = this.pokemons;
      this._getAllPokemons = this.pokemons;
    }
  }

  getSearch(value: string): void {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });
    this._getAllPokemons = filter;
    this.changeDetectorRef.detectChanges();
    this.changeDetectorRef.detach();
  }
}