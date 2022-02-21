 class FetchApi
{
    async search(link)
    {  
        try{
            const response = await fetch(link);        
            const result = await response.json();
            return result
        }catch(error){
            CreateContent.errorLog(error);           
        }
    }
}

class DomUtil
{
    static divCreator(divId, appendTo)
    {
        let divName = document.createElement('div');
        divName.id = divId;
        divName.className = "border p-3 my-3 mw-90"
        document.getElementById(appendTo).appendChild(divName);
    }

    static textAppend(tagType, appendTo, text)
    {
        let element = document.createElement(tagType);
        document.getElementById(appendTo).appendChild(element);
        element.appendChild(document.createTextNode(text));  
    }

    static clearNodeChilds(nodeName)
    {
        let list = document.getElementById(nodeName);
        while(list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
    }

    static playAudio(url) {   
       let audio = new Audio(url);
       audio.pause();
       audio.play();
    }
}

class CreateContent
{
    loading()
    {  
        DomUtil.clearNodeChilds("wordResult");
        DomUtil.divCreator("loadingDiv", "wordResult");
        DomUtil.textAppend('p', 'loadingDiv', "Loading...");
    }

    static errorLog(error, message)
    {
        DomUtil.clearNodeChilds("wordResult");
        DomUtil.divCreator("errorDiv", "wordResult");
        DomUtil.textAppend('p', 'errorDiv', message + error);
    }

    printQuery(word)
    { 
        DomUtil.clearNodeChilds("wordResult");

        if(word.hasOwnProperty('title')) {
            let msg = [word.title, word.message, word.resolution];
            let random = Math.floor(Math.random() * 3);
            DomUtil.divCreator("notFoundDiv", "wordResult");
            DomUtil.textAppend('p', "notFoundDiv", msg[random]);
        }
        else {        
            //Word Result Principal:
            this.createWordResult(word[0]);
            this.createPhonetics(word[0].phonetics);
            //Word Meanings:
            this.createWordMeanings(word[0]);
            //Word Synonyms:
            this.createSynonyms(word[0].meanings[0].definitions[0].synonyms);
        }
    }

    createWordResult(term)
    {
        //Create the word result main
        DomUtil.divCreator("wordResultPrincipal","wordResult");
        //Create searched word
        DomUtil.textAppend('strong',"wordResultPrincipal","Word: ");
        DomUtil.textAppend('span',"wordResultPrincipal",term.word);
        DomUtil.textAppend('br',"wordResultPrincipal","");
        //Create the type of word
        DomUtil.textAppend('strong',"wordResultPrincipal","Type: ");
        DomUtil.textAppend('span', 'wordResultPrincipal', term.meanings[0].partOfSpeech);
        DomUtil.textAppend('br',"wordResultPrincipal","");
    }   

    createPhonetics(phonetics)
    {   
            //cria o texto de pronuncia
            DomUtil.textAppend('strong', "wordResultPrincipal", "Pronounce: ");
            DomUtil.textAppend('span', "wordResultPrincipal", phonetics[0].text);

            //cria a tag de imagem
            let imageNode = document.createElement("i");
            imageNode.alt = "Hear the Pronounce";
            imageNode.className = "bi-volume-up w-5 h-5"
            imageNode.autofocus = false
        
            //cria o botão com imagem e audio
            let buttonNode = document.createElement("button");
            buttonNode.appendChild(imageNode);
            buttonNode.className = "btn"
            buttonNode.onclick = function() {
                DomUtil.playAudio(phonetics[0].audio)
            };
            document.getElementById("wordResultPrincipal").appendChild(buttonNode);          
    }

    createWordMeanings(term)
    {
        DomUtil.divCreator("wordMeaning", "wordResult");
        //Create description text
        DomUtil.textAppend('strong', "wordMeaning", "Description: ");
        DomUtil.textAppend('span', "wordMeaning", term.meanings[0].definitions[0].definition);
        DomUtil.textAppend('br', "wordMeaning", "");
        //Create Origin text
        DomUtil.textAppend('strong', "wordMeaning", "Origin: ");
        DomUtil.textAppend('span','wordMeaning', term.origin);
        DomUtil.textAppend('br', "wordMeaning", "");
        //Create exemple text
        DomUtil.textAppend('strong', "wordMeaning","Exemple: ");
        DomUtil.textAppend('span','wordMeaning', term.meanings[0].definitions[0].example);
        DomUtil.textAppend('br', "wordMeaning", "");
    }

    createSynonyms(synonyms)
    {
        DomUtil.divCreator('WordSynonyms', 'wordResult');

        let list = document.createElement('ul');
        list.appendChild(document.createTextNode('Synonyms:'));
        list.id = "synonymsList";
        document.getElementById("WordSynonyms").appendChild(list);

        if(synonyms.length > 0) {
            synonyms.forEach((value) => {
                DomUtil.textAppend('li', "synonymsList", value);
            })
        } else {
            DomUtil.textAppend('li', "synonymsList", "No synonyms found!");
        }

    }
}

async function searchBtn()
{
    const getContent = new FetchApi();
    const content = new CreateContent();
    const word = document.getElementById("searchBar").value;

    if(word === "") {
        CreateContent.errorLog("", "You cannot search with empty inputs.");
        return;
    }
    content.loading();
    const result = await getContent.search(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`); 

    
    //Chama as funcões de criação do DOM
    content.printQuery(result);
}