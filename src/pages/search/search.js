import '../../common/css/com.less';
import './search.less';
import { post } from '../../tools/request';
// 2.0 后移除搜索页面的排序功能
// import Sortable from 'sortablejs';
// let sortable;

let currentSelected = [],
    displayData = [];

function init() {
    initData();
    // initOptions();
    const tempdata = [{ "id": "782", "title": "budgie \u76f8\u601d\u9e66\u9e49", "images": "\/attachment\/images\/2\/2019\/09\/K31RH2Vhfz2P24VQbheQEzRP2ByL3F.jpg", "videourl": "https:\/\/www.mzaysd.com\/attachment\/chaifen\/xiaoxue1\/AVSEQ02.mp4" }];
    listData(tempdata);
}

// option 不从接口获取
/* function initOptions() {
    // todo 初始化选项接口
    post(`https://www.mzaysd.com/api/user.php?act=loadOptions&teacherid=${window.TEACHER_ID}`).then((res) => {
        if (res.key) {
            document.getElementById('btn-info').innerHTML = res.key;
        }
        if (res.info) {
            let options;
            for (let i = 0; i < res.info.length; i++) {
                options += `<option value="${res.info[i].cat_id}">${res.info[i].cat_name}</option>`;
            }
            document.getElementById('category').innerHTML = options;
        }
    }).catch(e => {
        console.log(e);
        alert(e);
    });
} */

function initData() {

    post(`https://www.mzaysd.com/api/user.php?act=load&teacherid=${window.TEACHER_ID}`).then((res) => {
        if (res.key) {
            document.getElementById('btn-info').innerHTML = res.key;
        }
        if (res.info) {
            for (let i = 0; i < res.info.length; i++) {
                currentSelected.push(res.info[i].id);
            }
            document.getElementById('lessons-count').innerHTML = res.info.length;
        }
        // listData(displayData);

    }).catch(e => {
        console.log(e);
        alert(e);
    });
}

function searchBySelect(e) {
    console.log(e);
    // TODO
    const val = document.getElementById('search').value;

    if (e.target.value) {
        post(`https://www.mzaysd.com/api/user.php?act=category&cat_id=${e.target.value}&query=${val}`).then((res) => {
            console.log(res);
            listData(res.info);
            displayData = res.info;
        }).catch(e => {
            console.log(e);
        });
    }
}

function searchLib() {
    const val = document.getElementById('search').value;
    const cat = document.getElementById('category').value;
    if (val) {
        post(`https://www.mzaysd.com/api/user.php?act=search&query=${val}&cat_id=${cat}`).then((res) => {
            console.log(res);
            listData(res.info);
            displayData = res.info;
        }).catch(e => {
            console.log(e);
        });
    }
}

function listData(data) {
    let items = '';
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        items += `<li class="video-item" data-videourl="${data[i].videourl}" data-id="${data[i].id}">
            <img class="thumb" src="${data[i].images}" alt="${data[i].title}" />
            <div class="word">
                <div class="word-name">${data[i].title.split(' ')[0]}</div>
                <div class="desc">${data[i].title.split(' ')[1]}</div>
            </div>
            ${currentSelected.indexOf(data[i].id) < 0 ? '<button class="item-add">添加</button>' : '<button class="item-added">已添加</button>'}
        </li>`;
    }
    document.getElementById('lessons').innerHTML = items;
}

function toggleSelect(el) {
    if (currentSelected.indexOf(el.dataset.id) < 0) {
        addToCart(el);
    } else {
        removeFromCart(el);
    }
}

function addToCart(el) {
    // console.log(el);
    post(`https://www.mzaysd.com/api/user.php?act=add&teacher_id=${window.TEACHER_ID}&lessonid=${el.dataset.id}`).then(res => {
        console.log(res);
        // alert('已添加至课表');
        // return Promise.resolve();
        initData();
    }).catch(e => {
        console.log(e);
        // return Promise.reject(e);

    });
}

function removeFromCart(el) {
    console.log(el);
    // 如果需要从搜索页删除的话，从这里删除
    /*  post('https://www.mzaysd.com/api/user.php?act=del_byid', {
        id: el.dataset.id
    }).then(res => {
        console.log(res);
        alert('已从课表中移除');
        return Promise.resolve();
    }).catch(e => {
        console.log(e);
        return Promise.reject(e);

    }); */
}

function initVideo(el) {
    const videoUrl = el.dataset.videourl;
    const videoEl = `<video src="${videoUrl}" autoplay></video>
        <div class="video-close">关闭视频</div>`;
    let videoContainer = document.createElement('div');
    videoContainer.className = 'video-layer';
    videoContainer.innerHTML += videoEl;
    document.querySelector('body').appendChild(videoContainer);
}

window.onload = () => {
    document.getElementById('search-btn').addEventListener('click', searchLib);
    document.getElementById('category').addEventListener('change', searchBySelect);
    document.getElementById('lessons').addEventListener('click', (e) => {
        console.log(e);
        if (e.target.tagName === 'BUTTON') {
            toggleSelect(e.target.parentElement);
        }
        if (e.target.tagName === 'IMG') {
            initVideo(e.target.parentElement);
        }
    });
    document.getElementById('body').addEventListener('click', (e) => {
        if (e.target.className === 'video-close') {
            document.querySelector('.video-layer').remove();
        }
    });
    init();
};

