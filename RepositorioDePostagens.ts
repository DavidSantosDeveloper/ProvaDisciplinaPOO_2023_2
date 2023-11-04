import { Postagem } from "./Postagem.js";
import { Perfil} from "./Perfil.js";
import {PostagemAvancada} from './PostagemAvancada.js';
export {RepositorioDePostagens}

class RepositorioDePostagens{

    private _postagens: Postagem[]

    constructor(postagens: Postagem[]){
        this._postagens=postagens
    }
    incluir(postagem: Postagem): void{
        //FAIL FAST
        if(this.consultarPorID(postagem.getId())!=null){
            return
        }

        this._postagens.push(postagem)
       
    }
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[]{
        let resultado_das_consultas:Postagem[]=[]

        if(id!=undefined){
            for (const postagem_atual of this._postagens) {
                if(postagem_atual.getId()==id){
                    resultado_das_consultas.push(postagem_atual)
                }
            }
        }
        if(texto!=undefined){
            for (const postagem_atual of this._postagens) {
                if(postagem_atual.getTexto()==texto){
                    resultado_das_consultas.push(postagem_atual)
                }
            }
        }
        if(hashtag!=undefined){

            for (const postagem_atual of this._postagens) {

                if(postagem_atual instanceof PostagemAvancada){
                    if(postagem_atual.existeHashtag(hashtag)){
                        resultado_das_consultas.push(postagem_atual)
                    } 
                }
            }
        }
        if(perfil!=undefined){
            let lista_de_postagens_do_perfil:Postagem[]=[]
            for (const postagem_atual of lista_de_postagens_do_perfil) {
                resultado_das_consultas.push(postagem_atual)
            }
        }

        return resultado_das_consultas
    }
    consultarPorID(id:number):Postagem | null{
        let resultado_das_consultas:Postagem | null=null
        for(const postagem_atual of this._postagens) {
            if(postagem_atual.getId()==id){
                resultado_das_consultas=postagem_atual
            }
        }
        return resultado_das_consultas
    }

}