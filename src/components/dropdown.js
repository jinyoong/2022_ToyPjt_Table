import { changePer } from "../../index.js";

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

export { countDropdown };