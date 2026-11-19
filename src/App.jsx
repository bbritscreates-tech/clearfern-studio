
import { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useLocation, NavLink,} from "react-router-dom";
import {
   Menu,
  X,
  ShoppingBag,
  Search,
  ArrowRight,
  ArrowLeft,
  Leaf,
  Zap,
  ShieldCheck,
  Heart,
  Headphones,
  Plus,
  Minus,
  Trash2,
  Sparkles,
Sprout,
} from "lucide-react";
import "./index.css";

const products = [
  {
    id: 1,
    name: "Ultimate Business Planner",
    description: "Plan, organise and grow your business with ease.",
    longDescription:
      "Take control of your business with a practical, beautifully designed planner. Organise your goals, track your progress and bring structure to your everyday business activities.",
    price: "R199.00",
    type: "planner",
    label: "BUSINESS PLANNER",
    badge: "BESTSELLER",
    category: "Business",
    format: "Digital PDF",
    pages: "Printable planner",
    includes: [
      "Business planning pages",
      "Goal-setting worksheets",
      "Monthly planning pages",
      "Business progress trackers",
    ],
  },
  {
    id: 2,
    name: "Social Media Planner",
    description: "Plan your content and grow your audience.",
    longDescription:
      "Make social media planning easier with a structured planner designed to help you organise content ideas, plan posts and maintain a consistent online presence.",
    price: "R149.00",
    type: "social",
    label: "SOCIAL MEDIA",
    badge: "POPULAR",
    category: "PDF Printables",
    format: "Digital PDF",
    pages: "Printable planner",
    includes: [
      "Content calendar",
      "Post planning pages",
      "Content idea worksheets",
      "Social media tracking pages",
    ],
  },
  {
    id: 3,
    name: "Budget Spreadsheet",
    description: "Take control of your finances.",
    longDescription:
      "Keep your finances organised with a practical budgeting spreadsheet. Track your income, expenses and savings in one convenient place.",
    price: "R129.00",
    type: "spreadsheet",
    label: "YOUR FINANCES",
    badge: "EXCEL",
    category: "Spreadsheets",
    format: "Digital spreadsheet",
    pages: "Excel workbook",
    includes: [
      "Income tracker",
      "Monthly expense tracker",
      "Budget planning",
      "Savings tracker",
    ],
  },
  {
    id: 4,
    name: "Canva Templates Pack",
    description: "Beautiful templates for any occasion.",
    longDescription:
      "Save time creating beautiful content with an editable collection of Canva templates. Customise the designs to suit your brand and your needs.",
    price: "R179.00",
    type: "canva",
    label: "CANVA TEMPLATES",
    badge: "EDITABLE",
    category: "Canva Templates",
    format: "Digital Canva templates",
    pages: "Editable templates",
    includes: [
      "Professionally designed templates",
      "Editable Canva layouts",
      "Customisable colours and text",
      "Instant digital access",
    ],
  },
];


const CartContext = createContext(null);

function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("clearfern-cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("clearfern-cart", JSON.stringify(items));
  }, [items]);

  
function addToCart(product) {
  setItems((current) => {
    const alreadyAdded = current.some((item) => item.id === product.id);

    if (alreadyAdded) return current;

    return [...current, { ...product, quantity: 1 }];
  });
}

  function removeFromCart(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  const cartCount = items.length;
  return (
    <CartContext.Provider
  value={{ items, cartCount, addToCart, removeFromCart }}
>
      {children}
    </CartContext.Provider>
  );
}

function formatPrice(amount) {
  return `R${amount.toFixed(2)}`;
}

function getPrice(price) {
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}


