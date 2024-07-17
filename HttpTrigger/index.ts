import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { isArray, map, includes } from "lodash";
import { Container } from "inversify";
import getContainer from "../ioc/inversify.config";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { Logger } from "../commonServices/Logger";
import { ILogger } from "../commonServices/ILogger";
import { IFunctionService } from "./services/IFunctionService";
import { PokemonsList } from "./models/PokemonData";

const httpTrigger: AzureFunction = async (
  ctx: Context,
  req: HttpRequest
): Promise<any> => {
  const container: Container = getContainer();
  const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger;
  logger.init(ctx, "1");

  const functionService: IFunctionService<PokemonsList> = container.get<
    IFunctionService<PokemonsList>
  >(COMMON_TYPES.IFunctionService);
  
  try {
    const ids: string[] = req.query.id?.split(",");
    const type: string = req.query.type;

    if (!isArray(ids) || includes(ids, '') || !type) {
      ctx.res = {
        status: 400,
        body: { error: "Invalid query parameters. You need to pass at least 1 ID and 1 type of Pokémon." },
      };
      return ctx.res;
    }

    const response: PokemonsList = await functionService.processMessageAsync({ id: map(ids, Number), type });

    ctx.res = {
      body: response,
      status: 200,
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    const error: Error = err as Error;
    ctx.res = {
      status: 500,
      body: { error: error.message },
    };
  }
  return ctx.res;
};

export default httpTrigger;
