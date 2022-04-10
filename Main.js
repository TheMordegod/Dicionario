import { FetchWord } from "./Fetch.js";
import { DomElement } from "./DomElement.js";
document.getElementById("searchBtn").addEventListener('click', searchBtn);

function searchBtn() {
    let inputValue = document.getElementById('search-bar').value;
    if(inputValue === "") {
        return alert('You cannot search empty inputs!'); 
    } 
    fetchData(inputValue)
}

async function fetchData(inputValue) {
    let response = await FetchWord(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
    if(response.hasOwnProperty('title')){
        console.log('Sorry BRO')
    }
    else{
        createPageContent(response[0]) 
    }    
}

function createPageContent(response) {
    cardHeader(response)
    descriptionWrapper()
    descriptionCards(response)
    accordionsExemples(response)
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

//Functions to create description cards 
function descriptionCards(response) {
    response.meanings.forEach((definitionArray, cardId) => {
        descriptionTitle(response, cardId);

        definitionArray.definitions.forEach((definitionArray, definitionId) => {
            descriptionText(definitionArray, cardId, definitionId);
            accordionsExemples(definitionArray,cardId,definitionId);
        })
    })
    accordionClickLogic()   
}

function descriptionTitle(response, cardId) {
    let column = defineNumberOfColumns(response, cardId)

    const definitions = new DomElement('div', {
        id: 'definitionsCard' + cardId,
        class: column,
        appendTo: 'descriptionWrapper'
    })
    const wordTypeDiv = new DomElement('div', {
        id: 'wordType' + cardId,
        class: 'text-center fs-2',
        appendTo: 'definitionsCard' + cardId
    })
    const wordType = new DomElement('p', {
        id: 'wordTypeText' + cardId,
        class: "",
        appendTo: 'wordType' + cardId
    })

    wordType.insertTextSelf(response.meanings[cardId].partOfSpeech)
}

function descriptionText(definitionArray, cardId, definitionId) {
    const definition = new DomElement('div', {
        id: 'definition' + cardId + definitionId,
        class: 'border-bottom mt-2',
        appendTo: 'definitionsCard' + cardId
    })

    const definitionText = new DomElement('p', {
        id: 'definitionText' + cardId + definitionId,
        class: '',
        appendTo: 'definition' + cardId + definitionId
    })

    let text = document.createTextNode(definitionArray.definition);
    document.getElementById('definitionText' + cardId + definitionId).appendChild(text);
}

function defineNumberOfColumns(response, actualIndex) {
    const oneColumn = 'col-md bg-white p-4 my-3';
    const twoColumns = 'col-md-6 bg-white p-4 my-3';
    const lastIndex = response.meanings.length - 1;

    if (lastIndex == actualIndex) { return oneColumn; }
    if (response.meanings.length <= 1) { return oneColumn; }
    return twoColumns;
}

//Accordion functions
function accordionsExemples(definitionArray,cardId,definitionId) {
    if(!definitionArray.example) {return;} 

    const accordionDiv = new DomElement('div', {
        id: 'accordionDiv' + cardId + definitionId,
        class: 'accordion container bg-white',
        appendTo: 'definitionText' + cardId + definitionId
    })
    const accordionLabel = new DomElement('div', {
        id: 'accordionLabel' + cardId + definitionId,
        class: 'accordionLabel d-flex mt-2 pt-2',
        appendTo: 'accordionDiv' + cardId + definitionId
    })
    const accordionParagraph = new DomElement('p', {
        id: 'accordionParagraph' + cardId + definitionId,
        class: 'fw-bold d-flex',
        appendTo: 'accordionLabel' + cardId + definitionId
    })
    const accordionText = new DomElement('div', {
        id: 'accordionText' + cardId + definitionId,
        class: 'accordionText p-2',
        appendTo: 'accordionDiv' + cardId + definitionId
    })

    accordionParagraph.insertTextSelf('Example')

    let text = document.createTextNode(definitionArray.example);
    document.getElementById('accordionText' + cardId + definitionId).appendChild(text);
}

function accordionClickLogic(){
    const accordion = document.getElementsByClassName('accordion')

    for(let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', event => {
        if(event.target.classList[0] === 'accordionLabel') {
            accordion[i].classList.toggle('active')
        }      
    })  
    }
}











