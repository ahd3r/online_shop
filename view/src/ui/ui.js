import { utils } from "./helper/utils";
import { template } from "./helper/templates";
import { http } from "../http";

class UI{
  renderHome(){
    utils.clearMainRow();
    const main = document.querySelector('.container-fluid>.row');
    const msg=document.createElement('div');
    msg.className = 'col';
    msg.appendChild(document.createElement('h1')).textContent='Hello';
    main.appendChild(msg);
  }
  renderProducts(data){
    if(data.length!==0){
      utils.clearMainRow();
      data.forEach((d,i)=>{
        template.renderProductHome(d);
        // add eventlistener for open new page with one prod and info about its
        document.querySelector(`.p${d.id_product}>.card>.card-img-top`).addEventListener('click',()=>{
          this.renderPageOfOneProduct(d);
        });
        document.querySelector(`.id-${d.id_product}`).addEventListener('click',()=>{
          this.renderPageOfOneProduct(d);
        });
        document.querySelector(`.b-${d.id_product}`).addEventListener('click',()=>{
          if(confirm('Please confirm')){
            http.patch(`http://localhost:3000/buy/${d.id_product}`).then(data=>{
              this.renderProducts(data);
            }).catch(err=>{console.log(err)});
          }
        });
      });
    }else{
      utils.emptyProd();
    }
  }
  renderPageOfOneProduct(data){
    template.renderOneProd(data);
  }
}

export const ui = new UI;
