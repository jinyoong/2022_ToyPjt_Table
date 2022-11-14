function title() {
  const title = document.createElement('h2');
  title.textContent = '2022 토이 프로젝트: 테이블 구현하기';
  return title;
};

async function getData() {
  const response = await fetch('./src/data.json');
  return response.json();
};

function makeTable(datas) {
  const table = document.createElement('table');
  
  const tableHead = document.createElement('thead');
  const tableHeadLine = document.createElement('tr');
  
  Object.keys(datas[0]).forEach(element => {
    const tableHeadItem = document.createElement('th');
    tableHeadItem.textContent = element;
    tableHeadLine.appendChild(tableHeadItem);
  });

  tableHead.appendChild(tableHeadLine);
  table.appendChild(tableHead);

  const tableBody = document.createElement('tbody');
  
  datas.forEach(data => {
    const tableBodyLine = document.createElement('tr');
    
    Object.values(data).forEach(value => {
      const tableBodyItem = document.createElement('td');
      tableBodyItem.textContent = value;
      tableBodyLine.appendChild(tableBodyItem);
    });

    tableBody.appendChild(tableBodyLine);
  });

  table.appendChild(tableBody);

  return table;
};


const tableData = await getData();
const root = document.getElementById('root');
root.appendChild(title());
root.appendChild(makeTable(tableData));
