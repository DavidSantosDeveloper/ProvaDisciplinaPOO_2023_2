import {Postagem} from './Postagem.js'
import {Perfil} from './Perfil.js'
export {PostagemAvancada}

class PostagemAvancada extends Postagem{
    private _hashtags: string[];
    private _visualizacoesRestantes: number;
    constructor(id: number, texto: string, curtida: number, descurtida: number, 
        data: Date, perfil: Perfil,hashtags: string[],visualizacoesRestantes: number){
            super(id, texto, curtida, descurtida, data, perfil)
            this._hashtags = hashtags;
            this._visualizacoesRestantes = visualizacoesRestantes;
        }

    getVisualizacoesRestantes(){
        return this._visualizacoesRestantes
    }
    adicionarHashtag(hashtag: string): void{
        this._hashtags.push(hashtag)
    }
    existeHashtag(hashtag_procurada: string): boolean{
        let resultado=false;

        for(let hashtag_atual of this._hashtags ){
            if(hashtag_atual==hashtag_procurada){
                resultado=true
            }
        }

        return resultado
        
    }
    decrementarVisualizacoes(): void{
        this._visualizacoesRestantes --
    }
}