const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'
const ur = fetch(url).then(res => res.json()).then(cartas => {
    return Array.from(cartas.data);
})

var x = ur.then(r => função(r))

function função(json){
    
    const body = document.querySelector("body")                               // Tags
    const main = document.querySelector("main")
    const tr1 = document.querySelector(".body tr:first-child")
    const tr4 = document.querySelector(".extra-cards tr")
    const tr3 = document.querySelector("#allcards tr")
    const tr2 = document.querySelector("#allcards")
    const header = document.querySelector("header")
    const button = document.querySelector("button")  
    const name = document.querySelector("#name")
    const stars = document.querySelector("#stars")
    const img = document.querySelector("#card img")
    const attribute = document.querySelector("#attribute")
    const description = document.querySelector("#description")
    let power = document.querySelector("#power")
    let type = document.querySelector("#type")      
    const side = document.querySelector(".side")
    const save = document.querySelector(".grid .header")
    const deck = document.querySelector("footer")
    const some = document.querySelector("footer .dnSlide-main:first-child")
    const somes = document.querySelector("footer .dnSlide-main:nth-child(2)")
    const testando = document.querySelector("#particles-js")
    let nome = ""
    var last = 0
    var cont = 0
    var tokens = 0
    // .............................................................................................Pagina Inicial and Add allcards...........
    button.addEventListener("click", event =>{
        event.preventDefault()
        header.setAttribute("class","default")
        main.setAttribute("class","none")
        testando.setAttribute("class","default")
        imagem_card(0,51)
    })
    var lol = 0
    var somando = 0
    var dc1 = 0,dc2 = 0,dc3 = 0,dc4 = 0
    //...............................................................Click Filtro Event........
    monsters.addEventListener("click",event =>{
        event.preventDefault()
        if(dc1 == 0){
            filtrar(event,"Monster")
            dc1 = 1,dc2 = 0,dc3 = 0,dc4 = 0
        }
        else{
            filtrar(event,"comeback")
            dc1 = 0
            somando = 0
        }

    })
    spells.addEventListener("click",event => {
        event.preventDefault()
        if(dc2 == 0){
            filtrar(event,"Spell")
            dc2 = 1,dc1 = 0,dc3 = 0,dc4 = 0
        }
        else{
            filtrar(event,"comeback")
            dc2 = 0
            somando = 0
        }
    })
    traps.addEventListener("click",event =>{
        event.preventDefault()
        if(dc3 == 0){
            filtrar(event,"Trap")
            dc3 = 1,dc1 = 0,dc2 = 0,dc4 = 0
        }
        else{
            filtrar(event,"comeback")
            dc3 = 0
            somando = 0
        }
    })
    sort.addEventListener("click",event =>{
        event.preventDefault()
        if(dc4 == 0){
            filtrar(event,"Extra")
            dc4 = 1,dc1 = 0,dc2 = 0,dc3 = 0
        }
        else{
            filtrar(event,"comeback")
            dc4 = 0
            somando = 0
        }
    })
    //...........................................................................Scroll ............................
    $("#allcards").scroll(debounce(event =>{
        if(somando == 0){
            var st = tr2.scrollTop
            if(st>last){
                for( let o = buttons.length-tokens; o<buttons.length+10-tokens; o++){
                    if(json[o]["type"] == "Token"){
                        lol = lol+1
                    }
                }
                colocar(10+lol)
                buttons = Array.from(document.querySelectorAll("header #allcards tr button"))
                imagem_card(buttons.length-10-lol,buttons.length)
                tokens = lol+tokens
                lol = 0
            }
            last = (st<=0)? 0:st
        }
    },100))
    // ................................................................................Add Buttons...................

    creat(20,tr1)
    creat(10,tr4)

    function creat(qnt,element){
        for(let i = 0; i<qnt; i++){
            element.insertAdjacentHTML("afterbegin",`<td><button>'-'</button></td>`)
        }
    }
    
    colocar(51)
    
    function colocar (qnt){
        for(let i = 0; i<qnt; i++ ){
            tr3.insertAdjacentHTML("beforeend",`<td><button></button></td>`)
        }
    }
    
    function imagem_card(first,second){
        for(let i = first ; i<second; i++){
            for (k in json[i]){
                if (k == "id"){
                    if(json[i]["type"] == "Token"){
                        tr3.children[i].setAttribute("style","Display: none;")
                    }
                    buttons[i].innerHTML = `<img style = 'width: 38.8px; height:57px;' src="https://ygoprodeck.com/pics/${json[i]["id"]}.jpg"></img>`
                    buttons[i].setAttribute("style","padding:0px;")
                    var splt = json[i]["type"].split(" ")
                    for(let dado = 0; dado<splt.length; dado++){
                        if ( splt[dado] == "Normal"){
                            buttons[i].setAttribute("type","Normal")
                            buttons[i].setAttribute("name","Monster")
                            break
                        }
                        else if (splt[dado] == "Synchro"){
                            buttons[i].setAttribute("type","Synchro")
                            buttons[i].setAttribute("name","Extra")
                            break
                        }
                        else if (splt[dado] == "XYZ"){
                            buttons[i].setAttribute("type","XYZ")
                            buttons[i].setAttribute("name","Extra")
                            break
                        }
                        else if (splt[dado] == "Fusion"){
                            buttons[i].setAttribute("type","Fusion")
                            buttons[i].setAttribute("name","Extra")
                            break
                        }
                        else if (splt[dado] == "Link"){
                            buttons[i].setAttribute("type","Link")
                            buttons[i].setAttribute("name","Extra")
                            break
                        }
                        else if (splt[dado] == "Trap"){
                            buttons[i].setAttribute("type","Trap")
                            buttons[i].setAttribute("name","Trap")
                            break
                        }
                        else if (splt[dado] == "Spell"){
                            buttons[i].setAttribute("type","Spell")
                            buttons[i].setAttribute("name","Spell")
                            break
                        }
                        else if (splt[dado] == "Ritual"){
                            buttons[i].setAttribute("type","Ritual")
                            buttons[i].setAttribute("name","Monster")
                            break
                        }
                        else{
                            buttons[i].setAttribute("type","Effect")
                            buttons[i].setAttribute("name","Monster")
                        }
                    }
                    buttons[i].setAttribute("oncontextmenu",`myFunction(event,${i})`)
                    buttons[i].setAttribute("onclick",`show(event,${i})`)
                }
            }   
        }
    }
    // ........................................................................................................Pegar Buttons..................
    var buttons = Array.from(document.querySelectorAll("header #allcards tr button"))
    const trt = document.querySelector("header .body tr")
    const trt2 = document.querySelector("header .extra-cards tr")
    let take = 0
    const listas = []
    let lista = []
    let get_this = 0
    // .......................................................................................................................................

    var my = function myFunctions(event,card) {       //Left Click
        event.preventDefault()
        if (buttons[card].getAttribute("name") == "Extra"){
            if(get_this<10){
                if(limit(trt2,json[card]["name"],10)==true){
                    number_of_cards(event,card)
                    show(event,card)
                    trt2.children[get_this].innerHTML = `${buttons[card].innerHTML}`
                    trt2.children[get_this].setAttribute("onclick",`show(event,${card})`)
                    trt2.children[get_this].setAttribute("type",`${card}`)
                    trt2.children[get_this].setAttribute("oncontextmenu",`rm(event,this)`)
                    get_this++
                }
            }
        }
        else{
            if(cont<20){
                if(limit(trt,json[card]["name"],20)==true){
                    number_of_cards(event,card)
                    show(event,card)
                    trt.children[cont].innerHTML = `${buttons[card].innerHTML}`
                    trt.children[cont].setAttribute("onclick",`show(event,${card})`)
                    trt.children[cont].setAttribute("type",`${card}`)
                    trt.children[cont].setAttribute("oncontextmenu",`rm(event,this)`)
                    cont++
                }
            }
        }
    }

    var rm = function rm(event,place) {            //Remove
        event.preventDefault()
        place.remove()
        takeoff(event,parseInt(place.getAttribute("type")))
        if (buttons[place.getAttribute("type")].getAttribute("name") == "Extra"){
            trt2.insertAdjacentHTML("beforeend",`<td><button>'-'</button></td>`)
            get_this--
        }
        else{
            trt.insertAdjacentHTML("beforeend",`<td><button>'-'</button></td>`)
            cont --
        }
    }

    var sh = function shows(event,i){              //Show
        event.preventDefault()
        for( k in json[i]){
            if (k == "id"){
                img.setAttribute("src",`https://ygoprodeck.com/pics/${json[i]["id"]}.jpg`)
            }
            else if(k == "name"){
                name.innerHTML = json[i][k]
            }
            else if(k == "desc"){
                description.innerHTML = json[i][k]
            }
            else if(k == "level"){
                stars.innerHTML = json[i][k]
                if (json[i][k]==0){
                    stars.innerHTML = `<img style="width:20px; height:25px;" src="imgs/back.jpg">`
                }
            }
            else if(k == "atk"){
                if (json[i][k] != null){
                    power.innerHTML = `ATK/${json[i][k]}  `
                }
                else{
                    power.innerHTML = ""
                }
            }
            else if(k == "def"){
                if (json[i][k] != null){
                    power.innerHTML = power.innerHTML+"DEF/"+json[i][k]
                }
                else{
                    power.innerHTML = ""
                }
            }
            else if(k == "race"){
                type.innerHTML = json[i][k]
                if (json[i]["attribute"] != 0){
                    type.innerHTML = `[${type.innerHTML}/${json[i]["type"].replace("Monster","")}]`
                }
            }
            else if(k == "attribute"){
                if(json[i][k] == 0){
                    attribute.innerHTML = "Background Card"
                }
                else{
                    attribute.innerHTML = json[i][k]
                }
            }
        }
    }
    const ncards = Array.from(document.querySelectorAll(".bodyup div"))             //Number of Type of Cards in The Deck 
    const ncar = Array.from(document.querySelectorAll(".extra div"))
    for(let asd = 0; asd<4; asd++){
        ncards.push(ncar[asd])
    }
    function takeoff(event,card){
        event.preventDefault()
        if (buttons[card].getAttribute("type") == "Ritual"){
            off = 4
        }
        if (buttons[card].getAttribute("type") == "Effect"){
            off = 0
        }
        if (buttons[card].getAttribute("type") == 'Normal'){
            off = 1
        }
        if (buttons[card].getAttribute("type")=="Spell"){
            off = 2
        }
        if (buttons[card].getAttribute("type") == "Trap"){
            off = 3
        }
        if (buttons[card].getAttribute("type") == "Link"){
            off = 8
        }
        if (buttons[card].getAttribute("type") == "Synchro"){
            off = 6
        }
        if (buttons[card].getAttribute("type") == "XYZ"){
            off = 7
        }
        if (buttons[card].getAttribute("type") == 'Fusion'){
            off = 5
        }
        ncards[off].innerHTML = ncards[off].innerHTML-1
        for( k in lista){
            if(lista[k] == off){
                lista.splice(k,1)
                break
            }    
        }
    }
    function number_of_cards(event,i){                    
        event.preventDefault() 
        if (buttons[i].getAttribute("type") == "Ritual"){
            take = 4
        }
        if (buttons[i].getAttribute("type") == "Effect"){
            take = 0
        }
        if (buttons[i].getAttribute("type") == 'Normal'){
            take = 1
        }
        if (buttons[i].getAttribute("type")=="Spell"){
            take = 2
        }
        if (buttons[i].getAttribute("type") == "Trap"){
            take = 3
        }
        if (buttons[i].getAttribute("type") == "Link"){
            take = 8
        }
        if (buttons[i].getAttribute("type") == "Synchro"){
            take = 6
        }
        if (buttons[i].getAttribute("type") == "XYZ"){
            take = 7
        }
        if (buttons[i].getAttribute("type") == 'Fusion'){
            take = 5
        }
        lista.push(take)
        take = 0
        for( let p = 0; p<9; p++){
            if (p<5){
                ncards[p].innerHTML = lista.filter(thing => thing === p).length
            }
            else{
                ncards[p].innerHTML = lista.filter(thing => thing === p).length
            }
        }
    }

    side.addEventListener("click", event => {      //Empty Deck
        event.preventDefault()
        removendo(20,trt,cont)
        removendo(10,trt2,get_this)
        cont = 0
        get_this = 0
        empty_cards(event)
    })
    function empty_cards(event){
        event.preventDefault()
        for( let p = 0; p<9; p++){
            ncards[p].innerHTML = 0
        }
        lista = []
    }
    function removendo(number,tag){
        for(let i = number; i>0; i--){
            nome +="<td><button>'-'</button></td>"
        }
        tag.innerHTML = nome
        nome = ""
    }
    //..................................................................Regex...........................................................

    const regex = /^Deck+\s\d/i
    const nome_deck_ = document.querySelector("h2")
    const deck_n = document.querySelector("[name=deck_number]")
    document.addEventListener("keyup", event =>{
        if (event.key == "Enter"){
            if (regex.test(deck_n.value) == true){
                deck_n.setAttribute("class","none")
                alert("Sucesso!")
                nome_deck_.innerHTML = deck_n.value
            }
            else{
                alert("No começo deve haver o nome (Deck) e em seguida a numeração desejada.\nPor exemplo: Deck 1, deck 2, dEcK 3 e assim por diante.")
            }
        }
    })

    //...............................................................................................................................................

    function filtrar(event,filtro){               // Filtros Speel,Trap,Monstros  
        event.preventDefault()
        somando = 1
        if (filtro == "comeback"){
            buttons.map(y=> y.parentElement.setAttribute("class","default"))
        }
        else{
            buttons.filter(x=> x.getAttribute("name") ==filtro).map(y=>y.parentElement.getAttribute("class")=="none"? y.parentElement.setAttribute("class","default") : "")
            buttons.filter(x=> x.getAttribute("name")!=filtro).map(y=> y.parentElement.setAttribute("class","none"))
        }
    } 
    // ........................................................................................................Saving......................

    save.addEventListener("click",event => {
        event.preventDefault()
        if (tr1.lastElementChild.getAttribute("type")!=null){
            header.setAttribute("class","none")
            deck.setAttribute("class","default")
            saveDeck(event)
        }
        else{
            alert("Main deck must have 20 cards.")
        }
    })
    function saveDeck(){                                                //Save Bar
        changed = Array.from(tr1.getElementsByTagName("img"))
        changed2 = Array.from(tr4.getElementsByTagName("img"))
        for(let kas = 0; kas<changed.length; kas++){
            changed[kas].setAttribute("style","width: 100%;")
            some.insertAdjacentHTML("beforeend",`<ul class="dnSlide-list">${changed[kas].parentElement.innerHTML}</ul>`)
        }
        for(let kas = 0; kas<10; kas++){
            if(kas<changed2.length){
                changed2[kas].setAttribute("style","width: 100%;")
                somes.insertAdjacentHTML("beforeend",`<ul class="dnSlide-list">${changed2[kas].parentElement.innerHTML}</ul>`)
            }
            else{
                somes.insertAdjacentHTML("beforeend",`<ul class="dnSlide-list"><img style="width: 100%" src="imgs/back.jpg"></ul>`)
            }
        }
        jQuery(document).ready(function($) {
    
            $(".dnSlide-main").each(function(index, el) {
                var setting = {
                    "response" : true
                };
                switch (index) {
                    default:
                        setting.precentWidth  = "25%" ;  
                        $(el).dnSlide(setting); 
                        break;
                }
            });
        });
    }    
    // ...............................................................................................................................
    document.addEventListener("keyup", event=>{                           //Comeback
        if (event.key == "Escape"){
            header.setAttribute("class","default")
            deck.setAttribute("class","none")
            some.innerHTML = null
            somes.innerHTML = null
        }
    })
    // ............................................................Limit per Card......................

    function limit(tag,nome,number){
        var y = 0
        for(let check = 0; check<number; check++){
            if(tag.children[check].getAttribute("type") != null){
                if(json[tag.children[check].getAttribute("type")]["name"] == nome){
                    y = y+1
                }
            }
        }
        if (y ==3){
            return false
        }
        else{
            return true
        }
    }
    //..............................................................Put Out..........................................................................
    
    listas.push(my)
    listas.push(rm)
    listas.push(sh)

    return listas
    // .........................................................Functions..........................................................................
}

async function myFunction(event,card){
    var result = await x
    result = result[0]
    result(event,card)
}

async function rm(event,card){
    var result = await x
    result = result[1]
    result(event,card)
}

async function show(event,card){
    var result = await x
    result = result[2]
    result(event,card)
}

//..................................................Click Animation....................................................................
function clickEffect(e){
    var d=document.createElement("div");
    d.className="clickEffect";
    d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
    document.body.appendChild(d);
    d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
}
document.addEventListener('click',clickEffect);
//..................................................................Scroll Time...........................................................
debounce = function(func, wait, immediate){
    var timeout
    return function(){
        var context = this, args = arguments
        var later = function() {
            timeout = null
            if(!immediate) func.apply(context, args);
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later,wait)
        if (callNow) func.apply(context,args)
    }
}