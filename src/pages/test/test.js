import '../../common/css/com.less';
import './test.less';
import { post } from '../../tools/request';
import Sortable from 'sortablejs';
import $ from 'jquery';
let sortable;
require('eruda').init();
import '../../tools/fastclick';
function init() {
    // TODO : to correct api url
    // post(`https://www.mzaysd.com/api/user.php?act=cart&teacherid=${window.TEACHER_ID}`).then((res) => {
    //     listData(res.info);
    //     document.getElementById('btn-info').innerHTML = res.key;
    // }).catch(e => {

    //     console.log(e);
    // });
    const tempData = [
        { id: '1', title: '随机文字1' },
        { id: '2', title: '随机文字2' },
        { id: '3', title: '随机文字3' },
        { id: '4', title: '随机文字4' },
        { id: '5', title: '随机文字5' },
        { id: '6', title: '随机文字6' },
        { id: '7', title: '随机文字7' },
        { id: '8', title: '随机文字8' },
        { id: '9', title: '随机文字9' },
        { id: '10', title: '随机文字10' },
        { id: '11', title: '随机文字11' }
    ];
    listData(tempData);
}

function saveItem() {
    console.log(sortable.toArray());

    const lessons = {
        teacherid: window.TEACHER_ID,
        ids: sortable.toArray().join(',')
    };
    const formdata = new FormData();
    for (let key in lessons) {
        formdata.append(key, lessons[key]);
    }
    post('https://www.mzaysd.com/api/user.php?act=save_lesson', {
        body: formdata
    }).then(res => {
        console.log(res);
        document.getElementById('btn-info').innerHTML = res.key;
    }).catch(e => {
        console.log(e);
    });
}
function clearItems() {
    if (confirm('您确定要清空列表吗')) {
        if (sortable) {
            sortable.destroy();
        }
        document.getElementById('lessons').innerHTML = '';
    }

}

function delItem(index) {
    // console.log('element is ======>', el);
    let lessons = document.getElementById('lessons');
    // console.log('lessons are ======>', lessons);
    // lessons.removeChild(document.getElementById(`item-${id}`));
    // let btns = document.getElementById('btns');
    // btns.removeChild(document.getElementById(`btn-${id}`));
    $(`.item:nth-child(${index + 1})`).remove();
    $(`.item-delete:nth-child(${index + 1})`).remove();


    console.log('===el removed success===');
    if (sortable) {
        sortable.destroy();
        console.log('===destroy success===');
    }
    sortable = Sortable.create(lessons);
}

function listData(data) {
    let items = '';
    let btns = '';
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        items += `<li class="item" data-id="${data[i].id}">
            <div class="lesson-name">${data[i].title}</div>
        </li>`;
        btns += '<button class="item-delete">删除</button>';
    }
    if (sortable && sortable.el) {
        sortable.destroy();
    }
    document.getElementById('lessons').innerHTML += items;
    document.getElementById('btns').innerHTML += btns;
    const el = document.getElementById('lessons');
    sortable = Sortable.create(el);
    $('.item-delete').click(function (e) {
        // console.log(e.target.dataset);
        // console.log();
        delItem($(this).index());
    });

}

window.onload = () => {
    document.getElementById('save-btn').addEventListener('click', saveItem);
    document.getElementById('clear-btn').addEventListener('click', clearItems);

    window.FastClick.attach(document.body);
    // document.getElementById('lessons').addEventListener('click', (e) => {
    //     console.log('event is =======> ', e);
    //     if (e.target.tagName === 'BUTTON' || e.target.tagName === 'button') {
    //         console.log('event triggerd===');
    //         delItem(e.target.parentElement);
    //     }
    // });
    init();
};
