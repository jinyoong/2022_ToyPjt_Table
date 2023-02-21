import getData from './src/components/getData.js';
import { createTable, drawTable } from './src/components/table.js';
import { pagination, removePagination } from './src/components/page.js';
import { countDropdown, createSortIcons } from './src/components/dropdown.js';

let tableData = [];
let currentPage = 1;
let per = 4;

async function init() {
  tableData = await getData();
  title();
  countDropdown();
  createTable();
  drawTable(tableData, 0, 4);
  pagination(tableData, 4, currentPage);
  createSortIcons();
};

// 제목 부여 함수
function title() {
  const title = document.createElement('h2');
  title.id = 'title';
  title.textContent = '2022 토이 프로젝트: 테이블 구현하기';

  root.appendChild(title);
};

function changePage(clickedPage) {
  console.log(`클릭한 페이지 : ${clickedPage}`);

  if (clickedPage === '<<') currentPage = 1;
  else if (clickedPage === '>>') currentPage = Math.ceil(tableData.length / per);
  else currentPage = Number(clickedPage);

  drawTable(tableData, (currentPage - 1) * per, currentPage * per);
  removePagination();
  pagination(tableData, per, currentPage);
};

function changePer(changedPer) {
  console.log(`바꾼 표시개수 : ${changedPer}`);
  per = changedPer;
  currentPage = 1;

  drawTable(tableData, (currentPage - 1) * per, currentPage * per);
  removePagination();
  pagination(tableData, per, currentPage);
};

function dataSort(sortedData) {
  tableData = sortedData;
  console.log('데이터 정렬 완료');

  drawTable(tableData, (currentPage - 1) * per, currentPage * per);
  removePagination();
  pagination(tableData, per, currentPage);
}

init();

export { changePage, changePer, dataSort };