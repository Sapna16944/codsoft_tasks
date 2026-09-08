/* ============================================================
   Fieldnotes — app logic
   ============================================================ */

const PAGE_SIZE = 6;
let activeCategory = "all";
let visibleCount = PAGE_SIZE;

const SOCIAL_LINKS = [
  { label:"Twitter / X", icon:"𝕏", url:"https://twitter.com" },
  { label:"LinkedIn", icon:"in", url:"https://linkedin.com" },
  { label:"RSS", icon:"⟳", url:"#" }
];

/* ---------------- Helpers ---------------- */
function fmtDate(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { month:"short", day:"numeric", year:"numeric" });
}
function readTime(paragraphs){
  const words = paragraphs.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
function initials(name){
  return name.split(" ").map(p => p[0]).join("").slice(0,2).toUpperCase();
}
function escapeHtml(str){
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

/* ---------------- Cover art ---------------- */
function coverStyle(catId){
  const cat = getCategory(catId);
  return `background:${cat.gradient};`;
}
function coverHtml(catId, size){
  const cat = getCategory(catId);
  return `
    <div class="${size === 'sm' ? 'card-cover' : size === 'lg' ? 'hero-cover' : 'detail-hero'}" style="${coverStyle(catId)}">
      <span class="cover-letter">${cat.letter}</span>
      ${size === 'lg' ? `<span class="hero-badge">Featured</span>` : ''}
      ${size === 'sm' ? `<span class="card-tag">${cat.label}</span>` : ''}
    </div>`;
}

/* ---------------- Nav / footer category lists ---------------- */
function renderNavCategories(){
  const navHtml = CATEGORIES.map(c => `<a href="#home" onclick="setCategory('${c.id}')">${c.label}</a>`).join("");
  document.getElementById("navCats").innerHTML = navHtml;
  document.getElementById("footerCats").innerHTML = CATEGORIES.map(c =>
    `<a href="#home" onclick="setCategory('${c.id}')">${c.label}</a>`).join("");
}
function renderFooterSocial(){
  document.getElementById("footerSocial").innerHTML = SOCIAL_LINKS.map(s =>
    `<a class="icon-btn" href="${s.url}" target="_blank" rel="noopener" title="${s.label}" aria-label="${s.label}">${s.icon}</a>`
  ).join("");
}

/* ---------------- Chips ---------------- */
function renderChips(){
  const all = [{ id:"all", label:"All articles" }, ...CATEGORIES];
  document.getElementById("chipRow").innerHTML = all.map(c =>
    `<button class="chip ${activeCategory === c.id ? 'active' : ''}" onclick="setCategory('${c.id}')">${c.label}</button>`
  ).join("");
}
function setCategory(id){
  activeCategory = id;
  visibleCount = PAGE_SIZE;
  renderChips();
  renderGrid();
  if(location.hash !== "#home") location.hash = "#home";
  document.getElementById("homeView").scrollIntoView({behavior:"smooth", block:"start"});
}

/* ---------------- Hero (featured post) ---------------- */
function renderHero(){
  const featured = POSTS.find(p => p.featured) || POSTS[0];
  const cat = getCategory(featured.category);
  document.getElementById("heroSection").innerHTML = `
    <div class="hero-card">
      ${coverHtml(featured.category, 'lg')}
      <div class="hero-body">
        <span class="hero-cat">${cat.label}</span>
        <h1 class="hero-title"><a href="#post/${featured.id}">${featured.title}</a></h1>
        <p class="hero-excerpt">${featured.excerpt}</p>
        <div class="hero-meta">
          <span>${featured.author}</span>
          <span>·</span>
          <span>${fmtDate(featured.date)}</span>
          <span>·</span>
          <span>${readTime(featured.content)} min read</span>
        </div>
        <a class="hero-cta" href="#post/${featured.id}">Read the article →</a>
      </div>
    </div>`;
}

/* ---------------- Posts grid ---------------- */
function filteredPosts(){
  return activeCategory === "all" ? POSTS : POSTS.filter(p => p.category === activeCategory);
}
function renderGrid(){
  const list = filteredPosts();
  const visible = list.slice(0, visibleCount);
  document.getElementById("postsGrid").innerHTML = visible.map(cardHtml).join("");
  document.getElementById("resultCount").textContent =
    `Showing ${visible.length} of ${list.length} article${list.length === 1 ? '' : 's'}`;

  const btn = document.getElementById("loadMoreBtn");
  const msg = document.getElementById("allLoadedMsg");
  if(visibleCount >= list.length){
    btn.style.display = "none";
    msg.style.display = list.length ? "block" : "none";
  } else {
    btn.style.display = "inline-block";
    msg.style.display = "none";
  }
}
function cardHtml(p){
  const cat = getCategory(p.category);
  return `
    <article class="post-card">
      ${coverHtml(p.category, 'sm')}
      <div class="card-body">
        <h3 class="card-title"><a href="#post/${p.id}">${p.title}</a></h3>
        <p class="card-excerpt">${p.excerpt}</p>
        <div class="card-meta">
          <span class="author">${p.author}</span>
          <span>${fmtDate(p.date)}</span>
        </div>
      </div>
    </article>`;
}
function loadMore(){
  visibleCount += PAGE_SIZE;
  renderGrid();
}

/* ---------------- Detail view ---------------- */
async function renderDetail(id){
  const post = POSTS.find(p => p.id === id);
  if(!post){ location.hash = "#home"; return; }
  const cat = getCategory(post.category);

  const related = POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0,3);
  const fallback = POSTS.filter(p => p.id !== post.id && !related.includes(p)).slice(0, 3 - related.length);
  const relatedPosts = [...related, ...fallback];

  document.getElementById("detailView").innerHTML = `
    <div class="detail-hero" style="${coverStyle(post.category)}">
      <span class="cover-letter">${cat.letter}</span>
      <div class="detail-hero-inner">
        <a class="back-link" href="#home" onclick="setCategory('all')">← Back to all articles</a>
        <span class="detail-badge">${cat.label}</span>
        <h1 class="detail-title">${post.title}</h1>
      </div>
    </div>

    <div class="detail-body-wrap">
      <div class="detail-meta">
        <span class="comment-avatar" style="width:34px;height:34px;font-size:12.5px;">${initials(post.author)}</span>
        <span class="author-name">${post.author}</span>
        <span>·</span>
        <span>${fmtDate(post.date)}</span>
        <span>·</span>
        <span>${readTime(post.content)} min read</span>
      </div>

      <div class="detail-content">
        ${post.content.map(p => `<p>${p}</p>`).join("")}
      </div>

      <div class="tag-row">
        ${post.tags.map(t => `<span class="tag-pill" onclick="searchFromTag('${t}')">#${t}</span>`).join("")}
      </div>

      <div class="share-row">
        <span class="share-label">Share:</span>
        <button class="share-btn" title="Share on X" onclick="shareTo('x','${post.id}','${escapeHtml(post.title)}')">𝕏</button>
        <button class="share-btn" title="Share on LinkedIn" onclick="shareTo('linkedin','${post.id}','${escapeHtml(post.title)}')">in</button>
        <button class="share-btn" title="Share on Facebook" onclick="shareTo('facebook','${post.id}','${escapeHtml(post.title)}')">f</button>
        <button class="share-btn" id="copyLinkBtn" title="Copy link" onclick="copyLink('${post.id}')">🔗</button>
      </div>
    </div>

    <section class="related-section">
      <h2 class="related-title">You might also like</h2>
      <div class="related-grid">${relatedPosts.map(cardHtml).join("")}</div>
    </section>

    <section class="comments-section">
      <h2 class="comments-title" id="commentsTitle">Comments</h2>
      <div class="comment-form">
        <div class="comment-form-row">
          <input type="text" id="commentName" placeholder="Your name">
        </div>
        <div class="comment-form-row">
          <textarea id="commentText" placeholder="Share your thoughts…"></textarea>
        </div>
        <button class="comment-submit" onclick="submitComment('${post.id}')">Post comment</button>
      </div>
      <div id="commentsList"></div>
    </section>
  `;
  await renderComments(post.id);
}

/* ---------------- Comments (persisted) ---------------- */
async function getComments(postId){
  try{
    const res = await window.storage.get("blog:comments:" + postId, false);
    return res ? JSON.parse(res.value) : [];
  }catch(e){
    return [];
  }
}
async function saveComments(postId, comments){
  try{
    await window.storage.set("blog:comments:" + postId, JSON.stringify(comments), false);
  }catch(e){ console.error("Could not save comments", e); }
}
async function renderComments(postId){
  const comments = await getComments(postId);
  document.getElementById("commentsTitle").textContent = `Comments (${comments.length})`;
  const list = document.getElementById("commentsList");
  if(comments.length === 0){
    list.innerHTML = `<p class="no-comments">No comments yet — be the first to share your thoughts.</p>`;
    return;
  }
  list.innerHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-avatar">${initials(c.name)}</div>
      <div>
        <span class="comment-name">${escapeHtml(c.name)}</span><span class="comment-date">${fmtDate(c.date)}</span>
        <p class="comment-text">${escapeHtml(c.text)}</p>
      </div>
    </div>
  `).join("");
}
async function submitComment(postId){
  const nameEl = document.getElementById("commentName");
  const textEl = document.getElementById("commentText");
  const name = nameEl.value.trim();
  const text = textEl.value.trim();
  if(!name || !text){ (name ? textEl : nameEl).focus(); return; }

  const comments = await getComments(postId);
  comments.unshift({ name, text, date: new Date().toISOString().slice(0,10) });
  await saveComments(postId, comments);
  nameEl.value = ""; textEl.value = "";
  renderComments(postId);
}

