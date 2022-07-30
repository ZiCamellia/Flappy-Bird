var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d'); //đối tượng getcontext chứa nhiều hàm dành cho vẽ vời 
var scoreshow = document.getElementById('score');

var birdimg = new Image();
var hinhnenchinh = new Image();
var ongtren = new Image();
var ongduoi = new Image();
birdimg.src = "images/bird.png";
hinhnenchinh.src = "images/nenchinh.png";
ongtren.src = "images/ongtren.png";
ongduoi.src = "images/ongduoi.png";

var score = 0;
var khoangcachhaiong = 140;
var khoangcachdenongduoi;//khoach cach tu dau ong tren den vi tri dau ong duoi


//object chim voi toa do la 1 nua canvas (key: value với key là duy nhất giống hashmap)
// tọa độ của chim
var bird = {
    x: hinhnenchinh.width/5,
    y: hinhnenchinh.height/2
}
var ong = [] //mang ong chua cac ong di chuyen
ong[0] = {
    x:canvas.width, 
    y: 0
    //khoi tao ong dau tien nam ben phai ngoai cung va y=0
}

function run(){
    //load hinh anh vao
    context.drawImage(hinhnenchinh,0,0);
    context.drawImage(birdimg,bird.x,bird.y);
    for (var i = 0; i < ong.length; i++){
        khoangcachdenongduoi = ongtren.height + khoangcachhaiong;
        context.drawImage(ongtren, ong[i].x, ong[i].y);
        //ve ong tren theo toa do cua ong do
        //ong duoi phu thuoc vao ong tren
        context.drawImage(ongduoi, ong[i].x, ong[i].y + khoangcachdenongduoi);
        //lay vi tri ong tren cong khoang cach den ong
        //duoi vi ti nua random no len xuong
        ong[i].x -= 5;//de ong di chuyen
        
        // lap trinh them ong khi ong di chuyen den giua
        // no se tao them mot ong nua
        if (ong[i].x == canvas.width/2){
            ong.push({
                x:canvas.width, 
                y:Math.floor(Math.random()*ongtren.height)-ongtren.height
                //giai thich sau nhe bro
            })
        }
        if(ong[i].x == 0) ong.splice(0,1);
        //neu ong dung le trai thi xoa di de tranh mang
        //ong bi day lam cham
        if(ong[i].x == bird.x) score++;
        if(bird.y+birdimg.height==canvas.height||
            bird.x+birdimg.width>= ong[i].x && bird.x <= ong[i].x +ongtren.width
            && (bird.y<=ong[i].y+ongtren.height||
            bird.y +birdimg.height>= ong[i].y+ khoangcachdenongduoi)    
            ){
                return;
            }   
            // dieu kien dau tien la dung dat
            // chu y tinh toa do y cong voi do cao cua con chim voi cai ong
            // cuoi cung la so sanh vi tri           
    }
    scoreshow.innerHTML = "score: " + score;
    bird.y+=3;
    requestAnimationFrame(run);
}
//function bay len khi nhan
document.addEventListener("keydown", function(){
    bird.y-=60;
});
//toa do tren may tinh la o goc tren trai di xuong duoi la chieu duong
run();
