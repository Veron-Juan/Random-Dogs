const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=4'

const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?api_key=130ce85b-0d02-40c9-92bb-8d1296960374'

const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=130ce85b-0d02-40c9-92bb-8d1296960374`

const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';

const API_KEY = '&130ce85b-0d02-40c9-92bb-8d1296960374'

const spanError = document.getElementById('error')


//primer funcion ascyncrona
async function loadRandomMichis() {
    const res = await fetch(`${API_URL_RANDOM}${API_KEY}`);
    const data = await res.json();

    console.log("random")
    console.log(data);
    if (res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status}`
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const img4 = document.getElementById('img4');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
        const btn4 = document.getElementById('btn4');
        
    }  
        
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;

    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
    btn3.onclick = () => saveFavouriteMichi(data[2].id);
    btn4.onclick = () => saveFavouriteMichi(data[3].id);
    
    
}

//segunda funcion asyncorna
async function loadFavouriteMichis() {
    const res = await fetch(`${API_URL_FAVORITES}${API_KEY}`);
    const data = await res.json();
    console.log("favourites")
    console.log(data);


    if (res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status} ${data.message}`}
    else {
        const section = document.getElementById('favoriteMichis')
        section.innerHTML = '';
        // const h2 = document.createElement('h2');
        // const h2Text = document.createTextNode('Michis favoritos');
        // h2.appendChild(h2Text);
        // section.appendChild(h2)

        data.forEach(michi => {                                                  //cada uno de "michis" es un objeto dentro del dom data, x ejemplo "image", que dentro tiene la url, un id etc(el michi hace referencia al objeto)
            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('🗑');

            img.src = michi.image.url
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteMichi(michi.id)
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)

            
        })
    }
}

async function saveFavouriteMichi(id){
    //const res = await fetch(`${API_URL_FAVORITES}${API_KEY}`
    const res = await fetch(`${API_URL_FAVORITES}${API_KEY}`, {
        method: 'POST',
        headers: {
            
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            image_id: id
        }),
            
        
    })


    const data = await res.json();

    console.log('SAVE')
    console.log(res)

    if (res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status} ${data.message}`} 
        else {
            console.log('michi guardado en favoritos')
            loadFavouriteMichis()
        }


}


async function deleteFavouriteMichi(id){
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',    
                 
    })
    const data = await res.json();

    if (res.status !== 200){
        spanError.innerHTML = `Hubo un error ${res.status} ${data.message}`} 
        else {
            console.log('michi eliminado de favoritos')
            loadFavouriteMichis();
        }


}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            // 'Content-type': 'multipart/form-data',
            'x-api-key': '130ce85b-0d02-40c9-92bb-8d1296960374',
        },
        body: formData,
        
    })
    const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavouriteMichi(data.id) //para agregar el michi cargado a favoritos.
    }

}


loadRandomMichis();
loadFavouriteMichis();


const button = document.querySelector('.header-mainButton');
const menu = document.querySelector('.mainButton-nav');

button.addEventListener('click', ()=> {
    menu.classList.toggle('on')
})
