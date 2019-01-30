import { utils } from "./helper/utils";
import { template } from "./helper/templates";
import { http } from "../http";

class UI{
  renderAdminHome(){
    utils.clearMainRow();
    const main = document.querySelector('.container-fluid>.row');
    const msg=document.createElement('div');
    msg.className = 'col';
    msg.appendChild(document.createElement('h1')).textContent='Hello Admin';
    main.appendChild(msg);
  }
  renderFormInNewCard(){
    while(document.querySelector('.add>.card').firstChild){
      document.querySelector('.add>.card').firstChild.remove();
    }
    document.querySelector('.add>.card').appendChild(document.createElement('div')).className='card-body';
    document.querySelector('.add>.card>.card-body').appendChild(document.createElement('form')).className='doneForm';
    template.formInProd();
    document.querySelector('.back').addEventListener('click',()=>{
      http.get('http://localhost:3000/admin').then(data=>{
        this.renderProductsInAdmin(data);
      }).catch(err=>{console.log(err)});
    });
    document.querySelector('.doneForm').addEventListener('submit',(e)=>{
      e.preventDefault();
      const line = document.querySelectorAll(`.add>.card>.card-body>.doneForm>.form-control`);
      const dataForAdd = {product_name:line[0].value,product_price:parseFloat(line[1].value),product_image:line[2].value,product_description:line[3].value,amount:parseInt(line[4].value)};
      if(line[0].value==='' || line[1].value==='' || line[3].value==='' || line[4].value===''){
        alert('Fill lines!');
      }else{
        http.post('http://localhost:3000/admin/add',JSON.stringify(dataForAdd)).then(data=>{
          this.renderProductsInAdmin(data);
        }).catch(err=>{console.log(err)}); 
      }
    });
  }
  renderFormInCard(d){
    while(document.querySelector(`.p${d.id_product}>.card`).firstChild){
      document.querySelector(`.p${d.id_product}>.card`).firstChild.remove();
    }
    document.querySelector(`.p${d.id_product}>.card`).appendChild(document.createElement('div')).className='card-body';
    document.querySelector(`.p${d.id_product}>.card>.card-body`).appendChild(document.createElement('form')).className='doneForm';
    template.formInProd(d);
    const fields=document.querySelectorAll('form>.form-control');
    fields[0].value=d.product_name;
    fields[1].value=d.product_price;
    fields[2].value=d.product_image;
    fields[3].value=d.product_description;
    fields[4].value=d.amount;
    document.querySelector('.back').addEventListener('click',()=>{
      http.get('http://localhost:3000/admin').then(data=>{
        this.renderProductsInAdmin(data);
      }).catch(err=>{console.log(err)});
    });
    document.querySelector('.doneForm').addEventListener('submit',(e)=>{
      e.preventDefault();
      const dataForUpdate = {id_product:parseInt(d.id_product),product_name:fields[0].value,product_price:parseFloat(fields[1].value),product_image:fields[2].value,product_description:fields[3].value,amount:parseInt(fields[4].value)};
      if(dataForUpdate.product_name===''||dataForUpdate.product_price===''||dataForUpdate.product_description===''||dataForUpdate.amount===''){
        alert('Fill lines!');
      }else{
        http.put(`http://localhost:3000/admin/edit/${d.id_product}`,JSON.stringify(dataForUpdate)).then(data=>{
          this.renderProductsInAdmin(data);
        }).catch(err=>{console.log(err)});
      }
    });
  }
  renderProductsInAdmin(data){
    utils.clearMainRow();
    if(data.length!==0){
      data.forEach((d,i)=>{
        template.renderProductForAdmin(d);
        document.querySelector(`.del-by-id${d.id_product}`).addEventListener('click',()=>{
          http.delete(`http://localhost:3000/admin/delete/${d.id_product}`).then(data=>{
            this.renderProductsInAdmin(data);
          }).catch(err=>{console.log(err)});
        });
        document.querySelector(`.updt-by-id${d.id_product}`).addEventListener('click',()=>{
          if(document.querySelector('form')){
            http.get('http://localhost:3000/admin').then(data=>{
              this.renderProductsInAdmin(data);
              this.renderFormInCard(d);
            }).catch(err=>{console.log(err)});
          }else{
            this.renderFormInCard(d);
          }
        });
        document.querySelector(`.p${d.id_product}>.card>.card-img-top`).addEventListener('click',()=>{
          this.renderPageOfOneProductInAdmin(d);
        });
        document.querySelector(`.id-${d.id_product}`).addEventListener('click',()=>{
          this.renderPageOfOneProductInAdmin(d);
        });
      });
    }
    template.cardForAddProd();
    document.querySelector('.add>.card>.card-body>.card-title').addEventListener('click',()=>{
      if(document.querySelector('form')){
        http.get('http://localhost:3000/admin').then(data=>{
          this.renderProductsInAdmin(data);
          this.renderFormInNewCard();
        }).catch(err=>{console.log(err)});
      } else {
        this.renderFormInNewCard();
      }
    });
  }
  renderPageOfOneProductInAdmin(data){
    template.renderOneProdForAdmin(data);
  }
}

export const adminUi = new UI;
