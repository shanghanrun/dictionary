const wrapper = document.querySelector('.wrapper')
const searchInput = wrapper.querySelector('input')
// input태그가 하나라서 그냥 document.querySelector('input')해도 되는데,
// 만약 input 태그가 여러개라면, 이것처럼 범위를 좁혀서 만든다.
const infoText = wrapper.querySelector('.info-text')
const synonyms = wrapper.querySelector('synonyms .list')

// dictionaryapi.dev 사이트에 가서
function data(result, word){
    if(result.title){// 해당단어를 찾지 못할 때 title, message보냄
        infoText.innerHTML =`Can't find!`;
    } else{
        wrapper.classList.add('active')
        // 각 html 요소에 데이터 넣기
        let definitions = result[0].meanings[0].definitions[0];
        let phonetics =`${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`

        document.querySelector('.word p').innerText =result[0].word;
        document.querySelector('.word span').innerText =phonetics;
        document.querySelector('.meaning span').innerText =definitions.definition;
        document.querySelector('.example span').innerText = definitions.example;

        if(definitions.synonyms[0] == undefined){
            // 동의어가 없는 경우 synonyms div를 감춘다.
            synonyms.parentElement.style.display = 'none';
        } else{
            synonyms.parentElement.style.display = 'block';
            synonyms.innerHTML ='';  //처음에는 아무것도 없는 상태로 만든다.
            for (let i=0; i< 5; i++ ){ // 5개만 취한다.
                let tag = `<span>${definitions.synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML('beforeend', tag)
            }
        }
    }
}

function fetchApi(word){
    infoText.innerHTML =`Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // res.json()하면 문자열을 객체형태로 변환할 수 있다.
    fetch(url).then(res => res.json()).then(result =>{
        console.log(result);
        data(result, word)});
    
}

searchInput.addEventListener('keyup', (e)=> {
    if( e.key =='Enter' && e.target.value){
        fetchApi(e.target.value)
    }
    
})