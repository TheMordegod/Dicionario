async function search()
{  
    let word = document.getElementById("searchBar").value
    let link = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    if(word !== "")
    {
        try{
            loading()
            const response = await fetch(link)          
            const result = await response.json()
            printQuery(result)
        }catch(error){
            errorLog(error)
        }
    }
    else{errorLog("", "The input is empty!")}
}

function loading()
{
    clearNodeChilds("wordResult")
    let loadingDiv = document.createElement('div')
    loadingDiv.id = "loadingDiv"
    document.getElementById("wordResult").appendChild(loadingDiv)
    loadingDiv.appendChild(document.createTextNode("Loading..."))
}

function clearNodeChilds(nodeName)
{
    let list = document.getElementById(nodeName)
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild)
    }
}

function errorLog(error, message)
{
    clearNodeChilds("wordResult")

    let errorDiv = document.createElement("div")
    let errorText = document.createElement('p')

    errorDiv.id = "errorDiv"
    errorDiv.appendChild(errorText)
    errorText.appendChild(document.createTextNode(message + error))

    console.log(error)

    document.getElementById("wordResult").appendChild(errorDiv)
}

function printQuery(word)
{ 
    clearNodeChilds("wordResult")

    if(word.hasOwnProperty('title'))
    {
        let msg = [word.title, word.message, word.resolution]
        let random = Math.floor(Math.random() * 2)


        let notFoundDiv = document.createElement('div')
        notFoundDiv.id = "notFoundDiv"
        document.getElementById("wordResult").appendChild(notFoundDiv)

        notFoundDiv.appendChild(document.createTextNode(msg[random]))
    }
    else{        
        //Word Result Principal:
        createWordResult(word[0])
        createPhonetics(word[0].phonetics)
        //Word Meanings:
        createWordMeanings(word[0])
        //Word Synonyms:
        createSynonyms(word[0].meanings[0].definitions[0].synonyms)
    }
}

function createWordResult(term)
{
    //Create the word result main
    let wordResultDiv = document.createElement('div')
    wordResultDiv.id = "wordResultPrincipal"
    document.getElementById("wordResult").appendChild(wordResultDiv)

    //Create the searched word
    let word = document.createElement('p')
    word.appendChild(document.createTextNode("Word: " + term.word))
    document.getElementById("wordResultPrincipal").appendChild(word)
    
    //Create the type of word
    let type = document.createElement('p')
    type.appendChild(document.createTextNode("type: " + term.meanings[0].partOfSpeech))
    document.getElementById("wordResultPrincipal").appendChild(type)
}

function createPhonetics(phonetics)
{   
    phonetics.forEach((value,index,array) => 
    {
        //cria o texto de pronuncia
        let textNode = document.createElement("span")
        textNode.appendChild(document.createTextNode(array[index].text))
        document.getElementById("wordResultPrincipal").appendChild(textNode)

        //cria a tag de imagem
        let imageNode = document.createElement("img")
        imageNode.src = "./icons/volume-up.svg"
        imageNode.alt = "Hear the Pronounce" 
        
        //cria o botão com imagem e audio
        let buttonNode = document.createElement("button")
        buttonNode.appendChild(imageNode) //add a imagem no botão
        buttonNode.onclick = function() {playAudio(array[index].audio)} // função para adicionar Som ao Botão
        document.getElementById("wordResultPrincipal").appendChild(buttonNode)          
    })
}

async function playAudio(url)
{   
  let audio = new Audio(url)
   audio.pause()
   audio.play()
}

function createWordMeanings(term)
{
    // Create the div for meaning
    let wordMeaningDiv = document.createElement('div')
    wordMeaningDiv.id = "wordMeaning"
    document.getElementById("wordResult").appendChild(wordMeaningDiv)

    //Create description text
    let description = document.createElement('p')
    description.appendChild(document.createTextNode("Description: " + term.meanings[0].definitions[0].definition))
    document.getElementById("wordMeaning").appendChild(description)

    //Create Origin text
    let originText = document.createElement("p")
    originText.appendChild(document.createTextNode("Origin: " + term.origin))
    document.getElementById("wordMeaning").appendChild(originText)

    //Create exemple text
    let exempleText = document.createElement('p')
    exempleText.appendChild(document.createTextNode("Exemple: " + term.meanings[0].definitions[0].example))
    document.getElementById("wordMeaning").appendChild(exempleText)
}

// limpa a lista anterior e adiciona os novos elementos
function createSynonyms(synonyms)
{
    let synonymsDiv = document.createElement('div')
    synonymsDiv.id = "WordSynonyms"
    document.getElementById("wordResult").appendChild(synonymsDiv)

    let list = document.createElement('ul')
    list.appendChild(document.createTextNode('Synonyms:'))
    list.id = "synonymsList"
    document.getElementById("WordSynonyms").appendChild(list)

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

