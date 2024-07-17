import { injectable } from "inversify";
import axios, { AxiosResponse } from "axios";
import * as _ from "lodash";
import { QueryPayload } from "../models/QueryPayload";
import { PokemonData, PokemonType, PokemonsList } from "../models/PokemonData";
import { IFunctionService } from "./IFunctionService";
@injectable()
export class FunctionService implements IFunctionService<PokemonsList> {
  private readonly _baseUrl: string = "https://pokeapi.co/api/v2/pokemon";

  public async processMessageAsync(data: QueryPayload): Promise<PokemonsList> {
    const ids: number[] = data.id.map(Number);
    const type: string = data.type;

    try {
        const pokemonPromises: Promise<AxiosResponse<PokemonData>>[] = ids.map((id: number): Promise<AxiosResponse<PokemonData>> => 
            axios.get<PokemonData>(`${this._baseUrl}/${id}`)
          );
      const responses: AxiosResponse<PokemonData>[] = await Promise.all(pokemonPromises);

      const matchingPokemons: string[] = _.chain(responses)
        .map((response: AxiosResponse<PokemonData>): PokemonData => response.data)
        .filter((pokemon: PokemonData): boolean => 
          _.some(pokemon.types, (t: PokemonType): boolean => t.type.name === type))
        .map((pokemon: PokemonData): string => pokemon.name)
        .value();

      return { pokemons: matchingPokemons };
    } catch (err) {
      const error: Error = err as Error;
      console.log("Error fetching Pokémon data: ", error.message);
      throw new Error("Failed to fetch Pokémon data");
    }
  }
}
