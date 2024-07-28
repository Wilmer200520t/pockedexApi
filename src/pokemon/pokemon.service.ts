import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>,
  ) {}

  async findAll() {
    return this.PokemonModel.find();
  }

  async findOne(termSearch: string) {
    let pokemon: Pokemon;

    //Search by number
    if (!isNaN(+termSearch)) {
      pokemon = await this.findOneByNo(+termSearch);
    }

    //Search by mongo id
    if (!pokemon && isValidObjectId(termSearch)) {
      pokemon = await this.findOneByMongoId(termSearch);
    }

    //Search by name
    if (!pokemon) {
      pokemon = await this.findOneByName(termSearch);
    }

    if (!pokemon) {
      throw new BadRequestException(`Pokemon ${termSearch} not found`);
    }

    return pokemon;
  }

  private async findOneByName(name: string) {
    const pokemon = await this.PokemonModel.findOne({ name });
    return pokemon;
  }

  private async findOneByNo(no: number) {
    const pokemon = await this.PokemonModel.findOne({ no });
    return pokemon;
  }

  private async findOneByMongoId(_id: string) {
    const pokemon = await this.PokemonModel.findById(_id);
    return pokemon;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.PokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error, 'Error creating pokemon,');
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);

      const newPokemon = await this.PokemonModel.findByIdAndUpdate(
        {
          _id: pokemon._id,
        },
        {
          $set: updatePokemonDto,
        },
        {
          new: true,
        },
      );

      return newPokemon;
    } catch (error) {
      this.handleExceptions(error, 'Error updating pokemon,');
    }
  }

  async remove(term: string) {
    try {
      const pokemon = await this.findOne(term);

      const newPokemon = await this.PokemonModel.findByIdAndDelete(pokemon._id);

      return newPokemon;
    } catch (error) {
      this.handleExceptions(error, 'Error deleting pokemon,');
    }
  }

  private handleExceptions(error: any, message?: string) {
    const errorMessage = error.errmsg || error.message;
    if (!errorMessage)
      throw new InternalServerErrorException(`${message} ${error}`);
    throw new BadRequestException(`${message} ${errorMessage}`);
  }
}