/* ---------------- Sharing ---------------- */
function shareTo(network, postId, title){
  const url = location.origin + location.pathname + "#post/" + postId;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const targets = {
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  };
  window.open(targets[network], "_blank", "noopener,width=600,height=520");
}
function copyLink(postId){
  const url = location.origin + location.pathname + "#post/" + postId;
  const btn = document.getElementById("copyLinkBtn");
  const done = () => {
    btn.classList.add("copied");
    btn.textContent = "✓";
    setTimeout(() => { btn.classList.remove("copied"); btn.textContent = "🔗"; }, 1600);
  };
  if(navigator.clipboard){
    navigator.clipboard.writeText(url).then(done).catch(done);
  } else {
    done();
  }
}

/* ---------------- Search ---------------- */
function openSearch(){
  document.getElementById("searchOverlay").classList.add("open");
  const input = document.getElementById("searchInput");
  input.value = "";
  renderSearchResults();
  setTimeout(() => input.focus(), 50);
}
function closeSearch(){
  document.getElementById("searchOverlay").classList.remove("open");
}
function searchFromTag(tag){
  openSearch();
  document.getElementById("searchInput").value = tag;
  renderSearchResults();
}
function renderSearchResults(){
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const container = document.getElementById("searchResults");
  if(!q){
    container.innerHTML = `<div class="search-empty">Start typing to search titles, categories and tags.</div>`;
    return;
  }
  const results = POSTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    getCategory(p.category).label.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
  if(results.length === 0){
    container.innerHTML = `<div class="search-empty">No articles match "${escapeHtml(q)}".</div>`;
    return;
  }
  container.innerHTML = results.map(p => `
    <div class="search-result-item" onclick="goToPostFromSearch('${p.id}')">
      <div class="sr-cover" style="${coverStyle(p.category)}"></div>
      <div>
        <div class="sr-title">${p.title}</div>
        <div class="sr-meta">${getCategory(p.category).label} · ${fmtDate(p.date)}</div>
      </div>
    </div>
  `).join("");
}
function goToPostFromSearch(id){
  closeSearch();
  location.hash = "#post/" + id;
}
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape") closeSearch();
  if((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"){ e.preventDefault(); openSearch(); }
});

