const urlProveedores="https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const urlClientes="https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
const http=require("http");
const fs=require("fs");
const axios=require("axios");
let jsonProveedores;
let jsonClientes;

let getData=(callback)=>{
    console.log("Entre a la funcion");
    axios.get(urlProveedores).then(response=>{
        response.json();
        callback(response);
    });

}

//Se crea el servidor
fs.readFile('./index.html',  (err, data)=> {
    if (err) {
        throw err; 
    } 
    let pageContent=data.toString();
    http.createServer((req, res)=> {  
        res.writeHeader(200, {"Content-Type": "text/html"});  
        let html="";
        getData((proveedores)=>{
            console.log(proveedores.length);
            for(let i=0; i<proveedores.length;i++ ){
                 html+= "<tr> <td>"+proveedores[i].idproveedor+"</td>"+
                "<td>"+proveedores[i].nombrecompania+"</td>"+
                "<td>"+proveedores[i].nombrecontacto+"</td>"+"</tr>"
            }
        });
        //console.log("Aqui va el h "+ html);
        pageContent=pageContent.replace("{{replace}}",html) 
        res.write(html); 
        res.end(pageContent.toString());  
    }).listen(8081);
});
