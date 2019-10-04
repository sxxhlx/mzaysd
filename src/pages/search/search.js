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
    initOptions();
}

function initOptions() {
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
}

function initData() {
    post(`https://www.mzaysd.com/api/user.php?act=load&teacherid=${window.TEACHER_ID}`).then((res) => {
        if (res.key) {
            document.getElementById('btn-info').innerHTML = res.key;
        }
        if (res.info) {
            for (let i = 0; i < res.info.length; i++) {
                currentSelected.push(res.info[i].id);
            }
            listData(displayData);
        }
    }).catch(e => {
        console.log(e);
        alert(e);
    });
}

function searchBySelect(e) {
    console.log(e);
    // TODO
    const val = document.getElementById('search').value;

    if (e.target.value || val) {
        post(`https://www.mzaysd.com/api/user.php?act=search&query=${e.target.value}`).then((res) => {
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
        post(`https://www.mzaysd.com/api/user.php?act=search&query=${val}&cat=${cat}`).then((res) => {
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
        items += `<li class="video-item" data-id="${data[i].id}">
            <img class="thumb" src="${data[i].thumb}" alt="${data[i].title}" />
            <div class="word">
                <div class="word-name">${data[i].title.split(' ')[0]}</div>
                <div class="desc">${data[i].title.split(' ')[1]}</div>
            </div>
            ${currentSelected.indexOf(data[i].id) < 0 ? '<button class="item-add">添加</button>' : '<button class="item-add">移除</button>'}
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
    console.log(el);
    post('https://www.mzaysd.com/api/user.php?act=save_byid', {
        id: el.dataset.id
    }).then(res => {
        console.log(res);
        alert('已添加至课表');
        return Promise.resolve();
    }).catch(e => {
        console.log(e);
        return Promise.reject(e);

    });
}

function removeFromCart(el) {
    console.log(el);
    post('https://www.mzaysd.com/api/user.php?act=del_byid', {
        id: el.dataset.id
    }).then(res => {
        console.log(res);
        alert('已从课表中移除');
        return Promise.resolve();
    }).catch(e => {
        console.log(e);
        return Promise.reject(e);

    });
}

window.onload = () => {
    document.getElementById('search-btn').addEventListener('click', searchLib);
    document.getElementById('category').addEventListener('change', searchBySelect);
    document.getElementById('lessons').addEventListener('click', (e) => {
        console.log(e);
        if (e.target.tagName === 'BUTTON') {
            toggleSelect(e.target.parentElement).then(() => {
                initData();
            }).catch(e => {
                alert(e);
            });
        }
    });
    init();
};
