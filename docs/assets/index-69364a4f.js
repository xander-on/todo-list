(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function d(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=d(o);fetch(o.href,n)}})();let f;const v=new Uint8Array(16);function L(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(v)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function S(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}const C=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:C};function E(e,t,d){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const i=e.random||(e.rng||L)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){d=d||0;for(let o=0;o<16;++o)t[d+o]=i[o];return t}return S(i)}class k{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={all:"All",completed:"Completed",pending:"Pending"},r={todos:[],filter:a.all},I=()=>{T(),console.log("Store init 🥑")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.all}=JSON.parse(localStorage.getItem("state"));r.todos=e,r.filter=t},h=()=>{localStorage.setItem("state",JSON.stringify(r))},P=(e=a.all)=>{switch(e){case a.all:return[...r.todos];case a.completed:return r.todos.filter(t=>t.done);case a.pending:return r.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},U=e=>{if(!e)throw new Error("Description is required");r.todos.push(new k(e)),h()},x=e=>{r.todos=r.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},q=e=>{r.todos=r.todos.filter(t=>t.id!==e),h()},A=()=>{r.todos=r.todos.filter(e=>!e.done),h()},F=(e=a.all)=>{r.filter=e,h()},D=()=>r.filter,c={addTodo:U,deleteCompleted:A,deleteTodo:q,getCurrentFilter:D,getTodos:P,initStore:I,loadStore:T,setFilter:F,toggleTodo:x},M=`<section class="todoapp">
  <header class="header">
    <h1>Tareas</h1>
    <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
  </header>
  
  <!-- This section should be hidden by default and shown when there are todos -->
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
      <!-- <li class="completed" data-id="abc">
        <div class="view">
            <input class="toggle" type="checkbox" checked>
            <label>Probar JavaScript</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      </li> -->
      <!-- <li>
        <div class="view">
            <input class="toggle" type="checkbox">
            <label>Comprar un unicornio</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
      </li> -->
    </ul>
  </section>

  <!-- This footer should hidden by default and shown when there are todos -->
  <footer class="footer">
    <!-- This should be "0 items left" by default -->
    <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a class="filtro" class="selected" href="#/">Todos</a>
      </li>
      <li>
        <a class="filtro" href="#/active">Pendientes</a>
      </li>
      <li>
        <a class="filtro" href="#/completed">Completados</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed">Borrar completados</button>
  </footer>
</section>


`;let y;const O=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=c.getTodos(a.pending).length},H=e=>{if(!e)throw new Error("A Todo object is required");const{done:t,description:d,id:i}=e,o=`
    <div class="view">
      <input class="toggle" type="checkbox" ${t?"checked":""}>
      <label>${d}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  `,n=document.createElement("li");return n.setAttribute("data-id",i),t&&n.classList.add("completed"),n.innerHTML=o,n};let g;const N=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(d=>{g.append(H(d))})},m={ClearCompletedButton:".clear-completed",NewTodoInput:"#new-todo-input",PendingCountLabel:"#pending-count",TodoFilters:".filtro",TodoList:".todo-list"},R=e=>{const t=()=>{const l=c.getTodos(c.getCurrentFilter());N(m.TodoList,l),d()},d=()=>{O(m.PendingCountLabel)};(()=>{const l=document.createElement("div");l.innerHTML=M,document.querySelector(e).append(l),t()})();const i=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.ClearCompletedButton),p=document.querySelectorAll(m.TodoFilters);i.addEventListener("keyup",l=>{l.keyCode==13&&l.target.value.trim().length!==0&&(c.addTodo(event.target.value),t(),l.target.value="")}),o.addEventListener("click",l=>{const u=l.target.closest("[data-id]");c.toggleTodo(u.getAttribute("data-id")),t()}),o.addEventListener("click",l=>{const u=l.target.closest("[data-id]");!u||!l.target.classList.contains("destroy")||(c.deleteTodo(u.getAttribute("data-id")),t())}),n.addEventListener("click",()=>{c.deleteCompleted(),t()}),p.forEach(l=>{l.addEventListener("click",u=>{switch(p.forEach(w=>w.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":c.setFilter(a.all);break;case"Pendientes":c.setFilter(a.pending);break;case"Completados":c.setFilter(a.completed);break}t()})})};c.initStore();R("#app");
