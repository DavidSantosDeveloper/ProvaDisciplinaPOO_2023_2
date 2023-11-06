import { RedeSocial } from "./RedeSocial.js";
import { Perfil} from "./Perfil.js";
import {Postagem} from "./Postagem.js"
import {PostagemAvancada} from "./PostagemAvancada.js"
import { RepositorioDePerfis} from "./RepositorioDePerfis.js";
import { RepositorioDePostagens } from "./RepositorioDePostagens.js";
//leitura de dados
import input from "readline-sync";
// salvar em arquivos de texto
import * as fs from 'fs'


class App {
  private _redeSocial: RedeSocial;
  private caminho_arquivo_perfis="./perfis.txt"
  private caminho_arquivo_postagens="./postagens.txt"

  constructor(redeSocial: RedeSocial) {
    this._redeSocial = redeSocial;
  }

exibirMenu(): void {
  //LENDO OS PERFIS SALVOS
  this.carregarArquivoTxtPerfis()
  //LENDO AS POSTAGENS SALVAS
  this.carregarArquivoTxtPostagens()

  let opcao: number | string = 0;
  while (opcao !== 7) {
    console.log("\n \n \n ")
    console.log("╔═══════════════════════════════╗");
    console.log("║     Menu da Rede Social       ║");
    console.log("╚═══════════════════════════════╝");

    console.log("\n \n 1. Incluir Perfil");
    console.log("2. Consultar Perfil");
    console.log("3. Editar Perfil");
    console.log("4-Excluir Perfil;")
    console.log("5. Incluir Postagem");
    console.log("6. Consultar Postagens");
    console.log("7. Editar Postagem");
    console.log("8. Excluir Postagem");
    console.log("9-Exibir as postagens populares que ainda podem ser exibidas;")
    console.log("10. Curtir Postagem")
    console.log("11. Descurtir Postagem");
    console.log("12. Sair \n" );
    
    opcao = this.obterOpcao();

    if (opcao == 1) {
      this.incluirPerfil();
    }
    if (opcao == 2){
      this.consultarPerfil();
    }
    if (opcao == 3){
      this.EditarPerfil();
    }
    if (opcao == 4){
      this.excluirPerfil();
    }
    if (opcao == 5){
      this.incluirPostagem();
    }
    if (opcao == 6){
      this.consultarPostagens();
    }
    if (opcao == 7){
      this.EditarPostagens()
    }
    if(opcao==8){
      this.excluirPostagens()
    }
    if(opcao==9){
      this.mostrarPostagensPopulares()
    }
    if(opcao==10){
        this.curtirPostagem()
    }
    if(opcao==11){
        this.descurtirPostagem()
    }
    if (opcao == 12){
      console.log("Fechando...");
      this.salvarAsPostagensEmArquivoTxt()
      this.salvarOsPerfisEmArquivoTxt()
          break;
    }
    }
  }

  obterOpcao(): number {
    return parseInt(input.question("\n Escolha uma opcao: "));
  }

  incluirPerfil(): void {
    console.log("\n \n \n")
    console.log("|---------------------------------|")
    console.log("|      Cadrastrar Perfil          |")
    console.log("|---------------------------------|")
    let nome=input.question("\n \nDigite o nome do usuario:")
    let email=input.question("Digite o email do usuario:")
    console.log("\n \n \n")
    
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

    //  >>>>>>>>>>>Salvar no arquivo de texto 'perfis.txt'<<<<<<<<<<<<
    this.salvarOsPerfisEmArquivoTxt()
  }


