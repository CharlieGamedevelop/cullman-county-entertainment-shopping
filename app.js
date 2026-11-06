(function(){
'use strict';
var FB='';
var EMAIL='shoplocalhanceville@gmail.com';
var PAGES=[
  {k:'events',f:'events.html',t:'Events',ic:'📅',j:'events.json',g:'group',o:['Fairs and Festivals','Arts, Music and Theater','Outdoors and Motorsports','Classes and Community']},
  {k:'fun',f:'fun.html',t:'Things to Do',ic:'🎡',j:'fun.json',g:'group',o:['Landmarks and History','Parks and Outdoors','Lake Life','Family Fun','Festivals Through the Year','Fun Facts']},
  {k:'eats',f:'eats.html',t:'Local Eats',ic:'🍽️',j:'eats.json',g:'group',o:['Restaurants and Cafes','Barbecue and Southern','Pubs, Grills and Breweries','Coffee, Sweets and Treats']},
  {k:'shops',f:'shops.html',t:'Shops',ic:'🛍️',j:'shops.json',g:'group',o:['Boutiques and Clothing','Gifts, Books and Specialty','Antiques, Vintage and Thrift','Furniture and Home','Health and Beauty','Outdoors and Sporting']},
  {k:'businesses',f:'businesses.html',t:'Business Directory',ic:'🏬',j:'businesses.json',g:'category',o:['Restaurants','Drinks & Coffee','Shopping & Retail','Attractions & Fun','Lodging','Services','Health & Wellness','Financial & Legal','Education & Government']},
  {k:'news',f:'news.html',t:'Local News',ic:'📰',j:'news.json',g:'group',o:['City Hall','Elections','Schools','Sports','Business','Health','Seniors','Public Safety','Weather','Around the County','Community']},
  {k:'directory',f:'directory.html',t:'Government & Schools',ic:'🏛️',j:'directory.json',g:'group',o:['Emergency & Public Safety','City of Cullman','Cullman County Government','Courts','Schools','Libraries','Community and County Organizations']},
  {k:'resources',f:'resources.html',t:'Resources',ic:'🤝',j:'resources.json',g:'group',o:['Crisis & Emergency','Seniors & Elderly','Food & SNAP','DHR Services','Child Care','Federal Programs','Legal Help','Mental Health','Housing']},
  {k:'nonprofits',f:'nonprofits.html',t:'Nonprofits',ic:'💙',j:'nonprofits.json',g:'group',o:['Helping Hands','Feeding Neighbors','Children and Youth','Health and Care','Safety and Recovery','Education and Learning']},
  {k:'wallace',f:'wallace.html',t:'Wallace State Guide',ic:'🎓',j:'wallace.json',g:'group',o:['Getting Started','Paying for College','Help in the Classroom','Careers and Training','Health and Wellness']},
  {k:'communities',f:'communities.html',t:'Communities',ic:'🌍',j:'community-network.json',g:'group',o:['Hanceville','Cullman','Good Hope','South Vinemont','Fairview','West Point','Holly Pond','Cold Springs / Bremen','Baileyton','Berlin','Colony','Dodge City','Garden City','Arab (Cullman portion)','Crane Hill / Smith Lake']}
];

var today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago'}).format(new Date());
var cur=document.body.getAttribute('data-page');
var cache={};
function get(p){if(!cache[p.k])cache[p.k]=fetch(p.j+'?v='+Math.floor(Date.now()/6e5)).then(function(r){return r.json();}).then(function(d){if(p.k==='news')d=d.map(function(e){e.name=e.headline;e.group=e.group||'Local News';return e;});return d;});return cache[p.k];}
function slug(s){return s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,' ').trim().replace(/ /g,'_');}
function el(t,c,x){var n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n;}
function safe(h){return /^(https:\/\/|tel:|mailto:|sms:)/i.test(String(h||''))?h:null;}

var M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],W=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function dd(s){var p=s.split('-').map(Number),x=new Date(Date.UTC(p[0],p[1]-1,p[2]));return{w:W[x.getUTCDay()],m:M[p[1]-1],d:p[2]};}
function fmt(e){var a=dd(e.start);if(!e.end||e.end===e.start)return a.w+', '+a.m+' '+a.d;var b=dd(e.end);return a.m+' '+a.d+' to '+(a.m===b.m?'':b.m+' ')+b.d;}

var nav=document.getElementById('tabs');
if(nav){
  var GR=[['Explore',['events','fun','eats','shops','businesses','communities']],['Community',['news','directory','resources','nonprofits']],['More',['wallace']]];
  var home=el('a',null,'🏠 Home');home.href='index.html';if(cur==='home')home.setAttribute('aria-current','page');nav.appendChild(home);
  GR.forEach(function(g){
    nav.appendChild(el('h2',null,g[0]));
    g[1].forEach(function(k){
      var p=PAGES.filter(function(x){return x.k===k;})[0];
      var a=el('a',null,p.ic+' '+p.t);
      a.href=p.f;
      if(p.k===cur)a.setAttribute('aria-current','page');
      nav.appendChild(a);
    });
  });
  if(P&&P.o){nav.appendChild(el('h2',null,'On this page'));var s=el('div','sub');P.o.forEach(function(g){var a=el('a',null,g);a.href='#'+slug(g);s.appendChild(a);});nav.appendChild(s);}
}
})();
