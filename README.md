# AZURE FUNCTIONS TASK

## Requirements

To start Azure function locally you will need:
1. Node.js & npm [(installation instructions)](https://nodejs.org/en/download)
2. Azure Functions Core Tools [(installation instructions)](https://github.com/Azure/azure-functions-core-tools#installing)
3. Copy repository and run `npm i` in terminal
4. Run App locally typing `npm run start` command in terminal

## Description

Very basic Azure Function (HttpTrigger) that revieves list of Pokémon IDs (multiple) and a type (single), and retruns a list of Pokémon names that match the conditions.

* Example invocation: `http://localhost:7071/api/HttpTrigger?id=1&id=2&id=5&type=grass`
* Example response: 
```json 
{ "status": 200, "body": { "pokemons": ["bulbasaur", "ivysaur"] } }
```

