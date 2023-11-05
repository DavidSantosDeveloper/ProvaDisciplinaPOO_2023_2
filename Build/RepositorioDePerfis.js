export { RepositorioDePerfis };
class RepositorioDePerfis {
    constructor(perfis) {
        this._perfis = [];
        this._perfis = perfis;
    }
    getPerfis() {
        return this._perfis;
    }
    setPerfis(lista_de_perfis) {
        this._perfis = lista_de_perfis;
    }
    incluir(perfil) {
        this._perfis.push(perfil);
    }
    consultarPorNome(nome_procurado) {
        let resultado_da_consulta = null;
        for (const perfil_atual of this._perfis) {
            if (perfil_atual.getNome() == nome_procurado) {
                resultado_da_consulta = perfil_atual;
            }
        }
        return resultado_da_consulta;
    }
    consultarPorId(id) {
        let resultado_da_consulta = null;
        for (const perfil_atual of this._perfis) {
            if (perfil_atual.getId() == id) {
                resultado_da_consulta = perfil_atual;
            }
        }
        return resultado_da_consulta;
    }
    consultar(id, nome, email) {
        let resultado_da_consulta = null;
        if (id != undefined) {
            for (const perfil_atual of this._perfis) {
                if (perfil_atual.getId() == id) {
                    resultado_da_consulta = perfil_atual;
                }
            }
            //  resultado_da_consulta=this._perfis.filter((perfil_atual)=>perfil_atual.getId()==id)[0]
        }
        else if (nome != undefined) {
            for (const perfil_atual of this._perfis) {
                if (perfil_atual.getNome() == nome) {
                    resultado_da_consulta = perfil_atual;
                }
            }
        }
        else if (email != undefined) {
            for (const perfil_atual of this._perfis) {
                if (perfil_atual.getNome() == nome) {
                    resultado_da_consulta = perfil_atual;
                }
            }
        }
        return resultado_da_consulta;
    }
}
