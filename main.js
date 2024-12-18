gsap.registerPlugin(ScrollTrigger );

document.querySelector('.__alertPopup .close').addEventListener("click",()=>{
    document.querySelector('.__alertPopup').remove();
});

let locoScroll;

if(locoScroll){
    locoScroll.destroy();
}

locoScroll=new LocomotiveScroll({
    el : document.querySelector("[data-scroll-container]"),
    smooth:true,
    // reloadOnContextChange : true,
    smartphone : {
        smooth : true,
    },
    tablet :{
        smooth : true
    },
    smoothMobile : 0
});

new ResizeObserver(() => locoScroll.update()).observe(document.querySelector("[data-scroll-container]"));
locoScroll.on('scroll', ScrollTrigger.update)

// 새로고침시 맨위로 오게끔 (locoscroll 버그 방지용)
window.onbeforeunload = function () { window.scrollTo(0,0); };


// header nav 클릭 기능
let navBtn=document.querySelectorAll(".header .menu li");
navBtn.forEach((v)=>{
    v.addEventListener("click",()=>{
        for(let i=0;i<navBtn.length;i++){
            navBtn[i].classList.remove("active");
        }

        v.classList.add("active");
    })
})
// header nav 클릭 기능 


Marquee3k.init();



function slideUp(element, duration = 400){
    element.style.height = "0";
}
function slideDown(element , duration = 400){
    let height = element.querySelector("img").height;
    let padding = height * 0.14;
    element.style.height= `${height+padding}px`;
}
function handleMouseEnter(){
    let imgArea = this.nextElementSibling;
    document.querySelectorAll(".floor_list .img_area").forEach((area)=>{
        slideUp(area);
    })
    document.querySelectorAll(".floor_list .title").forEach(title => title.classList.remove("on"));

    slideDown(imgArea);
    this.classList.add("on");

}
function handleMouseLeave() {
    document.querySelectorAll(".floor_list .img_area").forEach(area => slideUp(area));
    document.querySelectorAll(".floor_list .title").forEach(title => title.classList.remove("on"));
}


let titles=document.querySelectorAll(".floor_list .title");
let li=document.querySelectorAll(".floor_list ul li");
titles.forEach((title)=>{
    title.addEventListener("mouseenter",handleMouseEnter);
})
li.forEach((l=>{
  l.addEventListener("mouseleave",handleMouseLeave);
}))

function popup_open(name){
    let popname=document.querySelector(`${name}`);
    popname.classList.add("active");
}

function popup_close(name){
    let popname=document.querySelector(`${name}`);
    popname.classList.remove("active");
}



// program_list dropdown
document.querySelectorAll(".program_m button").forEach((btn)=>{
    btn.addEventListener("click",handleMouseclick);
});

function handleMouseclick(){
    let procont = this.nextElementSibling;
    document.querySelectorAll(".program_m ul li .programe_cont").forEach((area)=>{
        programUp(area);
    })

    if(this.classList.contains("open")){
        this.classList.remove("open");
        document.querySelectorAll(".program_m ul li .programe_cont").forEach((area)=>{
            programUp(area);
        })
    }
    else{
        let cont=document.querySelectorAll(".program_m button");
        cont.forEach(v=>v.classList.remove("open"));
        programDown(procont);
        this.classList.add("open");
    }
}


function programUp(element, duration = 400){
    element.style.height = "0";
}
function programDown(element , duration = 400){
    let height = element.querySelector(".inner").offsetHeight;
    let padding = 80;
    element.style.height= `${height+padding}px`;
}


// swiper 대체 기능 (slide업데이트)
function updateActiveSlide(idx) {
    const rollingContents = document.querySelector(".rolling_contents");
    const slides = document.querySelectorAll(".company .rolling_contents > div");
    const popupItems = document.querySelectorAll(".popup_store li");
    const total = slides.length;

    // 인덱스값의 보정치
    idx = Math.max(0, Math.min(idx, total - 1));

    // swiper의 인덱스를 설정
    rollingContents.setAttribute("data-idx", idx);

    // 모든 슬라이드를 display none 처리 후 선택된 idx의 슬라이드만 block처리
    slides.forEach(slide => slide.style.display = "none");
    slides[idx].style.display = "block";

    // 모든 popupitem에서 on 클래스를 지우고 선택된 popupitem에만 on 클래스 부여
    popupItems.forEach(item => item.classList.remove("on"));
    popupItems[idx].classList.add("on");
}

// popupitem의 mouseenter 이벤트
document.querySelectorAll(".popup_store li").forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
        updateActiveSlide(index);
    });
});

// next버튼의 click 이벤트
document.querySelector(".logo_move_next").addEventListener("click", () => {
    const rollingContents = document.querySelector(".rolling_contents");
    const nowIdx = Number(rollingContents.getAttribute("data-idx"));
    updateActiveSlide(nowIdx + 1);
});

// prev버튼의 click 이벤트
document.querySelector(".logo_move_prev").addEventListener("click", () => {
    const rollingContents = document.querySelector(".rolling_contents");
    const nowIdx = Number(rollingContents.getAttribute("data-idx"));
    updateActiveSlide(nowIdx - 1);
});


// 마우스

let mouseCursor = document.querySelector(".cursor");

window.addEventListener("scroll", cursor);
window.addEventListener("mousemove", cursor);

function cursor(e) {
    mouseCursor.style.left = e.pageX + "px";
    mouseCursor.style.top = e.pageY - scrollY + "px";
}

const targetElements = document.querySelectorAll(".program_list, .floor_list, .logo_list");

targetElements.forEach(element => {
    element.addEventListener("mouseenter", () => {
        document.body.classList.add("custom_cursor");
    });

    element.addEventListener("mouseleave", () => {
        document.body.classList.remove("custom_cursor");
    });
});
