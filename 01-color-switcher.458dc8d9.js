!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;function a(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));document.body.style.backgroundColor=t}t.addEventListener("click",(function(){if(n)return;t.disabled=!0,n=setInterval(a,1e3)})),e.addEventListener("click",(function(){clearInterval(n),n=null,t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.458dc8d9.js.map