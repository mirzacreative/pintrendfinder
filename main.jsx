
import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Search, TrendingUp, Copy, Check, Sparkles, ShieldCheck, Mail, FileText, HelpCircle, ArrowRight, Pin, Flame, Home, Menu, X, Target, Users, BookOpen } from 'lucide-react'
import './styles.css'

const articles = [
  { category:'Pinterest SEO', title:'How to Find Trending Pinterest Keywords in 2026', excerpt:'Learn how creators use Pinterest keyword research to increase impressions, saves, and website traffic.', body:[
    'Pinterest SEO is important for creators, bloggers, Etsy sellers, and digital product businesses because Pinterest users actively search for ideas, products, and inspiration.',
    'Start by searching broad keywords directly on Pinterest and studying autocomplete suggestions. These suggestions show what users are already searching for and can help you find long-tail keyword opportunities.',
    'Seasonal keywords such as Ramadan printables, summer outfit ideas, wedding inspiration, Christmas planner, and holiday recipes can perform well during peak seasons.',
    'Evergreen keywords like home decor, meal prep, digital planner, and budget tracker can bring traffic throughout the year.',
    'Consistency, fresh pins, and keyword-rich board names can improve long-term Pinterest growth.'
  ]},
  { category:'Etsy Marketing', title:'Pinterest SEO Tips for Etsy Sellers & Digital Creators', excerpt:'Use Pinterest to drive traffic to Etsy listings with optimized pin titles, descriptions, and boards.', body:[
    'Pinterest is one of the best traffic sources for Etsy shops and digital product creators because Pinterest users actively search for inspiration and products.',
    'Focus on vertical pin designs with strong text overlays and keyword-rich titles.',
    'Product categories like planners, printables, wall art, templates, budgeting tools, and worksheets perform especially well.',
    'Add Pinterest keywords naturally inside pin descriptions and include related terms in board names.'
  ]},
  { category:'Pinterest Boards', title:'Pinterest Board Name Ideas That Get More Reach', excerpt:'Discover SEO-friendly Pinterest board naming strategies to improve discoverability and niche authority.', body:[
    'Pinterest boards help the platform understand your niche and organize your content into searchable categories.',
    'Instead of generic names, use descriptive titles such as Minimalist Home Decor Ideas, Healthy Meal Prep Recipes, or Etsy Printable Planner Ideas.',
    'Focused niche boards usually perform better than random unrelated topics.'
  ]},
  { category:'Canva Templates', title:'Best Canva Template Niches for Pinterest Traffic', excerpt:'Learn which Canva template categories attract Pinterest clicks and saves.', body:[
    'Canva templates are a growing digital product category on Pinterest.',
    'Users search for social media templates, business kits, wedding templates, planners, and educational resources.',
    'Pinterest users prefer visually attractive content with strong typography and clear layouts.'
  ]},
  { category:'Blogging', title:'How Bloggers Use Pinterest to Grow Website Traffic', excerpt:'A practical guide for bloggers who want consistent Pinterest traffic using SEO and content planning.', body:[
    'Pinterest works differently from traditional social media platforms because pins can continue driving traffic for months or even years.',
    'Bloggers often create multiple pin designs for one article to target different keywords.',
    'Combining blog SEO with Pinterest marketing creates a strong long-term traffic strategy.'
  ]},
  { category:'Pin Design', title:'Pinterest Pin Design Tips That Increase CTR', excerpt:'Understand how high-performing Pinterest creators design thumbnails, pin layouts, and titles.', body:[
    'High-performing Pinterest pins usually include bold readable titles, clean layouts, strong contrast, and attractive imagery.',
    'Vertical pin dimensions generally perform better because they occupy more screen space.',
    'Attractive visuals combined with keyword optimization can improve click-through rates and pin saves.'
  ]}
]

