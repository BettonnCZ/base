(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const d=document.querySelector("#app");d.innerHTML=`
  <header class="site-header">
    <h1>Hello</h1>
    <div class="actions">
      <button id="save-btn" class="btn">Save</button>
      <button id="load-btn" class="btn">Load</button>
      <button id="export-btn" class="btn">Export JSON</button>
    </div>
  </header>

  <main class="container">
    <section class="left">
      <label class="label">Title</label>
      <input class="textbox" placeholder="Add your title here" />

      <label class="label">Summary</label>
      <textarea class="textbox large" placeholder="Add a short summary..."></textarea>

      <label class="label">Details</label>
      <textarea class="textbox" placeholder="Add more details here..."></textarea>
    </section>

    <aside class="right">
      <div class="images-grid">
        <div class="image-window" data-index="1"><span>Image 1</span></div>
        <div class="image-window" data-index="2"><span>Image 2</span></div>
        <div class="image-window" data-index="3"><span>Image 3</span></div>
      </div>
      <p class="hint">Tip: double-click an image window to upload</p>
    </aside>
  </main>

  <footer class="site-footer">Made with neon glow ✦</footer>
`;const r=document.createElement("input");r.type="file";r.accept="image/*";r.style.display="none";document.body.appendChild(r);document.querySelectorAll(".image-window").forEach(e=>{e.addEventListener("dblclick",()=>{r.dataset.target=e.dataset.index,r.click()})});r.addEventListener("change",e=>{const a=e.target.files&&e.target.files[0];if(!a)return;const o=new FileReader;o.onload=()=>{const n=o.result,t=r.dataset.target,s=document.querySelector(`.image-window[data-index="${t}"]`);s&&(s.style.backgroundImage=`url(${n})`,s.dataset.src=n,s.classList.add("has-image"),s.querySelector("span").textContent="")},o.readAsDataURL(a),r.value=""});document.querySelectorAll(".textbox").forEach(e=>{e.addEventListener("focus",()=>e.classList.add("focused")),e.addEventListener("blur",()=>e.classList.remove("focused"))});document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&document.activeElement.classList.contains("image-window")){e.preventDefault();const a=document.activeElement;r.dataset.target=a.dataset.index,r.click()}});const i=document.getElementById("save-btn"),u=document.getElementById("load-btn"),m=document.getElementById("export-btn");function g(){const e={title:document.querySelector("input.textbox").value,summary:document.querySelector("textarea.large").value,details:document.querySelector("textarea:not(.large)").value,images:Array.from(document.querySelectorAll(".image-window")).map(a=>({index:a.dataset.index,src:a.dataset.src||"",hasImage:a.classList.contains("has-image")}))};localStorage.setItem("siteData",JSON.stringify(e)),alert("Data saved!")}function c(){const e=localStorage.getItem("siteData");if(!e){alert("No saved data found.");return}const a=JSON.parse(e);document.querySelector("input.textbox").value=a.title||"",document.querySelector("textarea.large").value=a.summary||"",document.querySelector("textarea:not(.large)").value=a.details||"",a.images.forEach(o=>{const n=document.querySelector(`.image-window[data-index="${o.index}"]`);n&&o.src&&(n.style.backgroundImage=`url(${o.src})`,n.dataset.src=o.src,n.classList.add("has-image"),n.querySelector("span").textContent="")}),alert("Data loaded!")}function p(){const e={title:document.querySelector("input.textbox").value,summary:document.querySelector("textarea.large").value,details:document.querySelector("textarea:not(.large)").value,images:Array.from(document.querySelectorAll(".image-window")).map(t=>({index:t.dataset.index,src:t.dataset.src||"",hasImage:t.classList.contains("has-image")}))},a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=URL.createObjectURL(a),n=document.createElement("a");n.href=o,n.download="site-data.json",n.click(),URL.revokeObjectURL(o)}i.addEventListener("click",g);u.addEventListener("click",c);m.addEventListener("click",p);c();
