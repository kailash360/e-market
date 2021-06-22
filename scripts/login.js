function toggleSignup(){
    document.getElementById("login-toggle").style.background="#fff";
     document.getElementById("login-toggle").style.color="#222";
     document.getElementById("signup-toggle").style.background="linear-gradient(to top left,#FA24FA, #6609B8)";
     document.getElementById("signup-toggle").style.color="#fff";
     document.getElementById("login-form").style.display="none";
     document.getElementById("signup-form").style.display="block";
 }
 
 function toggleLogin(){
     document.getElementById("login-toggle").style.background="linear-gradient(to top left,#FA24FA, #6609B8)";
     document.getElementById("login-toggle").style.color="#fff";
     document.getElementById("signup-toggle").style.background="#fff";
     document.getElementById("signup-toggle").style.color="#222";
     document.getElementById("signup-form").style.display="none";
     document.getElementById("login-form").style.display="block";
 }
 