import { http } from "./http";

class UI{
  clearMainRow(){
    while(document.querySelector('.container-fluid>.row').firstChild){
      document.querySelector('.container-fluid>.row').firstChild.remove();
    }
  }
  renderProducts(data){
    this.clearMainRow();
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
        const cardBodyBtn = document.createElement('a');
        document.querySelector(`.p${d.id}>.card>.card-body`).appendChild(cardBodyTitle);
        document.querySelector(`.p${d.id}>.card>.card-body>h5`).className=`card-title id-${d.id}`;
        document.querySelector(`.p${d.id}>.card>.card-body>h5`).textContent=d.call;
        document.querySelector(`.p${d.id}>.card>.card-body`).appendChild(cardBodyTitlePrice);
        document.querySelector(`.p${d.id}>.card>.card-body>h6`).className='card-text';
        if(d.price==='Free'){
          document.querySelector(`.p${d.id}>.card>.card-body>h6`).textContent=`${d.price}`;
        }else{
          document.querySelector(`.p${d.id}>.card>.card-body>h6`).textContent=`${d.price}$`;
        }
        document.querySelector(`.p${d.id}>.card>.card-body`).appendChild(cardBodyText);
        document.querySelector(`.p${d.id}>.card>.card-body>p`).className='card-text';
        document.querySelector(`.p${d.id}>.card>.card-body>p`).textContent=d.description;
        document.querySelector(`.p${d.id}>.card>.card-body`).appendChild(cardBodyBtn);
        if(d.exist===true){
          document.querySelector(`.p${d.id}>.card>.card-body>a`).className=`btn btn-primary b-${d.id} rounded2 form-control`;
          document.querySelector(`.p${d.id}>.card>.card-body>a`).textContent='Buy';
        }else{
          document.querySelector(`.p${d.id}>.card>.card-body>a`).className=`btn btn-primary b-${d.id} rounded2 form-control disabled`;
          document.querySelector(`.p${d.id}>.card>.card-body>a`).textContent='Out of stock';
        }
        document.querySelector(`.p${d.id}>.card>.card-img-top`).addEventListener('click',()=>{
          this.renderPageOfOneProduct(data[i]);
        });
        document.querySelector(`.id-${d.id}`).addEventListener('click',()=>{
          this.renderPageOfOneProduct(data[i]);
        });
        document.querySelector(`.b-${d.id}`).addEventListener('click',()=>{
          if(confirm('Please confirm')){
            http.patch(`http://localhost:3000/buy/${d.id}`).then(data=>{
              this.renderProducts(data);
            }).catch(err=>{console.log(err)});
          }
        });
      });
    }else{
      document.querySelector('.container-fluid>.row').appendChild(document.createElement('div')).className='col';
      document.querySelector('.container-fluid>.row>.col').appendChild(document.createElement('h1')).className='text-center';
      document.querySelector('.container-fluid>.row>.col>h1').textContent='No content';
    }
  }
  renderPageOfOneProduct(data){
    this.clearMainRow();
    console.log(data);
  }
  renderHome(){
    this.clearMainRow();
    const main = document.querySelector('.container-fluid>.row');
    const msg=document.createElement('div');
    msg.className = 'col';
    msg.appendChild(document.createElement('h1')).textContent='Hello';
    main.appendChild(msg);
  }
}

export const ui = new UI;
