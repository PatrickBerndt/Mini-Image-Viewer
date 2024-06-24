let filenames = [];

//Fill mode : false => image contain / true => image cover
let fillMode = true;

function init(){
    startViewer();
}

// Create structure for viewer -------------------------------

function startViewer(){
    document.getElementById('miniViewer').innerHTML = generateViewer();
    fetchFilenames();
}

// Get Filenames from folder ---------------------------------

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

// Fill structure with content ------------------------------

function cardContent(){
    let image = document.getElementById('image');
    let thumbnails = document.getElementById('thumbnails');
    let bubble = document.getElementById('bubbles');

    image.src = "img/" + filenames[0];

    filenames.forEach((filename, index) => {
        thumbnails.innerHTML += generateThumbnail(filename, index);
        bubble.innerHTML += generateBubble(index);
    });

    document.getElementById(`bubble-0`).classList.add('isActiv');
    changeMode();
}

function changeMode(){
    let image = document.getElementById('image');
    image.classList.add(fillMode? 'object-fit-cover' : 'object-fit-contain' )
}

// Controles in the viewer ---------------------------------------------

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


// Renders view and bubbles ----------------------------------------

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

// HTML-Template section ---------------------------------------------------

function generateViewer(){
    return /*html*/`
    <div class="card" style="width: 25rem;">
        <div class="position-relative">
            <img id="image" src="" class="card-img-top border rounded" style="height: 20rem;">
            <div class="arrow-bubble arrow position-absolute top-50 start-0 translate-middle-y d-flex justify-content-center align-items-center" style="cursor: pointer;" onclick="next(-1)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="var(--arrow)" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"/></svg></div>
            <div class="arrow-bubble arrow position-absolute top-50 end-0 translate-middle-y  d-flex justify-content-center align-items-center" style="cursor: pointer;" onclick="next(1)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="var(--arrow)" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z"/></svg></div>
            <div id="bubbles" class="bubbles-box d-flex gap-1 position-absolute bottom-1 start-50 translate-middle"></div>
        </div>
        <div id="thumbnails" class="overflow-auto d-flex flex-row"></div>
    </div>
    `;
}

function generateThumbnail(filename, index){
    return /*html*/`
    <img src="img/${filename}" onclick="showPic(${index})" class="object-fit-cover border rounded" style="width: 4rem; height: 4rem;">
    `;
}

function generateBubble(index){
    return /*html*/`
    <div id="bubble-${index}" class="bubbles" style="cursor: pointer;" onclick="showPic(${index})"></div>
    `;
}
  
