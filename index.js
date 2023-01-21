// 제목 부여 함수
function title() {
  const titleArea = document.createElement('div');
  titleArea.id = 'title';

  const title = document.createElement('h2');
  title.textContent = '2022 토이 프로젝트: 테이블 구현하기';

  titleArea.appendChild(title);
  return titleArea;
};

// json 데이터를 불러오는 함수
async function getData() {
  const response = await fetch('./src/data.json');
  return response.json();
};

// 데이터를 이용해 테이블을 만드는 함수
function makeTable(datas, start, end) {
  const tableArea = document.createElement('div');
  tableArea.id = 'table';

  const table = document.createElement('table');
  
  // 테이블 헤드 생성 코드
  const tableHead = document.createElement('thead');
  const tableHeadLine = document.createElement('tr');
  
  ["이름", "소속팀", "등번호", "포지션"].forEach(element => {
    const tableHeadItem = document.createElement('th');
    tableHeadItem.textContent = element;
    tableHeadLine.appendChild(tableHeadItem);
  });

  tableHead.appendChild(tableHeadLine);
  table.appendChild(tableHead);

  // 테이블 항목 생성 코드
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

// 테이블 틀을 생성하는 함수
function createTable() {
  const baseballTable = document.createElement('table');
  baseballTable.id = 'baseballTable';

  const tableHead = document.createElement('thead');
  tableHead.id = 'baseballTableHead';
  const tableHeadLine = document.createElement('tr');

  ["이름", "소속팀", "등번호", "포지션"].forEach(element => {
    const tableHeadItem = document.createElement('th');
    tableHeadItem.textContent = element;
    tableHeadLine.appendChild(tableHeadItem);
  })

  tableHead.appendChild(tableHeadLine);
  baseballTable.appendChild(tableHead);

  const tableBody = document.createElement('tbody');
  tableBody.id = 'baseballTableBody';
  const tableBodyLine = document.createElement('tr');
  
  ["불러", "오는", "중", "입니다"].forEach(element => {
    const tableBodyItem = document.createElement('td');
    tableBodyItem.textContent = element;
    tableBodyLine.appendChild(tableBodyItem);
  });

  tableBody.appendChild(tableBodyLine);
  baseballTable.appendChild(tableBody);

  return baseballTable;
} 

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
  page.id = 'page';
  
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

async function init() {
  const tableData = await getData();
  const root = document.getElementById('root');
  root.appendChild(title());
  root.appendChild(dropDown(tableData));
  root.appendChild(makeTable(tableData, 0, 4));
  root.appendChild(createTable(tableData));
  root.appendChild(pagiNation(tableData, 4));
}

init();