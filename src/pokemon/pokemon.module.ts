import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name, //Is the name of the document
        schema: PokemonSchema,
      },
    ]),
  ],
  exports: [PokemonService, MongooseModule], //Exporting the service and the MongooseModule
})
export class PokemonModule {}
