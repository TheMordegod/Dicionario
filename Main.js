import { FetchWord } from "./Fetch.js";
import { DomElement } from "./DomElement.js";

async function searchBtn() {
    let inputValue = document.getElementById('search-bar').value;
    let response = await FetchWord(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
    console.log(response)
    createPageContent(response)
}

function createPageContent(response) {
    cardHeader(response)
    descriptionWrapper()
    descriptionCards(response)
}

//Functions to create the word header
function cardHeader(response) {
    document.getElementById('firstCard').remove()

    const firstCard = new DomElement('div', {
        id: 'firstCard',
        class: 'container-fluid text-center',
        appendTo: 'firstCardSection'
    })

    const firstCardHeader = new DomElement('div', {
        id: 'firstCardHeader',
        class: 'row bg-white border-bottom p-4 rounded mt-3',
        appendTo: 'firstCard'
    })

    headerTitle(response)
    phonetics(response)
}

function headerTitle(response) {
    const HeaderTitle = new DomElement('div', {
        id: 'wordName',
        class: 'fs-2 text-uppercase col',
        appendTo: 'firstCardHeader'
    })
    HeaderTitle.insertTextSelf(response.word)
}

function phonetics(response) {
    response.phonetics.forEach((value, index) => {
        if (response.phonetics[index].audio !== '' && response.phonetics[index].hasOwnProperty('text')) {
            const pronounce = new DomElement('div', {
                id: 'pronounce' + index,
                class: 'col-md',
                appendTo: 'firstCardHeader'
            })
            const pronounceSpan = new DomElement('span', {
                id: 'pronounceSpan' + index,
                class: 'fs-2',
                appendTo: 'pronounce' + index
            })
            const pronounceAudioBtn = new DomElement('button', {
                id: 'audioBtn' + index,
                class: 'audioBtn',
                appendTo: 'pronounce' + index
            })
            const audioIcon = new DomElement('i', {
                id: 'audioIcon' + index,
                class: 'bi bi-volume-up-fill h3',
                appendTo: 'audioBtn' + index
            })

            pronounceAudioBtn.insertAudioButton(response.phonetics[index].audio)
            pronounceSpan.insertTextSelf(response.phonetics[index].text)
        }
    })
}

//Function to create card wrapper
function descriptionWrapper() {

    document.getElementById('descriptionWrapper').remove()

    const wordCards = new DomElement('div', {
        id: 'descriptionWrapper',
        class: 'row justify-content-center',
        appendTo: 'descriptionSection'
    })

}

//Functions to create card's description
function descriptionCards(response) 
{   
    /* 
    descriptionTitle(response)
    descriptionText(response)*/
    response.meanings.forEach((definitionArray, index) => {  
        let column = defineNumberOfColumns(response, index)
        const definitions = new DomElement('div', {
            id: 'definitionsCard' + index,
            class: column,
            appendTo: 'descriptionWrapper'
        })
        const wordTypeDiv = new DomElement('div', {
            id: 'wordType' + index,
            class: 'text-center fs-2',
            appendTo: 'definitionsCard' + index
        })
        const wordType = new DomElement('p', {
            id: 'wordType' + index,
            class: "",
            appendTo: 'wordType' + index
        })
    
        definitionArray.definitions.forEach((definitionArray,idx) => {           
            const definition = new DomElement('div', {
                id: 'definition' + index + idx,
                class: 'border-bottom mt-2', 
                appendTo: 'definitionsCard' + index
            })
    
            const definitionText = new DomElement('p', {          
                id: 'definitionText' + index + idx, 
                class: '', 
                appendTo: 'definition' + index + idx
            })

            let text = document.createTextNode(definitionArray.definition);
            document.getElementById('definitionText' + index + idx).appendChild(text); 
        })
       
        wordType.insertTextSelf(response.meanings[index].partOfSpeech)
    })
}



function defineNumberOfColumns(response, actualIndex)
{
    const oneColumn = 'col-md bg-white p-4 my-3 rounded';
    const twoColumns = 'col-md-6 bg-white p-4 my-3 rounded';
    const lastIndex = response.meanings.length - 1;

    if(lastIndex == actualIndex){return oneColumn;}
    if(response.meanings.length <= 1){return oneColumn;}
    return twoColumns;
   
}



document.getElementById("searchBtn").addEventListener('click', searchBtn);




