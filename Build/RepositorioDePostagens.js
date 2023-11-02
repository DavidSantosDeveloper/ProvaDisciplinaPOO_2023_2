import { PostagemAvancada } from './PostagemAvancada.js';
export { RepositorioDePostagens };
class RepositorioDePostagens {
    constructor(postagens) {
        this._postagens = postagens;
    }
    incluir(postagem) {
        //FAIL FAST
        if (this.consultarPorID(postagem.getId()) != null) {
            return;
        }
        this._postagens.push(postagem);
    }
    consultar(id, texto, hashtag, perfil) {
        let resultado_das_consultas = [];
        if (id != undefined) {
            for (const postagem_atual of this._postagens) {
                if (postagem_atual.getId() == id) {
                    resultado_das_consultas.push(postagem_atual);
                }
            }
        }
        if (texto != undefined) {
            for (const postagem_atual of this._postagens) {
                if (postagem_atual.getTexto() == texto) {
                    resultado_das_consultas.push(postagem_atual);
                }
            }
        }
        if (hashtag != undefined) {
            for (const postagem_atual of this._postagens) {
                if (postagem_atual instanceof PostagemAvancada) {
                    if (postagem_atual.existeHashtag(hashtag)) {
                        resultado_das_consultas.push(postagem_atual);
                    }
                }
            }
        }
        if (perfil != undefined) {
            let lista_de_postagens_do_perfil = [];
            for (const postagem_atual of lista_de_postagens_do_perfil) {
                resultado_das_consultas.push(postagem_atual);
            }
        }
        return resultado_das_consultas;
    }
    consultarPorID(id) {
        let resultado_das_consultas = null;
        for (const postagem_atual of this._postagens) {
            if (postagem_atual.getId() == id) {
                resultado_das_consultas = postagem_atual;
            }
        }
        return resultado_das_consultas;
    }
}
