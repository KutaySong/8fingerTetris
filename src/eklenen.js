

const kopi = (anam) => JSON.parse(JSON.stringify(anam))

function gölge () {
    hayalet.tetra=  kaygan.tetra
    hayalet.kon=    kopi(kaygan.kon)
    
    while (!çarpışma(hayalet,tahta))
    hayalet.kon.y++
    hayalet.kon.y--
}

const p= {sol:0, sağ:0, rotR:false, rotL:false}
const c= {sol:0, sağ:0}


function ışınla () {
    
    cÇıkar()
    if (p.sol!=c.sol || p.sağ!=c.sağ)       {pset(); return}  //tek anim frame atlıyorum bilerenk
    // console.log(c)
    
    if (!c.sol&&!c.sağ&&!(p.rotL||p.rotR))  {return}
    if (c.sol>4 && c.sağ>4)                 {return}
    if (c.sol&&c.sol<5 && c.sağ&&c.sağ<5)   {pReset(); return}
    if (c.sağ==-1||(p.rotR && !c.sağ))      {düşür(); pReset(); return true}
    if (c.sol==-1||(p.rotL && !c.sol))      {düşür(); pReset(); return true}
    
    if (c.sol>0 && c.sol<5)                 {dönder(c.sol)}
    else if (c.sağ>0 && c.sağ<5)            {dönder(c.sağ)}
    if (c.sol>4 && !p.rotL)                 {konumla(c.sol-4)}
    else if (c.sağ>4 && !p.rotR)            {konumla(c.sağ-10)}
    pset(); return true
    
    function konumla (sütun) {  // 1,2,..,-2,-1
        const önceki= kaygan.kon.x
        if (sütun<0) {          // sağda
            const merk= merkezR[kaygan.kim.h][kaygan.kim.r]
            const en= kaygan.tetra[0].length
            kaygan.kon.x= tamEn-en+merk+sütun+1
        } else {                //solda
            const merk= merkezL[kaygan.kim.h][kaygan.kim.r]
            kaygan.kon.x= sütun-merk-1
        }
        
        if (çarpışma(kaygan,tahta)) {
            if (önceki<=kaygan.kon.x) {
                kaygan.kon.x--
                while (çarpışma(kaygan,tahta))
                kaygan.kon.x--
            } else if (önceki>=kaygan.kon.x){
                kaygan.kon.x++
                while (çarpışma(kaygan,tahta))
                kaygan.kon.x++
            }
        } 
    }
    
    function dönder (rot) {
        const önceki=   kaygan.kim.r
        const boy1=     kaygan.tetra.length
        
        if (kaygan.kim.h=="O") return
        else if (kaygan.kim.h=="I") kaygan.kim.r= (rot==1 || rot==2) ? 1 : 0
        else if (kaygan.kim.h=="Z") kaygan.kim.r= (rot==1 || rot==2) ? 1 : 0
        else if (kaygan.kim.h=="S") kaygan.kim.r= (rot==1 || rot==2) ? 1 : 0
        else if (kaygan.kim.h=="L") kaygan.kim.r=  rot==1 ? 1 : rot==2 ? 3 : rot==3 ? 2 : 0
        else if (kaygan.kim.h=="J") kaygan.kim.r=  rot==1 ? 1 : rot==2 ? 3 : rot==3 ? 2 : 0
        else if (kaygan.kim.h=="T") kaygan.kim.r=  rot==1 ? 1 : rot==2 ? 3 : rot==3 ? 2 : 0
        
        kaygan.tetra=    şekül[kaygan.kim.h][kaygan.kim.r]
        const boy2=     kaygan.tetra.length

        kaygan.kon.y += boy1-boy2

        if (kaygan.kim.r != önceki && kaygan.kim.h=="I") {
            kaygan.kon.y += önceki ? -2 : 2
        }
    }
    function pset() {
        p.sol=c.sol; p.sağ=c.sağ; 
        p.rotL= p.rotL || (p.sol>0 && p.sol<5)
        p.rotR= p.rotR || (p.sağ>0 && p.sağ<5)
        if (p.rotL && p.rotR) {p.rotL=false; p.rotR=false}
    }
    function pReset() {p.sol=0; p.sağ=0; p.rotL= false; p.rotR= false }
    function düşür () {aralık=1; if(k.pause)k.pause=false}
    function cÇıkar () {
        if ((       klavye['q'] &&  klavye['r']) || klavye['t'])    c.sol= 9
        else if (   klavye['w'] &&  klavye['e'] &&  klavye['r'])    c.sol= 3
        else if (   klavye['w'] &&  klavye['r'])                    c.sol= 4
        else if (   klavye['r'] &&  klavye['e'])                    c.sol= 2
        else if (   klavye['w'] &&  klavye['e'])                    c.sol= 1
        else if (   klavye['q'] &&  klavye['w'])                    c.sol= -1
        else if (   klavye['q'] &&  klavye['e'])                    c.sol= -1
        else if (   klavye['r'])                                    c.sol= 8
        else if (   klavye['e'])                                    c.sol= 7
        else if (   klavye['w'])                                    c.sol= 6
        else if (   klavye['q'])                                    c.sol= 5
        else                                                        c.sol= 0
        
        if ((       klavye['j'] &&  klavye['ş']) || klavye['h'])    c.sağ= 5
        else if (   klavye['j'] &&  klavye['k'] &&  klavye['l'])    c.sağ= 3
        else if (   klavye['j'] &&  klavye['l'])                    c.sağ= 4
        else if (   klavye['j'] &&  klavye['k'])                    c.sağ= 1
        else if (   klavye['k'] &&  klavye['l'])                    c.sağ= 2
        else if (   klavye['l'] &&  klavye['ş'])                    c.sağ= -1
        else if (   klavye['k'] &&  klavye['ş'])                    c.sağ= -1
        else if (   klavye['j'])                                    c.sağ= 6
        else if (   klavye['k'])                                    c.sağ= 7
        else if (   klavye['l'])                                    c.sağ= 8
        else if (   klavye['ş'])                                    c.sağ= 9
        else                                                        c.sağ= 0
    }
}


