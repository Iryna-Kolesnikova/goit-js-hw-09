!function(){function e(e,n){return new Promise((function(t,o){var a=Math.random()>.3;setTimeout((function(){a?t({position:e,delay:n}):o({position:e,delay:n})}),n)}))}var n=document.querySelector(".form");n.addEventListener("submit",(function(t){t.preventDefault();for(var o=document.querySelector('input[name="delay"]'),a=document.querySelector('input[name="step"]'),c=document.querySelector('input[name="amount"]'),i=parseInt(o.value),r=parseInt(a.value),u=parseInt(c.value),l=i,s=1;s<=u;s++)e(s,l).then((function(e){var n=e.position,t=e.delay;console.log("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"))})).catch((function(e){var n=e.position,t=e.delay;console.log("❌ Rejected promise ".concat(n," in ").concat(t,"ms"))})),l+=r;n.reset()}))}();
//# sourceMappingURL=03-promises.81a98dfc.js.map