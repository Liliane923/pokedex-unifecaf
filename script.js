const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const containerCards = document.getElementById('container-cards');

async function buscarPokemons() {
    try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        
        // Para cada Pokémon da lista, busca os detalhes (imagem e tipo)
        for (const item of dados.results) {
            await buscarDetalhesPokemon(item.url);
        }
    } catch (erro) {
        console.error('Erro ao consumir a PokéAPI:', erro);
        containerCards.innerHTML = '<p style="text-align: center; color: #ef4444; grid-column: 1/-1;">Erro ao carregar os dados da API.</p>';
    }
}

async function buscarDetalhesPokemon(url) {
    try {
        const resposta = await fetch(url);
        const pokemon = await resposta.json();
        
        criarCardPokemon(pokemon);
    } catch (erro) {
        console.error('Erro ao buscar detalhes do Pokémon:', erro);
    }
}

function criarCardPokemon(pokemon) {
    // Criação dinâmica dos elementos via DOM (exigência do trabalho)
    const card = document.createElement('div');
    card.classList.add('card');

    const imagem = document.createElement('img');
    imagem.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    imagem.alt = pokemon.name;

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');

    const nome = document.createElement('h3');
    nome.textContent = pokemon.name;

    const tipo = document.createElement('p');
    tipo.textContent = `Tipo: ${pokemon.types[0].type.name}`;

    // Montando a estrutura hierárquica usando appendChild
    cardInfo.appendChild(nome);
    cardInfo.appendChild(tipo);

    card.appendChild(imagem);
    card.appendChild(cardInfo);

    containerCards.appendChild(card);
}

// Executa a função ao carregar a página
buscarPokemons();