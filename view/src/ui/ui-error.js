import { ui } from './ui';

class Error {
  renderErrorPage(err='Page not found'){
    ui.clearMainRow();
    const main = document.querySelector('.container-fluid>.row');
    const errorMsg=document.createElement('div');
    errorMsg.className = 'col err text-center';
    errorMsg.appendChild(document.createElement('h1')).textContent=err;
    main.appendChild(errorMsg);
  }
}

export const errorUi = new Error;
