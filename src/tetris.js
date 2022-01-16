const canvas = document.getElementById("tetris");
const panel  = document.getElementById("next");
const ctx = canvas.getContext('2d');
const ntx = panel .getContext('2d');

const scale = 40;
const k= {pause:true,hız:1000}

ctx.scale(scale, scale);
ntx.scale(scale, scale);


const tamEn  = canvas.width / scale;
const tamBoy = canvas.height/ scale;
const nextEn = panel.width  / scale;

const renkler = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF'
];

let tahta = [];
let next =  [];
const rasgele= [];
const taşÇek = () => {rasgele.shift(); rasgele.push(~~(Math.random() * 7))}

const kaygan = {
    kon: {x: 0, y: 1},
    tetra: null,
    renk: null,
    kim: {h: null, r: 0}  //OIZSLJT
}

const hayalet = {
    kon: {x: 0, y: 0},
    tetra: null,
    renk: '#444466'
}


function tetraÇiz(tetra, x, y) {
    for (let i = 0; i < tetra.length; i++) {
        for (let j = 0; j < tetra[i].length; j++) {
            if (tetra[i][j])
            ctx.fillRect(x + j, y + i, 1, 1);
        }
    }
}

function çarpışma(kaygan, tahta) {
    for (let i = 0; i < kaygan.tetra.length; i++) {
        for (let j = 0; j < kaygan.tetra[i].length; j++) {
            if (kaygan.tetra[i][j] && tahta[kaygan.kon.y + i + 1][kaygan.kon.x + j + 1])
            return 1;
        }
    }
    return 0;
}

function tahtayaEkle(tetra, x, y) {
    for (let i = 0; i < tetra.length; i++) {
        for (let j = 0; j < tetra[i].length; j++) {
            tahta[y+i+1][x+j+1] = tahta[y+i+1][x+j+1] || tetra[i][j];
        }
    }
}

function tamamlananlarıYolla() {
    for (let i = 1; i < tahta.length-2; i++) {
        let clear = 1;
        
        for (let j = 1; j < tahta[i].length-1; j++) {
            if (!tahta[i][j])
            clear = 0;
        }
        
        if (clear) {
            let r = new Array(tamEn).fill(0);
            r.push(1);
            r.unshift(1);
            
            tahta.splice(i, 1);
            tahta.splice(1, 0, r);
        }
    }
}

function tahtayıÇiz() {
    for (let i = 1; i < tahta.length-2; i++) {
        for (let j = 1; j < tahta[i].length-1; j++) {
            if (tahta[i][j]) {
                ctx.fillStyle = renkler[tahta[i][j]];
                ctx.fillRect(j-1, i-1, 1, 1);
            }
        }
    }
}

function nextÇiz () {
    for (let i = 1; i < next.length-2; i++) {
        for (let j = 1; j < next[i].length-1; j++) {
            if (next[i][j]) {
                ntx.fillStyle = renkler[next[i][j]];
                ntx.fillRect(j-1, i-1, 1, 1);
            }
        }
    }
}

function kurulum() {
    
    for (let i = 0; i < 6; i++) 
    rasgele.push(~~(Math.random() * 7))
    
    taşÇek()
    kaygan.kim.h = "OIZSLJT"[rasgele[0]]
    hayalet.tetra = kaygan.tetra = şekül[kaygan.kim.h][0];
    kaygan.renk = renkler[rasgele[0]+1];
    
    tahtaKur()
    nextKur()
    gölge()
    
    function tahtaKur () {
        tahta = [];
        
        const r = new Array(tamEn + 2).fill(1);
        tahta.push(r);
        
        for (let i = 0; i < tamBoy; i++) {
            let satır = new Array(tamEn).fill(0);
            satır.push(1);
            satır.unshift(1);
            
            tahta.push(satır);
        }   
        tahta.push(r);
        tahta.push(r);
    }
}

