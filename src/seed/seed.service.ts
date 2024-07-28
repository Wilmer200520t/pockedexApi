import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  private readonly Axios: AxiosInstance = axios;

  constructor(
    private readonly PokemonService: PokemonService,
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>,
  ) {}

  async runSeed() {
    await this.PokemonModel.deleteMany({});
    const { data } = await this.Axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonData = data.results.map(({ name, url }) => {
      const segment = url.split('/');
      const no: number = parseInt(segment[segment.length - 2]);
      return { no, name };
    });

    await this.PokemonService.insertMany(pokemonData);

    return 'Seed has been executed successfully';
  }
}
