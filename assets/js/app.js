const REPO = 'minhhien1987/minhhien1987.github.io';
const BRANCH = 'main';
const LOCAL_DATA_URL = `data/site.json?v=${Date.now()}`;
let SITE_DATA = null;
let DATA_VERSION = Date.now();
let LAST_LOADED_AT = 0;
let CURRENT_LANG = localStorage.getItem('minhhien_lang') || 'vi';
let ACTIVE_PRODUCT_GALLERY = { item: null, images: [], index: 0 };
let ACTIVE_POST_GALLERY = { item: null, images: [], index: 0 };

const I18N = {
  vi: {
    announcement:'Nhận trao đổi đơn hàng may mặc theo mẫu và nhu cầu thực tế', announcementCta:'Liên hệ tư vấn',
    navAbout:'Giới thiệu',navServices:'Dịch vụ',navProducts:'Sản phẩm',navProcess:'Quy trình',navPosts:'Bài viết',navContact:'Liên hệ',manufacturingLabel:'MAY GIA CÔNG',aboutBrandPrefix:'VỀ',
    heroPrimary:'Nhận tư vấn đơn hàng',heroSecondary:'Xem sản phẩm',heroNote:'Tiếp nhận trao đổi linh hoạt theo từng nhu cầu thực tế',
    showcaseSmall:'CHỈN CHU TỪ CHI TIẾT',floatOneTitle:'Trao đổi rõ mẫu',floatOneText:'Dễ phối hợp hơn',floatTwoTitle:'Theo sát tiến độ',floatTwoText:'Chủ động cập nhật',
    aboutCard:'GARMENT CRAFT',aboutQuote:'Giá trị của một đơn hàng nằm ở sự kỹ lưỡng trong từng công đoạn.',aboutTitle:'Một đối tác gia công gần gũi, linh hoạt và có trách nhiệm.',aboutText:'Chúng tôi tiếp nhận nhiều nhóm sản phẩm theo mẫu và nhu cầu thực tế. Mục tiêu là giúp khách hàng có một đầu mối phối hợp thuận tiện, tiến độ minh bạch và sản phẩm đạt yêu cầu trước khi bàn giao.',aboutCheck1:'Trao đổi rõ về mẫu, chất liệu, số lượng và thời gian dự kiến.',aboutCheck2:'Chủ động cập nhật tiến độ trong quá trình thực hiện.',aboutCheck3:'Chú trọng độ hoàn thiện và tính đồng đều của thành phẩm.',
    servicesEyebrow:'NĂNG LỰC PHỤC VỤ',servicesTitle:'Những điều khách hàng cần ở một đối tác gia công.',servicesText:'Từng bước phối hợp được thiết kế để đơn giản, minh bạch và phù hợp với thực tế.',
    productsEyebrow:'SẢN PHẨM GIA CÔNG',productsTitle:'Các nhóm sản phẩm tiêu biểu.',productsCta:'Trao đổi nhu cầu',all:'Tất cả',featured:'Nổi bật',emptyProducts:'Chưa có sản phẩm trong nhóm này.',viewGallery:'Xem bộ ảnh',photos:'hình',photo:'hình',
    processEyebrow:'QUY TRÌNH PHỐI HỢP',processTitle:'Rõ từng bước, thuận tiện khi triển khai.',process1Title:'Tiếp nhận nhu cầu',process1Text:'Trao đổi loại sản phẩm, mẫu tham khảo, số lượng và thời gian mong muốn.',process2Title:'Thống nhất phương án',process2Text:'Làm rõ các yêu cầu cần thiết trước khi triển khai đơn hàng.',process3Title:'Gia công và theo dõi',process3Text:'Thực hiện theo kế hoạch và chủ động cập nhật tiến độ.',process4Title:'Kiểm tra và bàn giao',process4Text:'Rà soát thành phẩm trước khi đóng gói và bàn giao.',
    postsEyebrow:'BÀI VIẾT MỚI',postsTitle:'Thông tin và sản phẩm mới cập nhật.',readPost:'Đọc bài viết',emptyPosts:'Chưa có bài viết. Nội dung mới sẽ được cập nhật tại đây.',postDetail:'BÀI VIẾT',
    contactEyebrow:'LIÊN HỆ TRAO ĐỔI',contactTitle:'Cùng bắt đầu từ nhu cầu thực tế của đơn hàng.',contactText:'Hãy gửi thông tin cơ bản về sản phẩm, số lượng và thời gian mong muốn. {brand} sẽ liên hệ để trao đổi cụ thể hơn.',phoneLabel:'Điện thoại',addressLabel:'Địa chỉ',hoursLabel:'Thời gian làm việc',zaloCta:'Trao đổi nhanh qua Zalo',footerText:'Trang giới thiệu dịch vụ đặt may và gia công may mặc.'
  },
  en: {
    announcement:'Discuss garment orders based on your samples and practical requirements', announcementCta:'Contact us',
    navAbout:'About',navServices:'Services',navProducts:'Products',navProcess:'Process',navPosts:'Insights',navContact:'Contact',manufacturingLabel:'GARMENT MANUFACTURING',aboutBrandPrefix:'ABOUT',
    heroPrimary:'Discuss your order',heroSecondary:'View products',heroNote:'Flexible discussion tailored to your practical requirements',
    showcaseSmall:'REFINED IN EVERY DETAIL',floatOneTitle:'Clear sample review',floatOneText:'Easier collaboration',floatTwoTitle:'Progress tracking',floatTwoText:'Proactive updates',
    aboutCard:'GARMENT CRAFT',aboutQuote:'The value of each order is built through care at every stage.',aboutTitle:'An approachable, flexible and responsible manufacturing partner.',aboutText:'We accept multiple product lines based on samples and practical requirements. Our goal is to provide convenient coordination, transparent progress and products that meet expectations before delivery.',aboutCheck1:'Clear discussion of samples, materials, quantities and expected timelines.',aboutCheck2:'Proactive progress updates throughout production.',aboutCheck3:'A strong focus on finishing quality and consistency.',
    servicesEyebrow:'OUR CAPABILITIES',servicesTitle:'What customers expect from a garment manufacturing partner.',servicesText:'Each collaboration step is designed to be clear, practical and transparent.',
    productsEyebrow:'GARMENT PRODUCTS',productsTitle:'Representative product categories.',productsCta:'Discuss your requirements',all:'All',featured:'Featured',emptyProducts:'There are no products in this category yet.',viewGallery:'View gallery',photos:'photos',photo:'photo',
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
const isUploadPath = value => /^assets\/uploads\//i.test(String(value || '').trim());
function safeUrl(url='') {
  const value=String(url).trim();
  if(!/^(https?:\/\/|assets\/|\.\/|\/|data:image\/)/i.test(value)) return 'assets/images/product-tshirt.svg';
  if(isUploadPath(value)) return `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${value}?v=${DATA_VERSION}`;
  return value;
}
function itemImages(item, fallback='assets/images/product-tshirt.svg') {
  const values=Array.isArray(item?.images)?item.images:[];
  const combined=[...values,item?.image].filter(Boolean).map(safeUrl);
  const unique=[...new Set(combined)];
  return unique.length?unique:[fallback];
}
function icon(name){
  const paths={shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46A2 2 0 0 0 2.26 5.2l-.22 3.48a2 2 0 0 0 1.79 2.12l2.17.22V22h12V11.02l2.17-.22a2 2 0 0 0 1.79-2.12l-.22-3.48a2 2 0 0 0-1.36-1.74Z"/>',layers:'<path d="m12 3-8 4 8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/>','badge-check':'<path d="M12 2 15 5l4-.5.5 4 3 3-3 3-.5 4-4-.5-3 3-3-3-4 .5-.5-4-3-3 3-3 .5-4 4 .5Z"/><path d="m9 12 2 2 4-4"/>','clock-3':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l-3 2"/>'};
  return `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.shirt}</svg>`;
}
function formatDate(value){try{return new Intl.DateTimeFormat(CURRENT_LANG==='en'?'en-US':'vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(value));}catch{return ''}}
function applyStatic(){document.documentElement.lang=CURRENT_LANG;$$('[data-i18n]').forEach(el=>{el.textContent=tr(el.dataset.i18n)});$$('[data-lang]').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===CURRENT_LANG));}
function photoLabel(count){return `${count} ${count===1?tr('photo'):tr('photos')}`}
function render(){
  applyStatic();
  const {site={},services=[],products=[],posts=[]}=SITE_DATA||{};
  const brandFull=site.brand||`${site.shortBrand||'MINH HIỂN'} GARMENT`;
  const brandShort=site.shortBrand||brandFull;
  document.title=`${brandFull} | ${CURRENT_LANG==='en'?'Garment Manufacturing':'Gia công may mặc'}`;
  $$('[data-brand-full]').forEach(el=>el.textContent=brandFull);$$('[data-brand-short]').forEach(el=>el.textContent=brandShort);
  $('[data-brand-hero-eyebrow]').textContent=`${brandFull} · ${tr('manufacturingLabel')}`;$('[data-brand-about-eyebrow]').textContent=`${tr('aboutBrandPrefix')} ${brandFull}`;$('[data-brand-contact-text]').textContent=tr('contactText').replace('{brand}',brandFull);
  const heroImage=String(site.heroImage||'').trim();$('[data-hero-image]').classList.toggle('hidden',!heroImage);$('[data-default-hero-art]').classList.toggle('hidden',!!heroImage);if(heroImage)$('[data-hero-image]').src=safeUrl(heroImage);
  $('[data-tagline]').textContent=localized(site.tagline);$('[data-hero-title]').textContent=localized(site.heroTitle);$('[data-hero-description]').textContent=localized(site.heroDescription);
  $('[data-stats]').innerHTML=(site.stats||[]).map(s=>`<div class="stat"><strong>${escapeHtml(localized(s.value))}</strong><span>${escapeHtml(localized(s.label))}</span></div>`).join('');
  $('[data-services]').innerHTML=services.map(s=>`<article class="service-card reveal"><div class="service-icon">${icon(s.icon)}</div><h3>${escapeHtml(localized(s.title))}</h3><p>${escapeHtml(localized(s.description))}</p></article>`).join('');
  setupProducts(products);
  $('[data-posts]').innerHTML=posts.length?[...posts].sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt)).slice(0,6).map(p=>{const images=itemImages(p,'assets/images/blog-workshop.svg');return `<article class="blog-card reveal"><div class="blog-image-wrap"><img src="${images[0]}" alt="${escapeHtml(localized(p.title))}" loading="lazy">${images.length>1?`<span class="image-count-pill">${photoLabel(images.length)}</span>`:''}</div><div class="blog-body"><div class="blog-date">${formatDate(p.publishedAt)}</div><h3>${escapeHtml(localized(p.title))}</h3><p>${escapeHtml(localized(p.excerpt))}</p><button class="blog-link" type="button" data-open-post="${escapeHtml(p.id)}">${tr('readPost')} ↗</button></div></article>`;}).join(''):`<div class="empty">${tr('emptyPosts')}</div>`;
  $$('[data-open-post]').forEach(btn=>btn.onclick=()=>openPost(btn.dataset.openPost));
  $('[data-phone]').textContent=site.phone||'';$$('[data-phone-link]').forEach(a=>a.href=`tel:${String(site.phone||'').replace(/\D/g,'')}`);$('[data-email]').textContent=site.email||'';$('[data-email-link]').href=`mailto:${site.email||''}`;$('[data-address]').textContent=localized(site.address);$('[data-hours]').textContent=localized(site.workingHours);$$('[data-zalo-link]').forEach(a=>a.href=`https://zalo.me/${String(site.zalo||'').replace(/\D/g,'')}`);$('[data-year]').textContent=new Date().getFullYear();
}
function setupProducts(products){
  const categories=[];products.forEach(p=>{if(!categories.some(x=>x.key===p.categoryKey))categories.push({key:p.categoryKey,label:localized(p.category)})});
  const filters=[{key:'all',label:tr('all')},...categories];$('[data-product-filters]').innerHTML=filters.map((f,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${escapeHtml(f.key)}" type="button">${escapeHtml(f.label)}</button>`).join('');
  const draw=key=>{const list=key==='all'?products:products.filter(p=>p.categoryKey===key);$('[data-products]').innerHTML=list.length?[...list].sort((a,b)=>Number(b.featured)-Number(a.featured)).map(productCard).join(''):`<div class="empty">${tr('emptyProducts')}</div>`;bindProductCardActions();};
  draw('all');$$('[data-filter]').forEach(btn=>btn.onclick=()=>{$$('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');draw(btn.dataset.filter)});
}
function productCard(p){const images=itemImages(p);const dots=images.length>1?`<div class="product-dots">${images.map((_,i)=>`<span class="${i===0?'active':''}"></span>`).join('')}</div>`:'';const nav=images.length>1?'<div class="product-mini-nav"><button type="button" data-card-prev aria-label="Previous">‹</button><button type="button" data-card-next aria-label="Next">›</button></div>':'';return `<article class="product-card reveal" data-product-card="${escapeHtml(p.id)}" data-card-index="0"><div class="product-image"><button class="product-gallery-trigger" type="button" data-open-product="${escapeHtml(p.id)}" aria-label="${escapeHtml(tr('viewGallery'))}"><img data-card-image src="${images[0]}" alt="${escapeHtml(localized(p.title))}" loading="lazy"></button>${p.featured?`<span class="badge">${tr('featured')}</span>`:''}${images.length>1?`<span class="image-count-pill">${photoLabel(images.length)}</span>`:''}${nav}${dots}</div><div class="product-body"><small>${escapeHtml(localized(p.category))}</small><h3>${escapeHtml(localized(p.title))}</h3><p>${escapeHtml(localized(p.description))}</p><button class="gallery-link" type="button" data-open-product="${escapeHtml(p.id)}">${tr('viewGallery')} <span>↗</span></button></div></article>`;}
function bindProductCardActions(){$$('[data-open-product]').forEach(btn=>btn.onclick=e=>{e.preventDefault();openProductGallery(btn.dataset.openProduct)});$$('[data-product-card]').forEach(card=>{const item=(SITE_DATA.products||[]).find(p=>p.id===card.dataset.productCard);const images=itemImages(item);const move=delta=>{let index=(Number(card.dataset.cardIndex||0)+delta+images.length)%images.length;card.dataset.cardIndex=String(index);$('[data-card-image]',card).src=images[index];$$('.product-dots span',card).forEach((dot,i)=>dot.classList.toggle('active',i===index));};const prev=$('[data-card-prev]',card),next=$('[data-card-next]',card);if(prev)prev.onclick=e=>{e.stopPropagation();move(-1)};if(next)next.onclick=e=>{e.stopPropagation();move(1)};});}
function openProductGallery(id,index=0){const item=(SITE_DATA.products||[]).find(p=>p.id===id);if(!item)return;ACTIVE_PRODUCT_GALLERY={item,images:itemImages(item),index};renderProductGallery();$('[data-product-gallery-modal]').classList.add('open');}
function renderProductGallery(){const {item,images}=ACTIVE_PRODUCT_GALLERY;if(!item)return;const index=(ACTIVE_PRODUCT_GALLERY.index+images.length)%images.length;ACTIVE_PRODUCT_GALLERY.index=index;$('[data-product-gallery-image]').src=images[index];$('[data-product-gallery-title]').textContent=localized(item.title);$('[data-product-gallery-category]').textContent=localized(item.category);$('[data-product-gallery-description]').textContent=localized(item.description);$('[data-product-gallery-count]').textContent=`${index+1} / ${images.length}`;$('[data-product-gallery-thumbs]').innerHTML=images.map((src,i)=>`<button class="gallery-thumb ${i===index?'active':''}" type="button" data-gallery-thumb="${i}"><img src="${src}" alt=""></button>`).join('');$$('[data-gallery-thumb]').forEach(btn=>btn.onclick=()=>{ACTIVE_PRODUCT_GALLERY.index=Number(btn.dataset.galleryThumb);renderProductGallery()});$$('[data-product-gallery-step]').forEach(btn=>btn.classList.toggle('hidden',images.length<2));}
function stepProductGallery(delta){ACTIVE_PRODUCT_GALLERY.index+=delta;renderProductGallery()}
function openPost(id){const post=(SITE_DATA.posts||[]).find(p=>p.id===id);if(!post)return;ACTIVE_POST_GALLERY={item:post,images:itemImages(post,'assets/images/blog-workshop.svg'),index:0};$('[data-post-modal-title]').textContent=localized(post.title);$('[data-post-modal-content]').textContent=localized(post.content);renderPostGallery();$('[data-post-modal]').classList.add('open');}
function renderPostGallery(){const {images}=ACTIVE_POST_GALLERY;if(!images.length)return;const index=(ACTIVE_POST_GALLERY.index+images.length)%images.length;ACTIVE_POST_GALLERY.index=index;$('[data-post-modal-image]').src=images[index];$('[data-post-gallery-count]').textContent=`${index+1} / ${images.length}`;$('[data-post-modal-thumbs]').innerHTML=images.map((src,i)=>`<button class="gallery-thumb ${i===index?'active':''}" type="button" data-post-gallery-thumb="${i}"><img src="${src}" alt=""></button>`).join('');$$('[data-post-gallery-thumb]').forEach(btn=>btn.onclick=()=>{ACTIVE_POST_GALLERY.index=Number(btn.dataset.postGalleryThumb);renderPostGallery()});$$('[data-post-gallery-step]').forEach(btn=>btn.classList.toggle('hidden',images.length<2));}
function stepPostGallery(delta){ACTIVE_POST_GALLERY.index+=delta;renderPostGallery()}
async function fetchLatestData(){
  const remote=`https://raw.githubusercontent.com/${REPO}/${BRANCH}/data/site.json?v=${Date.now()}`;
  try{const response=await fetch(remote,{cache:'no-store'});if(response.ok)return await response.json();}catch(error){console.warn('Remote data fallback:',error)}
  const response=await fetch(`data/site.json?v=${Date.now()}`,{cache:'no-store'});if(!response.ok)throw new Error('Unable to load website data.');return response.json();
}
async function load(){const preview=localStorage.getItem('minhhien_demo_data');if(location.search.includes('preview=1')&&preview){SITE_DATA=JSON.parse(preview);DATA_VERSION=Date.now();render();return;}SITE_DATA=await fetchLatestData();DATA_VERSION=Date.now();LAST_LOADED_AT=Date.now();render();}
$$('[data-lang]').forEach(btn=>btn.onclick=()=>{CURRENT_LANG=btn.dataset.lang;localStorage.setItem('minhhien_lang',CURRENT_LANG);if(SITE_DATA)render()});$('[data-menu-toggle]').onclick=()=>$('[data-nav]').classList.toggle('open');$$('[data-nav] a').forEach(a=>a.onclick=()=>$('[data-nav]').classList.remove('open'));$('[data-post-close]').onclick=()=>$('[data-post-modal]').classList.remove('open');$('[data-post-modal]').onclick=e=>{if(e.target.hasAttribute('data-post-modal'))e.currentTarget.classList.remove('open')};$$('[data-post-gallery-step]').forEach(btn=>btn.onclick=()=>stepPostGallery(Number(btn.dataset.postGalleryStep)));$$('[data-product-gallery-close]').forEach(btn=>btn.onclick=()=>$('[data-product-gallery-modal]').classList.remove('open'));$('[data-product-gallery-modal]').onclick=e=>{if(e.target.hasAttribute('data-product-gallery-modal'))e.currentTarget.classList.remove('open')};$$('[data-product-gallery-step]').forEach(btn=>btn.onclick=()=>stepProductGallery(Number(btn.dataset.productGalleryStep)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('[data-post-modal]').classList.remove('open');$('[data-product-gallery-modal]').classList.remove('open')}if($('[data-product-gallery-modal]').classList.contains('open')&&e.key==='ArrowLeft')stepProductGallery(-1);if($('[data-product-gallery-modal]').classList.contains('open')&&e.key==='ArrowRight')stepProductGallery(1);});
window.addEventListener('focus',()=>{if(Date.now()-LAST_LOADED_AT>15000&&!$('[data-product-gallery-modal]').classList.contains('open')&&!$('[data-post-modal]').classList.contains('open'))load().catch(console.error)});
load().catch(error=>{console.error(error);document.body.insertAdjacentHTML('beforeend',`<div class="empty" style="position:fixed;left:15px;bottom:15px;z-index:80">${escapeHtml(error.message)}</div>`)});
