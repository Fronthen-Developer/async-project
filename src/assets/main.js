const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCABjS0QZ9fPZfPjeaJD4EFA&part=snippet%2Cid&order=date&maxResults=4';


const  content = null || document.getElementById('content');

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
    const data = await response.json();
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
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
        </div>
        `).slice(0,4).join('')}
        `;  

            //haremos insercion de la vista que se creo 
            content.innerHTML = view;
    } catch (error) { 
        console.log(error);
    }
})();

/**try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}**/