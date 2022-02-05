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

function divCreator(divId, appendTo, message)
{
    let divName = document.createElement('div')
    divName.id = divId 
    document.getElementById(appendTo).appendChild(divName)
    divName.appendChild(document.createTextNode(message))
}

function textAppend(elementType, appendTo, text)
{
    let element = document.createElement(elementType)
    document.getElementById(appendTo).appendChild(element)
    element.appendChild(document.createTextNode(text))  
}

function loading()
{
    clearNodeChilds("wordResult")
    divCreator("loadingDiv","wordResult","Loading...")
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
    divCreator("errorDiv", "wordResult", message + error)
    console.log(error)
}

function printQuery(word)
{ 
    clearNodeChilds("wordResult")

    if(word.hasOwnProperty('title'))
    {
        let msg = [word.title, word.message, word.resolution]
        let random = Math.floor(Math.random() * 2)
        divCreator("notFoundDiv","wordResult",msg[random])
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
    divCreator("wordResultPrincipal","wordResult", "")
    //Create searched word
    textAppend('p',"wordResultPrincipal","Word: " + term.word)
    //Create the type of word
    textAppend('p', 'wordResultPrincipal', "type: " + term.meanings[0].partOfSpeech)
}

function createPhonetics(phonetics)
{   
    phonetics.forEach((value,index,array) => 
    {
        //cria o texto de pronuncia
        textAppend('span', "wordResultPrincipal", "Pronounce: " + array[index].text)

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
    divCreator("wordMeaning","wordResult", "")
    //Create description text
    textAppend('p',"wordMeaning","Description: " + term.meanings[0].definitions[0].definition)
    //Create Origin text
    textAppend('p','wordMeaning', "Origin: " + term.origin) 
    //Create exemple text
    textAppend('p','wordMeaning', "Exemple: " + term.meanings[0].definitions[0].example)
}

// limpa a lista anterior e adiciona os novos elementos
function createSynonyms(synonyms)
{
    divCreator('WordSynonyms', 'wordResult', "")
    
    let list = document.createElement('ul')
    list.appendChild(document.createTextNode('Synonyms:'))
    list.id = "synonymsList"
    document.getElementById("WordSynonyms").appendChild(list)

    if(synonyms.length > 0){
        synonyms.forEach((value) => {
            textAppend('li',"synonymsList",value)
        })
    }
    else{
        textAppend('li',"synonymsList", "No synonyms found!")
    }

}

