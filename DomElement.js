export class DomElement 
{
    // O objConfig possui os argumentos: objConfig{type,{id,class}}
    constructor(type, objConfig) {
        this.type = type;
        this.objConfig = objConfig;
    }

    eraseDivContent() {
        let element = document.getElementById(objConfig['id']);
        while(element.hasChildNodes) {
            element.removeChild(element.firstChild);
        };
    }

    createElementAndAppend(appendTo) {
       let element = document.createElement(this.type);
       element.id = this.objConfig['id'];
       element.className = this.objConfig['class'];
       document.getElementById(appendTo).appendChild(element);       
    }

    insertText(text) {
        let textNode = document.createTextNode(text);
        document.getElementById(this.objConfig['id']).appendChild(textNode);  
    }

    insertAudioButton(link) {    
        const button = document.getElementById(this.objConfig['id']);
        button.onclick = function() {
            DomElement.playAudio(link);
        }      
    }

    static playAudio(url) {       
        let audio = new Audio(url);    
        audio.pause();
        audio.play(); 
    }
   
}