function nextKur () {
    next= []
    
    const r = new Array(nextEn + 2).fill(1);
    next.push(r);
    
    for (let i = 1; i < 6; i++) {
        let satır = new Array(nextEn).fill(0);
        satır.push(1);
        satır.unshift(1);
        next.push(satır);
        şekül["OIZSLJT"[rasgele[i]]][0].map(ll=> next.push([1,0,...ll,0,0]))
        next.push(satır);
    }
    
    next.push(r);
    next.push(r);
}


function gameOver() {
    for (let j = 1; j < tahta[1].length-1; j++)
    if (tahta[1][j])
    return kurulum();
    
    return;
}

let aralık = k.hız;
let passen = 0;
let sayaç = 0;


function güncelle(time = 0) {
    
    const dt = time - passen;
    passen = time;
    sayaç += dt;
    
    if (sayaç >= aralık && !k.pause) {
        kaygan.kon.y++;
        sayaç = 0;
    }
    
    if (çarpışma(kaygan, tahta)) {
        tahtayaEkle(kaygan.tetra, kaygan.kon.x, kaygan.kon.y-1);
        tamamlananlarıYolla();
        gameOver();
        
        kaygan.kon.y = 1;
        kaygan.kon.x = 0;
        
        taşÇek()
        kaygan.kim = {h:"OIZSLJT"[rasgele[0]] , r:0}
        hayalet.tetra = kaygan.tetra = şekül[kaygan.kim.h][0];
        kaygan.renk = renkler[rasgele[0]+1];
        nextKur()
        gölge()
        
        aralık = k.hız;
    }
    
    ışınla() && gölge()
    
    if (aralık==1) { // düştükten sonra çevirme
        const sonraki= kopi(kaygan)
        sonraki.kon.y++ 
        if (çarpışma(sonraki, tahta))
        aralık= k.hız/3
    }
    
    // ctx.fillStyle = "#000";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    dekorAt() // gökkuşağı paterni
    
    ntx.fillStyle = "#041351";
    ntx.fillRect(0, 0, canvas.width, canvas.height);
    
    tahtayıÇiz();
    nextÇiz()
    ctx.fillStyle = hayalet.renk;
    tetraÇiz(hayalet.tetra, hayalet.kon.x, hayalet.kon.y);
    
    ctx.fillStyle = kaygan.renk;
    tetraÇiz(kaygan.tetra, kaygan.kon.x, kaygan.kon.y);
    
    requestAnimationFrame(güncelle);
}

function dekorAt () {
    for (let i = 0; i < 10; i++) {
        ctx.fillStyle = "#00"+(i+5);
        ctx.fillRect(i, 0, canvas.width/10, canvas.height);
        // ctx.fillRect(10-i, 0, canvas.width/10, canvas.height);
    }
}

document.addEventListener("keydown", event => {
    // console.log(event.key)
    if (event.key=='ArrowLeft' && aralık-1) {
        kaygan.kon.x--;
        if (çarpışma(kaygan, tahta))
        kaygan.kon.x++;
        gölge()
    } else if (event.key=='ArrowRight' && aralık-1) {
        kaygan.kon.x++;
        if (çarpışma(kaygan, tahta))
        kaygan.kon.x--;
        gölge()
    } else if (event.key=='ArrowDown') { 
        aralık = 1;
    } else if (event.key=='ArrowUp') {
        döndür(kaygan.tetra, 1);
        if (çarpışma(kaygan, tahta))
        döndür(kaygan.tetra, -1);
        gölge()
    } else if (event.key==' ') {
        k.pause = !k.pause
        if (!k.pause) aralık=1
    } else if (event.key=='p') {
        k.pause = !k.pause
    } else if (event.key=='+') {
        k.hız *= 1/2
        aralık= k.hız
    } else if (event.key=='-') {
        k.hız *= 2
        aralık= k.hız
    }
});
const klavye =  {}
document.addEventListener("keydown", event => {
    klavye[event.key]= true
    // console.log(Object.keys(klavye).filter(a=>klavye[a]).join(""))
})
document.addEventListener("keyup", event => {
    klavye[event.key]= false
})



kurulum();
güncelle();