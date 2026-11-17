import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBasket,
  ShoppingCart,
  Sparkles,
  Instagram,
  Linkedin,
  Mail,
  Truck,
  X,
} from "lucide-react";
import vegetablesImage from "@/assets/daily-fresh-vegetables.jpg";
import chickenImage from "@/assets/daily-fresh-chicken.jpg";
import precutImage from "@/assets/daily-fresh-precut.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Product = {
  id: string;
  name: string;
  category: "Vegetables" | "Chicken";
  unit: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
};

type ProductFilter =
  | "All"
  | "Vegetables"
  | "Chicken"
  | "Offers"
  | "Combos"
  | "Cleaned Vegetables"
  | "Pre-Cut Vegetables"
  | "Chicken Cuts";

const products: Product[] = [
  {
    id: "tomato",
    name: "Fresh Tomato",
    category: "Vegetables",
    unit: "500 g",
    price: 32,
    oldPrice: 40,
    image: "/products/tomato.jpg",
    tag: "Farm fresh",
  },
  {
    id: "onion",
    name: "Red Onion",
    category: "Vegetables",
    unit: "1 kg",
    price: 38,
    image: "/products/onion.jpg",
  },
  {
    id: "potato",
    name: "Farm Potato",
    category: "Vegetables",
    unit: "1 kg",
    price: 34,
    oldPrice: 42,
    image: "/products/potato.jpg",
    tag: "Best seller",
  },
  {
    id: "capsicum",
    name: "Green Capsicum",
    category: "Vegetables",
    unit: "500 g",
    price: 46,
    image: "/products/capsicum.jpg",
  },
  {
    id: "spinach",
    name: "Fresh Spinach",
    category: "Vegetables",
    unit: "1 bunch",
    price: 28,
    image: "/products/spinach.jpg",
    tag: "Picked today",
  },
  {
    id: "breast",
    name: "Chicken Breast",
    category: "Chicken",
    unit: "500 g",
    price: 189,
    oldPrice: 220,
    image: chickenImage,
    tag: "Cleaned fresh",
  },
  {
    id: "curry",
    name: "Chicken Curry Cut",
    category: "Chicken",
    unit: "500 g",
    price: 169,
    image: chickenImage,
  },
  {
    id: "drumsticks",
    name: "Chicken Drumsticks",
    category: "Chicken",
    unit: "500 g",
    price: 179,
    image: chickenImage,
  },
  {
    id: "boneless",
    name: "Boneless Chicken",
    category: "Chicken",
    unit: "500 g",
    price: 205,
    oldPrice: 239,
    image: chickenImage,
    tag: "Ready to cook",
  },
  {
    id: "cleaned",
    name: "Cleaned Mixed Vegetables",
    category: "Vegetables",
    unit: "500 g",
    price: 65,
    image: vegetablesImage,
    tag: "Washed & cleaned",
  },
  {
    id: "precut",
    name: "Pre-Cut Vegetable Mix",
    category: "Vegetables",
    unit: "500 g",
    price: 79,
    image: precutImage,
    tag: "Prep made easy",
  },
  {
    id: "combo",
    name: "Chicken Family Combo",
    category: "Chicken",
    unit: "1 kg",
    price: 329,
    oldPrice: 379,
    image: chickenImage,
    tag: "Curry cut + drumsticks",
  },
];

const categories = [
  {
    title: "Fresh Vegetables",
    detail: "Straight from the farm",
    image: vegetablesImage,
    target: "vegetables",
    tone: "category-green",
  },
  {
    title: "Cleaned Vegetables",
    detail: "Washed and ready to cook",
    image: vegetablesImage,
    target: "vegetables",
    tone: "category-lime",
  },
  {
    title: "Pre-Cut Vegetables",
    detail: "Less prep, more cooking",
    image: precutImage,
    target: "vegetables",
    tone: "category-orange",
  },
  {
    title: "Fresh Chicken",
    detail: "Carefully cleaned and packed",
    image: chickenImage,
    target: "chicken",
    tone: "category-rose",
  },
  {
    title: "Chicken Cuts",
    detail: "Cut just the way you like",
    image: chickenImage,
    target: "chicken",
    tone: "category-sage",
  },
  {
    title: "Chicken Combos",
    detail: "Everyday kitchen favourites",
    image: chickenImage,
    target: "chicken",
    tone: "category-gold",
  },
];

