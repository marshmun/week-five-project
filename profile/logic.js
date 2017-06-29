var imgSrc = document.querySelector('#img')
var counter = document.querySelector('#counter')


function changeImg() {

    switch (parseInt(counter.textContent)) {
        case 6:
            imgSrc.src = './images/source.gif'
            break;
        case 5:
            imgSrc.src = './images/hang0.gif'
            break;
        case 4:
            imgSrc.src = './images/hang1.gif'
            break;
        case 3:
            imgSrc.src = './images/hang2.gif'
            break;
        case 2:
            imgSrc.src = './images/hang3.gif'
            break;
        case 1:
            imgSrc.src = './images/hang4.gif'
            break;
        case 0:
            imgSrc.src = './images/hang5.gif'
            break;

        default:
            //default
            break;
    }

    //     if (parseInt(counter.textContent) == 6) {
    //         console.log("CAN YOU SEE ME");
    //         imgSrc.src = './images/source.gif'

    //     }
}
changeImg()