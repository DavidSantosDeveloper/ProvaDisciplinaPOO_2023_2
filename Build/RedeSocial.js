import { PostagemAvancada } from "./PostagemAvancada.js";
export { RedeSocial };
class RedeSocial {
    constructor(RepositorioDePostagens, RepositorioDePerfis) {
        this._RepositorioDePostagens = RepositorioDePostagens;
        this._RepositorioDePerfis = RepositorioDePerfis;
    }
    incluirPerfil(perfil) {
        //FAIL FAST
        if (perfil.getId() != undefined || perfil.getNome() != undefined || perfil.getEmail() != undefined) {
            return false;
        }
        else {
            if (this._RepositorioDePerfis.consultar(perfil.getId(), perfil.getNome(), perfil.getEmail()) == null) {
                this._RepositorioDePerfis.incluir(perfil);
                return true;
            }
            return false;
        }
    }
    consultarPerfil(id, nome, email) {
        let resultado_da_consulta = this._RepositorioDePerfis.consultar(id, nome, email);
        //FAIL FAST
        if (resultado_da_consulta == null) {
            return null;
        }
        else {
            return resultado_da_consulta;
        }
    }
    incluirPostagem(postagem) {
        //FAIL FAST
        if (postagem.getId() == undefined) {
            return false;
        }
        else {
            this._RepositorioDePostagens.incluir(postagem);
            return true;
        }
    }
    consultarPostagens(id, texto, hashtag, perfil) {
        return this._RepositorioDePostagens.consultar(id, texto, hashtag, perfil);
    }
    curtir(id_Postagem) {
        let resultado_da_consulta = this._RepositorioDePostagens.consultarPorID(id_Postagem);
        //FAIL FAST
        if (resultado_da_consulta == null) {
            return;
        }
        else {
            resultado_da_consulta.curtir();
        }
    }
    descurtir(id_Postagem) {
        let resultado_da_consulta = this._RepositorioDePostagens.consultarPorID(id_Postagem);
        //FAIL FAST
        if (resultado_da_consulta == null) {
            return;
        }
        else {
            resultado_da_consulta.descurtir();
        }
    }
    decrementarVisualizacoes(postagem) {
        //FAIL FAST
        if (postagem.getVisualizacoesRestantes() < 0) {
            return;
        }
        postagem.decrementarVisualizacoes();
    }
    exibirPostagensPorPerfil(id_perfil) {
        let resultado_da_consulta_pelo_perfil = this._RepositorioDePerfis.consultar(id_perfil);
        let postagens_do_perfil = [];
        let postagens_que_ainda_podem_ser_exibidas = [];
        //FAIL FAST
        if (resultado_da_consulta_pelo_perfil == null) {
            return null;
        }
        else {
            postagens_do_perfil = resultado_da_consulta_pelo_perfil.getPostagens();
            for (const postagem_atual of postagens_do_perfil) {
                if (postagem_atual instanceof PostagemAvancada) {
                    this.decrementarVisualizacoes(postagem_atual);
                }
            }
            for (const postagem_atual of postagens_do_perfil) {
                //FAIL FAST
                if (postagem_atual instanceof PostagemAvancada) {
                    if (postagem_atual.getVisualizacoesRestantes() > 0) {
                        postagens_que_ainda_podem_ser_exibidas.push(postagem_atual);
                    }
                }
                else {
                    postagens_que_ainda_podem_ser_exibidas.push(postagem_atual);
                }
            }
            return postagens_que_ainda_podem_ser_exibidas;
        }
    }
    exibirPostagensPorHashtag(hashtag) {
        let postagens_que_ainda_podem_ser_exibidas = [];
        for (const perfil_atual of this._RepositorioDePerfis.getPerfis()) {
            for (const postagem_atual of perfil_atual.getPostagens()) {
                if (postagem_atual instanceof PostagemAvancada) {
                    if (postagem_atual.getVisualizacoesRestantes() > 0) {
                        postagem_atual.decrementarVisualizacoes();
                        postagens_que_ainda_podem_ser_exibidas.push({ id_perfil: perfil_atual.getId(), postagensAvancadas: [postagem_atual] });
                    }
                }
                else {
                    postagens_que_ainda_podem_ser_exibidas.push({ id_perfil: perfil_atual.getId(), postagensAvancadas: [postagem_atual] });
                }
            }
        }
        return postagens_que_ainda_podem_ser_exibidas;
    }
}
