function search(word)
{
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((resp) => resp.json())
    .then((data) => {printQuery(data)})
    .catch(error => console.log(error)) 
}

function append(parent, element){
    return parent.appendChild(element)
}

function createNode(element){
    return document.createElement(element)
}

function display(element){
    return document.getElementById("demo").innerHTML = element
}

function printQuery()
{ 
    let test = [{"word":"car","phonetic":"kɑː",
    "phonetics":[{"text":"kɑː",
    "audio":"//ssl.gstatic.com/dictionary/static/sounds/20200429/car--_gb_1.mp3"}],
    "origin":"late Middle English (in the general sense ‘wheeled vehicle’): from Old Northern French carre, based on Latin carrum, carrus, of Celtic origin.",
    "meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"a four-wheeled road vehicle that is powered by an engine and is able to carry a small number of people.",
    "example":"she drove up in a car","synonyms":["automobile","motor","machine","wheels","heap","crate","(old) banger","jalopy","limo","auto","hooptie","motor car","horseless carriage"],
    "antonyms":[]}]}]}]
    


    
    console.log(test[0].word)
    console.log(test[0].origin)
    console.log(test[0].phonetic)
    console.log(test[0].meanings)
    console.log(test[0].phonetics)
}
