import Sortable from 'sortablejs';
import '../../common/css/com.less';

window.onload = () => {
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
  ]
  init(tempData);
}

function init(data) {
  let items = '';
  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    items += `<li class="item">
            <div class="lesson-name">${data[i].value}</div>
        </li>`
    console.log(items);
  }

  document.getElementById('lessons').innerHTML = items;
  const el = document.getElementById('lessons');
  let sortable = Sortable.create(el, {
    onEnd: function (e, v) {
      console.log(e);
      console.log(v);
    }
  });
  console.log(sortable);
}
