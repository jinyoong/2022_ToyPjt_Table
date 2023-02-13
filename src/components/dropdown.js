import { changePer } from "../../index.js";

const sortIcon = ['↕', '↓', '↑'];
const sortState = [0, 0, 0, 0];

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
    const tableHeadItem = tableHeadItems[i];
    
    const sortIconElement = document.createElement('span');
    sortIconElement.id = `sortIcon-${i}`;
    sortIconElement.className = 'sortIcon';
    sortIconElement.textContent = sortIcon[sortState[i]];
    sortIconElement.addEventListener('click', changeSortState)

    tableHeadItem.appendChild(sortIconElement);
  };
};

function drawSortIcon(index) {
  const sortIconElement = document.getElementById(`sortIcon-${index}`);
  sortIconElement.textContent = sortIcon[sortState[index]];
};

function changeSortState(event) {
  console.log(`${event.target.id}의 정렬 상태를 변경합니다.`);
  const targetIndex = event.target.id.split('-')[1];
  sortState[targetIndex] = (sortState[targetIndex] + 1) % 3;

  drawSortIcon(targetIndex);
};


export { countDropdown, createSortIcons };