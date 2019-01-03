import { http } from "./http";
import { ui } from "./ui";
import { adminUi } from "./ui-admin";

document.querySelector('.shop').addEventListener('click',()=>{
  if(location.href!=='http://localhost:4000/'){
    location.href='http://localhost:4000/';
  } else {
    ui.renderHome();
  }
});
document.querySelector('.products').addEventListener('click',()=>{
  if(location.href==='http://localhost:4000/admin'){
    http.get('http://localhost:3000/admin').then(data=>{
      adminUi.renderProductsInAdmin(data);
    }).catch(err=>{console.log(err)});
  }else if(location.href==='http://localhost:4000/'){
    http.get('http://localhost:3000/').then(data=>{
      ui.renderProducts(data);
    }).catch(err=>{console.log(err)});
  }
});

if(location.href==='http://localhost:4000/'){
  ui.renderHome();
} else if(location.href==='http://localhost:4000/admin'){
  const pass = prompt('Password for enter: ');
  if(pass==='2/0/1/9'){
    adminUi.renderAdminHome();
  }else{
    location.href='http://localhost:4000/';
  }
} else {
  ui.renderErrorPage();
}
