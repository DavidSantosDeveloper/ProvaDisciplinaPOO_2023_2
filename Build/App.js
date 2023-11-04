import { RedeSocial } from "./RedeSocial.js";
import { Perfil } from "./Perfil.js";
import { Postagem } from "./Postagem.js";
import { PostagemAvancada } from "./PostagemAvancada.js";
import { RepositorioDePerfis } from "./RepositorioDePerfis.js";
import { RepositorioDePostagens } from "./RepositorioDePostagens.js";
import input from "readline-sync";
class App {
    constructor(redeSocial) {
        this._redeSocial = redeSocial;
    }
    exibirMenu() {
        let opcao = 0;
        while (opcao !== 7) {
            console.log("\n \n \n ");
            console.log("╔═══════════════════════════════╗");
            console.log("║     Menu da Rede Social       ║");
            console.log("╚═══════════════════════════════╝");
            console.log("\n \n 1. Incluir Perfil");
            console.log("2. Consultar Perfil");
            console.log("3. Incluir Postagem");
            console.log("4. Consultar Postagens");
            console.log("5. Curtir Postagem");
            console.log("6. Descurtir Postagem");
            console.log("7. Sair \n");
            opcao = this.obterOpcao();
            if (opcao == 1) {
                this.incluirPerfil();
            }
            if (opcao == 2) {
                this.consultarPerfil();
            }
            if (opcao == 3) {
                this.incluirPostagem();
            }
            if (opcao == 4) {
                this.consultarPostagens();
            }
            if (opcao == 5) {
                this.curtirPostagem();
            }
            if (opcao == 6) {
                this.descurtirPostagem();
            }
            if (opcao == 7) {
                console.log("Fechando...");
                break;
            }
        }
    }
    obterOpcao() {
        return parseInt(input.question("\n Escolha uma opcao: "));
    }
    incluirPerfil() {
        console.log("\n \n \n");
        console.log("|---------------------------------|");
        console.log("|      Cadrastrar Perfil          |");
        console.log("|---------------------------------|");
        let nome = input.question("\n \nDigite o nome do usuario:");
        let email = input.question("Digite o email do usuario:");
        console.log("\n \n \n");
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
    consultarPerfil() {
        console.log("\n \n \n");
        console.log("|---------------------------------|");
        console.log("|      Consultar Perfil           |");
        console.log("|---------------------------------|");
        let nome_do_usuario_procurado = input.question("\n Digite o nome do usuario:");
        let resultado_da_consulta = this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_do_usuario_procurado);
        //FAIL FAST
        if (resultado_da_consulta == null) {
            console.log(`\n usuario nao encontrado!!!!!\n`);
        }
        else {
            console.log(`\n Usuario com nome '${nome_do_usuario_procurado}' : \n`);
            console.log(resultado_da_consulta);
        }
    }
    incluirPostagem() {
        console.log("\n \n \n");
        console.log("|---------------------------------|");
        console.log("|      Incluir Postagens          |");
        console.log("|---------------------------------|");
        let nome_do_usuario_procurado = input.question("\n \n Digite o nome do usuario autor da postagem:");
        let resultado_da_consulta_pelo_perfil_do_autor_da_postagem = this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_do_usuario_procurado);
        //Verifica se eh um usuario valido.
        while (resultado_da_consulta_pelo_perfil_do_autor_da_postagem == null) {
            console.log("\n usuario não encontado!!! Digite novamente.\n");
            nome_do_usuario_procurado = input.question("\n Digite o nome do usuario autor da postagem:");
            resultado_da_consulta_pelo_perfil_do_autor_da_postagem = this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_do_usuario_procurado);
        }
        let tipo_da_postagem = Number(input.question("\n \n Tipo da postagem 1-Postagem 2-Postagem Avancada : "));
        //verfica se a postagem eh valida
        while (tipo_da_postagem != 1 && tipo_da_postagem != 2) {
            console.log(`\n opcao invalida!!!! Digite novamente\n.`);
            tipo_da_postagem = Number(input.question("\n Tipo da postagem 1-Postagem 2-Postagem Avancada : "));
        }
        //########## Criar postagem
        let lista_de_postagens = this._redeSocial.getRepositorioDePostagens().getPostagens();
        let postagem_atual;
        if (tipo_da_postagem == 1) {
            let texto_da_postagem = input.question("\n \n Digite o texto da postagem:");
            //>>>>>>>Caso lista de Postagens vazia
            if (lista_de_postagens.length == 0) {
                postagem_atual = new Postagem(1, texto_da_postagem, 0, 0, new Date(), resultado_da_consulta_pelo_perfil_do_autor_da_postagem);
            }
            //>>>>>>>>Caso lista de Postagens com pelo menos 1 postagem
            else {
                let id_postagem_atual = lista_de_postagens[lista_de_postagens.length - 1].getId() + 1;
                postagem_atual = new Postagem(id_postagem_atual, texto_da_postagem, 0, 0, new Date(), resultado_da_consulta_pelo_perfil_do_autor_da_postagem);
            }
            //salvando na memoria no Repositorio de Postagens
            this._redeSocial.getRepositorioDePostagens().incluir(postagem_atual);
            //salvando postagem na lista de postagem do usuario autor
            resultado_da_consulta_pelo_perfil_do_autor_da_postagem.adicicionarPostagens(postagem_atual);
        }
        if (tipo_da_postagem == 2) {
            let texto_da_postagem = input.question("\n \n Digite o texto da postagem:   \n");
            let numero_de_visualizacoes_maximo = Number(input.question("\n Digite o numero maximo de visualizacoes:"));
            let lista_de_hashtags = [];
            let numero_hastag_atual = 1;
            while (true) {
                let hashtag_atual = input.question(`\n Digite a ${numero_hastag_atual} hashtag(#): `);
                lista_de_hashtags.push(`#${hashtag_atual}`);
                numero_hastag_atual++;
                let continuar = true;
                while (continuar) {
                    let opcao = input.question(`\n\n\nDeseja adicionar mais hashtags? (S-sim N-Nao):  `);
                    if (opcao.toUpperCase() == "S")
                        break;
                    else if (opcao.toUpperCase() == "N")
                        continuar = false;
                    else
                        continue;
                }
                if (continuar == true)
                    continue;
                else
                    break;
            }
            //>>>>>>>Caso lista de Postagens vazia
            if (lista_de_postagens.length == 0) {
                postagem_atual = new PostagemAvancada(1, texto_da_postagem, 0, 0, new Date(), resultado_da_consulta_pelo_perfil_do_autor_da_postagem, lista_de_hashtags, numero_de_visualizacoes_maximo);
            }
            //>>>>>>>>Caso lista de Postagens com pelo menos 1 postagem
            else {
                let id_postagem_atual = lista_de_postagens[lista_de_postagens.length - 1].getId() + 1;
                postagem_atual = new PostagemAvancada(id_postagem_atual, texto_da_postagem, 0, 0, new Date(), resultado_da_consulta_pelo_perfil_do_autor_da_postagem, lista_de_hashtags, numero_de_visualizacoes_maximo);
            }
            //salvando na memoria no Repositorio de Postagens
            this._redeSocial.getRepositorioDePostagens().incluir(postagem_atual);
            //salvando postagem na lista de postagem do usuario autor
            resultado_da_consulta_pelo_perfil_do_autor_da_postagem.adicicionarPostagens(postagem_atual);
        }
    }
    consultarPostagens() {
        console.log("\n\n\n");
        console.log("|---------------------------------|");
        console.log("|      Consultar Postagens        |");
        console.log("|---------------------------------|");
        console.log("\n\n\n");
        let opcao = input.question(`Digite uma opcao: 
                              (1-mostrar Todas as postagens
                               2-mostrar as postagens de 1 perfil
                               3-mostrar uma postagem
                               0-Sair
                                
          
                               ) `);
        /*
        while(isNaN(Number(opcao))){
                console.log("\n opcao invalida!!!  digite novamente.")
                opcao=input.question(`\n Digite uma opcao:
                (1-mostrar Todas as postagens
                 2-mostrar as postagens de 1 perfil
                 3-mostrar uma postagem por ID
                 0-Sair
                  
                  ) `)
  
        }
        */
        opcao = Number(opcao);
        //FAIL FAST
        if (opcao == 0) {
            return;
        }
        else if (opcao == 1) {
            console.log(`\n\n\n>>>>>>>>>>>>Todas as postagens da Rede Social<<<<<<<<<<<<<<<<`);
            this.mostrarTodasAsPostagensDaRedeSocialNaTela();
        }
        else if (opcao == 2) {
            console.log(`\n\n\n>>>>>>>>>>>>Todas as postagens da um Perfil<<<<<<<<<<<<<<<<`);
            let nome_usuario = input.question("\nDigite o nome do usuario:");
            this.mostrarTodasAsPostagensDeUmPerfilNaTela(nome_usuario);
        }
        else if (opcao == 3) {
            console.log(`\n\n\n>>>>>>>>>>>>Mostrar Postagem com ID especifico<<<<<<<<<<<<<<<<`);
            let id_postagem = input.question("\nDigite o ID da postagem:");
            while (isNaN(Number(id_postagem))) {
                console.log("\nvalor invalido!!! Digite novamente.");
                id_postagem = input.question("\nDigite o ID da postagem:");
            }
            id_postagem = Number(id_postagem);
            this.mostrarPostagemPorID(id_postagem);
        }
    }
    mostrarTodasAsPostagensDaRedeSocialNaTela() {
        let lista_de_postagens = this._redeSocial.getRepositorioDePostagens().getPostagens();
        let lista_de_postagens_simples = [];
        let lista_de_postagens_avancadas = [];
        for (const postagem_atual of lista_de_postagens) {
            if (postagem_atual instanceof PostagemAvancada) {
                lista_de_postagens_avancadas.push(postagem_atual);
            }
            else {
                lista_de_postagens_simples.push(postagem_atual);
            }
        }
        let numero_postagem_simples = 1;
        for (const postagem_atual of lista_de_postagens_simples) {
            console.log(` \n               *POSTAGEM ${numero_postagem_simples}* 
                     _________________________________________________________________________________________
                     | ID: ${postagem_atual.getId()}                        DATA:${postagem_atual.getData()}  |                   |
                     |________________________________________________________________________________________|
                     |>>>> AUTOR: @ ${postagem_atual.getPerfil().getNome()}                                   |
                     |>>>> TEXTO: ${postagem_atual.getTexto()}                                                |
                     |>>>> CURTIDAS: ${postagem_atual.getCurtida()}                                           |
                     |>>>> DESCURTIDAS: ${postagem_atual.getDescurtida()}                                     |
                     |________________________________________________________________________________________|

         `);
            numero_postagem_simples++;
        }
        let numero_postagem_avancada = 1;
        for (const postagem_atual of lista_de_postagens_avancadas) {
            console.log(`                \n *POSTAGEM AVANCADA${numero_postagem_avancada}* 
                     _________________________________________________________________________________________
                     | ID: ${postagem_atual.getId()}                        DATA:${postagem_atual.getData()}  |                  
                     |________________________________________________________________________________________|
                     |>>>> AUTOR: @ ${postagem_atual.getPerfil().getNome()}                                   |
                     |>>>> TEXTO: ${postagem_atual.getTexto()}                                                |
                     |>>>> CURTIDAS: ${postagem_atual.getCurtida()}                                           |
                     |>>>> DESCURTIDAS: ${postagem_atual.getDescurtida()}                                     |
                     |>>>> HASHTAGS:${postagem_atual.getHashtagEmString()}                                    |
                     |>>>> VISUALIZACOES RESTANTES:${postagem_atual.getVisualizacoesRestantes()}              |
                     |________________________________________________________________________________________|

         `);
            numero_postagem_avancada++;
        }
    }
    mostrarTodasAsPostagensDeUmPerfilNaTela(nome_usuario) {
        let consulta_pelo_usuario = this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_usuario);
        //FAIL FAST
        if (consulta_pelo_usuario == null) {
            console.log("usuario não encontrado!!!");
            return;
        }
        let lista_de_postagens = consulta_pelo_usuario.getPostagens();
        let lista_de_postagens_simples = [];
        let lista_de_postagens_avancadas = [];
        for (const postagem_atual of lista_de_postagens) {
            if (postagem_atual instanceof PostagemAvancada) {
                lista_de_postagens_avancadas.push(postagem_atual);
            }
            else {
                lista_de_postagens_simples.push(postagem_atual);
            }
        }
        let numero_postagem_simples = 1;
        for (const postagem_atual of lista_de_postagens_simples) {
            console.log(` \n               *POSTAGEM ${numero_postagem_simples}* 
                   _________________________________________________________________________________________
                   | ID: ${postagem_atual.getId()}                        DATA:${postagem_atual.getData()}  |                   |
                   |________________________________________________________________________________________|
                   |>>>> AUTOR: @ ${postagem_atual.getPerfil().getNome()}                                   |
                   |>>>> TEXTO: ${postagem_atual.getTexto()}                                                |
                   |>>>> CURTIDAS: ${postagem_atual.getCurtida()}                                           |
                   |>>>> DESCURTIDAS: ${postagem_atual.getDescurtida()}                                     |
                   |________________________________________________________________________________________|

       `);
            numero_postagem_simples++;
        }
        let numero_postagem_avancada = 1;
        for (const postagem_atual of lista_de_postagens_avancadas) {
            console.log(`                \n *POSTAGEM AVANCADA${numero_postagem_avancada}* 
                   _________________________________________________________________________________________
                   | ID: ${postagem_atual.getId()}                        DATA:${postagem_atual.getData()}  |                  
                   |________________________________________________________________________________________|
                   |>>>> AUTOR: @ ${postagem_atual.getPerfil().getNome()}                                   |
                   |>>>> TEXTO: ${postagem_atual.getTexto()}                                                |
                   |>>>> CURTIDAS: ${postagem_atual.getCurtida()}                                           |
                   |>>>> DESCURTIDAS: ${postagem_atual.getDescurtida()}                                     |
                   |>>>> HASHTAGS:${postagem_atual.getHashtagEmString()}                                    |
                   |>>>> VISUALIZACOES RESTANTES:${postagem_atual.getVisualizacoesRestantes()}              |
                   |________________________________________________________________________________________|

       `);
            numero_postagem_avancada++;
        }
    }
    mostrarPostagemPorID(id_postagem) {
        let consulta_pela_postagem = this._redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem);
        //FAIL FAST
        if (consulta_pela_postagem == null) {
            console.log(`Não há postagem com o id ${id_postagem} !!!`);
        }
        else {
            if (consulta_pela_postagem instanceof PostagemAvancada) {
                console.log(`                \n *POSTAGEM AVANCADA* 
            _________________________________________________________________________________________________
            | ID: ${consulta_pela_postagem.getId()}                DATA:${consulta_pela_postagem.getData()}  |                  
            |________________________________________________________________________________________________|
            |>>>> AUTOR: @ ${consulta_pela_postagem.getPerfil().getNome()}                                   |
            |>>>> TEXTO: ${consulta_pela_postagem.getTexto()}                                                |
            |>>>> CURTIDAS: ${consulta_pela_postagem.getCurtida()}                                           |
            |>>>> DESCURTIDAS: ${consulta_pela_postagem.getDescurtida()}                                     |
            |>>>> HASHTAGS:${consulta_pela_postagem.getHashtagEmString()}                                    |
            |>>>> VISUALIZACOES RESTANTES:${consulta_pela_postagem.getVisualizacoesRestantes()}              |
            |________________________________________________________________________________________________|

              `);
            }
            else {
                console.log(` \n               *POSTAGEM * 
            _________________________________________________________________________________________________
            | ID: ${consulta_pela_postagem.getId()}                DATA:${consulta_pela_postagem.getData()}  |                   
            |________________________________________________________________________________________________|
            |>>>> AUTOR: @ ${consulta_pela_postagem.getPerfil().getNome()}                                   |
            |>>>> TEXTO: ${consulta_pela_postagem.getTexto()}                                                |
            |>>>> CURTIDAS: ${consulta_pela_postagem.getCurtida()}                                           |
            |>>>> DESCURTIDAS: ${consulta_pela_postagem.getDescurtida()}                                     |
            |________________________________________________________________________________________________|

               `);
            }
        }
    }
    curtirPostagem() {
        let id_postagem = input.question("Digite o ID da postagem:");
        while (isNaN(Number(id_postagem))) {
            console.log("valor invalido!!! Digite novamente.");
            id_postagem = input.question("Digite o ID da postagem:");
        }
        id_postagem = Number(id_postagem);
        console.log(`\n_________________________________
                   |      Curtir Postagens          |
                   |________________________________|
                   \n`);
        let consulta_pela_postagem = this._redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem);
        //FAIL FAST
        if (consulta_pela_postagem == null) {
            console.log(`\nNão há postagem com o id ${id_postagem} !!!`);
        }
        else {
            console.log("----Postagem antes do like---------");
            this.mostrarPostagemPorID(id_postagem);
            consulta_pela_postagem.curtir();
            console.log("----Postagem apos o like---------");
            this.mostrarPostagemPorID(id_postagem);
        }
    }
    descurtirPostagem() {
        let id_postagem = input.question("Digite o ID da postagem:");
        while (isNaN(Number(id_postagem))) {
            console.log("valor invalido!!! Digite novamente.");
            id_postagem = input.question("Digite o ID da postagem:");
        }
        id_postagem = Number(id_postagem);
        console.log(`\n_________________________________
                    |      Descurtir Postagens       |
                    |________________________________|
          \n`);
        let consulta_pela_postagem = this._redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem);
        //FAIL FAST
        if (consulta_pela_postagem == null) {
            console.log(`\nNão há postagem com o id ${id_postagem} !!!`);
        }
        else {
            console.log("----Postagem antes do Deslike---------");
            this.mostrarPostagemPorID(id_postagem);
            consulta_pela_postagem.descurtir();
            console.log("\n----Postagem apos o Deslike---------");
            this.mostrarPostagemPorID(id_postagem);
        }
    }
}
let repositorio_de_perfis = new RepositorioDePerfis([]);
let repositorio_de_postagens = new RepositorioDePostagens([]);
const redeSocial = new RedeSocial(repositorio_de_postagens, repositorio_de_perfis);
const app = new App(redeSocial);
app.exibirMenu();