function App(){
  const [seed,setSeed]=useState('')
  const [copied,setCopied]=useState(false)
  const [page,setPage]=useState('home')
  const [active,setActive]=useState(null)
  const [menu,setMenu]=useState(false)

  const keywords=useMemo(()=>{
    if(!seed.trim()) return []
    const base=seed.trim().toLowerCase()
    return ['ideas','aesthetic','for beginners','step by step','inspiration','tips','checklist','template','planner','printable','DIY','2026 trends','creative ideas','best ideas','viral pins','content ideas','board ideas'].map(m=>`${base} ${m}`)
  },[seed])

  const topics=['digital planner ideas','minimalist home decor','wedding mood board','healthy meal prep','AI content ideas','printable wall art','small business branding','Etsy product photography','Ramadan activities for kids','capsule wardrobe','garden planner','kids learning worksheets']

  const goHome=()=>{setPage('home');setActive(null);setMenu(false);setTimeout(()=>scrollTo({top:0,behavior:'smooth'}),50)}
  const openArticle=(a)=>{setActive(a);setPage('article');setMenu(false);setTimeout(()=>scrollTo({top:0,behavior:'smooth'}),50)}
  const copy=async()=>{if(!keywords.length)return; await navigator.clipboard.writeText(keywords.join('\\n')); setCopied(true); setTimeout(()=>setCopied(false),1500)}

  if(page==='article'&&active) return <Article article={active} goHome={goHome}/>
  if(page==='privacy') return <Privacy goHome={goHome} setPage={setPage}/>
  if(page==='terms') return <Terms goHome={goHome} setPage={setPage}/>

  return <main>
    <Header setPage={setPage} menu={menu} setMenu={setMenu} goHome={goHome}/>
    <section className="hero" id="home">
      <div>
        <div className="badge"><Sparkles size={16}/> Free Pinterest keyword idea tool</div>
        <h1>Find Pinterest keyword ideas faster.</h1>
        <p className="lead">PinTrendFinder helps creators, bloggers, Etsy sellers, and digital product owners generate Pinterest keyword ideas for pins, boards, descriptions, and content planning.</p>
        <div className="ctas"><a className="btn primary" href="#tool">Use Keyword Tool <ArrowRight size={18}/></a><a className="btn secondary" href="#blog">Read SEO Blog</a></div>
      </div>
      <div className="preview"><h2>Digital Planner</h2>{['digital planner ideas','digital planner template','digital planner for beginners','digital planner printable','digital planner 2026 trends'].map(x=><div className="pill" key={x}>{x}</div>)}</div>
    </section>

    <section className="section boxed" id="trends"><div className="head"><div><div className="badge"><Flame size={16}/> Trending Pinterest Topics</div><h2>Popular keyword ideas to explore</h2><p>Use these topic ideas as starting points for Pinterest pins, boards, blog posts, printable products, and digital content planning.</p></div></div><div className="grid topics">{topics.map(t=><button key={t} onClick={()=>{setSeed(t);document.getElementById('tool')?.scrollIntoView({behavior:'smooth'})}}>{t}</button>)}</div></section>

    <section className="tool" id="tool"><div className="center"><p className="eyebrow">Free Tool</p><h2>Pinterest Keyword Generator</h2><p>Enter a topic, product, or niche. The tool will generate Pinterest-style keyword ideas.</p></div><div className="toolbox"><label>Enter your keyword</label><div className="inputrow"><div className="input"><Search size={20}/><input value={seed} onChange={e=>setSeed(e.target.value)} placeholder="Example: wedding planner, wall art, meal prep"/></div><button className="btn dark" onClick={copy}>{copied?<Check/>:<Copy/>} {copied?'Copied':'Copy All'}</button></div><div className="results">{keywords.length?keywords.map(k=><div className="result" key={k}>{k}</div>):<div className="empty">Type a keyword above to generate Pinterest keyword ideas.</div>}</div></div></section>

    <section className="section" id="about"><div className="center"><p className="eyebrow">About PinTrendFinder</p><h2>Built to help creators find Pinterest content opportunities</h2><p>PinTrendFinder is a simple, fast, and beginner-friendly Pinterest keyword research tool made for creators, bloggers, Etsy sellers, Gumroad sellers, designers, and small businesses.</p></div><div className="cards"><Card icon={<TrendingUp/>} title="Pinterest SEO Focused" text="Generate topic ideas for pin titles, board names, descriptions, blog articles, and product content."/><Card icon={<ShieldCheck/>} title="Privacy Friendly" text="The basic tool works in your browser and does not require registration."/><Card icon={<Target/>} title="Made for Growth" text="Designed around evergreen topics, search intent, and content ideas that can attract long-term traffic."/></div><div className="about-extra"><div><Users/><h3>Who can use it?</h3><p>Bloggers, Etsy sellers, digital product creators, Pinterest marketers, and small business owners.</p></div><div><BookOpen/><h3>Why it helps</h3><p>It turns one seed keyword into multiple long-tail ideas for pins, articles, products, and boards.</p></div></div></section>

    <section className="section" id="blog"><div className="center"><p className="eyebrow">SEO Blog</p><h2>Latest Pinterest SEO Articles</h2><p>Read practical guides about Pinterest SEO, keyword strategies, Etsy marketing, Canva templates, and creator traffic growth.</p></div><div className="cards">{articles.map(a=><Blog key={a.title} article={a} onOpen={()=>openArticle(a)}/>)}</div></section>

    <section className="faq" id="faq"><div className="center"><HelpCircle/><h2>Pinterest SEO FAQ</h2></div><FAQ q="What is PinTrendFinder?" a="It is a free Pinterest keyword idea tool for pins, boards, and content topics."/><FAQ q="Can I use these keywords for Pinterest pins?" a="Yes, you can use them in pin titles, descriptions, boards, and blog planning."/><FAQ q="Does this tool guarantee ranking?" a="No tool can guarantee rankings, but useful keywords and consistent content can improve chances."/><FAQ q="Is this website free?" a="Yes, the basic keyword generator is free to use."/></section>

    <section className="contact" id="contact"><Mail/><h2>Contact Us</h2><p>Have feedback, suggestions, or a business inquiry?</p><a className="btn primary" href="mailto:contact@pintrendfinder.com">contact@pintrendfinder.com</a></section>
    <Footer setPage={setPage}/>
  </main>
}

