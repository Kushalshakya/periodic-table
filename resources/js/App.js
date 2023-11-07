const elementsBox = document.querySelectorAll(".table_border");

function getResult(){
    fetch("data.json").then(res => res.json()).then((data) => {
        console.log(data);
        for(let i=0; i<data.elements.length; i++){
            elementsBox[i].innerHTML = data.elements[i].symbol;
            elementsBox[i].style.backgroundColor = "#" + data.elements[i]['cpk-hex'];
        }
    })
    .catch(err => {
        console.error(err);
    })
}

getResult();

const inputEl = document.getElementById("input-search");
const searchBtnEl = document.getElementById("search-btn");

function getSearchedElement(){
    fetch("data.json").then(result => result.json()).then((res) => {
        let tempWord = inputEl.value.trim();
        let capitalLetter = tempWord.charAt(0).toUpperCase();
        let searchedElementName = capitalLetter + inputEl.value.trim().slice(1);

        // const imageUrl = `http://en.wikipedia.org/w/api.php?action=query&titles=${searchedElementName}&prop=pageimages&format=json&pithumbsize=100`;
        // fetch(imageUrl).then(fetchImg => fetchImg.json()).then((img) => {
        //     console.log(img);
        // }).catch(imgerr => {
        //     console.error(imgerr);
        // })

        const searchContentEl = document.querySelector(".search-content");
        const noResultEl = document.querySelector(".no_result");
        const searchContentWrap = document.querySelector(".search-content-wrap");

        function changeDOM(){
            // DOM Declaration
            const titleEl = document.getElementById("title");
            const symbolEl = document.querySelector(".symbol");
            const detailEl = document.querySelector(".detail");
            const atomicMassEl = document.querySelector(".atomic_mass");
            const categoryEl = document.querySelector(".category");
            const boilingPointEl = document.querySelector(".boiling_point");
            const meltingPointEl = document.querySelector(".melting_point");
            const densityEl = document.querySelector(".density");
            const apperanceEl = document.querySelector(".appearance");
            const electronConfigurationEl = document.querySelector(".electron_configuration");
            const spectralImgEl = document.querySelector(".spectral_img");
            const discoveredByEl = document.querySelector(".discovered_by");
            
            detailEl.innerHTML = ""

            titleEl.innerHTML = `${actualData.name} (${actualData.symbol})`;
            symbolEl.innerHTML = `Element no: ${actualData.number}`;
            detailEl.innerHTML = actualData.summary;
            atomicMassEl.innerHTML = actualData.atomic_mass;
            categoryEl.innerHTML = actualData.category;
            boilingPointEl.innerHTML = actualData.boil;
            meltingPointEl.innerHTML = actualData.melt;
            densityEl.innerHTML = actualData.density;
            apperanceEl.innerHTML = actualData.appearance;
            spectralImgEl.src = actualData.spectral_img;
            discoveredByEl.innerHTML = `It was discovered by: ${actualData.discovered_by}`;
            electronConfigurationEl.innerHTML = actualData.electron_configuration;

            const speech = new SpeechSynthesisUtterance();
            speech.text = detailEl.innerText;
            window.speechSynthesis.speak(speech);
        }

        let actualData = [];
        let found = false;

        for(let i=0; i<res.elements.length; i++){
            if(res.elements[i].name == searchedElementName){
                actualData = res.elements[i];
                found = true;
                break;
            }
        }
        if(found){
            changeDOM();
            searchContentEl.style.display = "block";
            searchContentWrap.style.display = "block";
            noResultEl.style.display = "none";
            inputEl.value = "";
        }
        else{
            noResultEl.innerHTML = `The Element ${searchedElementName} doesn't exist or unavailable in our database.`
            noResultEl.style.padding = "10px";
            searchContentEl.style.display = "block";
            noResultEl.style.display = "block";
            inputEl.value = "";
            searchContentWrap.style.display = "none";
        }
    }).catch(err => {
        console.error(err);
    })
}

searchBtnEl.addEventListener("click",() => {
    getSearchedElement();
})