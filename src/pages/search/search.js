import '../../common/css/com.less';
import './search.less';
import { post } from '../../tools/request';

function searchLib() {
    const val = document.getElementById('search').value;
    if (val) {
        post('https://www.baidu.com').then((res) => {
            // console.log(res);
            listData(res);
        }).catch(e => {
            const tempData = [
                { id: '1', value: '随机文字1' },
                { id: '2', value: '随机文字2' },
                { id: '3', value: '随机文字3' },
                { id: '4', value: '随机文字4' },
                { id: '5', value: '随机文字5' },
                { id: '6', value: '随机文字6' },
                { id: '7', value: '随机文字7' },
                { id: '8', value: '随机文字8' },
                { id: '9', value: '随机文字9' },
                { id: '10', value: '随机文字10' },
                { id: '11', value: '随机文字11' }
            ];
            listData(tempData);

            console.log(e);
        });
    }
}

function listData(data) {
    let items = '';
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        items += `<li class="item">
            <div class="lesson-name">${data[i].value}</div>
            <button class="item-add" data-lessonid="${data[i].id}">保存</button>
        </li>`;
    }

    document.getElementById('lessons').innerHTML = items;
}

function saveItem(id) {
    console.log(id);
    post('https://sit2.hnzycfc.com/test', {
        id
    }).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    });
}

window.onload = () => {
    document.getElementById('search-btn').addEventListener('click', searchLib);
    document.getElementById('lessons').addEventListener('click', (e) => {
        console.log(e);
        if (e.target.tagName === 'BUTTON') {
            saveItem(e.target.dataset.lessonid);
        }
    });
};
