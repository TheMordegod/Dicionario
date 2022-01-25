//document.getElementById("searchBtn").addEventListener("Click", search())

function search()
{  
    let word = document.getElementById("searchBar").value
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((resp) => resp.json())
    .then((data) => {printQuery(data)})
    .catch(error => errorLog(error)) 
}

function errorLog(error)
{
    let errorText = "OOPS! Something went wrong! \n" + error
    document.getElementById("wordText").innerHTML = errorText
}

function printQuery(test)
{ 
    //Word Result Principal:
    document.getElementById("wordText").innerHTML = test[0].word
    document.getElementById("wordTypeText").innerHTML = test[0].meanings[0].partOfSpeech
    createPhonetics(test[0].phonetics)
    //Word Description:
    document.getElementById("descriptionText").innerHTML = test[0].meanings[0].definitions[0].definition
    //Word Origin:
    document.getElementById("originText").innerHTML =  test[0].origin
    //Word Exemples:
    document.getElementById("exempleText").innerHTML = test[0].meanings[0].definitions[0].example
    //Word Synonyms:
    createSynonyms(test[0].meanings[0].definitions[0].synonyms)
}

function clearNodeChilds(nodeName)
{
    let list = document.getElementById(nodeName)
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild)
    }
}

function createPhonetics(phonetics)
{   
    clearNodeChilds("wordPhonetics")
    phonetics.forEach((value,index,array) => 
    {
        //cria o texto de pronuncia
        let textNode = document.createElement("span")
        textNode.appendChild(document.createTextNode(array[index].text))
        document.getElementById("wordPhonetics").appendChild(textNode)

        //cria a tag de imagem
        let imageNode = document.createElement("img")
        imageNode.src = "./icons/volume-up.svg"
        imageNode.alt = "Hear the Pronounce" 
        
        //cria o botão com a imagem
        let buttonNode = document.createElement("button")
        buttonNode.appendChild(imageNode) //add a imagem no botão
        buttonNode.onclick = function() {playAudio(array[index].audio)} // função para adicionar Som ao Botão
        document.getElementById("wordPhonetics").appendChild(buttonNode)          
    })
}

function playAudio(url)
{   
  let audio = new Audio(url)
  audio.pause()
  audio.play()
}

// limpa a lista anterior e adiciona os novos elementos
function createSynonyms(synonyms)
{
    clearNodeChilds("synonymsList")

    if(synonyms.length > 0){
        synonyms.forEach((value) => {
            let node = document.createElement("li") // cria a tag
            node.appendChild(document.createTextNode(value)) // add o valor dentro da tag 
            document.getElementById("synonymsList").appendChild(node) // add o <li> valor </li> na pag
        })
    }
    else{
        let node = document.createElement("li")
        node.appendChild(document.createTextNode("No synonyms found!"))
        document.getElementById("synonymsList").appendChild(node)
    }

}