function createGrid(numRowCol) {
    container.style['grid-template-columns'] = `repeat(${numRowCol},1fr)`
    for(let i=0; i<numRowCol**2; i++) {
        const squareColumn = document.createElement('div');
        squareColumn.classList.add('squareBox');
        squareColumn.addEventListener('mouseover', changeColor);
        container.appendChild(squareColumn);
    }
}

function clearGrid() {
    const squares = document.querySelectorAll('#container > div');
    squares.forEach( (square) => {
        container.removeChild(square);
        delete square;
    })
}

function changeColor(e) {
    let sketchType;
    const sketchTypeRadio = document.querySelectorAll("input[name='sketchType']");
    
    sketchTypeRadio.forEach( (element) => {
        if(element.checked) {
            sketchType = element.value;
        }  
    })

    if(sketchType === 'black') {
        e.target.style['background-color'] = '#000';
    } else if(sketchType === 'randomColors') {
        let min = 0;
        let max = 255;
        let R = Math.floor(Math.random() * (max - min) + min)
        let G = Math.floor(Math.random() * (max - min) + min)
        let B = Math.floor(Math.random() * (max - min) + min)
        e.target.style['background-color'] = `rgb(${R},${G},${B})`; 
    } else if(sketchType === 'greyScale') {
        let currentShade = e.target.style['background-color'];
        let color;
        let greyScaleChange = Math.floor(255 * 0.1);

        if(currentShade === "") {
            color = 255 - greyScaleChange;
        } else {
            console.log(parseInt(currentShade.split('(')[1].split(',')[0]));
            color = parseInt(currentShade.split('(')[1].split(',')[0]) - (greyScaleChange);
        }
        e.target.style['background-color'] = `rgb(${color},${color}, ${color})`;

    } else if(sketchType === 'pickColor') {
        const color = document.querySelector("input[id='pick']").value;
        e.target.style['background-color'] = color;

    } else {
        e.target.style['background-color'] = '#fff';
    }

}

function clearSketch() {
    const squares = document.querySelectorAll('#container > div')
    squares.forEach((square) => {
        square.style['background-color'] = '';
    });

}

function changeDimension() {
    clearGrid();
    createGrid(rangeSlide.value);
}


function toggleBorder(e) {
    const squares = document.querySelectorAll('#container > div')
    if(e.target.checked){
        squares.forEach( (square) => {
            square.style['border'] = '1px solid black';
        })
    } else {
        squares.forEach( (square) => {
            square.style['border'] = '0px';
        })
    }
}


const container = document.querySelector('#container');
const clearBtn = document.querySelector('#clear');
const rangeSlide = document.querySelector('#rangeSlide');
const sketchTypeRadio = document.querySelectorAll("input[name='sketchType']");
const boxes = document.querySelectorAll('#container > div');
const gridBorderCB = document.querySelector("input[name='gridBorder']");


createGrid(16);

clearBtn.addEventListener('click', clearSketch);
rangeSlide.addEventListener('change', changeDimension);
gridBorderCB.addEventListener('change', toggleBorder);



