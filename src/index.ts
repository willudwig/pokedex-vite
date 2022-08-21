import axios from "axios";

const pokeNumero = document.getElementById("numero")       as HTMLSpanElement;
const pokeNome   = document.getElementById("nome")         as HTMLSpanElement;
const pokeTipo   = document.getElementById("tipo")         as HTMLSpanElement;
const pokeSearch = document.getElementById("search")       as HTMLInputElement;
const pokeBotao  = document.getElementById("pesquisar")    as HTMLButtonElement;
const pokeImagem = document.getElementById("imagem")       as HTMLImageElement;
const pokeForm   = document.getElementById("formPesquisa") as HTMLFormElement;

//==========================================================================

obterDadosJson('1');
pokeBotao.addEventListener("click", () => obterDadosJson(pokeSearch.value));
pesquisarTeclaEnter();

//==========================================================================

async function obterDadosJson(pokemon: string) 
{
   try {
      const pokeresposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`, {responseType: 'json'});
      const pokeobjeto = pokeresposta.data;

      if(pokeobjeto) {
         pokeNumero.innerText = pokeobjeto.id + ".";
         pokeNome.innerText = pokeobjeto.name;
         pokeTipo.innerText = "." + pokeobjeto.types[0].type.name;
         pokeImagem.src = pokeobjeto['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
         pokeSearch.value = "";
      }
      
   } catch (error) {
      console.log(error);
   }
}

function pesquisarTeclaEnter(): void {
   pokeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      obterDadosJson(pokeSearch.value);
   });
}
