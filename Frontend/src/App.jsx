import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

// --- INITIAL DATA ---
const INITIAL_MENU = [
  { id: 1, name: "Truffle Mushroom Risotto", desc: "Creamy arborio rice, wild mushrooms, black truffle oil", price: 840, category: "Main Course", orderCount: 0 },
  { id: 2, name: "Charcoal Grilled Paneer", desc: "Smoked cottage cheese, pistachio glaze", price: 720, category: "Main Course", orderCount: 0 },
  { id: 3, name: "Japanese Miso Ramen", desc: "Silky broth, noodles, soft egg", price: 840, category: "Main Course", orderCount: 0 },
  { id: 4, name: "Classic Tiramisu", desc: "Espresso-soaked ladyfingers, mascarpone", price: 520, category: "Dessert", orderCount: 0 },
  { id: 5, name: "Truffle Arancini", desc: "Crispy risotto balls, parmesan, truffle aioli", price: 560, category: "Appetizer", orderCount: 0 },
  { id: 6, name: "Korean Gochujang Wings", desc: "Sticky-spicy glaze, sesame, scallions", price: 640, category: "Appetizer", orderCount: 0 },
  { id: 7, name: "Crispy Halloumi Fries", desc: "Golden fried cheese, honey chili drizzle", price: 580, category: "Appetizer", orderCount: 0 },
  { id: 8, name: "Japanese Veg Gyoza", desc: "Pan-seared dumplings, soy dipping sauce", price: 520, category: "Appetizer", orderCount: 0 },
  { id: 9, name: "Midnight Herb Pasta", desc: "Fresh herbs, olive oil, roasted garlic", price: 680, category: "Main Course", orderCount: 0 },
  { id: 10, name: "Thai Green Curry Bowl", desc: "Coconut curry, jasmine rice", price: 780, category: "Main Course", orderCount: 0 },
  { id: 11, name: "Belgian Dark Chocolate Mousse", desc: "72% cocoa, whipped cream", price: 500, category: "Dessert", orderCount: 0 },
  { id: 12, name: "Iced Matcha Latte", desc: "Ceremonial grade matcha, oat milk", price: 440, category: "Drink", orderCount: 0 },
];

const CATEGORIES = ["Appetizer", "Main Course", "Dessert", "Drink"];

// --- NAVIGATION ---
const StickyNav = ({ showHome, showMenu, showCart }) => (
  <div className="sticky-nav">
    {showHome && <Link to="/" className="nav-icon" title="Home"><i className="fa-solid fa-house"></i></Link>}
    {showMenu && <Link to="/menu" className="nav-icon" title="Menu"><i className="fa-solid fa-utensils"></i></Link>}
    {showCart && <Link to="/cart" className="nav-icon" title="Cart"><i className="fa-solid fa-cart-shopping"></i></Link>}
  </div>
);

// --- START PAGE ---
const StartPage = () => {
  const [hovering, setHovering] = useState(false);
  return (
    <div className={`page-wrapper page-center bg-start ${hovering ? 'hovering-btn' : ''}`}>
      <div className="hero">
        <h1>Midnight Stone</h1>
        <div className="subtitle">A quiet place for thoughtful meals,<br />slow evenings, and timeless taste.</div>
        <Link 
            to="/login" 
            className="start-btn"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            Start Order
        </Link>
      </div>
    </div>
  );
};

// --- LOGIN PAGE ---
const LoginPage = () => {
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(isOwner ? '/owner' : '/menu');
  };

  return (
    <div className="page-wrapper page-center bg-login">
      <StickyNav showHome={true} />
      <div className="login-card">
        <h1>Midnight Stone</h1>
        <div className="subtitle">Welcome back</div>
        <div className="role-wrap">
          <div className="role-labels"><span>Customer</span><span>Owner</span></div>
          <label className={`role-toggle ${isOwner ? 'active' : ''}`} onClick={() => setIsOwner(!isOwner)}>
            <div className="slider"><div className="knob"></div></div>
          </label>
          <button onClick={handleLogin} className="login-btn">Login</button>
        </div>
        <div className="field"><input type="text" placeholder="Username" /></div>
        <div className="field"><input type="password" placeholder="Password" /></div>
      </div>
    </div>
  );
};

