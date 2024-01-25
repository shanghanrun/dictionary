const wrapper = document.querySelector('.wrapper')
const searchInput = wrapper.querySelector('input')
// input태그가 하나라서 그냥 document.querySelector('input')해도 되는데,
// 만약 input 태그가 여러개라면, 이것처럼 범위를 좁혀서 만든다.
infoText = wrapper.querySelector('.info-text')

// dictionaryapi.dev 사이트에 가서

function fetchApi(word){
    infoText.innerHTML =`Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result =>console.log(result))
}

searchInput.addEventListener('keyup', (e)=> {
    if( e.key =='Enter' && e.target.value){
        fetchApi(e.target.value)
    }
    
})