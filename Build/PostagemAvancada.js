import { Postagem } from './Postagem.js';
export { PostagemAvancada };
class PostagemAvancada extends Postagem {
    constructor(id, texto, curtida, descurtida, data, perfil, hashtags, visualizacoesRestantes) {
        super(id, texto, curtida, descurtida, data, perfil);
        this._hashtags = hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }
    getHashtagEmString() {
        let soma_hastags = "";
        for (const hashtag_atual of this._hashtags) {
            soma_hastags += `${hashtag_atual} `;
        }
        return soma_hastags;
    }
    getVisualizacoesRestantes() {
        return this._visualizacoesRestantes;
    }
    adicionarHashtag(hashtag) {
        this._hashtags.push(hashtag);
    }
    existeHashtag(hashtag_procurada) {
        let resultado = false;
        for (let hashtag_atual of this._hashtags) {
            if (hashtag_atual == hashtag_procurada) {
                resultado = true;
            }
        }
        return resultado;
    }
    decrementarVisualizacoes() {
        this._visualizacoesRestantes--;
    }
}