// --- MENU PAGE ---
const MenuPage = ({ menuItems, cart, addToCart, removeFromCart }) => {
  const signatures = menuItems
      .filter(i => i.orderCount > 0)
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 4);

  const getCartQty = (id) => {
    const item = cart.find(i => i.id === id);
    return item ? item.qty : 0;
  };

  const MenuItemRow = ({ item }) => {
      const qty = getCartQty(item.id);
      return (
        <div className="menu-item" key={item.id}>
            <div className="item-text">
                <div className="item-name">{item.name}</div>
                <div className="item-desc">{item.desc}</div>
            </div>
            <div>
                <span className="item-price">₹{item.price}</span>
                {qty === 0 ? (
                    <button className="add-btn" onClick={() => addToCart(item)}>Add</button>
                ) : (
                    <div className="qty-control" style={{display:'inline-flex'}}>
                        <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                        <div className="qty-number">{qty}</div>
                        <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                )}
            </div>
        </div>
      );
  };

  return (
    <div className="page-wrapper bg-menu">
      <StickyNav showHome={true} showCart={true} />
      <div className="container">
        <h1 className="menu-title">Midnight Stone</h1>
        <div className="subtitle-text">A curated menu, best enjoyed slowly.</div>
        
        {/* HOUSE SIGNATURES WITH CHEEKY TEXT */}
        <div>
            <div className="section-title">House Signatures</div>
            {signatures.length === 0 ? (
                <div style={{color:'var(--muted)', fontStyle:'italic', marginTop:'10px', marginBottom:'40px', lineHeight:'1.6'}}>
                    "The slate is clean, the night is young.<br/>
                    The ballad of the evening is yet unsung."
                </div>
            ) : (
                signatures.map(item => <MenuItemRow key={`sig-${item.id}`} item={item} />)
            )}
        </div>

        {/* CATEGORIES */}
        {CATEGORIES.map(cat => {
            const items = menuItems.filter(i => i.category === cat);
            if(items.length === 0) return null;

            return (
                <div key={cat}>
                    <div className="section-title">{cat}</div>
                    {items.map(item => <MenuItemRow key={item.id} item={item} />)}
                </div>
            )
        })}
      </div>
    </div>
  );
};

// --- CART PAGE ---
const CartPage = ({ cart, addToCart, removeFromCart, placeOrder, showNotification }) => {
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const taxes = subtotal * 0.10;
  const total = subtotal + taxes;

  const handlePlaceOrder = () => {
      placeOrder();
      navigate('/');
      // REPLACED ALERT WITH THE CUSTOM NOTIFICATION
      showNotification("The silence breaks, the craft begins. Sit back and wait for the finest of sins.");
  };

  return (
    <div className="page-wrapper bg-menu">
      <StickyNav showHome={true} showMenu={true} />
      <div className="container">
        <h1 className="cart-title">Your Cart</h1>
        
        {cart.length === 0 ? (
            <div className="subtitle-text">Your cart is empty.</div>
        ) : (
            cart.map(item => (
                <div className="cart-item" key={item.id}>
                    <div>
                        <div className="item-name">{item.name}</div>
                        <div className="item-desc">{item.desc}</div>
                    </div>
                    <div className="qty-control">
                        <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                        <div className="qty-number">{item.qty}</div>
                        <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                    <div className="item-price">₹{item.price * item.qty}</div>
                </div>
            ))
        )}

        {cart.length > 0 && (
            <div className="summary">
                <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(0)}</span></div>
                <div className="summary-row"><span>Service & Taxes</span><span>₹{taxes.toFixed(0)}</span></div>
                <div className="summary-row total"><span>Total</span><span>₹{total.toFixed(0)}</span></div>
                <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>
            </div>
        )}
      </div>
    </div>
  );
};

