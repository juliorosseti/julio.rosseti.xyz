var clip = new ClipboardJS('.btn');

clip.on('success', function(e) {
    $.iaoAlert({msg: "Texto copiado para o seu clipboard =)",
            type: "success",
            position: 'top-left',
            mode: "dark",
            alertClass: "font-custom",
            fadeTime: "3000",
    })
});

function workingFunction()
{
    $.iaoAlert({msg: "Oooops! Ainda não consegui desenvolver essa parte, daqui alguns dias fica pronto =)",
            type: "error",
            position: 'top-left',
            mode: "dark",
            alertClass: "font-custom",
            fadeTime: "3000",
    })
}

function showFakeName(){
    var myArray = [ 'Miguel', 'Lucas', 'Guilherme', 'Gabriel', 'Enzo', 'Arthur', 'Rafael', 'João', 'Gustavo', 'Pedro', 'Matheus', 'Bernardo', 'Davi', 'Henrique', 'Bruno', 'Heitor', 'Felipe', 'Vinícius', 'Lorenzo', 'Samuel', 'Rodrigo', 'Benjamim', 'Eduardo', 'Diego', 'Leonardo', 'Antônio', 'Nicolas', 'Daniel', 'Thiago', 'José'];
    var rand = Math.floor(Math.random() * myArray.length);
    document.getElementById('errorName').innerHTML = myArray[rand];
}

showFakeName();