/* ---------------- Newsletter (demo only) ---------------- */
function subscribeNewsletter(){
  const input = document.getElementById("newsletterEmail");
  const msg = document.getElementById("newsletterMsg");
  const val = input.value.trim();
  if(!val || !val.includes("@")){
    msg.textContent = "Enter a valid email to subscribe.";
    msg.style.color = "var(--danger)";
    return;
  }
  msg.textContent = "You're on the list — thanks for subscribing!";
  msg.style.color = "var(--accent)";
  input.value = "";
}

/* ---------------- Theme ---------------- */
async function toggleTheme(){
  const isDark = document.documentElement.classList.toggle("dark");
  document.getElementById("themeIconSun").style.display = isDark ? "none" : "block";
  document.getElementById("themeIconMoon").style.display = isDark ? "block" : "none";
  try{ await window.storage.set("blog:theme", isDark ? "dark" : "light", false); }catch(e){}
}
async function initTheme(){
  let theme = "light";
  try{
    const res = await window.storage.get("blog:theme", false);
    if(res) theme = res.value;
  }catch(e){}
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  document.getElementById("themeIconSun").style.display = isDark ? "none" : "block";
  document.getElementById("themeIconMoon").style.display = isDark ? "block" : "none";
}

/* ---------------- Mobile menu ---------------- */
function toggleMobileMenu(){
  document.getElementById("navLinks").classList.toggle("open");
}
function closeMobileMenu(){
  document.getElementById("navLinks").classList.remove("open");
}

/* ---------------- Router ---------------- */
function route(){
  const hash = location.hash || "#home";
  const homeView = document.getElementById("homeView");
  const detailView = document.getElementById("detailView");
  window.scrollTo({ top: 0, behavior: "auto" });

  if(hash.startsWith("#post/")){
    const id = hash.replace("#post/", "");
    homeView.style.display = "none";
    detailView.style.display = "block";
    renderDetail(id);
  } else {
    detailView.style.display = "none";
    homeView.style.display = "block";
  }
  closeMobileMenu();
}
window.addEventListener("hashchange", route);

/* ---------------- Init ---------------- */
async function init(){
  document.getElementById("year").textContent = new Date().getFullYear();
  await initTheme();
  renderNavCategories();
  renderFooterSocial();
  renderChips();
  renderHero();
  renderGrid();
  route();
}
init();
