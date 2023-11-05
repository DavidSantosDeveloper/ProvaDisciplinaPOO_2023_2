import * as fs from 'fs';
let dado = new Date();
fs.writeFileSync(".texto.txt", JSON.stringify(dado), "utf-8");
let recuperar_dados = fs.readFileSync("./texto.txt", "utf-8");
console.log(JSON.parse(recuperar_dados));
/*



let perfis_gravados_no_arquivo_txt=fs.readFileSync("./perfis.txt","utf-8")

let comparacao=(JSON.parse(perfis_gravados_no_arquivo_txt))

let perfil=new Perfil(1,"fco","fco_davi@gmail.com")
console.log(perfil)
console.log(typeof comparacao[0].getEmail())
*/
