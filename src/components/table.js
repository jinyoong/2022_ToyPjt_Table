function createTable() {
  const root = document.getElementById('root');
  const table = document.createElement('table');
  table.className = 'table';

  const tableHead = document.createElement('thead');
  tableHead.className = 'thead';

  const tableHeadLine = document.createElement('tr');
  ['이름', '소속팀', '등번호', '포지션'].forEach(element => {
    const tableHeadItem = document.createElement('th');
    tableHeadItem.textContent = element;
    tableHeadLine.appendChild(tableHeadItem);
  });

  tableHead.appendChild(tableHeadLine);
  table.appendChild(tableHead);

  const tableBody = document.createElement('tbody');
  tableBody.id = 'tbody';
  tableBody.className = 'tbody';
  table.appendChild(tableBody);

  root.appendChild(table);
};

function drawTable(datas, start, end) {
  console.log("drawTable 실행")
  const tableBody = document.getElementById('tbody');

  let tableBodyItem = '';
  datas.slice(start, end).forEach(data => {
    tableBodyItem += `<tr>
    <td>${data.name}</td>
    <td>${data.team}</td>
    <td>${data.number}</td>
    <td>${data.position}</td>
    </tr>`
  });

  tableBody.innerHTML = tableBodyItem;
};

export {createTable, drawTable};