function döndür () { // ok tuşları ile
    kaygan.kim.r= ++kaygan.kim.r%şekül[kaygan.kim.h].length
    kaygan.tetra=    şekül[kaygan.kim.h][kaygan.kim.r]
    kaygan.kon.x += kaymaX[kaygan.kim.h][kaygan.kim.r]
    kaygan.kon.y += kaymaY[kaygan.kim.h][kaygan.kim.r]
}

const kaymaX = {"O":[0],"I":[-2,+2],"Z":[0,0],"S":[0,0],"L":[0,+1,-1,0],"J":[0,+1,-1,0],"T":[0,+1,-1,0]}
const kaymaY = {"O":[0],"I":[+1,-1],"Z":[0,0],"S":[0,0],"L":[0,0,+1,-1],"J":[0,0,+1,-1],"T":[0,0,+1,-1]}

const merkezL = {"O":[0],"I":[0,0],"Z":[1,0],"S":[1,1],"L":[0,0,0,1],"J":[0,0,2,0],"T":[0,0,1,1]}
const merkezR = {"O":[0],"I":[0,0],"Z":[0,1],"S":[1,0],"L":[0,0,2,0],"J":[2,1,0,0],"T":[0,1,1,0]}


const şekül = {
    "O":
    [
        [
            [1, 1],
            [1, 1]
        ]
    ],
    "I":
    [
        [
            [2, 2, 2, 2]
        ],
        [
            [2],
            [2],
            [2],
            [2]
        ]
    ],
    "Z":
    [
        [
            [3, 3, 0],
            [0, 3, 3]
        ],
        [
            [0,3],
            [3,3],
            [3,0]
        ]
    ],
    "S":
    [
        [
            [0, 4, 4],
            [4, 4, 0]
        ],
        [
            [4,0],
            [4,4],
            [0,4]
        ]
    ],
    "L":
    [        
        [
            [0, 0, 5],
            [5, 5, 5]
        ],
        [
            [5, 0],
            [5, 0],
            [5, 5]
        ],
        [
            [5, 5, 5],
            [5, 0, 0]
        ],
        [
            [5, 5],
            [0, 5],
            [0, 5]
        ]
    ],
    "J":
    [
        [
            [6, 0, 0],
            [6, 6, 6]
        ],
        [
            [6, 6],
            [6, 0],
            [6, 0]
        ],
        [
            [6, 6, 6],
            [0, 0, 6]
        ],
        [
            [0, 6],
            [0, 6],
            [6, 6]
        ]
    ],
    "T":
    [
        [
            [0, 7, 0],
            [7, 7, 7]
        ],
        [
            [7, 0],
            [7, 7],
            [7, 0]
        ],
        [
            [7, 7, 7],
            [0, 7, 0]
        ],
        [
            [0, 7],
            [7, 7],
            [0, 7]
        ]
    ]
}