function Brand() {
  return (
    <Link to="/" className="brand">
      <span className="brand-mark"><Leaf size={38} strokeWidth={1.4} /></span>
      <span className="brand-name">
        <strong>Clearfern</strong>
        <strong>Studio</strong>
      </span>
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span>THOUGHTFULLY DESIGNED DIGITAL PRODUCTS</span>
        <span className="announcement-divider">✦</span>
        <span>INSTANT DIGITAL ACCESS</span>
      </div>

      <header className="site-header">
        <div className="navbar container">
          <Brand />

          <nav className="nav-links">
  <NavLink to="/" end>
    Home
  </NavLink>

  <NavLink to="/shop">
    Shop
  </NavLink>

  <NavLink to="/about">
    About
  </NavLink>

  <Link
    to="/#contact"
    className={
      location.pathname === "/" && location.hash === "#contact"
        ? "active"
        : ""
    }
  >
    Contact
  </Link>
</nav>

          <div className="nav-actions">
            <button className="icon-button" aria-label="Search">
              <Search size={21} strokeWidth={1.7} />
            </button>
            <Link to="/cart" className="icon-button cart-button" aria-label="Shopping cart">
              <ShoppingBag size={21} strokeWidth={1.7} />
              <span className="cart-count">{cartCount}</span>
            </Link>
            
            <button
              className="icon-button mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function ProductArtwork({ type, label }) {
  return (
    <div className={`product-artwork artwork-${type}`}>
      <div className="artwork-decoration decoration-one" />
      <div className="artwork-decoration decoration-two" />

      {type === "planner" && (
        <div className="paper-product planner-cover">
          <span className="cover-small">THE COMPLETE GUIDE TO</span>
          <span className="cover-title">Ultimate<br />Business<br /><em>Planner</em></span>
          <Leaf className="cover-leaf" size={45} strokeWidth={1} />
          <span className="cover-bottom">PLAN • ORGANISE • GROW</span>
        </div>
      )}

      {type === "social" && (
        <div className="paper-product social-cover">
          <span className="cover-small">YOUR CONTENT, YOUR WAY</span>
          <span className="cover-title">Social Media<br /><em>Planner</em></span>
          <div className="social-symbols"><span>◎</span><span>f</span><span>♪</span></div>
          <span className="cover-bottom">CREATE WITH PURPOSE</span>
        </div>
      )}

      {type === "spreadsheet" && (
        <div className="spreadsheet-cover">
          <div className="excel-symbol">
            <span>X</span>
            <div><i /><i /><i /><i /></div>
          </div>
          <span className="spreadsheet-title">Budget<br />Planner</span>
          <span className="spreadsheet-subtitle">YOUR FINANCES, SIMPLIFIED</span>
        </div>
      )}

      {type === "canva" && (
        <div className="canva-cover">
          <div className="canva-circle">Canva</div>
          <span className="canva-title">TEMPLATES<br />COLLECTION</span>
          <span className="canva-subtitle">DESIGNED FOR YOU</span>
        </div>
      )}

      <span className="artwork-label">{label}</span>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <ProductArtwork type={product.type} label={product.label} />
        <span className="product-badge">{product.badge}</span>
      </Link>

      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <p>{product.description}</p>
        <strong className="product-price">{product.price}</strong>
        <button className="add-cart-button" onClick={() => onAdd(product)}>
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function Home() {
  const { addToCart } = useCart();
const [notice, setNotice] = useState("");

function handleAddToCart(product) {
  addToCart(product);
  setNotice(`${product.name} added to your cart`);
  window.setTimeout(() => setNotice(""), 2500);
}

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-photo">
            <div className="hero-photo-overlay" />
            <div className="hero-content container">
              <div className="hero-copy">
                <span className="eyebrow">A MORE THOUGHTFUL WAY TO WORK</span>
                <h1>
                  Create. Organise.
                  <br />
                  <em>Grow.</em>
                </h1>
                <p>
                  Premium digital products to help you work smarter,
                  plan better and achieve more.
                </p>
                <Link to="/shop" className="button button-dark">
                  Shop Our Products <ArrowRight size={18} />
                </Link>
              </div>

              <div className="hero-scene" aria-label="Decorative digital workspace illustration">
                <div className="scene-fern fern-left"><Leaf /></div>
                <div className="scene-laptop">
                  <div className="laptop-screen">
                    <Leaf size={30} strokeWidth={1} />
                    <span>Clearfern</span>
                  </div>
                  <div className="laptop-base" />
                </div>
                <div className="scene-mug"><Leaf size={24} /></div>
                <div className="scene-plant"><Leaf /><Leaf /><Leaf /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits">
          <div className="container benefits-grid">
            <div className="benefit-item">
              <Zap size={28} fill="currentColor" />
              <div><strong>Instant Access</strong><span>Get your files via email</span></div>
            </div>
            <div className="benefit-item">
              <ShieldCheck size={29} fill="currentColor" />
              <div><strong>Secure Checkout</strong><span>Shop with confidence</span></div>
            </div>
            <div className="benefit-item">
              <Heart size={29} fill="currentColor" />
              <div><strong>Trusted Quality</strong><span>Designed with care</span></div>
            </div>
            <div className="benefit-item">
              <Headphones size={29} />
              <div><strong>Need Help?</strong><span>We're here to assist</span></div>
            </div>
          </div>
        </section>

        <section className="products-section container">
          <div className="section-title">
            <span />
            <h2>Our Digital Products</h2>
            <span />
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        <section className="promo-section container">
          <div className="promo-decoration"><Leaf size={125} strokeWidth={0.8} /></div>
          <div className="promo-copy">
            <h2>Smart solutions. <em>Beautifully designed.</em></h2>
            <p>Discover our range of high-quality digital products today.</p>
          </div>
          <Link to="/shop" className="promo-button">
            Browse Shop <ArrowRight size={17} />
          </Link>
        </section>

<section className="home-contact" id="contact">
  <div className="home-contact-inner">
    <div className="home-contact-info">
      <span className="section-eyebrow">LET'S CONNECT</span>

      <h2>
        We'd love to
        <br />
        <em>hear from you.</em>
      </h2>

      <p>
        Have a question about a product, need a little help
        or simply want to get in touch? Send us a message.
        We'd be happy to hear from you.
      </p>

      <div className="home-contact-decoration">
        <Leaf size={42} strokeWidth={0.8} />
        <span>Thoughtfully created. Here to help.</span>
      </div>
    </div>

    
<form
  className="home-contact-form"
  onSubmit={(event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const emailBody = `
Name: ${name}
Email: ${email}

Message:
${message}
    `;

    const mailtoLink =
      `mailto:clearfern-digital-studio@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
  }}
>
  <div className="contact-form-field">
    <label htmlFor="contact-name">YOUR NAME</label>
    <input
      id="contact-name"
      name="name"
      type="text"
      placeholder="Enter your name"
      required
    />
  </div>

  <div className="contact-form-field">
    <label htmlFor="contact-email">EMAIL ADDRESS</label>
    <input
      id="contact-email"
      name="email"
      type="email"
      placeholder="Enter your email address"
      required
    />
  </div>

  <div className="contact-form-field">
    <label htmlFor="contact-subject">SUBJECT</label>
    <input
      id="contact-subject"
      name="subject"
      type="text"
      placeholder="What would you like to discuss?"
      required
    />
  </div>

  <div className="contact-form-field">
    <label htmlFor="contact-message">YOUR MESSAGE</label>
    <textarea
      id="contact-message"
      name="message"
      rows="5"
      placeholder="Write your message here..."
      required
    />
  </div>

  <button type="submit" className="contact-submit-button">
    Send Message
  </button>

  <p className="contact-form-note">
    We look forward to hearing from you.
  </p>
</form>

  </div>
</section>

      </main>

      {notice && <div className="cart-notice">{notice}</div>}
      
    </>
  );
}


function CartPage() {
  const { items, removeFromCart } = useCart();

  const subtotal = items.reduce(
  (total, item) => total + getPrice(item.price),
  0
);

  if (items.length === 0) {
    return (
      <main className="cart-page container">
        <span className="eyebrow">YOUR CLEARFERN SHOPPING BAG</span>
        <h1>Your Shopping Cart</h1>

        <div className="empty-cart">
          <ShoppingBag size={42} strokeWidth={1.2} />
          <h2>Your cart is waiting for something lovely.</h2>
          <p>You haven't added any digital products yet.</p>
          <Link to="/shop" className="button button-dark">
            Explore the Shop <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page container">
      <span className="eyebrow">YOUR CLEARFERN SHOPPING BAG</span>
      <h1>Your Shopping Cart</h1>
      <p className="cart-intro">
        Review your digital products before proceeding to checkout.
      </p>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-art">
                <ProductArtwork type={item.type} label={item.label} />
              </div>

              <div className="cart-item-details">
                <span className="cart-item-category">DIGITAL PRODUCT</span>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <strong>{item.price}</strong>
              </div>

              <div className="cart-item-actions">
  <strong className="cart-line-total">
    {formatPrice(getPrice(item.price))}
  </strong>

  <button
    className="remove-cart-item"
    onClick={() => removeFromCart(item.id)}
    aria-label={`Remove ${item.name}`}
  >
    <Trash2 size={16} /> Remove
  </button>
</div>
            </article>
          ))}

          <Link to="/shop" className="continue-shopping">
            <ArrowLeft size={15} /> Continue shopping
          </Link>
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Digital delivery</span>
            <strong className="free-delivery">FREE</strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout <ArrowRight size={17} />
          </Link>
          <p className="secure-checkout">
            <ShieldCheck size={15} /> Secure checkout
          </p>
          <p className="digital-note">
            Your digital products will be delivered by email after successful payment.
          </p>
        </aside>
      </div>
    </main>
  );
}

function ShopPage() {
  const { addToCart, items } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [sort, setSort] = useState("featured");
  const [notice, setNotice] = useState("");

  const categories = [
    "All Products",
    "Business",
    "PDF Printables",
    "Canva Templates",
    "Spreadsheets",
  ];

  const productCategories = {
    1: "Business",
    2: "PDF Printables",
    3: "Spreadsheets",
    4: "Canva Templates",
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        category === "All Products" ||
        productCategories[product.id] === category;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "price-low") {
        return getPrice(a.price) - getPrice(b.price);
      }

      if (sort === "price-high") {
        return getPrice(b.price) - getPrice(a.price);
      }

      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return a.id - b.id;
    });

  function handleAdd(product) {
  const alreadyInCart = items.some(
    (item) => item.id === product.id
  );

  if (alreadyInCart) {
    setNotice(`${product.name} is already in your cart.`);
    return;
  }

  addToCart(product);
  setNotice(`${product.name} added to your cart.`);
}

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div className="container">
          <span className="eyebrow">THE CLEARFERN COLLECTION</span>
          <h1>Thoughtful tools for <em>everyday growth.</em></h1>
          <p>
            Discover beautifully designed digital resources to help you
            plan, create, organise and grow.
          </p>
          <div className="shop-hero-decoration">
            <Leaf size={55} strokeWidth={1} />
          </div>
        </div>
      </section>

      <section className="container shop-content">
        <div className="shop-toolbar">
          <div>
            <span className="shop-results-label">OUR COLLECTION</span>
            <h2>Explore our products</h2>
            <p>{filteredProducts.length} products available</p>
          </div>

          <div className="shop-search-sort">
            <div className="shop-search">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="shop-category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-button ${
                category === item ? "selected" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid shop-product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAdd}
              />
            ))}
          </div>
        ) : (
          <div className="shop-empty">
            <Search size={35} strokeWidth={1.2} />
            <h3>No products found</h3>
            <p>Try another search or choose a different category.</p>
            <button
              className="button button-dark"
              onClick={() => {
                setSearch("");
                setCategory("All Products");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {notice && <div className="cart-notice">{notice}</div>}
    </main>
  );
}


function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart, items } = useCart();
  const [notice, setNotice] = useState("");

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="product-not-found">
        <Leaf size={32} />
        <h1>Product not found</h1>
        <p>We couldn't find the product you're looking for.</p>
        <Link to="/shop" className="primary-button">
          Back to Shop
        </Link>
      </main>
    );
  }

  const alreadyInCart = items.some(
    (item) => item.id === product.id
  );

  function handleAddToCart() {
    if (alreadyInCart) {
      setNotice("This product is already in your cart.");
      return;
    }

    addToCart(product);
    setNotice("Product added to your cart.");
  }

  return (
    <main className="product-details-page">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="product-details-layout">
        <div className="product-details-artwork">
          <ProductArtwork product={product} />
          <span className="product-artwork-label">
            {product.label}
          </span>
        </div>

        <div className="product-details-info">
          <span className="product-details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="product-details-description">
            {product.longDescription}
          </p>

          <div className="product-details-price">
            {product.price}
          </div>

          <div className="product-details-format">
            <div>
              <span>FORMAT</span>
              <strong>{product.format}</strong>
            </div>
            <div>
              <span>DELIVERY</span>
              <strong>Instant digital access</strong>
            </div>
          </div>

          <button
            className="product-details-add-button"
            onClick={handleAddToCart}
          >
            {alreadyInCart ? "Already in Cart" : "Add to Cart"}
          </button>

          {notice && (
            <p className="product-details-notice">{notice}</p>
          )}

          <p className="product-details-note">
            <Leaf size={15} />
            A digital product. No physical item will be shipped.
          </p>
        </div>
      </section>

      <section className="product-includes-section">
        <span className="section-eyebrow">WHAT'S INSIDE</span>
        <h2>Everything you need to get started.</h2>

        <div className="product-includes-grid">
          {product.includes.map((item, index) => (
            <div className="product-include-item" key={index}>
              <span className="product-include-check">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="product-details-back">
        <Link to="/shop">← Continue exploring the shop</Link>
      </div>
    </main>
  );
}


function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="section-eyebrow">A LITTLE ABOUT US</span>

          <h1>
            Thoughtful resources.
            <br />
            <em>Meaningful progress.</em>
          </h1>

          <p>
            Welcome to Clearfern Studio, a thoughtfully curated
            collection of digital resources designed to bring
            more clarity, creativity and organisation into
            everyday life and business.
          </p>

          <Link to="/shop" className="primary-button">
            Explore the Collection
          </Link>
        </div>

        <div className="about-hero-art">
          <div className="about-art-circle">
            <Leaf size={85} strokeWidth={0.8} />
            <span>GROW WITH PURPOSE</span>
          </div>
          <div className="about-art-small">
            CREATIVITY · CLARITY · GROWTH
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-label">
          <span className="section-eyebrow">OUR PHILOSOPHY</span>
          <span className="about-story-number">01 / 03</span>
        </div>

        <div className="about-story-content">
          <h2>
            Making everyday tasks feel a little more
            <em> effortless.</em>
          </h2>

          <p>
            We believe that the right tools can make a meaningful
            difference. Whether you're building a business,
            organising your finances, planning your content or
            simply bringing more structure into your day, having
            the right resources makes the journey easier.
          </p>

          <p>
            That's why Clearfern Studio brings together practical,
            thoughtfully designed digital products that help
            turn ideas into action.
          </p>
        </div>
      </section>

      <section className="about-offerings">
        <div className="about-offerings-heading">
          <span className="section-eyebrow">WHAT YOU'LL FIND HERE</span>
          <h2>Resources for wherever life takes you.</h2>
          <p>
            Explore a growing collection of useful digital
            products, created to help you plan, create and grow.
          </p>
        </div>

        <div className="about-offerings-grid">
          <div className="about-offering">
            <span>01</span>
            <h3>Business Resources</h3>
            <p>
              Practical planners and workbooks to help you
              organise, manage and grow your business.
            </p>
          </div>

          <div className="about-offering">
            <span>02</span>
            <h3>Planning & Organisation</h3>
            <p>
              Thoughtful printables to help you bring structure
              and clarity to your everyday routines.
            </p>
          </div>

          <div className="about-offering">
            <span>03</span>
            <h3>Creative Templates</h3>
            <p>
              Beautiful, editable templates that make creating
              professional-looking content easier.
            </p>
          </div>

          <div className="about-offering">
            <span>04</span>
            <h3>Digital Tools</h3>
            <p>
              Useful spreadsheets and digital resources designed
              to simplify everyday tasks.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values-heading">
          <span className="section-eyebrow">THE CLEARFERN WAY</span>
          <h2>Three things at the heart of everything we do.</h2>
        </div>

        <div className="about-values-grid">
          <div>
            <Leaf size={28} strokeWidth={1} />
            <h3>Thoughtful</h3>
            <p>
              Every resource has a purpose. We value useful,
              considered designs that make a real difference.
            </p>
          </div>

          <div>
            <Sparkles size={28} strokeWidth={1} />
            <h3>Beautifully Simple</h3>
            <p>
              We believe practical tools can also be beautiful,
              enjoyable and easy to use.
            </p>
          </div>

          <div>
            <Sprout size={28} strokeWidth={1} />
            <h3>Growth Minded</h3>
            <p>
              Small steps create meaningful progress. Our
              resources are designed to help you move forward.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <span className="section-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>A little more clarity. A little more possibility.</h2>
        <p>
          Find the tools that help you bring your ideas to life.
        </p>
        <Link to="/shop" className="primary-button">
          Discover the Shop
        </Link>
      </section>
    </main>
  );
}


function PlaceholderPage({ title }) {
  return (
    <main className="placeholder-page container">
      <span className="eyebrow">WELCOME TO CLEARFERN STUDIO</span>
      <h1>{title}</h1>
      <p>We're preparing something thoughtful for you. This page is coming soon.</p>
      <Link to="/" className="button button-dark">Back to Home <ArrowRight size={17} /></Link>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-about">
          <Brand />
          <p>Thoughtful digital resources to help you create, organise and grow.</p>
        </div>

        <div className="footer-links">
          <strong>EXPLORE</strong>
          <Link to="/shop">Shop all products</Link>
          <Link to="/about">Our story</Link>
          <Link to="/contact">Contact us</Link>
        </div>

        <div className="footer-links">
          <strong>INFORMATION</strong>
          <Link to="/shipping">Digital delivery</Link>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms and conditions</Link>
        </div>

        <div className="footer-links">
          <strong>LET'S CONNECT</strong>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="mailto:hello@clearfernstudio.com">Email us</a>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Clearfern Studio. All rights reserved.</span>
        <span>Thoughtfully made, just for you.</span>
      </div>
    </footer>
  );
}

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const targetId = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToHash />

        <Header />

        <Routes>
          <Route path="/" element={<Home title="Home" />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={<PlaceholderPage title="Secure Checkout" />}
          />
          <Route
            path="/login"
            element={<PlaceholderPage title="Admin Login" />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetailsPage />}
          />
          <Route
            path="*"
            element={<PlaceholderPage title="Page Not Found" />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;






