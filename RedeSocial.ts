import { RepositorioDePostagens } from "./RepositorioDePostagens";
import { RepositorioDePerfis } from "./RepositorioDePerfis";
import {Perfil} from "./Perfil"
import {Postagem} from "./Postagem"
import {PostagemAvancada} from "./PostagemAvancada"
export {RedeSocial}

type relacao_Perfil_E_PostagensAvancadas={
    id_perfil:number
    postagensAvancadas:Postagem[]
}

class RedeSocial{
    private _RepositorioDePostagens: RepositorioDePostagens;
    private _RepositorioDePerfis: RepositorioDePerfis; 
    constructor(RepositorioDePostagens: RepositorioDePostagens,RepositorioDePerfis: RepositorioDePerfis){
        this._RepositorioDePostagens = RepositorioDePostagens;
        this._RepositorioDePerfis = RepositorioDePerfis;
    }
    incluirPerfil(perfil: Perfil):boolean{
        //FAIL FAST
        if(perfil.getId()!=undefined || perfil.getNome()!=undefined  || perfil.getEmail()!=undefined){
            return false
        }
        else{
             if(this._RepositorioDePerfis.consultar(perfil.getId(),perfil.getNome(),perfil.getEmail())==null){
                    this._RepositorioDePerfis.incluir(perfil)
                    return true
            }
            return false  
        }
    }
    consultarPerfil(id: number, nome: string, email: string): Perfil | null{
        let resultado_da_consulta=this._RepositorioDePerfis.consultar(id,nome,email)
        //FAIL FAST
        if(resultado_da_consulta==null){
            return null
        }  
        else{
            return resultado_da_consulta
        }

    }
    incluirPostagem(postagem: Postagem): boolean{
        //FAIL FAST
        if(postagem.getId()==undefined){
            return false
        }
        else{
            this._RepositorioDePostagens.incluir(postagem)
            return true
        }
    }
    consultarPostagens(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[]{
        return this._RepositorioDePostagens.consultar(id,texto,hashtag,perfil)
    }
    curtir(id_Postagem: number){
        let resultado_da_consulta=this._RepositorioDePostagens.consultarPorID(id_Postagem)
        //FAIL FAST
        if(resultado_da_consulta==null){
            return
        }
        else{
            resultado_da_consulta.curtir()
        }

    }
    descurtir(id_Postagem: number){
        let resultado_da_consulta=this._RepositorioDePostagens.consultarPorID(id_Postagem)
        //FAIL FAST
        if(resultado_da_consulta==null){
            return
        }
        else{
            resultado_da_consulta.descurtir()
        }

    }

    decrementarVisualizacoes(postagem: PostagemAvancada): void{
        //FAIL FAST
        if(postagem.getVisualizacoesRestantes()<0){
            return
        }
        postagem.decrementarVisualizacoes()
    }

    exibirPostagensPorPerfil(id_perfil: number): Postagem[] | null{
        let resultado_da_consulta_pelo_perfil=this._RepositorioDePerfis.consultar(id_perfil)
        let postagens_do_perfil:Postagem[]=[]
        let postagens_que_ainda_podem_ser_exibidas:Postagem[]=[]
        //FAIL FAST
        if(resultado_da_consulta_pelo_perfil==null){
            return null
        }
        else{
            postagens_do_perfil=resultado_da_consulta_pelo_perfil.getPostagens()

            for (const postagem_atual of postagens_do_perfil) {
                if(postagem_atual instanceof PostagemAvancada){
                    this.decrementarVisualizacoes(postagem_atual)
                }
            }

            for (const postagem_atual of postagens_do_perfil) {
                //FAIL FAST
                if(postagem_atual instanceof PostagemAvancada){
                    if(postagem_atual.getVisualizacoesRestantes()>0){
                        postagens_que_ainda_podem_ser_exibidas.push(postagem_atual)
                    }
                }
                else{
                    postagens_que_ainda_podem_ser_exibidas.push(postagem_atual)
                }
            }
            return postagens_que_ainda_podem_ser_exibidas

        }
    }

    exibirPostagensPorHashtag(hashtag: string): relacao_Perfil_E_PostagensAvancadas[] | null{
        

        let postagens_que_ainda_podem_ser_exibidas:relacao_Perfil_E_PostagensAvancadas[]=[]
          
        for (const perfil_atual of this._RepositorioDePerfis.getPerfil()) {
            for (const postagem_atual of perfil_atual.getPostagens()) {
                if(postagem_atual instanceof PostagemAvancada){
                    if(postagem_atual.getVisualizacoesRestantes()>0){
                        postagem_atual.decrementarVisualizacoes()
                        postagens_que_ainda_podem_ser_exibidas.push({id_perfil:perfil_atual.getId(),postagensAvancadas:[postagem_atual]})
                    }
                }
                else{
                    postagens_que_ainda_podem_ser_exibidas.push({id_perfil:perfil_atual.getId(),postagensAvancadas:[postagem_atual]})
                } 
            }
        }
        return postagens_que_ainda_podem_ser_exibidas
        
    }

    
}
