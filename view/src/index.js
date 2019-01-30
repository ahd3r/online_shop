import { http } from "./http";
import { ui } from "./ui/ui";
import { adminUi } from "./ui/ui-admin";
import { errorUi } from "./ui/ui-error";
import './style.css';

// prod — product

//Create event listeners for two button
document.querySelector('.shop').addEventListener('click',()=>{
  if(location.href!=='http://localhost:8080/'){
    location.href='http://localhost:8080/';
  } else {
    ui.renderHome();
  }
});
document.querySelector('.products').addEventListener('click',()=>{
  if(location.href==='http://localhost:8080/admin'){
    http.get('http://localhost:3000/admin').then(data=>{
      adminUi.renderProductsInAdmin(data);
    }).catch(err=>{console.log(err)});
  }else if(location.href==='http://localhost:8080/'){
    http.get('http://localhost:3000/').then(data=>{
      ui.renderProducts(data);
    }).catch(err=>{console.log(err)});
  }
});

// Render first page
if(location.href==='http://localhost:8080/'){
  ui.renderHome();
} else if(location.href==='http://localhost:8080/admin'){
  const pass = prompt('Password for enter: ');
  if(pass==='2/0/1/9'){ // password for enter in admin page
    adminUi.renderAdminHome();
  }else{
    location.href='http://localhost:8080/';
  }
} else {
  errorUi.renderErrorPage();
}
