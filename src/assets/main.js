const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCABjS0QZ9fPZfPjeaJD4EFA&part=snippet%2Cid&order=date&maxResults=20';


const  content = null || document.getElementById('content');// contiene el id del content en el index.html
                                                            //sera donde queremos mostrar la informacion 

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '229a89b872msh72ca0c1543018a1p137f1djsnbc279e54df11',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

// crearemos funcion async y await para llamarla
async function fetchData(urlApi, requestOptions){
    const response = await fetch(urlApi, requestOptions)
    const data = await response.json();// nos entrega un objeto el cual podemos iterar
    return data;
}

// funcion anonima que se ejecuta automaticamente
(async () => {
    // hacemos el llamado a api y mostrar los elementos
    try {
        const videos = await fetchData(API, options);

        //tenemos que crear un template para iterar por cada uno de los elementos
        //ingresamos a la respuesta que va entregar la funcion videos
        // ingresamos a items y lo recorremos con el metodo map 
        let view =  `        
        ${videos.items.map(video => `
        
        <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">${video.snippet.channelTitle}</h2>
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
        </div>
        `).slice(0,12).join('')} 
        `;  //para mostrar solo 4 elementos de la totalidad 

            //haremos insercion de la vista que se creo 
            content.innerHTML = view;
    } catch (error) { 
        console.log(error);
    }
})();
