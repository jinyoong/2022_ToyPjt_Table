import getData from './src/components/getData.js';
import { createTable, drawTable } from './src/components/table.js';

let tableData = [];
let sortState = [0, 0, 0, 0];
let [start, end, per] = [0, 4, 4];
const sortIcon = ['=', '+', '-'];

async function init() {
  // test()
  tableData = await getData();
  console.log(tableData);
  const root = document.getElementById('root');
  root.appendChild(title());
  root.appendChild(dropDown());
  root.appendChild(sortButton(0));
  root.appendChild(sortDropdown());
  createTable();
  drawTable(tableData, 0, 4);
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

function sortButton(idx) {
  const sortButton = document.createElement('button');
  sortButton.id = 'sortButton';
  sortButton.textContent = sortIcon[sortState[idx]];

  sortButton.addEventListener('click', () => {
    sortState[idx] = (sortState[idx] + 1) % 3;
    sortButton.textContent = sortIcon[sortState[idx]];
  })
  return sortButton;
};

init();