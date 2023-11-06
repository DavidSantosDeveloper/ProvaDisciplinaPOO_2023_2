import { Perfil } from "./Perfil.js";
export {Postagem}

class Postagem{
    private _id: number;
    private _texto: string;
    private _curtida: number;
    private _descurtida: number;
    private _data: Date;
    private _perfil: Perfil;
    constructor(id: number, texto: string, curtida: number, descurtida: number, 
        data: Date, perfil: Perfil){
        this._id = id;
        this._texto = texto;
        this._curtida = curtida;
        this._descurtida = descurtida;
        this._data = data;
        this._perfil = perfil;
        }
    getId(){
       return this._id
    }
    getTexto(){
       return this._texto
    }
    setTexto(texto:string){
        this._texto=texto
    }
    getCurtida(){
       return this._curtida
    }
    getDescurtida(){
        return this._descurtida
    }
    getData(){
        return this._data
    }
    getPerfil(){
        return this._perfil
    }

    curtir(): void{
        this._curtida ++
    }
    descurtir(){
        this._descurtida++
    }
    ehPopular(){
        if(this._curtida>=1.5*this._descurtida){
            return true
        }
        else{
            return false
        }
    }
}