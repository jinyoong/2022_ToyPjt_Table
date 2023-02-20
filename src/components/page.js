import { changePage } from "../../index.js";

function pagination(data, per, currentPage) {
  const root = document.getElementById('root');
  const pageCount = Math.ceil(data.length / per);
  const pagiNation = document.createElement('div');
  pagiNation.id = 'pagination';

  const leftButton = document.createElement('button');
  leftButton.className = 'pageButton';
  leftButton.textContent = '<<';
  pagiNation.appendChild(leftButton);

  for (let i = 1; i <= pageCount; i++) {
    const pageButton = document.createElement('button');
    pageButton.className = 'pageButton';

    if (i === currentPage) {
      pageButton.className += ' highlight';
    };

    pageButton.textContent = i;
    pagiNation.appendChild(pageButton);
  };

  const rightButton = document.createElement('button');
  rightButton.className = 'pageButton';
  rightButton.textContent = '>>';
  pagiNation.appendChild(rightButton);
  
  pagiNation.addEventListener('click', pageButton);

  root.appendChild(pagiNation);
};

function pageButton(event) {
  if (event.target.tagName === 'BUTTON') {
    changePage(event.target.textContent);
  };
};

function removePagination() {
  const pagiNation = document.getElementById('pagination');

  if (pagiNation) pagiNation.remove();
};

export { pagination, changePage, removePagination };