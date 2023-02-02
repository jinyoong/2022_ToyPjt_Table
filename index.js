let tableData = [];
let [start, end, per] = [0, 4, 4];

async function init() {
  // test()
  tableData = await getData();
  const root = document.getElementById('root');
  root.appendChild(title());
  root.appendChild(dropDown());
  root.appendChild(sortDropdown());
  root.appendChild(createTable());
  drawTable();
  root.appendChild(pagiNation());
}

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
};

// 테이블 항목을 조건에 맞게 채워넣는 함수
function drawTable(datas) {
  const tableBody = document.getElementById('baseballTableBody');
  
  let tableBodyItems = '';
  const currentData = datas ?? tableData;

  currentData.slice(start, end).forEach(data => {
    tableBodyItems += `<tr>
    <td>${data.name}</td>
    <td>${data.team}</td>
    <td>${data.number}</td>
    <td>${data.position}</td>
    </tr>`
  })

  tableBody.innerHTML = tableBodyItems;
}

function dropDown() {
  const dropDownArea = document.createElement('div');
  dropDownArea.id = 'dropdown';

  const dropDownTitle = document.createElement('div');
  dropDownTitle.id = 'dropDownTitle';
  dropDownTitle.textContent = '한 번에 볼 개수를 선택하세요.';

  dropDownArea.appendChild(dropDownTitle);

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
    start = 0;
    end = event.target.value;
    per = event.target.value;
    removePagiNation();
    root.appendChild(pagiNation());
    drawTable();
  });

  dropDownArea.appendChild(dropDown);
  return dropDownArea;
};


function pagiNation() {
  const pageCount = Math.ceil(tableData.length / per);
  const pagiNation = document.createElement('div');
  pagiNation.id = 'pagination';

  const page = document.createElement('div');
  page.id = 'page';
  
  const moveLeft = document.createElement('button');
  moveLeft.textContent = '<<';
  moveLeft.addEventListener('click', () => changePage(1));
  page.appendChild(moveLeft);

  for (let i = 1; i <= pageCount; i++) {
    const pageElement = document.createElement('button');
    pageElement.textContent = i;
    pageElement.addEventListener('click', () => changePage(i));
    page.appendChild(pageElement);
  };

  const moveRight = document.createElement('button');
  moveRight.textContent = '>>';
  moveRight.addEventListener('click', () => changePage(pageCount));
  page.appendChild(moveRight);
  pagiNation.appendChild(page);
  return pagiNation;
}

function changePage(index) {
  start = per * (index - 1);
  end = per * index;
  drawTable();
}

function removePagiNation() {
  const pagiNation = document.getElementById('pagination');

  if (pagiNation) {
    pagiNation.remove();
  };
}

function sortDropdown() {
  const sortDropdownArea = document.createElement('div');
  sortDropdownArea.id = 'sortDropdown';

  const sortDropdownTitle = document.createElement('div');
  sortDropdownTitle.textContent = '원하는 항목을 기준으로 정렬할 수 있습니다';

  const sortDropdown = document.createElement('select');
  const options = [
    {value: 'name', label: '이름'},
    {value: 'team', label: '소속팀'},
    {value: 'number', label: '등번호'},
    {value: 'position', label: '포지션'}, 
  ];

  options.forEach(element => {
    const option = document.createElement('option');
    option.value = element.value;
    option.label = element.label;
    sortDropdown.appendChild(option);
  });

  sortDropdownArea.appendChild(sortDropdownTitle);
  sortDropdownArea.appendChild(sortDropdown);

  sortDropdown.addEventListener('change', event => {
    const sortedData = [...tableData];
    sortedData.sort((a, b) => {
      if (a[event.target.value] > b[event.target.value]) return 1;
      if (a[event.target.value] < b[event.target.value]) return -1;
      return 0;
    });

    start = 0;
    end = per;
    drawTable(sortedData);
  });
  
  return sortDropdownArea;
};

// function test() {
//   const testTag = document.getElementById('testcode')
//   const innerTextResult = document.getElementById('test');
//   testTag.innerHTML = innerTextResult.innerText

//   const testDiv = document.getElementById('testdiv');
//   testDiv.innerText = `
//   <span>안녕<span>
//   <span>하세요<span>
//   `

//   const testDiv2 = document.getElementById('testdiv2');
//   testDiv2.innerHTML = innerTextResult.textContent;
// }


init();