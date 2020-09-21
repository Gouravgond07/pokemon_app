export const BaseURL = 'https://pokeapi.co/api/v2/'


export async function getPokemons(page=0, size=10) {
    try {
        const data = await fetch(BaseURL + `pokemon?offset=${page*size}&limit=${size}`);
        return await data.json();
    }
    catch (err) {
        return err;
    }
}

export async function getDataByUrl(url) {
    try {
        const data = await fetch(url);
        return await data.json();
    }
    catch (err) {
        return err;
    }
}

export async function getPokemonSpecies(id) {
    try {
        const data = await fetch(BaseURL + `pokemon-species/${id}`);
        return await data.json();
    }
    catch (err) {
        return err;
    }
}