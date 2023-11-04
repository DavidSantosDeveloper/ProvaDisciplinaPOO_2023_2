import { RedeSocial } from "./RedeSocial.js";
import { Perfil} from "./Perfil.js";
import {Postagem} from "./Postagem.js"

class App {
  private _redeSocial: RedeSocial;

  constructor(redeSocial: RedeSocial) {
    this._redeSocial = redeSocial;
  }

exibirMenu(): void {
  let opcao: number = 0;
  while (opcao !== 7) {
    console.log("Menu da Rede Social");
    console.log("1. Incluir Perfil");
    console.log("2. Consultar Perfil");
    console.log("3. Incluir Postagem");
    console.log("4. Consultar Postagens");
    console.log("5. Curtir Postagem");
    console.log("6. Descurtir Postagem");
    console.log("7. Sair");
    opcao = this.obterOpcao();

    if (opcao == 1) {
      this.incluirPerfil();
    }
    if (opcao == 2){
      this.consultarPerfil();
    }
    if (opcao == 3){
      this.incluirPostagem();
    }
    if (opcao == 4){
      this.consultarPostagens();
    }
    if (opcao == 5){
      this.curtirPostagem();
    }
    if (opcao == 6){
      this.descurtirPostagem();
    }
    if (opcao == 7){
      console.log("Fechando...");
          break;
    }
    }
  }

  obterOpcao(): number {
    const input = require("readline-sync");
    return parseInt(input.question("Escolha uma opção: "));
  }

  incluirPerfil(): void {
    const input = require("readline-sync");
    console.log("\n# ___Cadastrar perfil___\n");
    let nome=input("Digite o nome do usuario:")
    let email=input("Digite o email do usuario:")
    
    let lista_de_perfis_cadrastrados=this._redeSocial.getRepositorioDePerfis().getPerfis()
    let perfil_cadrastrado:Perfil

    //Caso da ser lista de perfis está vazia.
    if(lista_de_perfis_cadrastrados.length==0){
        perfil_cadrastrado=new Perfil(1,nome,email)
        lista_de_perfis_cadrastrados.push(perfil_cadrastrado)
    }
    //Caso de ter pelo menos 1 perfil na lista de perfis
    else{
        let id_novo_perfil:number=(   lista_de_perfis_cadrastrados[lista_de_perfis_cadrastrados.length-1].getId()  )+1
        perfil_cadrastrado=new Perfil(id_novo_perfil,nome,email)
        lista_de_perfis_cadrastrados.push(perfil_cadrastrado)
    }
  }

  consultarPerfil(): void {

  }

  incluirPostagem(): void {
 
  }

  consultarPostagens(): void {

  }

  curtirPostagem(): void {
  }

  descurtirPostagem(): void {
    
  }
}

const redeSocial = new RedeSocial();
const app = new App(redeSocial);
app.exibirMenu();