// --- OWNER PAGE ---
const OwnerPage = ({ menuItems, incomingOrders, resolveOrder, addMenuItem, removeMenuItem }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  
  // New Item State (Included Category)
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Appetizer");

  // Remove Item State
  const [removeItemName, setRemoveItemName] = useState("");

  const trends = [...menuItems].sort((a, b) => b.orderCount - a.orderCount);

  const handleAddSubmit = () => {
      if(!newItemName || !newItemPrice) return;
      addMenuItem({
          name: newItemName,
          price: parseInt(newItemPrice),
          desc: newItemDesc,
          category: newItemCategory,
          orderCount: 0
      });
      setShowAdd(false);
      setNewItemName(""); setNewItemPrice(""); setNewItemDesc(""); setNewItemCategory("Appetizer");
  };

  const handleRemoveSubmit = () => {
      removeMenuItem(removeItemName);
      setShowRemove(false);
      setRemoveItemName("");
  };

  return (
    <div className="page-wrapper locked bg-menu">
      <StickyNav showHome={true} />
      <div className="owner-layout" style={{ gridTemplateRows: 'auto 1fr' }}>
        
        <div style={{ gridColumn: '1 / -1', marginBottom: '10px' }}>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontWeight: '300', fontSize: '48px', color: 'var(--pista)', margin: '0' }}>The Kitchen Command</h1>
        </div>

        {/* Left Column */}
        <div className="owner-col-left">
            <div className="panel-management">
                <h2 style={{fontWeight:'300', color:'var(--pista)', margin:'0 0 20px 0'}}>Repertoire Curation</h2>
                <div className="action-bar">
                    <button className="btn" onClick={() => setShowAdd(true)}>Add Item</button>
                    <button className="btn deny" onClick={() => setShowRemove(true)}>Remove Item</button>
                </div>
            </div>

            <div className="panel-orders">
                <h2 style={{fontWeight:'300', color:'var(--pista)', margin:'0 0 20px 0', position:'sticky', top:0, background:'var(--bg-card)', zIndex:2}}>The Commissions</h2>
                {incomingOrders.length === 0 && <div style={{fontStyle:'italic', color:'var(--muted)', marginTop:'20px'}}>No pending commissions.</div>}
                
                {incomingOrders.map(order => (
                    <div className="order-card" key={order.orderId}>
                        <div className="order-header"><span>Order #{order.orderId}</span><span>{order.items.length} items</span></div>
                        <div className="order-items">
                            {order.items.map((i, idx) => (
                                <div key={idx}>{i.name} ×{i.qty}</div>
                            ))}
                        </div>
                        <div className="order-actions">
                            <button className="btn" onClick={() => resolveOrder(order.orderId, true)}>Approve</button>
                            <button className="btn deny" onClick={() => resolveOrder(order.orderId, false)}>Deny</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Right Column */}
        <div className="owner-col-right">
            <h1 className="menu-title" style={{fontSize:'36px'}}>The Trends</h1>
            <div className="subtitle-text" style={{marginBottom:'30px'}}>Real-time status</div>
            
            {trends.map(item => (
                <div className="menu-item" key={item.id}>
                    <div className="item-text">
                        <div className="item-name">{item.name}</div>
                        <div className="item-desc">{item.desc}</div>
                    </div>
                    <div>
                        <span className="item-price">₹{item.price}</span>
                        <span className="stats-text" style={{marginLeft:'10px'}}>Ordered: {item.orderCount} times</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* ADD MODAL */}
      {showAdd && (
          <div className="modal-overlay">
              <div className="modal-box">
                  <h2>Add Menu Item</h2>
                  <input className="modal-input" placeholder="Item Name" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
                  <input className="modal-input" placeholder="Price (Numbers only)" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} />
                  
                  <select className="modal-input" value={newItemCategory} onChange={e => setNewItemCategory(e.target.value)}>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>

                  <input className="modal-input" placeholder="Description" value={newItemDesc} onChange={e => setNewItemDesc(e.target.value)} />
                  
                  <div className="modal-actions">
                      <button className="btn deny" onClick={() => setShowAdd(false)}>Close</button>
                      <button className="btn" onClick={handleAddSubmit}>Add</button>
                  </div>
              </div>
          </div>
      )}

      {/* REMOVE MODAL */}
      {showRemove && (
          <div className="modal-overlay">
              <div className="modal-box">
                  <h2>Remove Menu Item</h2>
                  <input className="modal-input" placeholder="Item Name (Exact Match)" value={removeItemName} onChange={e => setRemoveItemName(e.target.value)} />
                  <div className="modal-actions">
                      <button className="btn" onClick={() => setShowRemove(false)}>Close</button>
                      <button className="btn deny" onClick={handleRemoveSubmit}>Remove</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [menuItems, setMenuItems] = useState([]); // Empty at start, fetched from DB
  const [cart, setCart] = useState([]); 
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [orderIdCounter, setOrderIdCounter] = useState(1024);
  const [notification, setNotification] = useState(null);

  // 1. FETCH DATA FROM SQLITE ON LOAD
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    fetch('http://localhost:3000/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error("Error fetching menu:", err));
  };

  const addToCart = (item) => {
    const exists = cart.find(x => x.id === item.id);
    if (exists) {
        setCart(cart.map(x => x.id === item.id ? { ...exists, qty: exists.qty + 1 } : x));
    } else {
        setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
      const exists = cart.find(x => x.id === itemId);
      if (exists.qty === 1) {
          setCart(cart.filter(x => x.id !== itemId));
      } else {
          setCart(cart.map(x => x.id === itemId ? { ...exists, qty: exists.qty - 1 } : x));
      }
  };

  const placeOrder = () => {
      if (cart.length === 0) return;

      // 1. Update Backend (SQL)
      fetch('http://localhost:3000/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cart })
      })
      .then(() => {
          // 2. Refetch menu to see updated "Trends" counts immediately
          fetchMenuItems();
      });

      // 3. Update Local Frontend State (for Owner Dashboard Orders)
      const newOrder = {
          orderId: orderIdCounter,
          items: [...cart],
          status: 'pending'
      };
      setIncomingOrders([...incomingOrders, newOrder]);
      setOrderIdCounter(orderIdCounter + 1);
      
      setCart([]); 
  };

  const resolveOrder = (id, approved) => {
      setIncomingOrders(incomingOrders.filter(o => o.orderId !== id));
      console.log(`Order ${id} was ${approved ? 'Approved' : 'Denied'}`);
  };

  const addMenuItem = (newItem) => {
      // Send to Backend
      fetch('http://localhost:3000/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
      })
      .then(res => res.json())
      .then(savedItem => {
          // Update Frontend with the saved item
          setMenuItems([...menuItems, savedItem]);
      });
  };

  const removeMenuItem = (name) => {
      // Send to Backend
      fetch(`http://localhost:3000/api/menu/${name}`, {
          method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => {
          if(data.changes > 0) {
             setMenuItems(menuItems.filter(i => i.name.toLowerCase() !== name.toLowerCase()));
          } else {
             setNotification("Could not find an item with that exact name.");
          }
      });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage menuItems={menuItems} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
        <Route path="/cart" element={
            <CartPage 
                cart={cart} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart} 
                placeOrder={placeOrder} 
                showNotification={setNotification}
            />
        } />
        <Route path="/owner" element={<OwnerPage menuItems={menuItems} incomingOrders={incomingOrders} resolveOrder={resolveOrder} addMenuItem={addMenuItem} removeMenuItem={removeMenuItem} />} />
      </Routes>

      {notification && (
        <div className="modal-overlay" onClick={() => setNotification(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2 style={{textAlign:'center'}}>Midnight Stone</h2>
                <div className="notification-text">
                    "{notification}"
                </div>
                <div className="notification-btn-wrap">
                    <button className="btn" onClick={() => setNotification(null)}>Very well</button>
                </div>
            </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
