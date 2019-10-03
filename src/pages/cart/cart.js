import '../../common/css/com.less';
import './cart.less';
import { post } from '../../tools/request';
import Sortable from 'sortablejs';
let sortable;

function init() {
    // TODO : to correct api url
    post('https://www.mzaysd.com/api/user.php?act=cart&teacherid=35').then((res) => {
        listData(res.info);
        document.getElementById('btn-info').innerHTML = res.key;
    }).catch(e => {
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
        console.log(e);
    });
}
