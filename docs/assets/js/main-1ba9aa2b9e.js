var clip=new ClipboardJS(".btn");function workingFunction(){$.iaoAlert({msg:"Oooops! Ainda não consegui desenvolver essa parte, daqui alguns dias fica pronto =)",type:"error",position:"top-left",mode:"dark",alertClass:"font-custom",fadeTime:"3000"})}function showFakeName(){var o=["Miguel","Lucas","Guilherme","Gabriel","Enzo","Arthur","Rafael","João","Gustavo","Pedro","Matheus","Bernardo","Davi","Henrique","Bruno","Heitor","Felipe","Vinícius","Lorenzo","Samuel","Rodrigo","Benjamim","Eduardo","Diego","Leonardo","Antônio","Nicolas","Daniel","Thiago","José"],e=Math.floor(Math.random()*o.length);document.getElementById("errorName").innerHTML=o[e]}clip.on("success",function(o){$.iaoAlert({msg:"Texto copiado para o seu clipboard =)",type:"success",position:"top-left",mode:"dark",alertClass:"font-custom",fadeTime:"3000"})}),showFakeName();