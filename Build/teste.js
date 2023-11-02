import * as fs from 'fs';
let dado = [{ name: "texto" }];
fs.writeFileSync(".texto.txt", JSON.stringify(dado), "utf-8");
let recuperar_dados = fs.readFileSync("./texto.txt", "utf-8");
console.log(recuperar_dados);
