import { utils } from "./utils";

class Templates{
  renderProductHome(d){ // render one product in products page
    // place for product's card
    const product = document.createElement('div');
    product.className = `col-3 mb-3 p${d.id_product}`;
    // put it into page
    document.querySelector('.container-fluid>.row').appendChild(product);
    // product's card itself
    const productCard = document.createElement('div');
    productCard.className = 'card rounded2';
    // past it in its space
    document.querySelector(`.p${d.id_product}`).appendChild(productCard);
    // add image to the top of the product's card
    const img = document.createElement('img');
    img.className='card-img-top';
    img.setAttribute('src',d.product_image);
    // past image
    document.querySelector(`.p${d.id_product}>.card`).appendChild(img);
    // add space in card under image
    const cardBody=document.createElement('div');
    cardBody.className='card-body';
    // put it into card
    document.querySelector(`.p${d.id_product}>.card`).appendChild(cardBody);
    // create info title in card under image
    const cardBodyTitle = document.createElement('h5');
    cardBodyTitle.className=`card-title id-${d.id_product}`;
    cardBodyTitle.textContent=d.product_name;
    // past this title
    document.querySelector(`.p${d.id_product}>.card>.card-body`).appendChild(cardBodyTitle);
    // create price in card under image
    const cardBodyPrice = document.createElement('h6');
    cardBodyPrice.className='card-text';
    cardBodyPrice.textContent=utils.checkPrice(d.product_price);
    // past price
    document.querySelector(`.p${d.id_product}>.card>.card-body`).appendChild(cardBodyPrice);
    // create description
    const cardBodyDescription = document.createElement('p');
    cardBodyDescription.className='card-text';
    cardBodyDescription.textContent=d.product_description;
    // past description
    document.querySelector(`.p${d.id_product}>.card>.card-body`).appendChild(cardBodyDescription);
    // create button
    const cardBodyBtn = document.createElement('a');
    if(d.exist===0){
      cardBodyBtn.className=`btn btn-primary b-${d.id_product} rounded2 form-control disabled`;
      cardBodyBtn.textContent='Out of stock';
    }else{
      cardBodyBtn.className=`btn btn-primary b-${d.id_product} rounded2 form-control`;
      cardBodyBtn.textContent='Buy';
    }
    // past button
    document.querySelector(`.p${d.id_product}>.card>.card-body`).appendChild(cardBodyBtn);
  }
  formInProd(){
    const call = document.createElement('input');
    call.className='form-control mb-2';
    call.type='text';
    call.setAttribute('placeholder','Call');
    const price = document.createElement('input');
    price.className = 'form-control mb-2';
    price.type='text';
    price.setAttribute('placeholder','Price (0=Free)');
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
    done.className='btn done btn-primary';
    done.appendChild(document.createElement('i')).className='fas fa-check';
    const back = document.createElement('a');
    back.className='btn back btn-primary';
    back.appendChild(document.createElement('i')).className='fas fa-chevron-left';
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
  }
  cardForAddProd(){
    const adding = document.createElement('div');
    adding.className = `col-3 mb-3 add`;
    const addingCard = document.createElement('div');
    addingCard.className = 'card rounded2';
    document.querySelector('.container-fluid>.row').appendChild(adding);
    document.querySelector('.add').appendChild(addingCard);
    document.querySelector('.add>.card').appendChild(document.createElement('div')).className='card-body';
    document.querySelector('.add>.card>.card-body').appendChild(document.createElement('div')).className='card-title';
    document.querySelector('.add>.card>.card-body>.card-title').appendChild(document.createElement('p')).className='text-center mt-5 mb-5';
    document.querySelector('.add>.card>.card-body>.card-title>p').style.fontSize='80px';
    document.querySelector('.add>.card>.card-body>.card-title>p').appendChild(document.createElement('i')).className='fas fa-plus-circle';
  }
  renderProductForAdmin(d){
    const product = document.createElement('div');
    product.className = `col-3 mb-3 mx-center p${d.id_product}`;
    document.querySelector('.container-fluid>.row').appendChild(product);
    const productCard = document.createElement('div');
    productCard.className = 'card rounded2';
    document.querySelector(`.p${d.id_product}`).appendChild(productCard);
    const img = document.createElement('img');
    img.className='card-img-top';
    img.setAttribute('src',d.product_image);
    document.querySelector(`.p${d.id_product}>.card`).appendChild(img);
    const cardBody=document.createElement('div');
    cardBody.className='card-body';
    document.querySelector(`.p${d.id_product}>.card`).appendChild(cardBody);
    const cardBodyTitle = document.createElement('h5');
    cardBodyTitle.className=`card-title id-${d.id_product}`;
    cardBodyTitle.textContent=d.product_name;
    document.querySelector(`.p${d.id_product}>.card>.card-body`).appendChild(cardBodyTitle);
    const cardBodyPrice = document.createElement('h6');
    cardBodyPrice.className='card-text';
    cardBodyPrice.textContent=utils.checkPrice(d.product_price);
    document.querySelector(`.p${d.id_product}>.card>.card-body`).appendChild(cardBodyPrice);
    const cardBodyText = document.createElement('p');
    cardBodyText.className='card-text';
    cardBodyText.textContent=d.product_description;
    document.querySelector(`.p${d.id_product}>.card>.card-body`).appendChild(cardBodyText);
    document.querySelector(`.p${d.id_product}>.card>.card-body`).appendChild(document.createElement('div')).className='row';
    document.querySelector(`.p${d.id_product}>.card>.card-body>.row`).appendChild(document.createElement('div')).className='col-6';
    document.querySelector(`.p${d.id_product}>.card>.card-body>.row`).appendChild(document.createElement('div')).className='col-6';
    const cardBodyBtn1 = document.createElement('a');
    cardBodyBtn1.className=`btn btn-primary b-${d.id_product} rounded2 updt-by-id${d.id_product} form-control`;
    cardBodyBtn1.appendChild(document.createElement('i')).className='fas fa-edit';
    const cardBodyBtn2 = document.createElement('a');
    cardBodyBtn2.className=`btn btn-primary b-${d.id_product} rounded2 del-by-id${d.id_product} form-control`;
    cardBodyBtn2.appendChild(document.createElement('i')).className='fas fa-trash-alt';
    const forBtn = document.querySelectorAll(`.p${d.id_product}>.card>.card-body>.row>.col-6`);
    forBtn[0].appendChild(cardBodyBtn1);
    forBtn[1].appendChild(cardBodyBtn2);
  }
  renderOneProd(data){
    console.log(data);
  }
  renderOneProdForAdmin(data){
    console.log(data);
  }
}

export const template = new Templates;