  consultarPerfil(): void {
    console.log("\n \n \n")
    console.log("|---------------------------------|")
    console.log("|      Consultar Perfil           |")
    console.log("|---------------------------------|")
    let nome_do_usuario_procurado=input.question("\n Digite o nome do usuario:")

    let resultado_da_consulta=this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_do_usuario_procurado)
    //FAIL FAST
    if(resultado_da_consulta==null){
      console.log(`\n usuario nao encontrado!!!!!\n`)
    }
    else{
      console.log(`\n Usuario com nome '${nome_do_usuario_procurado}' : `)
      console.log(resultado_da_consulta)
    }
  }
  EditarPerfil(): void {
    console.log("\n \n \n")
    console.log("|---------------------------------|")
    console.log("|      Editar Perfil              |")
    console.log("|---------------------------------|")
    let nome_do_usuario_procurado=input.question("\n Digite o nome do usuario:")

    let resultado_da_consulta=this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_do_usuario_procurado)
    //FAIL FAST
    if(resultado_da_consulta==null){
      console.log(`\n usuario nao encontrado!!!!!\n`)
    }
    else{
      let nome;
      let email;
      let opcao1=input.question(" Editar nome (s-SIM s-NAO) ?")
      if(opcao1.toUpperCase()=="S"){
          nome=input.question("Digite o nome:")
          resultado_da_consulta.setNome(nome)
      }

      let opcao2=input.question(" Editar email (s-SIM s-NAO) ?")
      if(opcao2.toUpperCase()=="S"){
          email=input.question("Digite o email:")
          resultado_da_consulta.setEmail(email)
      }



        this.salvarOsPerfisEmArquivoTxt()
     

      console.log(`\n Usuario com nome '${nome_do_usuario_procurado}' : `)
      console.log(resultado_da_consulta)
    }
  }
  excluirPerfil(){
    console.log("\n \n \n")
    console.log("|---------------------------------|")
    console.log("|      Excluir   Perfil           |")
    console.log("|---------------------------------|")
    let nome_do_usuario_procurado=input.question("\n Digite o nome do usuario que sera excluido:")

    let resultado_da_consulta=this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_do_usuario_procurado)
    //FAIL FAST
    if(resultado_da_consulta==null){
      console.log(`\n usuario nao encontrado!!!!!\n`)
    }
    else{
      let lista_de_perfis:Perfil[]=this._redeSocial.getRepositorioDePerfis().getPerfis()
      let lista_de_perfis_atualizada:Perfil[]=[]
      for (const perfil_atual of lista_de_perfis) {
          if(perfil_atual.getNome()!=nome_do_usuario_procurado){
              lista_de_perfis_atualizada.push(perfil_atual)
          }
      }
      this._redeSocial.getRepositorioDePerfis().setPerfis(lista_de_perfis_atualizada)
      this.salvarOsPerfisEmArquivoTxt()
      console.log(`\n Usuario com nome '${nome_do_usuario_procurado} excluido' : `)
    }
  }

  mostrarPostagensPopulares(){
    let lista_de_postagens=this._redeSocial.getRepositorioDePostagens().getPostagens()
    let  lista_de_postagens_simples:Postagem[]=[]
    let lista_de_postagens_avancadas:PostagemAvancada[]=[]

    for (const postagem_atual of lista_de_postagens) {
        if(postagem_atual instanceof PostagemAvancada){
            if(postagem_atual.ehPopular() && postagem_atual.getVisualizacoesRestantes()>0){
               lista_de_postagens_avancadas.push(postagem_atual)
            }
            
        }
        else{
          if(postagem_atual.ehPopular()){
            lista_de_postagens_simples.push(postagem_atual)
          } 
        }
    }

   let numero_postagem_simples=1
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

       `)
       numero_postagem_simples++
   }

   let numero_postagem_avancada=1
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

       `)
       numero_postagem_avancada++
   }
  }



  //>>>>>>>>>>PERSISTENCIA DE DADOS

  carregarArquivoTxtPerfis(){
    try{
      let perfis_gravados_no_arquivo_txt=JSON.parse(fs.readFileSync(this.caminho_arquivo_perfis,"utf-8"))
      for (const objeto_atual of perfis_gravados_no_arquivo_txt) {
        let objeto_convertido_em_perfil=new Perfil(objeto_atual._id,objeto_atual._nome,objeto_atual._email)
        for (const postagem_atual of objeto_atual._postagens) {
          objeto_convertido_em_perfil.adicicionarPostagens(postagem_atual)
        }
        
        console.log(objeto_convertido_em_perfil)
        this._redeSocial.getRepositorioDePerfis().incluir(objeto_convertido_em_perfil)
      }

    }
    catch (error){
       this._redeSocial.getRepositorioDePerfis().setPerfis([])
    }

  }
  salvarOsPerfisEmArquivoTxt(){
    let lista_de_perfis_cadrastrados=this._redeSocial.getRepositorioDePerfis().getPerfis()
    fs.writeFileSync(this.caminho_arquivo_perfis,JSON.stringify(lista_de_perfis_cadrastrados),"utf-8")
  }

  /*
  carregarArquivoTxtPostagens(){
    try {
        let postagens_gravadas_no_arquivo_txt=JSON.parse(fs.readFileSync(this.caminho_arquivo_postagens,"utf-8"))
        
        for (const objeto_atual of postagens_gravadas_no_arquivo_txt) {
            //Caso postagem avancada
            if(objeto_atual._hashtags!=undefined){
               let objeto_convertido_em_postagem_avancada=new PostagemAvancada(objeto_atual._id,objeto_atual._texto,objeto_atual._curtida,objeto_atual._descurtida,objeto_atual._data,objeto_atual. _perfil,[],objeto_atual._visualizacoesRestantes)
               for (const hashtag_atual of objeto_atual._hashtags) {
                  objeto_convertido_em_postagem_avancada.adicionarHashtag(hashtag_atual)
               }
               this._redeSocial.getRepositorioDePostagens().incluir(objeto_convertido_em_postagem_avancada)

            }

            //Caso postagem simples
            else{
                let objeto_convertido_em_postagem=new Postagem(objeto_atual._id,objeto_atual._texto,objeto_atual._curtida,objeto_atual._descurtida,objeto_atual._data,objeto_atual. _perfil)
                this._redeSocial.getRepositorioDePostagens().incluir(objeto_convertido_em_postagem)

            }
        }

    } 
    catch (error) {
        this._redeSocial.getRepositorioDePostagens().setPostagens([])
    }

  }


  salvarAsPostagensEmArquivoTxt(){
    const removerReferenciasCirculares=(obj:Object)=>{
        const seen = new WeakSet();
        return JSON.parse(JSON.stringify(obj, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return; // Remove a referência circular
                }
                seen.add(value);
            }
            return value;
        }));
    }
  
    let postagensSemReferenciasCirculares = removerReferenciasCirculares(this._redeSocial.getRepositorioDePostagens().getPostagens());
    console.log(postagensSemReferenciasCirculares)
    fs.writeFileSync(this.caminho_arquivo_postagens, JSON.stringify(postagensSemReferenciasCirculares), "utf-8");
    
    /*let lista_de_postagens_cadastradas=this._redeSocial.getRepositorioDePostagens().getPostagens()
    console.log(lista_de_postagens_cadastradas)
    fs.writeFileSync(this.caminho_arquivo_postagens,JSON.stringify(lista_de_postagens_cadastradas),"utf-8")
    

  }
  */

  carregarArquivoTxtPostagens(){
    const arquivo: string = fs.readFileSync(this.caminho_arquivo_postagens, 'utf-8');
    if(arquivo!="" && arquivo!=" "){
          //const linhas: string[] = arquivo.split('\n');
		const linhas: string[] = arquivo.split('\r\n');

		for (let i: number = 0; i < linhas.length; i++) {
			let linhaConta: string[] = linhas[i].split(";");
			let postagem!: Postagem;
			let tipo: string  = linhaConta[3];


			if (tipo == 'PA') {
        let perfil_da_postagem=this._redeSocial.getRepositorioDePerfis().consultarPorId(Number(linhaConta[5]))
        let lista_de_hashtags_sem_hash:string[]=linhaConta[6].split("#")
        let lista_de_hashtags_pronta=[]
        for (const hashtag_atual of lista_de_hashtags_sem_hash) {
          lista_de_hashtags_pronta.push(`#${hashtag_atual}`)
        }

				postagem = new PostagemAvancada(Number(linhaConta[0]),linhaConta[1], Number(linhaConta[2]),Number(linhaConta[4]),new Date(linhaConta[5]),perfil_da_postagem as Perfil,lista_de_hashtags_pronta,Number(linhaConta[7]));
        console.log(postagem)
			} else if (tipo == 'P') {
        let perfil_da_postagem=this._redeSocial.getRepositorioDePerfis().consultarPorId(Number(linhaConta[5]))

				postagem = new Postagem(Number(linhaConta[0]),linhaConta[1], Number(linhaConta[2]),Number(linhaConta[4]),new Date(linhaConta[5]),perfil_da_postagem as Perfil);
        console.log(postagem)
			}
      
      this._redeSocial.getRepositorioDePostagens().incluir(postagem)
    }
   
		
		}
  }
  salvarAsPostagensEmArquivoTxt(){
    let stringPostagem: string = "";
		let linha: string = "";

		for (let postagem_atual of this._redeSocial.getRepositorioDePostagens().getPostagens()) {
			if (postagem_atual instanceof PostagemAvancada) {
            
				linha = `${postagem_atual.getId()};${postagem_atual.getTexto()};${postagem_atual.getCurtida()};PA;${postagem_atual.getDescurtida()};${postagem_atual.getData()};${postagem_atual.getPerfil().getId()};${postagem_atual.getHashtagEmString()};${postagem_atual.getVisualizacoesRestantes()}\r\n`;
			} 
	    else {
        linha = `${postagem_atual.getId()};${postagem_atual.getTexto()};${postagem_atual.getCurtida()};P;${postagem_atual.getDescurtida()};${postagem_atual.getData()};${postagem_atual.getPerfil().getId()}\r\n`;
			}

			stringPostagem += linha;
		}
		//deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
		stringPostagem = stringPostagem.slice(0,stringPostagem.length-2);

		fs.writeFileSync(this.caminho_arquivo_postagens, stringPostagem,'utf-8');

  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



  incluirPostagem(): void {
    console.log("\n \n \n")
    console.log("|---------------------------------|")
    console.log("|      Incluir Postagens          |")
    console.log("|---------------------------------|")

    let nome_do_usuario_procurado=input.question("\n \n Digite o nome do usuario autor da postagem:")
    let resultado_da_consulta_pelo_perfil_do_autor_da_postagem=this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_do_usuario_procurado)
    //Verifica se eh um usuario valido.
    while (resultado_da_consulta_pelo_perfil_do_autor_da_postagem==null){
        console.log("\n usuario não encontado!!! Digite novamente.\n")
        nome_do_usuario_procurado=input.question("\n Digite o nome do usuario autor da postagem:")
        resultado_da_consulta_pelo_perfil_do_autor_da_postagem=this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_do_usuario_procurado)
    }
    

    let tipo_da_postagem=Number(input.question("\n \n Tipo da postagem 1-Postagem 2-Postagem Avancada : "))
    //verfica se a postagem eh valida
    while(tipo_da_postagem!=1 && tipo_da_postagem!=2){
      console.log(`\n opcao invalida!!!! Digite novamente\n.`)
      tipo_da_postagem=Number(input.question("\n Tipo da postagem 1-Postagem 2-Postagem Avancada : "))
    }

    //########## Criar postagem
    let lista_de_postagens=this._redeSocial.getRepositorioDePostagens().getPostagens()
    let postagem_atual:Postagem 

    if(tipo_da_postagem==1){
         let texto_da_postagem=input.question("\n \n Digite o texto da postagem:")
         //>>>>>>>Caso lista de Postagens vazia
         if(lista_de_postagens.length==0){
              postagem_atual=new Postagem(1,texto_da_postagem,0,0,new Date(),resultado_da_consulta_pelo_perfil_do_autor_da_postagem)
         }
         //>>>>>>>>Caso lista de Postagens com pelo menos 1 postagem
         else{
              let id_postagem_atual:number=lista_de_postagens[lista_de_postagens.length-1].getId()+1
              postagem_atual=new Postagem(id_postagem_atual,texto_da_postagem,0,0,new Date(),resultado_da_consulta_pelo_perfil_do_autor_da_postagem)
         }

         //salvando na memoria no Repositorio de Postagens
         this._redeSocial.getRepositorioDePostagens().incluir(postagem_atual)
         //salvando postagem na lista de postagem do usuario autor
         resultado_da_consulta_pelo_perfil_do_autor_da_postagem.adicicionarPostagens(postagem_atual)

         //  >>>>>>>>>>>Salvar no arquivo de texto 'postagens.txt'<<<<<<<<<<<<
       

        
    }
    if(tipo_da_postagem==2){
          let texto_da_postagem=input.question("\n \n Digite o texto da postagem:   \n")
          let numero_de_visualizacoes_maximo=Number(input.question("\n Digite o numero maximo de visualizacoes:"))
          let lista_de_hashtags:string[]=[]
  
          let numero_hastag_atual=1
          while(true){
              let hashtag_atual=input.question(`\n Digite a ${numero_hastag_atual} hashtag(#): `)
              lista_de_hashtags.push(`#${hashtag_atual}`)
              numero_hastag_atual++

              let continuar=true
              while(continuar){
                    let opcao:string=input.question(`\n\n\nDeseja adicionar mais hashtags? (S-sim N-Nao):  `)
                    if(opcao.toUpperCase()=="S")   break
                    else if(opcao.toUpperCase()=="N") continuar=false
                    else continue
              } 
              
              if(continuar==true) continue
              else break
          }

          //>>>>>>>Caso lista de Postagens vazia
          if(lista_de_postagens.length==0){
              postagem_atual=new PostagemAvancada(1,texto_da_postagem,0,0,new Date(),resultado_da_consulta_pelo_perfil_do_autor_da_postagem,lista_de_hashtags,numero_de_visualizacoes_maximo)
          }
          //>>>>>>>>Caso lista de Postagens com pelo menos 1 postagem
          else{
              let id_postagem_atual:number=lista_de_postagens[lista_de_postagens.length-1].getId()+1
              postagem_atual=new PostagemAvancada(id_postagem_atual,texto_da_postagem,0,0,new Date(),resultado_da_consulta_pelo_perfil_do_autor_da_postagem,lista_de_hashtags,numero_de_visualizacoes_maximo)
          }

          //salvando na memoria no Repositorio de Postagens
          this._redeSocial.getRepositorioDePostagens().incluir(postagem_atual)
          //salvando postagem na lista de postagem do usuario autor
          resultado_da_consulta_pelo_perfil_do_autor_da_postagem.adicicionarPostagens(postagem_atual)
          
    }


    //SALVAR postagens em arquivo "postagens.txt"
    this.salvarAsPostagensEmArquivoTxt()

  }
  EditarPostagens(): void {
    console.log("\n \n \n")
    console.log("|---------------------------------|")
    console.log("|      Editar Postagem            |")
    console.log("|---------------------------------|")
    let id_postagem:string | number=Number(input.question("\n Digite o nome do usuario:"))

    let resultado_da_consulta=this._redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem)
    //FAIL FAST
    if(resultado_da_consulta==null){
      console.log(`\n postagem nao encontrada!!!!!\n`)
    }
    else{


      let texto;
      let hashtag;
      let max_visualizacao

      let opcao1=input.question(" Editar texto (s-SIM s-NAO) ?")
      let opcao2
      let opcao3
      if(opcao1.toUpperCase()=="S"){
          texto=input.question("Digite o texto:")
          resultado_da_consulta.setTexto(texto)
      }

      if(resultado_da_consulta instanceof PostagemAvancada){
         opcao2=input.question(" Editar hastag (s-SIM s-NAO) ?")
         if(opcao2.toUpperCase()=="S"){
          let contador=1
           while(true){
                hashtag=input.question(`Digite a ${contador} hashtag: `)
                resultado_da_consulta.adicionarHashtag(`#${hashtag}`)
                contador++
                let perguta=input.question(`Cadrastar mais hastags (s-Sim n-Nao)`)
                if(perguta.toUpperCase()=="N"){
                    break
                }
           }  
        } 
        opcao3=input.question(" Editar numero maximo de visualizacoes (s-SIM s-NAO) ?")
        if(opcao3.toUpperCase()=="S"){
          max_visualizacao=input.question("Digite o numero maximo de visualizacoes:")
        } 
  
      }
     

      console.log(`\n Usuario com id '${id_postagem} atualizado!!!' : `)
    }
  }
  excluirPostagens(){
    console.log("\n \n \n")
    console.log("|---------------------------------|")
    console.log("|      Excluir   Postagens        |")
    console.log("|---------------------------------|")
    let id_postagem_exluida=Number(input.question("\n Digite o ID da postagem que sera excluida:"))

    let resultado_da_consulta=this._redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem_exluida)
    //FAIL FAST
    if(resultado_da_consulta==null){
      console.log(`\n  ID da postagem nao encontrado!!!!!\n`)
    }
    else{
      let lista_de_postagens:Postagem[]=this._redeSocial.getRepositorioDePostagens().getPostagens()
      let lista_de_postagens_atualizada:Postagem[]=[]

      for (const postagem_atual of lista_de_postagens) {
          if(postagem_atual.getId()!=id_postagem_exluida){
              lista_de_postagens_atualizada.push(postagem_atual)
          }
      }
      this._redeSocial.getRepositorioDePostagens().setPostagens(lista_de_postagens_atualizada)
      this.salvarAsPostagensEmArquivoTxt()
      console.log(`\n Postagem com id '${id_postagem_exluida} excluido' : `)
    }
  }

  consultarPostagens(): void {
    console.log("\n\n\n")
    console.log("|---------------------------------|")
    console.log("|      Consultar Postagens        |")
    console.log("|---------------------------------|") 
    console.log("\n\n\n")  
      let opcao:string | number=input.question(`Digite uma opcao: 
                              (1-mostrar Todas as postagens
                               2-mostrar as postagens de 1 perfil
                               3-mostrar uma postagem
                               0-Sair
                                
          
                               ) `)
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

      opcao=Number(opcao)

      //FAIL FAST
      if(opcao==0){
        return
      }
      else if(opcao==1){
          console.log(`\n\n\n>>>>>>>>>>>>Todas as postagens da Rede Social<<<<<<<<<<<<<<<<`)
          this.mostrarTodasAsPostagensDaRedeSocialNaTela()
      }
      else if(opcao==2){
        console.log(`\n\n\n>>>>>>>>>>>>Todas as postagens da um Perfil<<<<<<<<<<<<<<<<`)
        let nome_usuario=input.question("\nDigite o nome do usuario:")
        this.mostrarTodasAsPostagensDeUmPerfilNaTela(nome_usuario)
      }
      else if(opcao==3){
        console.log(`\n\n\n>>>>>>>>>>>>Mostrar Postagem com ID especifico<<<<<<<<<<<<<<<<`)
        let id_postagem:string | number=input.question("\nDigite o ID da postagem:")
        while(isNaN(Number(id_postagem))){
            console.log("\nvalor invalido!!! Digite novamente.")
            id_postagem=input.question("\nDigite o ID da postagem:")
        }
        id_postagem=Number(id_postagem)
        this.mostrarPostagemPorID(id_postagem)
      }

  }

  mostrarTodasAsPostagensDaRedeSocialNaTela(){
      let lista_de_postagens=this._redeSocial.getRepositorioDePostagens().getPostagens()
      let  lista_de_postagens_simples:Postagem[]=[]
      let lista_de_postagens_avancadas:PostagemAvancada[]=[]

      for (const postagem_atual of lista_de_postagens) {
          if(postagem_atual instanceof PostagemAvancada){
              lista_de_postagens_avancadas.push(postagem_atual)
          }
          else{
            lista_de_postagens_simples.push(postagem_atual)
          }
      }

     let numero_postagem_simples=1
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

         `)
         numero_postagem_simples++
     }

     let numero_postagem_avancada=1
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

         `)
         numero_postagem_avancada++
     }
  }

  mostrarTodasAsPostagensDeUmPerfilNaTela(nome_usuario:string){

    let consulta_pelo_usuario:Perfil | null=this._redeSocial.getRepositorioDePerfis().consultarPorNome(nome_usuario)
    //FAIL FAST
    if(consulta_pelo_usuario==null){
      console.log("usuario não encontrado!!!")
      return
    }

    let lista_de_postagens=consulta_pelo_usuario.getPostagens()
    let  lista_de_postagens_simples:Postagem[]=[]
    let lista_de_postagens_avancadas:PostagemAvancada[]=[]

    for (const postagem_atual of lista_de_postagens) {
        if(postagem_atual instanceof PostagemAvancada){
            lista_de_postagens_avancadas.push(postagem_atual)
        }
        else{
          lista_de_postagens_simples.push(postagem_atual)
        }
    }

   let numero_postagem_simples=1
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

       `)
       numero_postagem_simples++
   }

   let numero_postagem_avancada=1
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

       `)
       numero_postagem_avancada++
   }
}
mostrarPostagemPorID(id_postagem:number){
    let consulta_pela_postagem=this._redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem)
    //FAIL FAST
    if(consulta_pela_postagem==null){
      console.log(`Não há postagem com o id ${id_postagem} !!!`)
    }
    else{
          if(consulta_pela_postagem instanceof PostagemAvancada){
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

              `)
          }
          else{
            console.log(` \n               *POSTAGEM * 
            _________________________________________________________________________________________________
            | ID: ${consulta_pela_postagem.getId()}                DATA:${consulta_pela_postagem.getData()}  |                   
            |________________________________________________________________________________________________|
            |>>>> AUTOR: @ ${consulta_pela_postagem.getPerfil().getNome()}                                   |
            |>>>> TEXTO: ${consulta_pela_postagem.getTexto()}                                                |
            |>>>> CURTIDAS: ${consulta_pela_postagem.getCurtida()}                                           |
            |>>>> DESCURTIDAS: ${consulta_pela_postagem.getDescurtida()}                                     |
            |________________________________________________________________________________________________|

               `)
          }
    }
}




  curtirPostagem(): void {
    let id_postagem:string | number=input.question("Digite o ID da postagem:")
    while(isNaN(Number(id_postagem))){
        console.log("valor invalido!!! Digite novamente.")
        id_postagem=input.question("Digite o ID da postagem:")
    }
    id_postagem=Number(id_postagem)

    console.log(`\n_________________________________
                   |      Curtir Postagens          |
                   |________________________________|
                   \n`)  
    let consulta_pela_postagem=this._redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem)
    //FAIL FAST
    if(consulta_pela_postagem==null){
      console.log(`\nNão há postagem com o id ${id_postagem} !!!`)
    }
    else{
      console.log("----Postagem antes do like---------")
      this.mostrarPostagemPorID(id_postagem)
      consulta_pela_postagem.curtir()
      console.log("----Postagem apos o like---------")
      this.mostrarPostagemPorID(id_postagem)
    }
  }

  descurtirPostagem(): void {
      let id_postagem:string | number=input.question("Digite o ID da postagem:")
      while(isNaN(Number(id_postagem))){
          console.log("valor invalido!!! Digite novamente.")
          id_postagem=input.question("Digite o ID da postagem:")
      }
      id_postagem=Number(id_postagem)

      console.log(`\n_________________________________
                    |      Descurtir Postagens       |
                    |________________________________|
          \n`)  
      let consulta_pela_postagem=this._redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem)
      //FAIL FAST
      if(consulta_pela_postagem==null){
        console.log(`\nNão há postagem com o id ${id_postagem} !!!`)
      }
      else{
          console.log("----Postagem antes do Deslike---------")
          this.mostrarPostagemPorID(id_postagem)
          consulta_pela_postagem.descurtir()
          console.log("\n----Postagem apos o Deslike---------")
          this.mostrarPostagemPorID(id_postagem)
      }
  }
}

let repositorio_de_perfis=new RepositorioDePerfis([])
let repositorio_de_postagens=new RepositorioDePostagens([])
const redeSocial = new RedeSocial(repositorio_de_postagens,repositorio_de_perfis);
const app = new App(redeSocial);
app.exibirMenu();