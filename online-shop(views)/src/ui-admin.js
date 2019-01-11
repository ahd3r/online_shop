import { http } from "./http";
import { ui } from './ui';

class UI{
  renderAdminHome(){
    ui.clearMainRow();
    const main = document.querySelector('.container-fluid>.row');
    const msg=document.createElement('div');
    msg.className = 'col';
    msg.appendChild(document.createElement('h1')).textContent='Hello Admin';
    main.appendChild(msg);
  }
  renderFormInNewCard(){
    while(document.querySelector('.add>.card>.card-body').firstChild){
      document.querySelector('.add>.card>.card-body').firstChild.remove();
    }
    const call = document.createElement('input');
    call.className='form-control mb-2';
    call.type='text';
    call.setAttribute('placeholder','Call');
    const price = document.createElement('input');
    price.className = 'form-control mb-2';
    price.type='text';
    price.setAttribute('placeholder','Price');
    const image = document.createElement('input');
    image.className = 'form-control mb-2';
    image.type='text';
    image.setAttribute('placeholder','Image');
    const description = document.createElement('input');
    description.className = 'form-control mb-2';
    description.type='text';
    description.setAttribute('placeholder','Description');
    const amount = document.createElement('input');
    amount.className = 'form-control mb-2';
    amount.type='number';
    amount.setAttribute('placeholder','Amount');
    const done = document.createElement('button');
    done.type='submit';
    done.className='btn done btn-primary ml-auto';
    done.appendChild(document.createElement('i')).className='fas fa-check';
    const back = document.createElement('a');
    back.className='btn back btn-primary';
    back.appendChild(document.createElement('i')).className='fas fa-chevron-left';
    document.querySelector('.add>.card>.card-body').appendChild(document.createElement('form')).className='doneForm';
    document.querySelector('form').appendChild(call);
    document.querySelector('form').appendChild(price);
    document.querySelector('form').appendChild(image);
    document.querySelector('form').appendChild(description);
    document.querySelector('form').appendChild(amount);
    document.querySelector('form').appendChild(document.createElement('div')).className='row';
    document.querySelector('form>.row').appendChild(document.createElement('div')).className='col-6';
    document.querySelector('form>.row').appendChild(document.createElement('div')).className='col-6';
    const placeForBtnElse = document.querySelectorAll('form>.row>.col-6');
    placeForBtnElse[0].appendChild(back);
    placeForBtnElse[1].appendChild(done);
    document.querySelector('.back').addEventListener('click',()=>{
      http.get('http://localhost:3000/admin').then(data=>{
        this.renderProductsInAdmin(data);
      }).catch(err=>{console.log(err)});
    });
    document.querySelector('.doneForm').addEventListener('submit',(e)=>{
      e.preventDefault();
      const line = document.querySelectorAll(`.add>.card>.card-body>.doneForm>.form-control`);
      const dataForAdd = {call:line[0].value,price:parseFloat(line[1].value),image:line[2].value,description:line[3].value,amount:parseInt(line[4].value)};
      http.post('http://localhost:3000/admin/add',JSON.stringify(dataForAdd)).then(data=>{
        this.renderProductsInAdmin(data);
      }).catch(err=>{console.log(err)});
    });
  }
  renderFormInCard(d){
    while(document.querySelector(`.p${d.id}>.card`).firstChild){
      document.querySelector(`.p${d.id}>.card`).firstChild.remove();
    }
    const call = document.createElement('input');
    call.className='form-control mb-2';
    call.type='text';
    call.setAttribute('placeholder','Call');
    call.value=d.call;
    const price = document.createElement('input');
    price.className = 'form-control mb-2';
    price.type='text';
    price.setAttribute('placeholder','Price');
    price.value=d.price;
    const image = document.createElement('input');
    image.className = 'form-control mb-2';
    image.type='text';
    image.setAttribute('placeholder','Image');
    image.value=d.image;
    const description = document.createElement('input');
    description.className = 'form-control mb-2';
    description.type='text';
    description.setAttribute('placeholder','Description');
    description.value=d.description;
    const amount = document.createElement('input');
    amount.className = 'form-control mb-2';
    amount.type='number';
    amount.setAttribute('placeholder','Amount');
    amount.value=d.amount;
    const done = document.createElement('button');
    done.type='submit';
    done.className='btn done btn-primary ml-auto';
    done.appendChild(document.createElement('i')).className='fas fa-check';
    const back = document.createElement('a');
    back.className='btn back btn-primary';
    back.appendChild(document.createElement('i')).className='fas fa-chevron-left';
    document.querySelector(`.p${d.id}>.card`).appendChild(document.createElement('div')).className='card-body';
    document.querySelector(`.p${d.id}>.card>.card-body`).appendChild(document.createElement('form')).className='doneForm';
    document.querySelector('form').appendChild(call);
    document.querySelector('form').appendChild(price);
    document.querySelector('form').appendChild(image);
    document.querySelector('form').appendChild(description);
    document.querySelector('form').appendChild(amount);
    document.querySelector('form').appendChild(document.createElement('div')).className='row';
    document.querySelector('form>.row').appendChild(document.createElement('div')).className='col-6';
    document.querySelector('form>.row').appendChild(document.createElement('div')).className='col-6';
    const placeForBtn = document.querySelectorAll('form>.row>.col-6');
    placeForBtn[0].appendChild(back);
    placeForBtn[1].appendChild(done);
    document.querySelector('.back').addEventListener('click',()=>{
      http.get('http://localhost:3000/admin').then(data=>{
        this.renderProductsInAdmin(data);
      }).catch(err=>{console.log(err)});
    });
    document.querySelector('.doneForm').addEventListener('submit',(e)=>{
      e.preventDefault();
      const line = document.querySelectorAll(`.p${d.id}>.card>.card-body>.doneForm>.form-control`);
      const dataForUpdate = {id:parseInt(d.id),call:line[0].value,price:parseFloat(line[1].value),image:line[2].value,description:line[3].value,amount:parseInt(line[4].value)};
      http.put(`http://localhost:3000/admin/edit/${d.id}`,JSON.stringify(dataForUpdate)).then(data=>{
        this.renderProductsInAdmin(data);
      }).catch(err=>{console.log(err)});
    });
  }
  renderProductsInAdmin(data){
    ui.clearMainRow();
    if(data.length!==0){
      data.forEach((d,i)=>{
        const product = document.createElement('div');
        product.className = `col-3 mb-3 mx-center p${d.id}`;
        document.querySelector('.container-fluid>.row').appendChild(product);
        const productCard = document.createElement('div');
        productCard.className = 'card rounded2';
        document.querySelector(`.p${d.id}`).appendChild(productCard);
        const img = document.createElement('img');
        img.className='card-img-top';
        img.setAttribute('src',d.image);
        document.querySelector(`.p${d.id}>.card`).appendChild(img);
        const cardBody=document.createElement('div');
        cardBody.className='card-body';
        document.querySelector(`.p${d.id}>.card`).appendChild(cardBody);
        const cardBodyTitle = document.createElement('h5');
        const cardBodyTitlePrice = document.createElement('h6');
        const cardBodyText = document.createElement('p');
        const cardBodyBtn1 = document.createElement('a');
        cardBodyBtn1.className=`btn btn-primary b-${d.id} rounded2 updt-by-id${d.id} form-control`;
        cardBodyBtn1.appendChild(document.createElement('i')).className='fas fa-edit';
        const cardBodyBtn2 = document.createElement('a');
        cardBodyBtn2.className=`btn btn-primary b-${d.id} rounded2 del-by-id${d.id} form-control`;
        cardBodyBtn2.appendChild(document.createElement('i')).className='fas fa-trash-alt';
        document.querySelector(`.p${d.id}>.card>.card-body`).appendChild(cardBodyTitle);
        document.querySelector(`.p${d.id}>.card>.card-body>h5`).className=`card-title id-${d.id}`;
        document.querySelector(`.p${d.id}>.card>.card-body>h5`).textContent=d.call;
        document.querySelector(`.p${d.id}>.card>.card-body`).appendChild(cardBodyTitlePrice);
        document.querySelector(`.p${d.id}>.card>.card-body>h6`).className='card-text';
        if(d.price==='Free'){
          document.querySelector(`.p${d.id}>.card>.card-body>h6`).textContent=d.price;
        }else{
          document.querySelector(`.p${d.id}>.card>.card-body>h6`).textContent=`${d.price}$`;
        }
        document.querySelector(`.p${d.id}>.card>.card-body`).appendChild(cardBodyText);
        document.querySelector(`.p${d.id}>.card>.card-body>p`).className='card-text';
        document.querySelector(`.p${d.id}>.card>.card-body>p`).textContent=d.description;
        document.querySelector(`.p${d.id}>.card>.card-body`).appendChild(document.createElement('div')).className='row';
        document.querySelector(`.p${d.id}>.card>.card-body>.row`).appendChild(document.createElement('div')).className='col-6';
        document.querySelector(`.p${d.id}>.card>.card-body>.row`).appendChild(document.createElement('div')).className='col-6';
        const forBtn = document.querySelectorAll(`.p${d.id}>.card>.card-body>.row>.col-6`);
        forBtn[0].appendChild(cardBodyBtn1);
        forBtn[1].appendChild(cardBodyBtn2);
        document.querySelector(`.del-by-id${d.id}`).addEventListener('click',()=>{
          http.delete(`http://localhost:3000/admin/delete/${d.id}`).then(data=>{
            this.renderProductsInAdmin(data);
          }).catch(err=>{console.log(err)});
        });
        document.querySelector(`.updt-by-id${d.id}`).addEventListener('click',()=>{
          if(document.querySelector('form')){
            http.get('http://localhost:3000/admin').then(data=>{
              this.renderProductsInAdmin(data);
              this.renderFormInCard(d);
            }).catch(err=>{console.log(err)});
          }else{
            this.renderFormInCard(d);
          }
        });
        document.querySelector(`.p${d.id}>.card>.card-img-top`).addEventListener('click',()=>{
          this.renderPageOfOneProductInAdmin(d);
        });
        document.querySelector(`.id-${d.id}`).addEventListener('click',()=>{
          this.renderPageOfOneProductInAdmin(d);
        });
      });
    }
    const adding = document.createElement('div');
    adding.className = `col-3 mb-3 mx-center add`;
    document.querySelector('.container-fluid>.row').appendChild(adding);
    const addingCard = document.createElement('div');
    addingCard.className = 'card rounded2';
    document.querySelector('.add').appendChild(addingCard);
    document.querySelector('.add>.card').appendChild(document.createElement('div')).className='card-body';
    document.querySelector('.add>.card>.card-body').appendChild(document.createElement('div')).className='card-title';
    document.querySelector('.add>.card>.card-body>.card-title').appendChild(document.createElement('p')).className='text-center mt-5 mb-5';
    document.querySelector('.add>.card>.card-body>.card-title>p').style.fontSize='80px';
    document.querySelector('.add>.card>.card-body>.card-title>p').appendChild(document.createElement('i')).className='fas fa-plus-circle';
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
    console.log(data);
  }
}

export const adminUi = new UI;
