import { http } from "./http";

if(location.href==='http://localhost:4000/'){
  http.get('http://localhost:3000/').then(data=>{
    console.log(data);
  });
}
