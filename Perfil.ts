import { Postagem } from "./Postagem.js";
export {Perfil};

class Perfil{
    private _id: number;
    private _nome: string;
    private _email: string;
    private _postagens:Postagem[]=[]
    constructor(id:number, nome:string, email: string){
        this._id = id;
        this._nome = nome;
        this._email= email;
    }
     getId(){
        return this._id
    }
    getNome(){
        return this._nome
    }
    getEmail(){
        return this._email
    }
    getPostagens(){
        return this._postagens
    }
    adicicionarPostagens(nova_postagem:Postagem){
        //FAIL FAST
        if(this.verificarSePostagemExiste(nova_postagem)){
            return
        }
        this._postagens.push(nova_postagem)
    }
    verificarSePostagemExiste(nova_postagem:Postagem){
        let resultado_da_consulta:boolean=false
        for (const postagem_atual of this._postagens) {
            if( postagem_atual.getId()==nova_postagem.getId()){
                resultado_da_consulta=true
            }
           
        }
        return resultado_da_consulta
    }
}

