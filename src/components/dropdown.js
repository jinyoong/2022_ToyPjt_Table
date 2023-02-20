import getData from "./getData.js"; 
import { changePer, dataSort } from "../../index.js";

const sortIcon = ['↕', '↑', '↓'];
const sortState = [0, 0, 0, 0];
const originalData = await getData();
const originalDataKeys = Object.keys(originalData[0]);

function countDropdown() {
  const root = document.getElementById('root');
  const countDropdown = document.createElement('select');
  countDropdown.id = 'countDropdown';
  countDropdown.className = 'countDropdown';

  const options = [
    {value: 4, label: '4개씩'},
    {value: 8, label: '8개씩'},
  ];

  options.forEach(element => {
    const option = document.createElement('option');
    option.value = element.value;
    option.textContent = element.label;
    countDropdown.appendChild(option);
  });

  countDropdown.addEventListener('change', countDropdownButton);
  root.appendChild(countDropdown);
};

function countDropdownButton(event) {
  changePer(event.target.value);
};

function createSortIcons() {
  const tableHeadItems = document.getElementsByTagName('th');

  for (let i = 0; i < tableHeadItems.length; i++) {
    const tableHeadItem = tableHeadItems[i].firstChild;
    const sortIconElement = document.createElement('span');
    sortIconElement.id = `sortIcon-${i}`;
    sortIconElement.className = 'sortIcon';
    sortIconElement.textContent = sortIcon[sortState[i]];

    tableHeadItem.appendChild(sortIconElement);
  };
};

function drawSortIcon(index) {
  const sortIconElement = document.getElementById(`sortIcon-${index}`);
  sortIconElement.textContent = sortIcon[sortState[index]];
};

function changeSortState(event) {
  console.log(`${event.currentTarget.id}의 정렬 상태를 변경합니다.`);
  const targetIndex = Number(event.currentTarget.id.split('-')[1]);
  console.log(targetIndex)

  for (let i = 0; i < 4; i++) {
    if (i === targetIndex) {
      sortState[i] = (sortState[i] + 1) % 3;
      const tableHeadItem = document.getElementById(`tableHeadItemName-${i}`);
      tableHeadItem.className += ' head-highlight'
    } else {
      sortState[i] = 0
      const tableHeadItem = document.getElementById(`tableHeadItemName-${i}`);
      tableHeadItem.classList.remove('head-highlight')
    };

    

    drawSortIcon(i);
  };

  sortData(targetIndex);
};

function sortData(column) {
  let isSort = 0;

  if (sortState[column] === 1) isSort = 1;
  else if (sortState[column] === 2) isSort = -1;

  if (isSort === 0) {
    dataSort(originalData);
    return;
  };

  const targetKey = originalDataKeys[column];

  const sortedData = [...originalData].sort((a, b) => {
    if (a[targetKey] > b[targetKey]) return isSort * 1;
    if (a[targetKey] < b[targetKey]) return isSort * -1;
    return 0;
  });

  console.log(`현재 ${targetKey}의 정렬 상태는 ${sortIcon[sortState[column]]}`)

  dataSort(sortedData);
  return;
}

export { countDropdown, createSortIcons, changeSortState, sortData };