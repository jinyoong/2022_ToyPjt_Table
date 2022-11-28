function title() {
  const titleArea = document.createElement('div');
  titleArea.id = 'title';

  const title = document.createElement('h2');
  title.textContent = '2022 토이 프로젝트: 테이블 구현하기';

  titleArea.appendChild(title);
  return titleArea;
};

async function getData() {
  const response = await fetch('./src/data.json');
  return response.json();
};

function makeTable(datas, start, end) {
  const tableArea = document.createElement('div');
  tableArea.id = 'table';

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
  
  datas.slice(start, end).forEach(data => {
    const tableBodyLine = document.createElement('tr');
    
    Object.values(data).forEach(value => {
      const tableBodyItem = document.createElement('td');
      tableBodyItem.textContent = value;
      tableBodyLine.appendChild(tableBodyItem);
    });

    tableBody.appendChild(tableBodyLine);
  });

  table.appendChild(tableBody);

  tableArea.appendChild(table);
  return tableArea;
};

function removeTable() {
  const table = document.getElementById('table');

  if (table) {
    table.remove();
  };
}

function dropDown(datas) {
  const dropDownArea = document.createElement('div');

  const dropDown = document.createElement('select');
  const options = [
    {value: 4, label: '4개씩'},
    {value: 8, label: '8개씩'},
  ];

  options.forEach(element => {
    const option = document.createElement('option');
    option.value = element.value;
    option.textContent = element.label;
    dropDown.appendChild(option);
  })

  dropDown.addEventListener('change', event => {
    removeTable();
    removePagiNation();
    root.appendChild(makeTable(datas, 0, event.target.value));
    root.appendChild(pagiNation(datas, event.target.value));
  });

  dropDownArea.appendChild(dropDown);
  return dropDownArea;
};


function pagiNation(datas, per) {
  const pageCount = Math.ceil(datas.length / per);
  const pagiNation = document.createElement('div');
  pagiNation.id = 'pagination';

  const page = document.createElement('div');
  
  const moveLeft = document.createElement('button');
  moveLeft.textContent = '<<';
  moveLeft.addEventListener('click', () => {
    removeTable();
    root.appendChild(makeTable(datas, 0, per));
  });
  page.appendChild(moveLeft);

  for (let i = 1; i <= pageCount; i++) {
    const pageElement = document.createElement('button');
    pageElement.textContent = i;
    pageElement.addEventListener('click', () => {
      removeTable();
      root.appendChild(makeTable(datas, per * (i - 1), per * i));
    });
    page.appendChild(pageElement);
  };

  const moveRight = document.createElement('button');
  moveRight.textContent = '>>';
  moveRight.addEventListener('click', () => {
    removeTable();
    root.appendChild(makeTable(datas, per * (pageCount - 1), datas.length));
  });
  page.appendChild(moveRight);

  pagiNation.appendChild(page);
  return pagiNation;
}

function removePagiNation() {
  const pagiNation = document.getElementById('pagination');

  if (pagiNation) {
    pagiNation.remove();
  };
}

const tableData = await getData();
const root = document.getElementById('root');
root.appendChild(title());
root.appendChild(dropDown(tableData));
root.appendChild(makeTable(tableData, 0, 4));
root.appendChild(pagiNation(tableData, 4));
