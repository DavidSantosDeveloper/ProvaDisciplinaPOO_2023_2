import { Perfil } from "./Perfil.js";
import prompt from "prompt-sync";
//criacao do input
let input = prompt();
class App {
    constructor(redeSocial) {
        this._redeSocial = redeSocial;
    }
    iniciar() {
        let premissao_para_continuar = true;
        let opcao = '';
        while (premissao_para_continuar) {
            console.log(`
            >>>>>>>>>>>>>>Bem vindo<<<<<<<<<<<< 
            -Digite uma opção:
            
            1 - Criar um perfil
            2 - Criar uma postagem
            3 - Criar uma postagem Avançada
            4 - Consultar um perfil
            5 - Ver postagens de um perfil
            6 - ver todas as postagens
            0 - Sair  \n`);
            opcao = input("Opção:");
            switch (opcao) {
                case "1":
                    break;
                case "2":
                    break;
                default:
                    break;
            }
        }
    }
    criarPerfil() {
        console.log("\n# ___Cadastrar perfil___\n");
        let nome = input("Digite o nome do usuario:");
        let email = input("Digite o email do usuario:");
        let lista_de_perfis_cadrastrados = this._redeSocial.getRepositorioDePerfis().getPerfis();
        let perfil_cadrastrado;
        //Caso da ser lista de perfis está vazia.
        if (lista_de_perfis_cadrastrados.length == 0) {
            perfil_cadrastrado = new Perfil(1, nome, email);
            lista_de_perfis_cadrastrados.push(perfil_cadrastrado);
        }
        //Caso de ter pelo menos 1 perfil na lista de perfis
        else {
            let id_novo_perfil = (lista_de_perfis_cadrastrados[lista_de_perfis_cadrastrados.length - 1].getId()) + 1;
            perfil_cadrastrado = new Perfil(id_novo_perfil, nome, email);
            lista_de_perfis_cadrastrados.push(perfil_cadrastrado);
        }
    }
}
