const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
//const pokemonDetail = document.getElementById('pokemonDetail')



const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <div onclick="viewDetails(${pokemon.number})" style="cursor: pointer; class="pokemons-card" id="card">
            <li class="pokemon ${pokemon.type}">
                <div>
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                </div>
                    <img src="${pokemon.photo}"alt="${pokemon.name}">

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
            </li>  
        </div>
    `
}
function convertPokemonToDiv(pokemon) {
    return `
    <section class="${pokemon.type}">
                <div class="link">
                    <a href="../index.html"><i class="bi bi-chevron-left"></i>Pokedex</a>
                </div>
                <h1 class="name">
                    ${pokemon.name}
                </h1>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </section>
            <div class="side">
                <ol class="types">
                     ${pokemon.types.map((type) => `<li class = "type ${type}"> ${type}</li>`).join('')}
                </ol>
                <div class="atributos">
                    
                    <div class="atributos_nome">
                        <p>HP</p>
                        <p>Attack</p>
                        <p>Defense</p>
                        <p>Sp. Atk</p>
                        <p>Sp. Def</p>
                        <p>Speed</p>
                    </div>

                    <div class="atrubutos_numero">
                        <p>${pokemon.hp}</p>
                        <p>${pokemon.attack}</p>
                        <p>${pokemon.defense}</p>
                        <p>${pokemon.spAttack}</p>
                        <p>${pokemon.spDefense}</p>
                        <p>${pokemon.speed}</p>
                    </div>

                    <div class="atrubutos_barra">
                        <progress name="barra de atributo" value="${pokemon.hp}" min= '0' max="200"></progress>
                        <progress name="barra de atributo" value="${pokemon.attack}" min= '0' max="200"></progress>
                        <progress name="barra de atributo" value="${pokemon.defense}" min= '0' max="200"></progress>
                        <progress name="barra de atributo" value="${pokemon.spAttack}" min= '0' max="200"></progress>
                        <progress name="barra de atributo" value="${pokemon.spDefense}" min= '0' max="200"></progress>
                        <progress name="barra de atributo" value="${pokemon.speed}" min= '0' max="200"></progress>
                    </div>
                </div>
            </div>
        <div class="gambiarra"></div>
    `;
}
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml        
    })
}
function loadPokemonDetail(id) {

    pokeApi.getPokemonDetailId(id).then((pokemon) => {
        location.href = `./html/details.html?id=${id}`;
    });
    
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function viewDetails(id) {

    const link = document.createElement("a");

    loadPokemonDetail(id)
}

