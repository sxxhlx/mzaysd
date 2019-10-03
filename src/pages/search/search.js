import '../../common/css/com.less';
import './search.less';
import { post } from '../../tools/request';
// 2.0 后移除搜索页面的排序功能
// import Sortable from 'sortablejs';
// let sortable;

function init() {
    post(`https://www.mzaysd.com/api/user.php?act=load&teacherid=${window.TEACHER_ID}`).then((res) => {
        if (res.key) {
            document.getElementById('btn-info').innerHTML = res.key;
        }
        /*  const data = [
             { id: '1', title: 'test 随机文字1', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '2', title: 'tesst 随机文字2', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '3', title: 'tesst 随机文字3', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '4', title: 'tesst 随机文字4', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '5', title: 'tesst 随机文字5', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '6', title: 'tesst 随机文字6', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '7', title: 'tesst 随机文字7', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '8', title: 'tesst 随机文字8', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '9', title: 'tesst 随机文字9', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '10', title: 'tesst 随机文字10', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' },
             { id: '11', title: 'tesst 随机文字11', thumb: 'https://www.hnsjb.cn/uploadfile/2019/1001/thumb_200_200_1569924662486.png' }
         ];
         listData(data); */
    }).catch(e => {
        console.log(e);
        alert(e);
    });
}

function searchLib() {
    const val = document.getElementById('search').value;
    if (val) {
        post(`https://www.mzaysd.com/api/user.php?act=search&query=${val}`).then((res) => {
            console.log(res);
            listData(res.info);
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
            <button class="item-add">添加</button>
        </li>`;
    }
    // if (sortable && sortable.el) {
    //     sortable.destroy();
    // }
    // document.getElementById('lessons').innerHTML += items; // 之前是追加，现在可能修改成替换比较符合需求
    document.getElementById('lessons').innerHTML = items;
    // const el = document.getElementById('lessons');
    // sortable = Sortable.create(el);
}

function addToCart(el) {
    console.log(el);
    post('https://www.mzaysd.com/api/user.php?act=save_byid', {
        id: el.dataset.id
    }).then(res => {
        console.log(res);
        alert('已添加至课表');
    }).catch(e => {
        console.log(e);
    });
}

window.onload = () => {
    document.getElementById('search-btn').addEventListener('click', searchLib);

    document.getElementById('lessons').addEventListener('click', (e) => {
        console.log(e);
        if (e.target.tagName === 'BUTTON') {
            addToCart(e.target.parentElement);
        }
    });
    init();
};
