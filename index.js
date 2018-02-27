!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(7);t.assertUnreachable=function(e){throw new Error("Didn't expect to get here")},t.strEnum=function(e){return e.reduce((e,t)=>(e[t]=t,e),Object.create(null))},t.scaleCanvas=function(e,t,n){e.canvas.width=e.canvas.clientWidth,e.canvas.height=e.canvas.clientWidth/t*n,e.canvas.style.height=`${e.canvas.height}px`;const r=e.canvas.clientWidth/t;e.setTransform(r,0,0,r,0,0)};class a{}a.ease_in_out=r(.42,0,.58,1),a.ease=r(.25,.1,.25,1),t.Bazier=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(e,t){this.x=e,this.y=t}}r.add=((e,t)=>new r(e.x+t.x,e.y+t.y)),r.subtracion=((e,t)=>new r(e.x-t.x,e.y-t.y)),r.dot=((e,t)=>e.x*t.y-e.y*t.x),r.equal=((e,t)=>e.x==t.x&&e.y==t.y),r.scale=((e,t)=>new r(e.x*t,e.y*t)),t.default=r},function(e,t){e.exports=React},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),a=n(1),o=n(11);t.CellSourceType=r.strEnum(["Static","Move","Merge","Generate"]);const l={type:t.CellSourceType.Static};const c={type:t.CellSourceType.Generate};function i(e,n){return{value:e,source:function(e){return{type:t.CellSourceType.Move,from:e}}(n)}}function s(e,n,r){return{value:e,source:function(e,n){return{type:t.CellSourceType.Merge,from:e,mergeMoveNumber:n}}(n,r)}}const u=[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]];t.GameStateTypes=r.strEnum(["Gaming","GameOver","Win"]);const f=()=>Math.random()<.9?2:4;function m(e,n,o){const c=function(e){switch(e){case t.MoveDirections.Up:return{x:0,y:-1};case t.MoveDirections.Down:return{x:0,y:1};case t.MoveDirections.Left:return{x:-1,y:0};case t.MoveDirections.Right:return{x:1,y:0}}r.assertUnreachable(e)}(o);return v(e).filter(e=>e.cell).sort((e,t)=>t.position.x*c.x+t.position.y*c.y-(e.position.x*c.x+e.position.y*c.y)).reduce((e,r)=>(function e(n,r,o,c,u,f){const m=a.default.add(r,f||u);const d=(p=m,p.x<0||p.x>3||p.y<0||p.y>3);var p;const h=d?null:n[m.x][m.y];const v=null!=h&&h.value==c&&(h.source.type!=t.CellSourceType.Merge||h.source.mergeMoveNumber!=o);const g=d||h&&!v;if(g)return f&&!a.default.equal(u,f)?function(e,t,n,r){return y(y(e,i(t,n),r),null,n)}(n,c,u,f):function(e,t,n){return y(e,function(e){return{value:e,source:l}}(t),n)}(n,c,u);if(v){const e=[h.source.type==t.CellSourceType.Move?h.source.from:m,u];return function(e,t,n,r,a){return y(n.reduce((e,t)=>y(e,null,t),e),s(t,n,r),a)}(n,2*c,e,o,m)}return e(n,r,o,c,u,m)})(e,c,n,r.cell.value,r.position),e)}function d(e){return v(e).some(e=>null!=e.cell&&(e.cell.source.type==t.CellSourceType.Move||e.cell.source.type==t.CellSourceType.Merge))}function p(e){const t=v(e).filter(e=>null==e.cell).map(e=>e.position);return(n=t)[Math.floor(Math.random()*n.length)];var n}function h(e,t,n){return y(e,function(e){return{value:e,source:c}}(t),n)}function y(e,t,n){return g(e,e=>a.default.equal(e.position,n)?t:e.cell)}function v(e){return x(e,o.List(),(e,t)=>t.push(e)).toArray()}function g(e,t){return e.map((e,n)=>e.map((e,r)=>t({position:new a.default(n,r),cell:e})))}function x(e,t,n){return e.reduce((e,t,r)=>t.reduce((e,t,o)=>n({position:new a.default(r,o),cell:t},e),e),t)}t.gameStart=function(){const e=p(u),n=h(u,f(),e),r=p(n);return{board:h(n,f(),r),score:0,type:t.GameStateTypes.Gaming,moveNumber:0}},t.MoveDirections=r.strEnum(["Up","Down","Left","Right"]),t.move=function(e,n){if(e.type!=t.GameStateTypes.Gaming)return e;const r=e.moveNumber+1,a=m(e.board,r,n);if(!d(a))return e;const o=h(a,f(),p(a)),l=![t.MoveDirections.Up,t.MoveDirections.Down,t.MoveDirections.Left,t.MoveDirections.Right].some(e=>d(m(o,r+1,e))),c=v(o).some(e=>null!=e.cell&&2048==e.cell.value);return{type:l?t.GameStateTypes.GameOver:c?t.GameStateTypes.Win:t.GameStateTypes.Gaming,board:o,score:e.score+v(o).filter(e=>e.cell&&e.cell.source.type==t.CellSourceType.Merge).reduce((e,t)=>e+t.cell.value,0),moveNumber:r}},t.expand=v,t.map=g,t.reduce=x},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2),a=n(5),o=n(6),l=n(10);class c extends r.Component{render(){return r.createElement("div",{className:"btn btn-light mt-3 d-flex flex-column flex-md-row align-items-center align-items-md-start w-100",onClick:e=>this.props.onGameSelected(this.props.game)},r.createElement("img",{className:"mx-auto",src:this.props.game.coverPath,alt:"Game Cover",style:{width:"400px",minWidth:"400px",height:"225px"}}),r.createElement("div",{className:"container-fluid text-center text-md-left mt-4 ml-md-4",style:{whiteSpace:"normal"}},r.createElement("h3",null,this.props.game.name),r.createElement("p",{className:"publish-date font-weight-light"},this.props.game.publishDate.toLocaleDateString()),r.createElement("p",null,this.props.game.description)))}}class i extends r.Component{render(){return r.createElement("div",{className:"col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2 p-5 d-flex flex-column align-items-center"},this.props.games.map(e=>r.createElement(c,{game:e,onGameSelected:this.props.onGameSelected})))}}class s extends r.Component{constructor(){super(...arguments),this.state={playing:null},this.renderBody=(()=>null==this.state.playing?r.createElement("div",{id:"body",className:"row"},r.createElement(i,{games:this.props.games,onGameSelected:e=>this.setState({playing:e})})," "):r.createElement("div",{id:"body",className:"row"},r.createElement("div",{id:"content",className:"col-lg-8 offset-lg-1 text-center"},r.createElement("h1",null," ",this.state.playing.name),r.createElement("p",{className:"publish-date font-weight-light"},this.state.playing.publishDate.toLocaleDateString()),this.state.playing.constructor("game")),r.createElement("div",{id:"sidebar",className:"col-lg-2 pt-5"},r.createElement("p",null,r.createElement("a",{href:"https://github.com/ZCDHP/HomePage/issues/new",target:"_blank"},"Bug!")),r.createElement("p",null,"Created by ",r.createElement("a",{href:"https://github.com/ZCDHP",target:"_blank"},"ZCDHP")))))}render(){return r.createElement("div",{id:"main",className:"container-fluid p-0"},r.createElement("div",{id:"header",className:"container-fluid text-center"},r.createElement("nav",{className:"nav"},r.createElement("a",{className:"nav-link active",href:""},"Home"))),this.renderBody(),r.createElement("div",{id:"footer",className:"container-fluid text-center"},"Host on ",r.createElement("a",{href:"https://pages.github.com/"},"GitHub Pages")))}}document.addEventListener("DOMContentLoaded",()=>{a.render(r.createElement(s,{games:[{name:"2048",description:"A simple and crude imitation to 2048.",coverPath:"./2048/cover.png",constructor:e=>r.createElement(l.Game,{id:e}),publishDate:new Date("2018-02-27")},{name:"Flappy",description:"A simple and crude imitation to Flappy Bird.",coverPath:"./flappy/cover.png",constructor:e=>r.createElement(o.Main,{id:e}),publishDate:new Date("2018-02-13")}]}),document.body)})},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(a,o){function l(e){try{i(r.next(e))}catch(e){o(e)}}function c(e){try{i(r.throw(e))}catch(e){o(e)}}function i(e){e.done?a(e.value):new n(function(t){t(e.value)}).then(l,c)}i((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const a=n(2),o=n(0),l=n(8);function c(e,t,n){const r=e[Math.floor(window.performance.now()/l.PlayerLeft%e.length)];t.drawImage(r,100,n,.5*l.PlayerWidth,l.PlayerHeight),t.save(),t.scale(-1,1),t.drawImage(r,-125,n,-.5*l.PlayerWidth,l.PlayerHeight),t.restore()}function i(e,t){e.fillStyle="black",e.fillRect(t.left,0,l.CheckAreaWidth,t.top),e.fillRect(t.left,t.top+l.CheckAreaHeight,l.CheckAreaWidth,1600-t.top-l.CheckAreaHeight)}t.Main=class extends a.Component{constructor(){super(...arguments),this.gameState=l.DefaultState}render(){return a.createElement("div",{className:"container-fluid text-center"},a.createElement("div",{className:"row"},a.createElement("canvas",{id:this.props.id,className:"col-md-12 col-xl-10 offset-xl-1",onClick:e=>this.gameState=l.click(this.gameState)})),a.createElement("button",{type:"button",className:"btn btn-outline-dark mt-1 mb-1",onClick:e=>this.gameState=l.DefaultState},"New Game"))}componentDidMount(){return r(this,void 0,void 0,function*(){const e=yield function(){return r(this,void 0,void 0,function*(){return Promise.all(["0.png","1.png","2.png","3.png"].map(e=>{const t=new Image,n=new Promise((e,n)=>{t.onload=(n=>e(t)),t.onerror=n});return t.src=`./flappy/${e}`,n}))})}(),t=document.getElementById(this.props.id);t.onselectstart=(e=>!1);const n=t.getContext("2d");window.onresize=(e=>o.scaleCanvas(n,1600,900)),o.scaleCanvas(n,1600,900);const a=(t,r)=>{this.gameState=l.frame(t-r,this.gameState),function(e,t,n){switch(t.clearRect(0,0,1600,900),t.fillStyle="white",t.fillRect(0,0,1600,900),n.type){case l.GameStateTypes.ClickToStart:return t.fillStyle="green",t.font="80px Arial",void t.fillText("Click To Start",520,400);case l.GameStateTypes.Flapping:return n.checkAreas.forEach(e=>i(t,e)),c(e,t,n.top),void function(e,t){e.fillStyle="green",e.font="40px Arial",e.fillText(t.toString(),60,60)}(t,n.score);case l.GameStateTypes.Oops:return n.checkAreas.forEach(e=>i(t,e)),c(e,t,n.top),t.fillStyle="green",t.font="80px Arial",t.fillText("Oops",640,400),void t.fillText(`Your Score: ${n.score}`,500,500)}o.assertUnreachable(n)}(e,n,this.gameState),requestAnimationFrame(e=>a(e,t))},s=window.performance.now();requestAnimationFrame(e=>a(e,s))})}}},function(e,t){var n=4,r=.001,a=1e-7,o=10,l=11,c=1/(l-1),i="function"==typeof Float32Array;function s(e,t){return 1-3*t+3*e}function u(e,t){return 3*t-6*e}function f(e){return 3*e}function m(e,t,n){return((s(t,n)*e+u(t,n))*e+f(t))*e}function d(e,t,n){return 3*s(t,n)*e*e+2*u(t,n)*e+f(t)}e.exports=function(e,t,s,u){if(!(0<=e&&e<=1&&0<=s&&s<=1))throw new Error("bezier x values must be in [0, 1] range");var f=i?new Float32Array(l):new Array(l);if(e!==t||s!==u)for(var p=0;p<l;++p)f[p]=m(p*c,e,s);function h(t){for(var i=0,u=1,p=l-1;u!==p&&f[u]<=t;++u)i+=c;var h=i+(t-f[--u])/(f[u+1]-f[u])*c,y=d(h,e,s);return y>=r?function(e,t,r,a){for(var o=0;o<n;++o){var l=d(t,r,a);if(0===l)return t;t-=(m(t,r,a)-e)/l}return t}(t,h,e,s):0===y?h:function(e,t,n,r,l){var c,i,s=0;do{(c=m(i=t+(n-t)/2,r,l)-e)>0?n=i:t=i}while(Math.abs(c)>a&&++s<o);return i}(t,i,i+c,e,s)}return function(n){return e===t&&s===u?n:0===n?0:1===n?1:m(h(n),t,u)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),a=n(9),o=n(1),l=.001,c=-.4,i=-.1;t.PlayerHeight=50,t.PlayerWidth=50,t.PlayerLeft=100,t.CheckAreaWidth=75,t.CheckAreaHeight=150;const s=200;function u(){return{type:t.GameStateTypes.Flapping,top:500,velocity:0,checkAreas:Array.from(function*(){for(let e=500;e<1600;e+=t.CheckAreaWidth+s)yield{top:Math.floor(Math.random()*Math.floor(500))+200,left:e}}()),score:0}}function*f(e){for(let t=1;t<e.length;t++)yield new a.default(e[t-1],e[t])}t.GameStateTypes=r.strEnum(["ClickToStart","Flapping","Oops"]),t.DefaultState={type:t.GameStateTypes.ClickToStart},t.frame=function(e,n){switch(n.type){case t.GameStateTypes.ClickToStart:return n;case t.GameStateTypes.Flapping:return function(e,n){const r=n.velocity+e*l,c=n.top+.5*(r+n.velocity)*e,u=n.checkAreas.map(t=>({top:t.top,left:t.left+e*i})),m=n.score+(u.filter(e=>e.left+t.CheckAreaWidth<t.PlayerLeft).length-n.checkAreas.filter(e=>e.left+t.CheckAreaWidth<t.PlayerLeft).length);for(;u.length>0&&u[0].left+t.CheckAreaWidth<0;)u.shift();return 1600-u[u.length-1].left>t.CheckAreaWidth+s&&u.push({top:Math.floor(Math.random()*Math.floor(500))+200,left:u[u.length-1].left+t.CheckAreaWidth+s}),c<900-t.PlayerHeight&&c>0&&u.every(e=>!function(e,n){if(!(t.PlayerLeft+t.PlayerWidth>=n.left&&t.PlayerLeft<=n.left+t.CheckAreaWidth))return!1;const r=function(e){return[...f([new o.default(e.left,0),new o.default(e.left,e.top),new o.default(e.left+t.CheckAreaWidth,e.top),new o.default(e.left+t.CheckAreaWidth,0)]),...f([new o.default(e.left,1600),new o.default(e.left,e.top+t.CheckAreaHeight),new o.default(e.left+t.CheckAreaWidth,e.top+t.CheckAreaHeight),new o.default(e.left+t.CheckAreaWidth,1600)])]}(n);return[...f([new o.default(t.PlayerLeft+8,e+43),new o.default(t.PlayerLeft+25,e+3),new o.default(t.PlayerLeft+42,e+43)])].some(e=>r.some(t=>a.default.intersects(e,t)))}(c,e))?{type:t.GameStateTypes.Flapping,top:c,velocity:r,checkAreas:u,score:m}:{type:t.GameStateTypes.Oops,top:c,checkAreas:n.checkAreas,score:n.score}}(e,n);case t.GameStateTypes.Oops:return n}r.assertUnreachable(n)},t.click=function(e){switch(e.type){case t.GameStateTypes.ClickToStart:return u();case t.GameStateTypes.Flapping:return{type:t.GameStateTypes.Flapping,top:e.top,velocity:c,checkAreas:e.checkAreas,score:e.score};case t.GameStateTypes.Oops:return e}r.assertUnreachable(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){this.point1=e,this.point2=t}static intersects(e,t){const n=e.point1,r=e.point2,a=t.point1,o=t.point2,l=(r.x-n.x)*(o.y-a.y)-(r.y-n.y)*(o.x-a.x),c=(n.y-a.y)*(o.x-a.x)-(n.x-a.x)*(o.y-a.y),i=(n.y-a.y)*(r.x-n.x)-(n.x-a.x)*(r.y-n.y);if(0==l)return 0==c&&0==i;const s=c/l,u=i/l;return s>=0&&s<=1&&u>=0&&u<=1}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2),a=n(3),o=n(12),l=n(0),c=n(1);t.Game=class extends r.Component{constructor(e){super(e),this.drag=null,this.viewState=o.init(a.gameStart()),this.state={score:0}}render(){return r.createElement("div",{className:"container-fluid text-center my-5"},r.createElement("style",null," \n                    @keyframes move-up {\n                        0% {\n                          top: 25px;\n                          opacity: 1; }\n                      \n                        100% {\n                          top: -50px;\n                          opacity: 0; } \n                    }\n                    \n                    .score-addition{\n                        position: absolute;\n                        font-size: 25px;\n                        line-height: 25px;\n                        font-weight: bold;\n                        z-index: 100;\n                        color: rgba(119, 110, 101, 0.9);\n                        animation: move-up 600ms ease-in;\n                        animation-fill-mode: both;\n                    }"),r.createElement("div",{className:"row"},r.createElement("div",{className:"container-fluid d-flex align-items-end flex-row-reverse col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3"},r.createElement("div",{className:"px-3",style:{backgroundColor:"rgb(187, 173, 160)",borderRadius:"3px",fontWeight:700,fontFamily:'"Clear Sans", "Helvetica Neue", Arial, sans-serif'}},this.state.scoreAddition&&r.createElement("div",{key:this.state.score,className:"score-addition text-center"},r.createElement("p",null,"+",this.state.scoreAddition)),r.createElement("p",{className:"mt-1 mb-0",style:{fontSize:"0.9em",color:"rgb(238, 228, 218)"}},"SCORE"),r.createElement("p",{className:"my-0",style:{fontSize:"1.5em",color:"rgb(255, 255, 255)"}},this.state.score)),r.createElement("div",{className:"px-3"},r.createElement("button",{type:"button",className:"btn btn-light",style:{backgroundColor:"rgb(143, 122, 102)",color:"rgb(249, 246, 242)",borderRadius:"3px",fontWeight:700,fontFamily:'"Clear Sans", "Helvetica Neue", Arial, sans-serif'},onClick:()=>{this.setState({score:0}),this.viewState=o.init(a.gameStart())}},"New Game")))),r.createElement("div",{className:"row my-3"},r.createElement("canvas",{id:this.props.id,className:"col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3",onMouseDown:e=>{e.preventDefault(),this.drag={x:e.clientX,y:e.clientY}},onMouseUp:e=>{if(e.preventDefault(),null==this.drag)return;const t=c.default.subtracion({x:e.clientX,y:e.clientY},this.drag);if(Math.max(Math.abs(t.x),Math.abs(t.y))<50)return;window.performance.now();const n=a.move(this.viewState.gameState,function(e){return Math.abs(e.x)>Math.abs(e.y)?e.x>=0?a.MoveDirections.Right:a.MoveDirections.Left:e.y>=0?a.MoveDirections.Down:a.MoveDirections.Up}(t));n.moveNumber!=this.viewState.gameState.moveNumber&&(this.viewState={gameState:n,startTime:window.performance.now()},this.setState(e=>({score:n.score,scoreAddition:n.score==e.score?void 0:n.score-e.score})),this.drag=null)}})))}componentDidMount(){const e=document.getElementById(this.props.id);e.onselectstart=(e=>!1);const t=e.getContext("2d");window.onresize=(e=>l.scaleCanvas(t,900,900)),l.scaleCanvas(t,900,900);const n=(e,r)=>{o.render(t,this.viewState),requestAnimationFrame(t=>n(t,e))},r=window.performance.now();requestAnimationFrame(e=>n(e,r))}}},function(e,t){e.exports=Immutable},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(3),a=n(1),o=n(0),l=20,c=(900-5*l)/4,i=100,s=2*i,u=s,f=i,m=f,d=f+s;function p(e){return a.default.add(a.default.scale(e,l+c),new a.default(l,l))}function h(e,t,n,r=1){const o=c*r;e.save(),e.translate(n.x,n.y),e.fillStyle=function(e){switch(e){case null:return"rgba(238, 228, 218, 0.35)";case 2:return"#eee4da";case 4:return"#ede0c8";case 8:return"#f2b179";case 16:return"#f59563";case 32:return"#f67c5f";case 64:return"#f65e3b";case 128:return"#edcf72";case 256:return"#edcc61";case 512:return"#edc850";case 1024:return"#edc53f";case 2048:return"#edc22e";default:throw new Error(`Invalid cell :${e}`)}}(t),y(e,new a.default(o,o),o/32),function(e,t,n,r,a){if(null==t)return;e.fillStyle=t<=4?"rgb(119, 110, 101)":"rgb(249, 246, 242)";e.font=`${700*a} ${90*a}px sans-serif`,e.textAlign="center",e.textBaseline="middle",e.fillText(t.toString(),r/2,r/2)}(e,t,0,o,r),e.restore()}function y(e,t,n){e.beginPath(),e.moveTo(n,0),e.lineTo(t.x-n,0),e.quadraticCurveTo(t.x,0,t.x,n),e.lineTo(t.x,t.y-n),e.quadraticCurveTo(t.x,t.y,t.x-n,t.y),e.lineTo(n,t.y),e.quadraticCurveTo(0,t.y,0,t.y-n),e.lineTo(0,n),e.quadraticCurveTo(0,0,n,0),e.closePath(),e.fill()}function v(e){if(!e.cell)return 0;switch(e.cell.source.type){case r.CellSourceType.Static:return 1;case r.CellSourceType.Move:return 2;case r.CellSourceType.Generate:return 3;case r.CellSourceType.Merge:return 4}o.assertUnreachable(e.cell.source)}t.init=function(e){return{gameState:e,startTime:window.performance.now()}},t.render=function(e,t){const n=window.performance.now()-t.startTime;e.clearRect(0,0,900,900),e.fillStyle="rgb(187, 173, 160)",y(e,new a.default(900,900),11);const l=function(e){const t=e>i?1:e/i;return 1==t?1:o.Bazier.ease_in_out(t)}(n),g=function(e){if(e<=m)return 0;const t=e-m,n=t>u?1:t/u;return 1==n?1:o.Bazier.ease_in_out(n)}(n),x=(w=function(e){if(e<=f)return 0;const t=e-f,n=t>s?1:t/s;return 1==n?1:o.Bazier.ease(n)}(n),w>=1?1:w<=.5?2*w*1.2:1.2-.2*(w-.5)*2),S=(t,n,r)=>{const o=p(n),c=p(r),i=a.default.add(a.default.scale(a.default.subtracion(c,o),l),o);h(e,t,i)};var w;r.expand(t.gameState.board).sort((e,t)=>v(e)-v(t)).forEach(t=>{if(t.cell){switch(t.cell.source.type){case r.CellSourceType.Static:return void h(e,t.cell.value,p(t.position));case r.CellSourceType.Move:return void S(t.cell.value,t.cell.source.from,t.position);case r.CellSourceType.Generate:const n=(1-g)*c/2,o=a.default.add(p(t.position),new a.default(n,n));return void h(e,t.cell.value,o,g);case r.CellSourceType.Merge:const l=t.cell.value/2,i=(1-x)*c/2;t.cell.source.from.forEach(e=>S(l,e,t.position));const s=a.default.add(p(t.position),new a.default(i,i));return void h(e,t.cell.value,s,x)}o.assertUnreachable(t.cell.source)}else h(e,null,p(t.position))}),n>d&&(t.gameState.type==r.GameStateTypes.GameOver?function(e){e.fillStyle="rgba(238, 228, 218, 0.73)",e.fillRect(0,0,900,900),e.fillStyle="rgb(119, 110, 101)",e.font="700 120px sans-serif",e.textAlign="center",e.fillText("Game Over",450,450)}(e):t.gameState.type==r.GameStateTypes.Win&&function(e){e.fillStyle="rgba(237, 194, 46, 0.5)",e.fillRect(0,0,900,900),e.fillStyle="#f9f6f2",e.font="700 120px sans-serif",e.textAlign="center",e.fillText("You Win",450,450)}(e))}}]);