function Header({setPage,menu,setMenu,goHome}){
  const nav=<><a href="#tool" onClick={()=>setMenu(false)}>Tool</a><a href="#trends" onClick={()=>setMenu(false)}>Trends</a><a href="#about" onClick={()=>setMenu(false)}>About</a><a href="#blog" onClick={()=>setMenu(false)}>Blog</a><a href="#faq" onClick={()=>setMenu(false)}>FAQ</a><button onClick={()=>{setPage('privacy');setMenu(false)}}>Privacy</button><button onClick={()=>{setPage('terms');setMenu(false)}}>Terms</button><a href="#contact" onClick={()=>setMenu(false)}>Contact</a></>
  return <header><div className="nav"><button className="logo" onClick={goHome}><span><Pin/></span>PinTrendFinder</button><nav>{nav}</nav><a className="start" href="#tool">Start Free</a><button className="menubtn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>{menu&&<div className="mobile">{nav}</div>}</header>
}
function Blog({article,onOpen}){return <article className="blog"><div className="tag">{article.category}</div><h3>{article.title}</h3><p>{article.excerpt}</p><button onClick={onOpen}>Read Article <ArrowRight size={16}/></button></article>}
function Article({article,goHome}){return <main><Simple goHome={goHome}/><section className="article"><button className="back" onClick={goHome}><Home size={17}/> Back to Home</button><article className="articlebox"><div className="tag">{article.category}</div><h1>{article.title}</h1><p className="excerpt">{article.excerpt}</p>{article.body.map((p,i)=><p key={i}>{p}</p>)}</article></section></main>}
function Privacy({goHome,setPage}){return <main><Simple goHome={goHome}/><section className="article"><button className="back" onClick={goHome}><Home size={17}/> Back to Home</button><div className="articlebox"><h1>Privacy Policy</h1><p>PinTrendFinder is designed to be simple and privacy friendly. The basic keyword generator does not require users to create an account.</p><h2>Information We Collect</h2><p>The tool may process the keyword you type only to generate keyword ideas inside your browser.</p><h2>Cookies & Advertising</h2><p>In the future, analytics or advertising services may use cookies. Users can control cookies through browser settings.</p><button className="btn primary" onClick={()=>setPage('terms')}>Read Terms</button></div></section></main>}
function Terms({goHome,setPage}){return <main><Simple goHome={goHome}/><section className="article"><button className="back" onClick={goHome}><Home size={17}/> Back to Home</button><div className="articlebox"><h1>Terms of Service</h1><p>By using PinTrendFinder, you agree to use the website for lawful and informational purposes only.</p><h2>No Ranking Guarantee</h2><p>We provide keyword suggestions but do not guarantee rankings, traffic, sales, or income.</p><button className="btn primary" onClick={()=>setPage('privacy')}>Read Privacy</button></div></section></main>}
function Simple({goHome}){return <header><div className="nav"><button className="logo" onClick={goHome}><span><Pin/></span>PinTrendFinder</button><button className="start" onClick={goHome}>Home</button></div></header>}
function Card({icon,title,text}){return <div className="card"><div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>}
function FAQ({q,a}){return <div className="faqitem"><h3>{q}</h3><p>{a}</p></div>}
function Footer({setPage}){return <footer><b>PinTrendFinder</b><p>Free Pinterest keyword ideas for creators, bloggers, and digital sellers.</p><div><button onClick={()=>setPage('privacy')}>Privacy Policy</button><button onClick={()=>setPage('terms')}>Terms of Service</button><a href="#contact">Contact</a></div><p>© 2026 PinTrendFinder. All rights reserved.</p></footer>}

createRoot(document.getElementById('root')).render(<App/>)