const money = (amount: number) => `₹${amount}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daily Fresh | Fresh groceries, delivered with care" },
      {
        name: "description",
        content:
          "Shop farm-fresh vegetables and quality chicken, prepared just the way you like. Freshness you can trust, delivered to your door.",
      },
      { property: "og:title", content: "Daily Fresh | Fresh groceries, delivered with care" },
      {
        property: "og:description",
        content: "Shop farm-fresh vegetables and quality chicken, prepared just the way you like.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: DailyFreshHome,
});

export function DailyFreshHome() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<ProductFilter>("All");
  const [location, setLocation] = useState("Select your location");
  const [locationOpen, setLocationOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [policy, setPolicy] = useState("");
  const [customProduct, setCustomProduct] = useState<Product | null>(null);
  const [packSize, setPackSize] = useState("500 g");
  const [cut, setCut] = useState("Standard cut");
  const [customizations, setCustomizations] = useState<
    Record<string, { pack: string; cut: string; price: number }>
  >({});

  const priceOf = (product: Product) => customizations[product.id]?.price ?? product.price;

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = products.reduce(
    (sum, product) => sum + priceOf(product) * (cart[product.id] ?? 0),
    0,
  );
  const cartProducts = products.filter((product) => (cart[product.id] ?? 0) > 0);
  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesType =
        activeFilter === "All" ||
        product.category === activeFilter ||
        (activeFilter === "Offers" && !!product.oldPrice) ||
        (activeFilter === "Combos" && product.id === "combo") ||
        (activeFilter === "Cleaned Vegetables" && product.id === "cleaned") ||
        (activeFilter === "Pre-Cut Vegetables" && product.id === "precut") ||
        (activeFilter === "Chicken Cuts" &&
          ["breast", "curry", "drumsticks", "boneless"].includes(product.id));
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);
      return matchesType && matchesSearch;
    });
  }, [activeFilter, search]);

  const setQuantity = (id: string, next: number) => {
    setCart((current) => {
      const updated = { ...current };
      if (next <= 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  const scrollTo = (id: string, filter?: ProductFilter) => {
    if (filter) {
      setActiveFilter(filter);
      setSearch("");
    }
    setMobileNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitLocation = () => {
    const cleaned = pinCode.trim();
    if (/^[1-9]\d{5}$/.test(cleaned)) {
      setLocation(`PIN ${cleaned} · demo location`);
      setLocationOpen(false);
    }
  };

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginMessage("Thanks! Sign-in is a demo on this preview.");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="announcement-bar">
        <span>
          <Sparkles size={14} /> A little fresher, a little closer to home
        </span>
        <span className="announcement-desktop">Thoughtfully sourced. Carefully delivered.</span>
        <button type="button" onClick={() => scrollTo("offers")}>
          SEE WHAT’S FRESH <ArrowRight size={13} />
        </button>
      </div>

      <header className="site-header">
        <div className="header-main">
          <button
            className="brand"
            type="button"
            aria-label="Daily Fresh home"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="brand-mark">
              <Leaf size={21} strokeWidth={2.5} />
            </span>
            <span className="brand-words">
              <strong>
                daily<span>fresh</span>
              </strong>
              <small>GOOD FOOD, EVERY DAY</small>
            </span>
          </button>

          <button className="location-trigger" type="button" onClick={() => setLocationOpen(true)}>
            <span className="location-icon">
              <MapPin size={18} />
            </span>
            <span>
              <small>DELIVERING TO</small>
              <strong>{location}</strong>
            </span>
            <ChevronDown size={15} />
          </button>

          <label className="search-box">
            <Search size={19} />
            <Input
              aria-label="Search products"
              placeholder="Search vegetables, chicken and more..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                if (event.target.value) scrollTo("fresh-picks");
              }}
            />
          </label>

          <div className="header-actions">
            <Button
              className="login-button"
              variant="outline"
              onClick={() => {
                setLoginMessage("");
                setLoginOpen(true);
              }}
            >
              Login / Sign up
            </Button>
            <Button
              className="cart-button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${cartCount} items`}
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              <b>{cartCount}</b>
            </Button>
          </div>
          <Button
            className="mobile-menu-button"
            variant="ghost"
            size="icon"
            aria-label="Open navigation"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu />
          </Button>
        </div>
        <button type="button" className="mobile-location" onClick={() => setLocationOpen(true)}>
          <MapPin size={14} />
          <span>{location}</span>
          <ChevronDown size={13} />
        </button>
        <div className="mobile-search">
          <Search size={17} />
          <Input
            aria-label="Search products"
            placeholder="Search vegetables, chicken and more..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              if (event.target.value) scrollTo("fresh-picks");
            }}
          />
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <div className="nav-links">
            <button
              className={`nav-link ${activeFilter === "All" ? "active" : ""}`}
              onClick={() => {
                setActiveFilter("All");
                setSearch("");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </button>
            <button
              className={`nav-link ${activeFilter === "Vegetables" ? "active" : ""}`}
              onClick={() => scrollTo("fresh-picks", "Vegetables")}
            >
              Vegetables
            </button>
            <button
              className={`nav-link ${activeFilter === "Chicken" ? "active" : ""}`}
              onClick={() => scrollTo("fresh-picks", "Chicken")}
            >
              Chicken
            </button>
            <button
              className={`nav-link ${activeFilter === "Combos" ? "active" : ""}`}
              onClick={() => scrollTo("fresh-picks", "Combos")}
            >
              Combos
            </button>
            <button className="nav-link" onClick={() => scrollTo("offers")}>
              Offers <span className="nav-dot" />
            </button>
          </div>
          <div className="nav-note">
            <span className="open-dot" /> FRESH PICKS, EVERY MORNING
          </div>
        </nav>
      </header>

      <section className="df-campaign" aria-labelledby="hero-title">
        <div className="df-campaign-layout">
          <div className="df-campaign-copy">
            <div className="df-campaign-eyebrow">
              <span aria-hidden="true" /> FRESHNESS, EVERY DAY
            </div>
            <h1 id="hero-title">
              Fresh Choices.
              <br />
              <em>Better Living.</em>
            </h1>
            <p>
              From farm-fresh vegetables to quality chicken cuts, everything you need for everyday
              freshness, delivered to your doorstep.
            </p>
            <div className="df-campaign-actions">
              <Button
                className="df-campaign-primary"
                onClick={() => scrollTo("fresh-picks", "Vegetables")}
              >
                Shop Vegetables <ArrowRight size={18} />
              </Button>
              <Button
                variant="outline"
                className="df-campaign-secondary"
                onClick={() => scrollTo("fresh-picks", "Chicken")}
              >
                Explore Chicken <ArrowRight size={18} />
              </Button>
            </div>
            <div className="df-campaign-note">
              <span>
                <Leaf size={17} />
              </span>
              <p>
                Good ingredients.
                <br />
                <strong>Everyday possibilities.</strong>
              </p>
            </div>
          </div>
          <div
            className="df-campaign-art"
            aria-label="Fresh vegetables and quality chicken, thoughtfully selected"
          >
            <span className="df-campaign-orbit" aria-hidden="true" />
            <figure className="df-campaign-produce">
              <img
                src={vegetablesImage}
                alt="A basket of colorful fresh tomatoes, peppers, leafy greens and carrots in natural light"
                width={1008}
                height={1008}
                fetchPriority="high"
              />
              <figcaption>
                <span>01 / FROM THE FARM</span>
                <strong>
                  Nature's finest.
                  <br />
                  Your everyday.
                </strong>
              </figcaption>
            </figure>
            <div className="df-campaign-farm">
              <Leaf size={17} />
              <span>Farm Fresh</span>
            </div>
            <figure className="df-campaign-chicken">
              <img
                src={chickenImage}
                alt="Fresh chicken breast and drumsticks beautifully arranged with lemon and herbs"
                width={1008}
                height={1008}
                fetchPriority="high"
              />
              <figcaption>
                <span>FRESH CHICKEN</span>
                <strong>Goodness, cut your way.</strong>
              </figcaption>
            </figure>
            <div className="df-campaign-quality">
              <ShieldCheck size={18} />
              <span>
                Quality Checked<small>Care in every choice.</small>
              </span>
            </div>
            <span className="df-campaign-edition" aria-hidden="true">
              THE DAILY FRESH EDIT
            </span>
          </div>
        </div>
      </section>

      <section className="promise-strip" aria-label="Daily Fresh promises">
        <div>
          <span className="promise-icon">
            <Leaf size={19} />
          </span>
          <span>
            <strong>Fresh from the source</strong>
            <small>Picked with care</small>
          </span>
        </div>
        <i />
        <div>
          <span className="promise-icon promise-icon-orange">
            <ShieldCheck size={19} />
          </span>
          <span>
            <strong>Cleaned & carefully packed</strong>
            <small>Ready for your kitchen</small>
          </span>
        </div>
        <i />
        <div>
          <span className="promise-icon promise-icon-yellow">
            <Truck size={19} />
          </span>
          <span>
            <strong>Delivered with care</strong>
            <small>Availability by location</small>
          </span>
        </div>
        <i />
        <div>
          <span className="promise-icon promise-icon-pink">
            <Heart size={19} />
          </span>
          <span>
            <strong>Made for everyday</strong>
            <small>Goodness you can feel</small>
          </span>
        </div>
      </section>

      <section className="section categories-section" id="categories">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> FIND YOUR FRESH
            </div>
            <h2>
              Shop by <em>category.</em>
            </h2>
          </div>
          <p>
            A little something for every meal, from market-fresh produce to carefully prepared
            chicken.
          </p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <button
              type="button"
              className={`category-item ${category.tone}`}
              key={category.title}
              onClick={() =>
                scrollTo(
                  "fresh-picks",
                  (
                    [
                      "Vegetables",
                      "Cleaned Vegetables",
                      "Pre-Cut Vegetables",
                      "Chicken",
                      "Chicken Cuts",
                      "Combos",
                    ] as ProductFilter[]
                  )[index],
                )
              }
            >
              <span className="category-image">
                <img src={category.image} alt="" width={1008} height={1008} loading="lazy" />
                <span className="category-index">0{index + 1}</span>
              </span>
              <span className="category-text">
                <strong>{category.title}</strong>
                <small>{category.detail}</small>
                <span className="category-shop">
                  SHOP NOW <ArrowRight size={14} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="products-section" id="fresh-picks">
        <div className="section products-inner">
          <div className="section-heading products-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" /> THE GOOD STUFF
              </div>
              <h2>
                Fresh picks <em>for you.</em>
              </h2>
            </div>
            <div className="product-filters" role="group" aria-label="Filter products">
              {(["All", "Vegetables", "Chicken", "Combos", "Offers"] as ProductFilter[]).map(
                (filter) => (
                  <button
                    aria-pressed={activeFilter === filter}
                    className={activeFilter === filter ? "filter-button selected" : "filter-button"}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>
          {activeFilter !== "All" && (
            <p className="collection-label">
              {activeFilter} <span>· {visibleProducts.length} fresh picks</span>
            </p>
          )}
          {search && (
            <div className="search-results-note">
              Showing results for <strong>“{search}”</strong>{" "}
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={14} />
              </button>
            </div>
          )}
          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-photo">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={1008}
                      height={1008}
                      loading="lazy"
                    />
                    {product.tag && (
                      <span className="product-tag">
                        <span />
                        {product.tag}
                      </span>
                    )}
                    {product.oldPrice && (
                      <span className="discount-tag">
                        {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                      </span>
                    )}
                    <button
                      className="favorite-button"
                      type="button"
                      aria-pressed={saved.includes(product.id)}
                      aria-label={`Save ${product.name}`}
                      onClick={() =>
                        setSaved((current) =>
                          current.includes(product.id)
                            ? current.filter((id) => id !== product.id)
                            : [...current, product.id],
                        )
                      }
                    >
                      <Heart
                        size={16}
                        fill={saved.includes(product.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="product-info">
                    <span className="product-category">
                      {product.category} <span className="availability">· In stock · Demo</span>
                    </span>
                    <h3>{product.name}</h3>
                    {product.category === "Chicken" && (
                      <button
                        className="customize-link"
                        onClick={() => {
                          setCustomProduct(product);
                          setPackSize(customizations[product.id]?.pack ?? product.unit);
                          setCut(customizations[product.id]?.cut ?? "Standard cut");
                        }}
                      >
                        Customize pack & cut <ChevronDown size={12} />
                      </button>
                    )}
                    <div className="product-bottom">
                      <div>
                        <strong>{money(priceOf(product))}</strong>
                        {product.oldPrice && !customizations[product.id] && (
                          <del>{money(product.oldPrice)}</del>
                        )}
                        <small> / {customizations[product.id]?.pack ?? product.unit}</small>
                      </div>
                      {(cart[product.id] ?? 0) === 0 ? (
                        <Button
                          className="add-button"
                          variant="outline"
                          size="sm"
                          aria-label={`Add ${product.name} to cart`}
                          onClick={() => setQuantity(product.id, 1)}
                        >
                          <Plus size={15} /> ADD
                        </Button>
                      ) : (
                        <div
                          className="quantity-control"
                          aria-label={`${cart[product.id]} ${product.name} in cart`}
                        >
                          <button
                            aria-label={`Remove one ${product.name}`}
                            onClick={() => setQuantity(product.id, (cart[product.id] ?? 0) - 1)}
                          >
                            <Minus size={13} />
                          </button>
                          <strong>{cart[product.id]}</strong>
                          <button
                            aria-label={`Add one ${product.name}`}
                            onClick={() => setQuantity(product.id, (cart[product.id] ?? 0) + 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Search size={24} />
              <strong>No fresh picks found</strong>
              <span>Try another search, or browse all products.</span>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
              >
                Show all products
              </Button>
            </div>
          )}
          <p className="demo-price-note">
            Sample prices shown for demonstration. Final prices may vary by availability.
          </p>
        </div>
      </section>

      <section className="values-section section">
        <div className="values-intro">
          <div className="eyebrow">
            <span className="eyebrow-line" /> OUR LITTLE PROMISE
          </div>
          <h2>
            We think fresh
            <br />
            should feel <em>simple.</em>
          </h2>
          <p>
            Everyday essentials, thoughtfully chosen and handled like they’re for our own table.
          </p>
          <Button variant="link" className="text-link" onClick={() => scrollTo("how-it-works")}>
            A little about our care <ArrowRight size={15} />
          </Button>
        </div>
        <div className="values-list">
          <div className="value-item">
            <span className="value-number">01</span>
            <span className="value-icon">
              <Leaf />
            </span>
            <span>
              <strong>Fresh quality products</strong>
              <small>Good ingredients make every meal a little better.</small>
            </span>
            <ArrowRight className="value-arrow" size={17} />
          </div>
          <div className="value-item">
            <span className="value-number">02</span>
            <span className="value-icon orange">
              <Sparkles />
            </span>
            <span>
              <strong>Hygienic cleaning & packing</strong>
              <small>Handled with care, so you can cook with confidence.</small>
            </span>
            <ArrowRight className="value-arrow" size={17} />
          </div>
          <div className="value-item">
            <span className="value-number">03</span>
            <span className="value-icon gold">
              <ShoppingBasket />
            </span>
            <span>
              <strong>Chicken cuts your way</strong>
              <small>Choose cuts that make your next recipe yours.</small>
            </span>
            <ArrowRight className="value-arrow" size={17} />
          </div>
          <div className="value-item">
            <span className="value-number">04</span>
            <span className="value-icon rose">
              <Truck />
            </span>
            <span>
              <strong>Convenient home delivery</strong>
              <small>Delivery options depend on your location.</small>
            </span>
            <ArrowRight className="value-arrow" size={17} />
          </div>
        </div>
      </section>

      <section className="offer-section" id="offers">
        <div className="offer-inner section">
          <div className="offer-art">
            <div className="offer-circle">
              <span>
                GOOD
                <br />
                FOOD
              </span>
              <Leaf size={26} />
            </div>
            <span className="offer-spark offer-spark-one">✳</span>
            <span className="offer-spark offer-spark-two">✳</span>
            <span className="offer-label">
              A LITTLE EXTRA
              <br />
              FOR YOUR TABLE
            </span>
          </div>
          <div className="offer-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> FRESH IDEAS, EVERY DAY
            </div>
            <h2>
              Fresh deals,
              <br />
              <em>better everyday.</em>
            </h2>
            <p>
              Discover great value on your everyday essentials. Good things are always in season.
            </p>
            <Button
              className="offer-cta"
              size="lg"
              onClick={() => scrollTo("fresh-picks", "Offers")}
            >
              Explore offers <ArrowRight size={17} />
            </Button>
          </div>
          <div className="offer-side-note">
            MADE FOR YOUR EVERYDAY <span>✳</span> DAILY FRESH
          </div>
        </div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="section-heading how-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> EASY AS THAT
            </div>
            <h2>
              Freshness, <em>on its way.</em>
            </h2>
          </div>
          <p>From your first pick to the dinner table, we keep the good stuff simple.</p>
        </div>
        <div className="steps-grid">
          <div className="step-item">
            <span className="step-number">01</span>
            <span className="step-icon">
              <ShoppingBasket />
            </span>
            <h3>Choose your products</h3>
            <p>Pick the fresh things your kitchen needs.</p>
            <span className="step-connector" />
          </div>
          <div className="step-item">
            <span className="step-number">02</span>
            <span className="step-icon step-orange">
              <Check />
            </span>
            <h3>Make it your own</h3>
            <p>Choose your preferred prep and cuts.</p>
            <span className="step-connector" />
          </div>
          <div className="step-item">
            <span className="step-number">03</span>
            <span className="step-icon step-gold">
              <ShoppingCart />
            </span>
            <h3>Place your order</h3>
            <p>Your everyday favourites, all together.</p>
            <span className="step-connector" />
          </div>
          <div className="step-item">
            <span className="step-number">04</span>
            <span className="step-icon step-pink">
              <Truck />
            </span>
            <h3>Get fresh delivered</h3>
            <p>Freshly packed, right to your doorstep.</p>
          </div>
        </div>
      </section>

      <section className="delivery-band">
        <div className="delivery-image">
          <img
            src={precutImage}
            alt="Fresh, ready-to-cook vegetables"
            width={1008}
            height={1008}
            loading="lazy"
          />
        </div>
        <div className="delivery-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> A LITTLE MORE CONVENIENT
          </div>
          <h2>
            Your day is full.
            <br />
            Dinner can be <em>easy.</em>
          </h2>
          <p>
            Shop in a few taps, pick a delivery option that works for you, and look forward to a
            fresh arrival at your door.
          </p>
          <div className="delivery-points">
            <span>
              <Check size={15} /> Easy online ordering
            </span>
            <span>
              <Check size={15} /> Convenient delivery scheduling
            </span>
            <span>
              <Check size={15} /> Freshly packed, order updates
            </span>
          </div>
          <Button className="delivery-cta" onClick={() => scrollTo("fresh-picks")}>
            Make it a fresh day <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-icon">
          <Leaf size={24} />
        </div>
        <div>
          <div className="eyebrow">A FRESH NOTE, NOW AND THEN</div>
          <h2>
            Good things grow <em>together.</em>
          </h2>
        </div>
        <p>A little inspiration for your everyday table.</p>
        <Button variant="outline" onClick={() => setLoginOpen(true)}>
          Join the table <ArrowRight size={15} />
        </Button>
      </section>

      <footer className="site-footer" id="footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <button
              className="brand footer-brand"
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="brand-mark">
                <Leaf size={21} strokeWidth={2.5} />
              </span>
              <span className="brand-words">
                <strong>
                  daily<span>fresh</span>
                </strong>
                <small>GOOD FOOD, EVERY DAY</small>
              </span>
            </button>
            <p>
              Freshness you can trust,
              <br />
              delivered to your door.
            </p>
            <div className="social-links">
              <button
                onClick={() => setPolicy("Stay connected")}
                aria-label="Email contact details"
              >
                <Mail size={15} />
              </button>
              <button onClick={() => setPolicy("Stay connected")} aria-label="LinkedIn details">
                <Linkedin size={15} />
              </button>
              <button onClick={() => setPolicy("Stay connected")} aria-label="Instagram details">
                <Instagram size={15} />
              </button>
            </div>
          </div>
          <div className="footer-column">
            <strong>EXPLORE</strong>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</button>
            <button onClick={() => scrollTo("categories")}>Shop by category</button>
            <button onClick={() => scrollTo("offers")}>Fresh deals</button>
            <button onClick={() => scrollTo("how-it-works")}>How it works</button>
          </div>
          <div className="footer-column">
            <strong>FRESH PICKS</strong>
            <button onClick={() => scrollTo("fresh-picks", "Vegetables")}>Vegetables</button>
            <button onClick={() => scrollTo("fresh-picks", "Chicken")}>Fresh chicken</button>
            <button onClick={() => scrollTo("categories")}>Pre-cut & cleaned</button>
            <button onClick={() => scrollTo("fresh-picks", "Combos")}>Combos</button>
          </div>
          <div className="footer-column footer-contact">
            <strong>HERE TO HELP</strong>
            <span>Questions about your order?</span>
            <button onClick={() => setPolicy("Contact Daily Fresh")}>
              Get in touch <ArrowRight size={14} />
            </button>
            <span className="footer-placeholder">Contact details coming soon</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Daily Fresh. Good food, every day.</span>
          <div>
            <button onClick={() => setPolicy("Terms & Conditions")}>Terms & Conditions</button>
            <button onClick={() => setPolicy("Privacy Policy")}>Privacy Policy</button>
            <button onClick={() => setPolicy("Refund & Cancellation")}>
              Refund & Cancellation
            </button>
          </div>
          <span className="footer-made">
            FRESHLY MADE FOR EVERYDAY <Leaf size={13} />
          </span>
        </div>
      </footer>

      <Dialog
        open={!!customProduct}
        onOpenChange={(open) => {
          if (!open) setCustomProduct(null);
        }}
      >
        <DialogContent className="modal-content">
          <DialogHeader>
            <DialogTitle>Make it your own</DialogTitle>
            <DialogDescription>
              {customProduct?.name} · Choose your pack and preparation.
            </DialogDescription>
          </DialogHeader>
          <form
            className="customize-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (!customProduct) return;
              const price = Math.round(
                (customProduct.price * (packSize === "1 kg" ? 1000 : 500)) /
                  (customProduct.unit === "1 kg" ? 1000 : 500),
              );
              setCustomizations((current) => ({
                ...current,
                [customProduct.id]: { pack: packSize, cut, price },
              }));
              setCustomProduct(null);
            }}
          >
            <label htmlFor="pack-size">Pack size</label>
            <select
              id="pack-size"
              value={packSize}
              onChange={(event) => setPackSize(event.target.value)}
            >
              <option>500 g</option>
              <option>1 kg</option>
            </select>
            <label htmlFor="cut-style">Preparation</label>
            <select id="cut-style" value={cut} onChange={(event) => setCut(event.target.value)}>
              {(customProduct?.id === "combo"
                ? ["Standard cut", "Small curry pieces", "Medium curry pieces"]
                : customProduct?.id === "drumsticks"
                  ? ["Standard cut", "Skinless whole drumsticks"]
                  : ["Standard cut", "Small pieces", "Medium pieces", "Large pieces"]
              ).map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <p>
              Sample pack price:{" "}
              <strong>
                {customProduct &&
                  money(
                    Math.round(
                      (customProduct.price * (packSize === "1 kg" ? 1000 : 500)) /
                        (customProduct.unit === "1 kg" ? 1000 : 500),
                    ),
                  )}
              </strong>
            </p>
            {(cart[customProduct?.id ?? ""] ?? 0) > 0 && (
              <small>This updates the pack and cut for this product already in your basket.</small>
            )}
            <Button type="submit">
              Save preferences <Check size={16} />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!policy}
        onOpenChange={(open) => {
          if (!open) setPolicy("");
        }}
      >
        <DialogContent className="modal-content">
          <DialogHeader>
            <DialogTitle>{policy}</DialogTitle>
            <DialogDescription>
              {policy.includes("Contact") || policy === "Stay connected"
                ? "Official contact details and social profiles will be added by the Daily Fresh team before launch."
                : policy === "Privacy Policy"
                  ? "This frontend demo does not create accounts, send phone numbers, or process payments. Your selections stay in this page for the current visit. The business privacy policy will be supplied before launch."
                  : policy === "Refund & Cancellation"
                    ? "No real orders or payments are accepted in this preview. Refund windows, cancellation rules and support details will be supplied by Daily Fresh before launch."
                    : "This is a shopping UI demonstration. Products, availability and prices are sample data. Checkout and real delivery are not enabled. Final business terms will be supplied before launch."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={locationOpen} onOpenChange={setLocationOpen}>
        <DialogContent className="modal-content">
          <DialogHeader>
            <span className="modal-symbol">
              <MapPin size={21} />
            </span>
            <DialogTitle>Where should we deliver?</DialogTitle>
            <DialogDescription>Check delivery options for your neighbourhood.</DialogDescription>
          </DialogHeader>
          <div className="location-form">
            <label htmlFor="pin-code">Enter your PIN code</label>
            <div className="location-input-row">
              <Input
                id="pin-code"
                inputMode="numeric"
                maxLength={6}
                placeholder="e.g. 400001"
                value={pinCode}
                onChange={(event) => setPinCode(event.target.value.replace(/\D/g, ""))}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitLocation();
                }}
              />
              <Button onClick={submitLocation} disabled={!/^[1-9]\d{5}$/.test(pinCode)}>
                Check
              </Button>
            </div>
            <small>
              Demo selector only. Location is saved for this visit; delivery availability is not
              checked.
            </small>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="modal-content login-modal">
          <DialogHeader>
            <span className="modal-symbol">
              <Leaf size={21} />
            </span>
            <DialogTitle>Come on in.</DialogTitle>
            <DialogDescription>Sign in to make your next fresh shop feel easy.</DialogDescription>
          </DialogHeader>
          <form className="login-form" onSubmit={submitLogin}>
            <label htmlFor="phone-number">Your mobile number</label>
            <div className="phone-input">
              <span>+91</span>
              <Input
                id="phone-number"
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                title="Enter a valid 10-digit Indian mobile number"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))}
                required
              />
            </div>
            <Button type="submit" className="login-submit">
              Continue <ArrowRight size={16} />
            </Button>
            {loginMessage && (
              <span className="form-feedback" role="status">
                <Check size={15} />
                {loginMessage}
              </span>
            )}
            <small>By continuing, you agree to our Terms & Conditions and Privacy Policy.</small>
          </form>
        </DialogContent>
      </Dialog>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="cart-sheet">
          <SheetHeader className="cart-sheet-header">
            <span className="modal-symbol">
              <ShoppingBasket size={21} />
            </span>
            <SheetTitle>
              Your fresh basket <span className="cart-title-count">{cartCount} items</span>
            </SheetTitle>
            <SheetDescription>Looking good. Here’s what you picked.</SheetDescription>
          </SheetHeader>
          {cartProducts.length ? (
            <>
              <div className="cart-lines">
                {cartProducts.map((product) => (
                  <div className="cart-line" key={product.id}>
                    <img src={product.image} alt="" width={1008} height={1008} />
                    <div className="cart-line-info">
                      <strong>{product.name}</strong>
                      <small>
                        {customizations[product.id]?.pack ?? product.unit} ·{" "}
                        {money(priceOf(product))} each
                        {customizations[product.id] ? ` · ${customizations[product.id].cut}` : ""}
                      </small>
                      <span>{money(priceOf(product) * (cart[product.id] ?? 0))}</span>
                    </div>
                    <div className="quantity-control">
                      <button
                        aria-label={`Remove one ${product.name}`}
                        onClick={() => setQuantity(product.id, (cart[product.id] ?? 0) - 1)}
                      >
                        <Minus size={13} />
                      </button>
                      <strong>{cart[product.id]}</strong>
                      <button
                        aria-label={`Add one ${product.name}`}
                        onClick={() => setQuantity(product.id, (cart[product.id] ?? 0) + 1)}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <span>
                  Subtotal <strong>{money(cartTotal)}</strong>
                </span>
                <small>Sample total for demonstration. Delivery options depend on location.</small>
                <Button className="checkout-button" onClick={() => setCartOpen(false)}>
                  Continue shopping <ArrowRight size={16} />
                </Button>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <span>
                <ShoppingBasket size={31} />
              </span>
              <strong>Your basket is taking a breather.</strong>
              <small>Add something fresh to get started.</small>
              <Button
                onClick={() => {
                  setCartOpen(false);
                  scrollTo("fresh-picks");
                }}
              >
                Explore fresh picks <ArrowRight size={15} />
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="mobile-nav-sheet">
          <SheetHeader>
            <SheetTitle className="mobile-sheet-title">
              daily<span>fresh</span>
            </SheetTitle>
            <SheetDescription>Good food, every day.</SheetDescription>
          </SheetHeader>
          <nav className="mobile-nav-links">
            <button
              onClick={() => {
                setMobileNavOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo("fresh-picks", "Vegetables")}>
              Vegetables <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo("fresh-picks", "Chicken")}>
              Chicken <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo("fresh-picks", "Combos")}>
              Combos <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo("offers")}>
              Offers <ArrowRight size={16} />
            </button>
          </nav>
          <Button
            className="mobile-login"
            onClick={() => {
              setMobileNavOpen(false);
              setLoginOpen(true);
            }}
          >
            Sign in
          </Button>
        </SheetContent>
      </Sheet>

      <button
        className="mobile-cart-fab"
        type="button"
        onClick={() => setCartOpen(true)}
        aria-label={`Open cart, ${cartCount} items`}
      >
        <ShoppingCart size={19} />
        <span>Basket</span>
        <b>{cartCount}</b>
      </button>
    </main>
  );
}
