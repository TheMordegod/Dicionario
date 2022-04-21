export class DomElement 
{
    // O objConfig possui os argumentos: objConfig{type,{id, class, appendTo}}
    constructor(type, objConfig) {
        this.type = type;
        this.objConfig = objConfig;
        this.createElementAndAppend()
    }

    createElementAndAppend() {
       let element = document.createElement(this.type);
       element.id = this.objConfig['id'];
       element.className = this.objConfig['class'];
       document.getElementById(this.objConfig['appendTo']).appendChild(element);       
    }

    insertTextSelf(text) {
        let textNode = document.createTextNode(text);
        document.getElementById(this.objConfig['id']).appendChild(textNode);  
    }

    insertTextToAnother(text, appendTo){
        let textNode = document.createTextNode(text);
        document.getElementById(appendTo).appendChild(textNode); 
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