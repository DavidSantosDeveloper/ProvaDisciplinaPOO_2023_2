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

    getHashtagEmString(){
        let soma_hastags=""
        for (const hashtag_atual of this._hashtags) {
            soma_hastags+=`${hashtag_atual} `
        }
        return soma_hastags
    }
    getVisualizacoesRestantes(){
        return this._visualizacoesRestantes
    }
    setVisualizacoesRestantes(visualizacoesRestantes:number){
        this._visualizacoesRestantes=visualizacoesRestantes
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