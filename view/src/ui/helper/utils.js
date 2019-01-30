class Utils{
  clearMainRow(){
    while(document.querySelector('.container-fluid>.row').firstChild){
      document.querySelector('.container-fluid>.row').firstChild.remove();
    }
  }
  emptyProd(){
    this.clearMainRow();
    const main=document.querySelector('.container-fluid>.row');
    const msg=document.createElement('div');
    msg.className = 'col';
    msg.appendChild(document.createElement('h1')).className='text-center';
    msg.firstChild.textContent='No content';
    main.appendChild(msg);
    // document.querySelector('.container-fluid>.row>div>h1').textContent='No content';
  }
  checkPrice(price){
    if(parseFloat(price)===0.00){
      return 'Free';
    }else{
      return `${price}$`;
    }
  }
}

export const utils = new Utils;
