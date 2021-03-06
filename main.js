
var speed =3 ;       //初始化方块的下降速度
var clock = null;
var flag = false
get_id("bt").onclick = function () {
    if (flag === false) {
        init();
        flag = true;
    }
    else {
    }

};

function init() {
    create_row();
    var main = get_id("main");
    main.onclick = function(element) {
        judge(element);
    };

    clock = window.setInterval("move()", 30);
}

//判断有没有点到黑块
function judge(element){
    if(element.target.className.indexOf("black") == -1) {
        element.target.parentNode.pass = 0;
    }
    else {
        element.target.className = "cell";
        element.target.parentNode.pass = 1;  //这一行的黑块已经被点击了
        add_score();
    }
}

//添加分数
function add_score() {
    var newscore = parseInt(get_id("score").innerHTML) + 1;
    get_id("score").innerHTML = newscore;
    if(newscore % 10 == 0){
        speedup();
    }
}

//获取id
function get_id(value) {
    var id = document.getElementById(value);
    return id;
}

//给方块添加类名
function create_cell() {
    var temp = ["cell","cell","cell","cell"];
    var i = Math.floor(Math.random()*4);   //产生[0,4)之间的随机数
    temp[i] = "cell black";   //不要写成 ["cell black"]
    return temp;
}

//创建div元素并添加类名
function create_div(Name) {
    var div = document.createElement("div");
    div.className = Name;
    return div;
}

// 创造一个<div class="row">并且有四个子节点<div class="cell">
function create_row() {
    var row = create_div("row");
    var container = get_id("container");
    var array = create_cell();


    for(var i = 0; i < 4; i++) {
        row.appendChild(create_div(array[i]));//这里不需要加冒号！！！！1
    }
    if(container.firstChild == null) {
        container.appendChild(row);
    }
    else{
        container.insertBefore(row,container.firstChild);
    }
}

//删除最后一行
function delete_lastrow() {

    var container = get_id("container");
    if(container.childNodes.length == 6) {
        container.removeChild(container.lastChild);
    }
}

//方块移动函数
function move() {
    var container = get_id("container");
    //var top = parseInt(container.style.top);
    var top =  parseInt(window.getComputedStyle(container, null)['top']);    //得到container盒子的top属性
    if(top + speed > 0){
        top = 0;
    }
    else{
        top += speed;
    }
    container.style.top = top + "px";
    if(top == 0){
        create_row();
        container.style.top = "-100px";
        delete_lastrow();
    }

    var rows = container.childNodes;
    if((rows.length == 5) && (rows[rows.length-1].pass !== 1) ){
        gameover();
        for( var i = 0; i < 5; i++){
            container.removeChild(container.lastChild);
        }
        get_id("score").innerHTML = 0;
        speed = 3;
    }
    /*    千万不要写成这样！！！！！
    var rows = container.childNodes.length;
      if((rows == 5) && (rows[rows-1].pass !== 1)){
          gameover();
    }
    */
}

//游戏结束
function gameover() {
    clearInterval(clock);
    flag = false;
    alert("你的最终得分为：" + get_id("score").innerHTML + "!");
}

// 加速函数
function speedup(){
    speed += 1;
    if(speed == 6){
        alert('你超神了');
    }
}
