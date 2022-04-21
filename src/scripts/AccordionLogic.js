export function accordionClickLogic() {
    const accordionList = document.getElementsByClassName('accordion')

    for(let accordion = 0; accordion < accordionList.length; accordion++) {
        accordionList[accordion].addEventListener('click', event => {
        if(event.target.classList[0] === 'accordionLabel') {
            accordionList[accordion].classList.toggle('active')
        }      
    })  
    }
}
