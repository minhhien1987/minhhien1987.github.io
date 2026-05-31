const DATA_URL = `data/site.json?v=${Date.now()}`;
let SITE_DATA = null;
let CURRENT_LANG = localStorage.getItem('minhhien_lang') || 'vi';

const I18N = {
  vi: {
    announcement:'Nhận trao đổi đơn hàng may mặc theo mẫu và nhu cầu thực tế', announcementCta:'Liên hệ tư vấn',
    navAbout:'Giới thiệu',navServices:'Dịch vụ',navProducts:'Sản phẩm',navProcess:'Quy trình',navPosts:'Bài viết',navContact:'Liên hệ',manufacturingLabel:'MAY GIA CÔNG',aboutBrandPrefix:'VỀ',
    heroEyebrow:'MINH HIỂN GARMENT · MAY GIA CÔNG',heroPrimary:'Nhận tư vấn đơn hàng',heroSecondary:'Xem sản phẩm',heroNote:'Tiếp nhận trao đổi linh hoạt theo từng nhu cầu thực tế',
    showcaseSmall:'CHỈN CHU TỪ CHI TIẾT',floatOneTitle:'Trao đổi rõ mẫu',floatOneText:'Dễ phối hợp hơn',floatTwoTitle:'Theo sát tiến độ',floatTwoText:'Chủ động cập nhật',
    aboutCard:'GARMENT CRAFT',aboutQuote:'Giá trị của một đơn hàng nằm ở sự kỹ lưỡng trong từng công đoạn.',aboutEyebrow:'VỀ MINH HIỂN GARMENT',aboutTitle:'Một đối tác gia công gần gũi, linh hoạt và có trách nhiệm.',aboutText:'Chúng tôi tiếp nhận nhiều nhóm sản phẩm theo mẫu và nhu cầu thực tế. Mục tiêu là giúp khách hàng có một đầu mối phối hợp thuận tiện, tiến độ minh bạch và sản phẩm đạt yêu cầu trước khi bàn giao.',aboutCheck1:'Trao đổi rõ về mẫu, chất liệu, số lượng và thời gian dự kiến.',aboutCheck2:'Chủ động cập nhật tiến độ trong quá trình thực hiện.',aboutCheck3:'Chú trọng độ hoàn thiện và tính đồng đều của thành phẩm.',
    servicesEyebrow:'NĂNG LỰC PHỤC VỤ',servicesTitle:'Những điều khách hàng cần ở một đối tác gia công.',servicesText:'Từng bước phối hợp được thiết kế để đơn giản, minh bạch và phù hợp với thực tế.',
    productsEyebrow:'SẢN PHẨM GIA CÔNG',productsTitle:'Các nhóm sản phẩm tiêu biểu.',productsCta:'Trao đổi nhu cầu',all:'Tất cả',featured:'Nổi bật',emptyProducts:'Chưa có sản phẩm trong nhóm này.',
    processEyebrow:'QUY TRÌNH PHỐI HỢP',processTitle:'Rõ từng bước, thuận tiện khi triển khai.',process1Title:'Tiếp nhận nhu cầu',process1Text:'Trao đổi loại sản phẩm, mẫu tham khảo, số lượng và thời gian mong muốn.',process2Title:'Thống nhất phương án',process2Text:'Làm rõ các yêu cầu cần thiết trước khi triển khai đơn hàng.',process3Title:'Gia công và theo dõi',process3Text:'Thực hiện theo kế hoạch và chủ động cập nhật tiến độ.',process4Title:'Kiểm tra và bàn giao',process4Text:'Rà soát thành phẩm trước khi đóng gói và bàn giao.',
    postsEyebrow:'BÀI VIẾT MỚI',postsTitle:'Thông tin và sản phẩm mới cập nhật.',readPost:'Đọc bài viết',emptyPosts:'Chưa có bài viết. Nội dung mới sẽ được cập nhật tại đây.',postDetail:'BÀI VIẾT',
    contactEyebrow:'LIÊN HỆ TRAO ĐỔI',contactTitle:'Cùng bắt đầu từ nhu cầu thực tế của đơn hàng.',contactText:'Hãy gửi thông tin cơ bản về sản phẩm, số lượng và thời gian mong muốn. {brand} sẽ liên hệ để trao đổi cụ thể hơn.',phoneLabel:'Điện thoại',addressLabel:'Địa chỉ',hoursLabel:'Thời gian làm việc',zaloCta:'Trao đổi nhanh qua Zalo',footerText:'Trang giới thiệu dịch vụ đặt may và gia công may mặc.'
  },
  en: {
    announcement:'Discuss garment orders based on your samples and practical requirements', announcementCta:'Contact us',
    navAbout:'About',navServices:'Services',navProducts:'Products',navProcess:'Process',navPosts:'Insights',navContact:'Contact',manufacturingLabel:'GARMENT MANUFACTURING',aboutBrandPrefix:'ABOUT',
    heroEyebrow:'MINH HIEN GARMENT · GARMENT MANUFACTURING',heroPrimary:'Discuss your order',heroSecondary:'View products',heroNote:'Flexible discussion tailored to your practical requirements',
    showcaseSmall:'REFINED IN EVERY DETAIL',floatOneTitle:'Clear sample review',floatOneText:'Easier collaboration',floatTwoTitle:'Progress tracking',floatTwoText:'Proactive updates',
    aboutCard:'GARMENT CRAFT',aboutQuote:'The value of each order is built through care at every stage.',aboutEyebrow:'ABOUT MINH HIEN GARMENT',aboutTitle:'An approachable, flexible and responsible manufacturing partner.',aboutText:'We accept multiple product lines based on samples and practical requirements. Our goal is to provide convenient coordination, transparent progress and products that meet expectations before delivery.',aboutCheck1:'Clear discussion of samples, materials, quantities and expected timelines.',aboutCheck2:'Proactive progress updates throughout production.',aboutCheck3:'A strong focus on finishing quality and consistency.',
    servicesEyebrow:'OUR CAPABILITIES',servicesTitle:'What customers expect from a garment manufacturing partner.',servicesText:'Each collaboration step is designed to be clear, practical and transparent.',
    productsEyebrow:'GARMENT PRODUCTS',productsTitle:'Representative product categories.',productsCta:'Discuss your requirements',all:'All',featured:'Featured',emptyProducts:'There are no products in this category yet.',
    processEyebrow:'COLLABORATION PROCESS',processTitle:'Clear steps for convenient implementation.',process1Title:'Requirement intake',process1Text:'Discuss the product type, reference samples, quantities and preferred timeline.',process2Title:'Plan alignment',process2Text:'Clarify the requirements before production begins.',process3Title:'Production and tracking',process3Text:'Follow the agreed plan with proactive progress updates.',process4Title:'Inspection and delivery',process4Text:'Review finished products before packing and delivery.',
    postsEyebrow:'LATEST INSIGHTS',postsTitle:'Recently updated information and products.',readPost:'Read article',emptyPosts:'No articles yet. New content will be updated here.',postDetail:'ARTICLE',
    contactEyebrow:'GET IN TOUCH',contactTitle:'Let us start with your practical order requirements.',contactText:'Share the basic product information, quantities and expected timeline. {brand} will contact you for a more detailed discussion.',phoneLabel:'Phone',addressLabel:'Address',hoursLabel:'Working hours',zaloCta:'Chat quickly via Zalo',footerText:'Made-to-order and garment manufacturing service introduction.'
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const tr = key => I18N[CURRENT_LANG][key] || I18N.vi[key] || key;
const localized = value => value && typeof value === 'object' ? (value[CURRENT_LANG] || value.vi || value.en || '') : (value || '');
const escapeHtml = (value='') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const safeUrl = (url='') => /^(https?:\/\/|assets\/|\.\/|\/|data:image\/)/i.test(String(url).trim()) ? String(url).trim() : 'assets/images/product-tshirt.svg';

function icon(name){
  const paths={shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46A2 2 0 0 0 2.26 5.2l-.22 3.48a2 2 0 0 0 1.79 2.12l2.17.22V22h12V11.02l2.17-.22a2 2 0 0 0 1.79-2.12l-.22-3.48a2 2 0 0 0-1.36-1.74Z"/>',layers:'<path d="m12 3-8 4 8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/>','badge-check':'<path d="M12 2 15 5l4-.5.5 4 3 3-3 3-.5 4-4-.5-3 3-3-3-4 .5-.5-4-3-3 3-3 .5-4 4 .5Z"/><path d="m9 12 2 2 4-4"/>','clock-3':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l-3 2"/>'};
  return `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.shirt}</svg>`;
}
function formatDate(value){try{return new Intl.DateTimeFormat(CURRENT_LANG==='en'?'en-US':'vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(value));}catch{return ''}}
function applyStatic(){
  document.documentElement.lang=CURRENT_LANG;
  $$('[data-i18n]').forEach(el=>{el.textContent=tr(el.dataset.i18n)});
  $$('[data-lang]').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===CURRENT_LANG));
}
function render(){
  applyStatic();
  const {site,services=[],products=[],posts=[]}=SITE_DATA;
  const brandFull=site.brand||`${site.shortBrand||'MINH HIỂN'} GARMENT`;
  const brandShort=site.shortBrand||brandFull;
  document.title=`${brandFull} | ${CURRENT_LANG==='en'?'Garment Manufacturing':'Gia công may mặc'}`;
  $$('[data-brand-full]').forEach(el=>el.textContent=brandFull);
  $$('[data-brand-short]').forEach(el=>el.textContent=brandShort);
  $('[data-brand-hero-eyebrow]').textContent=`${brandFull} · ${tr('manufacturingLabel')}`;
  $('[data-brand-about-eyebrow]').textContent=`${tr('aboutBrandPrefix')} ${brandFull}`;
  $('[data-brand-contact-text]').textContent=tr('contactText').replace('{brand}',brandFull);
  const heroImage=String(site.heroImage||'').trim();
  $('[data-hero-image]').classList.toggle('hidden',!heroImage);
  $('[data-default-hero-art]').classList.toggle('hidden',!!heroImage);
  if(heroImage)$('[data-hero-image]').src=safeUrl(heroImage);
  $('[data-tagline]').textContent=localized(site.tagline);
  $('[data-hero-title]').textContent=localized(site.heroTitle);
  $('[data-hero-description]').textContent=localized(site.heroDescription);
  $('[data-stats]').innerHTML=(site.stats||[]).map(s=>`<div class="stat"><strong>${escapeHtml(localized(s.value))}</strong><span>${escapeHtml(localized(s.label))}</span></div>`).join('');
  $('[data-services]').innerHTML=services.map(s=>`<article class="service-card reveal"><div class="service-icon">${icon(s.icon)}</div><h3>${escapeHtml(localized(s.title))}</h3><p>${escapeHtml(localized(s.description))}</p></article>`).join('');
  setupProducts(products);
  $('[data-posts]').innerHTML=posts.length? [...posts].sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt)).slice(0,6).map(p=>`<article class="blog-card reveal"><img src="${safeUrl(p.image)}" alt="${escapeHtml(localized(p.title))}"><div class="blog-body"><div class="blog-date">${formatDate(p.publishedAt)}</div><h3>${escapeHtml(localized(p.title))}</h3><p>${escapeHtml(localized(p.excerpt))}</p><button class="blog-link" type="button" data-open-post="${escapeHtml(p.id)}">${tr('readPost')} ↗</button></div></article>`).join(''):`<div class="empty">${tr('emptyPosts')}</div>`;
  $$('[data-open-post]').forEach(btn=>btn.onclick=()=>openPost(btn.dataset.openPost));
  $('[data-phone]').textContent=site.phone; $$('[data-phone-link]').forEach(a=>a.href=`tel:${String(site.phone).replace(/\D/g,'')}`);
  $('[data-email]').textContent=site.email; $('[data-email-link]').href=`mailto:${site.email}`;
  $('[data-address]').textContent=localized(site.address); $('[data-hours]').textContent=localized(site.workingHours);
  $$('[data-zalo-link]').forEach(a=>a.href=`https://zalo.me/${String(site.zalo).replace(/\D/g,'')}`);
  $('[data-year]').textContent=new Date().getFullYear();
}
function setupProducts(products){
  const categories=[]; products.forEach(p=>{if(!categories.some(x=>x.key===p.categoryKey))categories.push({key:p.categoryKey,label:localized(p.category)})});
  const filters=[{key:'all',label:tr('all')},...categories];
  $('[data-product-filters]').innerHTML=filters.map((f,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${escapeHtml(f.key)}" type="button">${escapeHtml(f.label)}</button>`).join('');
  const draw=key=>{const list=key==='all'?products:products.filter(p=>p.categoryKey===key);$('[data-products]').innerHTML=list.length?[...list].sort((a,b)=>Number(b.featured)-Number(a.featured)).map(p=>`<article class="product-card reveal"><div class="product-image"><img src="${safeUrl(p.image)}" alt="${escapeHtml(localized(p.title))}">${p.featured?`<span class="badge">${tr('featured')}</span>`:''}</div><div class="product-body"><small>${escapeHtml(localized(p.category))}</small><h3>${escapeHtml(localized(p.title))}</h3><p>${escapeHtml(localized(p.description))}</p></div></article>`).join(''):`<div class="empty">${tr('emptyProducts')}</div>`};
  draw('all'); $$('[data-filter]').forEach(btn=>btn.onclick=()=>{$$('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');draw(btn.dataset.filter)});
}
function openPost(id){const post=(SITE_DATA.posts||[]).find(p=>p.id===id);if(!post)return;$('[data-post-modal-image]').src=safeUrl(post.image);$('[data-post-modal-title]').textContent=localized(post.title);$('[data-post-modal-content]').textContent=localized(post.content);$('[data-post-modal]').classList.add('open');}
async function load(){
  const preview=localStorage.getItem('minhhien_demo_data');
  if(location.search.includes('preview=1')&&preview){SITE_DATA=JSON.parse(preview);render();return;}
  const response=await fetch(DATA_URL,{cache:'no-store'}); if(!response.ok)throw new Error('Unable to load website data.'); SITE_DATA=await response.json(); render();
}
$$('[data-lang]').forEach(btn=>btn.onclick=()=>{CURRENT_LANG=btn.dataset.lang;localStorage.setItem('minhhien_lang',CURRENT_LANG);if(SITE_DATA)render()});
$('[data-menu-toggle]').onclick=()=> $('[data-nav]').classList.toggle('open');
$$('[data-nav] a').forEach(a=>a.onclick=()=> $('[data-nav]').classList.remove('open'));
$('[data-post-close]').onclick=()=> $('[data-post-modal]').classList.remove('open');
$('[data-post-modal]').onclick=e=>{if(e.target.hasAttribute('data-post-modal'))e.currentTarget.classList.remove('open')};
load().catch(error=>{console.error(error);document.body.insertAdjacentHTML('beforeend',`<div class="empty" style="position:fixed;left:15px;bottom:15px;z-index:80">${escapeHtml(error.message)}</div>`)});
