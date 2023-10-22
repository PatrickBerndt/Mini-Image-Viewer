let filenames = [];

//Fill mode : false => image contain / true => image cover
let fillMode = true;

function init(){
    fetchFilenames();
}

async function fetchFilenames() {
        await fetch('getFilenames.php')
        .then(response => response.json())
        .then(data => {
            cleanList = data.slice(2);
            cleanList.forEach(filename => {
                filenames.push(filename);
            });
        }) 
    cardContent()
}

function cardContent(){
    let image = document.getElementById('image');
    let thumbnails = document.getElementById('thumbnails');
    let bubble = document.getElementById('bubbles');

    image.src = "img/" + filenames[0];

    filenames.forEach((filename, index) => {
        thumbnails.innerHTML += `
        <img src="img/${filename}"  onclick="showPic(${index})" class="object-fit-cover border rounded" style="width: 4rem; height: 4rem;">
        `;
        bubble.innerHTML += `
        <div id="bubble-${index}" class="bubbles" style="cursor: pointer;" onclick="showPic(${index})"></div>
        `;
    });

    document.getElementById(`bubble-0`).classList.add('isActiv');
    changeMode();
}

function changeMode(){
    let image = document.getElementById('image');
    image.classList.add(fillMode? 'object-fit-cover' : 'object-fit-contain' )
}

function next(direction){
    const cla = document.querySelector('.isActiv');
    const splitted = cla.id.split("-");
    let i = splitted[1];
    let next = i;
    if(direction != -1){
        (next == (filenames.length -1))? next = 0 : next++;
    }else{
        ( next == 0 )? next = (filenames.length -1) : next--;
    }
    showPic(next);
}

function showPic(i){
    let image = document.getElementById('image');
    image.src = "img/" + filenames[i];
    toggleBubble(i);
}

function toggleBubble(i){
    for (let j = 0; j < filenames.length; j++) {
        document.getElementById(`bubble-${j}`).classList.remove('isActiv');
    }

    let bubble = document.getElementById(`bubble-${i}`);
    bubble.classList.add('isActiv')
}
  
