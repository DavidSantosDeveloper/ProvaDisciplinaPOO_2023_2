export { Perfil };
class Perfil {
    constructor(id, nome, email) {
        this._postagens = [];
        this._id = id;
        this._nome = nome;
        this._email = email;
    }
    getId() {
        return this._id;
    }
    getNome() {
        return this._nome;
    }
    getEmail() {
        return this._email;
    }
    getPostagens() {
        return this._postagens;
    }
    adicicionarPostagens(nova_postagem) {
        this._postagens.push(nova_postagem);
    }
}
