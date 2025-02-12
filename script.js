let input=document.querySelector(".search-box input")
let btn=document.querySelector(".btn button")
let images=document.querySelector(".images")
let load=document.querySelector("#load")




const accessKey="qjo2LAroCOEbwf4nOrwUO3bTV1Ug9iN1J-Y3rMKBGx8"
let page=1;
let keyword=""
function download(imgurl){
    fetch(imgurl).then(res=>res.blob()).then(file=>{
        let a=document.createElement("a")
        a.href=URL.createObjectURL(file)
        a.download=new Date().getTime()
        a.click()

    }).catch(()=>alert("failed download"))
}



async function getResponse() {
   
    keyword=input.value
    let url=`https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`
    let response=await fetch(url);
    let data=await response.json()
    let results=data.results;
    if(page==1){
        images.innerHTML=""
    }
     load.style.display="block"

    results.map((result)=>{
      let li=document.createElement("li")
      li.classList.add("image")
      let html=`<img src="${result.preview_photos[0].urls.small}" alt="img" class="photo">
        <div class="details">
            <div class="user">
                <img src="camera.svg" alt="img">
                <span>${result.title}</span>
            </div>
            <div class="download" onclick=download('${result.preview_photos[0].urls.small}')>
                <img src="download.svg" alt="img">
            </div>
        </div>`
        li.innerHTML=html
        images.appendChild(li)

    })

}
input.addEventListener("keyup",(e)=>{
    page=1
    if(e.key=="Enter"){
        getResponse()
    }
   
})
btn.addEventListener("click",()=>{
    page=1
    getResponse()
})
load.addEventListener("click",()=>{
    page++;
    getResponse()
})

