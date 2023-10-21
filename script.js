let filenames = [];

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
        .catch(error => {console.error(error);});
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
        <div id="bubble${index}" class="bubbles" style="cursor: pointer;" onclick="showPic(${index})"></div>
        `;
    });

    document.getElementById(`bubble0`).classList.add('isActiv');
}

function showPic(i){
    let image = document.getElementById('image');
    image.src = "img/" + filenames[i];
    toggleBubble(i);
}

function toggleBubble(i){
    for (let j = 0; j < filenames.length; j++) {
        document.getElementById(`bubble${j}`).classList.remove('isActiv');
    }

    let bubble = document.getElementById(`bubble${i}`);
    bubble.classList.add('isActiv')
}
  
