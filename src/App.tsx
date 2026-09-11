import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import { useState, useEffect, useRef, createContext, useContext, type ReactNode } from 'react'
import logoImg from '@/imports/Screenshot_2026-08-05_092225.png'
import dish1 from '@/food-images/dish1.png'
import dish2 from '@/food-images/dish2.png'
import dish3 from '@/food-images/dish3.png'
import dish4 from '@/food-images/dish4.png'
import dish5 from '@/food-images/dish5.png'
import dish6 from '@/food-images/dish6.png'
import dish7 from '@/food-images/dish7.png'
import restaurant1 from '@/ambience-images/1.png'
import restaurant2 from '@/ambience-images/2.png'
import restaurant3 from '@/ambience-images/3.png'
import restaurant4 from '@/ambience-images/4.png'
import restaurant5 from '@/ambience-images/5.png'
import restaurant7 from '@/ambience-images/7.png'

// ── Brand tokens ──────────────────────────────────────────────
const B = {
  cream: '#FFF9F2',
  creamWarm: '#F8EEDB',

  green: '#0F3D2E',
  greenLight: '#1C5C46',

  gold: '#D4AF37',
  goldSoft: '#E6C76A',

  brown: '#4E342E',
  brownLight: '#7A5C4F',
  brownMuted: 'rgba(78,52,46,0.6)',

  white: '#FFFFFF',

  teal: '#28C7D8',
  tealPale: 'rgba(40,199,216,0.12)',

  yellow: '#F5C842',
  orange: '#E8834A',
}

// ── Dark brand tokens ─────────────────────────────────────────
const D = {
  cream: '#1A1612',
  creamWarm: '#1F1C18',

  green: '#9BCB65',       // readable muted green on dark backgrounds
  greenLight: '#7AB84D',  // slightly deeper green, still highly readable

  gold: '#D4AF37',
  goldSoft: '#E6C76A',

  brown: '#F5EDD8',         // headings → warm cream
  brownLight: '#C4A882',    // body text
  brownMuted: 'rgba(220,185,140,0.55)',

  white: '#231F1B',         // card surfaces

  teal: '#28C7D8',
  tealPale: 'rgba(40,199,216,0.10)',

  yellow: '#F5C842',
  orange: '#E8834A',
}

// ── Theme context ──────────────────────────────────────────────
interface ThemeCtx { isDark: boolean; toggle: () => void }
export const ThemeContext = createContext<ThemeCtx>({ isDark: false, toggle: () => { } })
function useTheme() { return useContext(ThemeContext) }

const display = "'Nunito', system-ui, sans-serif"
const serif = "'Cormorant Garamond', 'Georgia', serif"
const sans = "'Inter', system-ui, sans-serif"

// ── Nav links ─────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservation', href: '#reservations' },
  { label: 'Contact', href: '#contact' },
]

// ── Menu data ─────────────────────────────────────────────────
const MENU_ITEMS = [
  {
    category: 'Starters',
    emoji: '🥗',
    items: [
      { name: 'Spring Roll', desc: 'Crispy golden rolls filled with seasoned vegetables, served with hot garlic sauce.', price: '₹290' },
      { name: 'Gulmohar Kabab', desc: 'Cheese and Beetroot delicately spiced and deep-fried to a golden crisp.', price: '₹290' },
      { name: 'Butter Garlic (Potato, Mushroom)', desc: 'A rich and flavorful blend of butter and garlic, tossed with choice of vegetables.', price: '₹290' },
      { name: 'Fusion Gujiya', desc: 'Gujiya filled with English vegetables.', price: '₹290' },
      { name: 'Crisps With Honey Chilli Sauce (Potato | Baby Corn)', desc: 'Crispy-fried veggies tossed in a sweet and spicy honey chilli sauce.', price: '₹290' },
      { name: 'Tamarind Rice Nuggets [JAIN]', desc: 'Tamarind rice balls tempered with mustard seeds and peanuts.', price: '₹290' },
      { name: 'Crispy Corn [JAIN]', desc: 'Crispy fried corn kernels tossed with spices, herbs, and a hint of tangy seasoning.', price: '₹290' },
      { name: 'Sweet Corn Croquettes', desc: 'Golden-fried croquettes stuffed with creamy sweet corn and mild spices.', price: '₹290' },
      { name: 'Fried Cheese Wonton [JAIN]', desc: 'Crispy fried wontons filled with melted cheese and mild spices, served with a tangy dip.', price: '₹290' },
      { name: 'Crispy (Mushroom, Baby Corn | Paneer)', desc: 'Crispy-fried veggies tossed in a sweet and spicy honey chilli sauce.', price: 'Half ₹290 · Full ₹330' },
      { name: 'Thai Chilli Paneer', desc: 'Cottage cheese tossed in a spicy Thai-inspired chilli garlic sauce.', price: '₹330' },
      { name: 'Paneer Sukka', desc: 'Spiced, dry-style cottage cheese with aromatic South Indian masala and herbs.', price: '₹330' },
      { name: 'Andhra Chilli (Broccoli | Paneer)', desc: 'Crispy broccoli florets tossed in a fiery Andhra-style chilli spice blend.', price: 'Half ₹290 · Full ₹330' },
      { name: 'Ghee Roast (Mushroom | Paneer)', desc: 'Cottage cheese or mushrooms roasted in rich ghee with fiery South Indian spices.', price: 'Half ₹290 · Full ₹330' },
      { name: 'Tangra Chilli (Baby Corn, Mushroom | Paneer) [JAIN]', desc: 'Indo-Chinese style tossed in a spicy chilli-garlic sauce with peppers and onions.', price: 'Half ₹290 · Full ₹330' },
      { name: 'Satay (Baby Corn | Paneer) [JAIN]', desc: 'Tossed with rich peanut sauce and spices.', price: 'Half ₹290 · Full ₹330' },
      { name: 'Manchurian (Cauliflower, Baby Corn, Mushroom | Paneer, Veg Ball)', desc: 'Crispy-fried veggies tossed in a sweet and spicy honey chilli sauce.', price: 'Half ₹290 · Full ₹330' },
    ],
  },
  {
    category: 'Soups',
    emoji: '🍲',
    items: [
      { name: 'Cream Of Tomato Basil With Bread Crumbs [JAIN]', desc: 'A smooth velvety blend of ripe tomatoes and cream finished with basil.', price: 'Half ₹95 · Full ₹175', isJain: true },
      { name: 'Manchow Soup With Spicy Bhel And Noodle Crisps [JAIN]', desc: 'A spicy, hearty Indo-Chinese soup loaded with veggies.', price: 'Half ₹95 · Full ₹175', isJain: true },
      { name: 'Roasted Mushroom Cappuccino Soup', desc: 'Roasted mushroom soup topped with coffee.', price: 'Half ₹95 · Full ₹175', isJain: false },
      { name: 'Tomato Rasam With Mini Idiyappams [JAIN]', desc: 'Spicy and tangy South Indian rasam soup made with tamarind, tomatoes and spices.', price: 'Half ₹95 · Full ₹175', isJain: true },
      { name: 'Lemon Coriander Soup With Mini Momos [JAIN]', desc: 'A light, refreshing broth infused with zesty lemon and fresh coriander.', price: 'Half ₹95 · Full ₹175', isJain: true },
      { name: 'Creamy Spinach Soup With Corn And Spinach Pakoda [JAIN]', desc: 'A rich and velvety soup made with fresh spinach and a touch of cream.', price: 'Half ₹95 · Full ₹175', isJain: true },
      { name: 'Broccoli Almond Soup', desc: 'Creamy broccoli almond soup blended with roasted almonds and seasoned with herbs.', price: 'Half ₹95 · Full ₹175', isJain: false },
      { name: 'Burmese Khow Suey With Condiments', desc: '', price: 'Half N/A · Full ₹300', isJain: false },
    ],
  },
  {
    category: 'Grills',
    emoji: '🔥',
    items: [
      { name: 'Peri Peri Pineapple [JAIN]', desc: 'Grilled pineapple in spicy peri peri sauce, charred to smoky perfection.', price: 'Half ₹190 · 6 pcs\nFull ₹280 · 10 pcs', isJain: true },
      { name: 'Aloo Nazakat', desc: 'Tandoor roasted stuffed potatoes infused with spices and finished with a smoky char.', price: 'Half ₹190 · 6 pcs\nFull ₹280 · 9 pcs', isJain: false },
      { name: 'Malai Broccoli Tikka', desc: 'Broccoli florets marinated in a rich malai cream and cheese blend, grilled to a velvety char.', price: 'Half ₹190 · 6 pcs\nFull ₹280 · 10 pcs', isJain: false },
      { name: 'Stuffed Mushroom Tikka', desc: 'Juicy mushrooms stuffed with spiced filling, marinated and grilled to perfection.', price: 'Half ₹260 · 6 pcs\nFull ₹360 · 10 pcs', isJain: false },
      { name: 'Stuffed Paneer Tikka [JAIN]', desc: 'Soft paneer cubes stuffed with spiced creamy filling, marinated and char-grilled in tandoor.', price: 'Half ₹260 · 4 pcs\nFull ₹360 · 6 pcs', isJain: true },
      { name: 'Makhmali Paneer Tikka [JAIN]', desc: 'Silken soft paneer marinated in a cream and cashew blend, grilled to buttery perfection.', price: 'Half ₹260 · 4 pcs\nFull ₹360 · 6 pcs', isJain: true },
      { name: 'Malai Paneer Tikka [JAIN]', desc: 'Delicate paneer cubes marinated in a malai blend with spices, grilled to a melt.', price: 'Half ₹260 · 4 pcs\nFull ₹360 · 6 pcs', isJain: true },
      { name: 'Assorted Paneer Tikka [JAIN]', desc: 'Makhmali Paneer, Malai Paneer and Stuffed Paneer — 2 pcs each.', price: '₹380', isJain: true },
      { name: 'Assorted Tandoor Platter', desc: 'Mushroom, Pineapple, Aloo Nazakat, Broccoli and Makhmali Paneer — 2 pcs each.', price: '₹380', isJain: false },
    ],
  },
  {
    category: 'Mocktails',
    emoji: '🥤',
    items: [
      { name: 'Peacock', desc: 'Blue Curacao', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Snowy Owl', desc: 'Coconut', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Purple Starling', desc: 'Litchi', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Canary', desc: 'Passion Fruit, Pineapple', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Parakeet', desc: 'Cucumber, Peach', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Indigo', desc: 'Peach, Blueberry', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Gold Finch', desc: 'Pineapple, Elderflower, Passion', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Yellow Wagtail', desc: 'Orange, Elderflower, Passion Fruit', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Scarlet Ibis', desc: 'Strawberry, Passion Fruit', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Black Sparrow', desc: 'Orange', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Macaw', desc: 'Strawberry, Litchi, Orange', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Pink Cockatoo', desc: 'Strawberry', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Flamingo', desc: 'Guava, Pineapple, Strawberry', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Hornbill', desc: 'Cranberry, Orange, Strawberry, Apple', price: 'Full ₹190 · By 2 ₹220', isJain: false },
      { name: 'Lemon Soda (Plain / Masala)', desc: 'Sweet | Salt | Sweet & Salt', price: 'Full ₹150 · By 2 ₹170', isJain: false },
      { name: 'Lemon Juice (Plain / Masala)', desc: 'Sweet | Salt | Sweet & Salt', price: 'Full ₹150 · By 2 ₹170', isJain: false },
      { name: 'Butter Milk | Majigge | Chaas (Masala / Plain)', desc: 'Masala | Plain', price: 'Full ₹150 · By 2 ₹170', isJain: false },
      { name: 'Pepsi (Regular / Diet)', desc: 'Regular | Diet', price: 'Full ₹150 · By 2 ₹170', isJain: false },
      { name: 'Tea', desc: '', price: '₹90', isJain: false },
      { name: 'Coffee', desc: '', price: '₹90', isJain: false },
      { name: 'Packaged Drinking Water - 1ltr', desc: '', price: '₹30', isJain: false },
    ],
  },
  {
    category: 'Breads',
    emoji: '🥯',
    items: [
      { name: 'Tandoor Roti (Plain | Butter)', desc: '', price: 'Plain ₹65 · Butter ₹75', isJain: false },
      { name: 'Kulcha (Plain | Butter)', desc: '', price: 'Plain ₹65 · Butter ₹75', isJain: false },
      { name: 'Missi Roti (Plain | Butter)', desc: '', price: 'Plain ₹65 · Butter ₹75', isJain: false },
      { name: 'Naan (Plain | Butter)', desc: '', price: 'Plain ₹75 · Butter ₹85', isJain: false },
      { name: 'Garlic Naan (Plain | Butter)', desc: '', price: 'Plain ₹80 · Butter ₹90', isJain: false },
      { name: 'Chilli Garlic Roti (Plain | Butter)', desc: '', price: 'Plain ₹80 · Butter ₹90', isJain: false },
      { name: 'Laccha Paratha (Plain | Butter)', desc: '', price: 'Plain ₹90 · Butter ₹100', isJain: false },
      { name: 'Cheese Chilli Garlic Naan', desc: '', price: '₹110', isJain: false },
      { name: 'Assorted Bread Basket (Plain | Butter)', desc: '', price: 'Plain ₹330 · Butter ₹360', isJain: false },
    ],
  },
  {
    category: 'Indian Bowls',
    emoji: '🥘',
    items: [
      { name: 'Khichdi With Curd (Dal/Palak)', desc: '', price: '₹300', isJain: true },
      { name: 'Aloo Dum Biryani', desc: '', price: '₹330', isJain: false },
      { name: 'Mushroom Biryani', desc: '', price: '₹330', isJain: false },
      { name: 'Veg Biryani', desc: '', price: '₹330', isJain: false },
      { name: 'Paneer Biryani', desc: '', price: '₹350', isJain: false },
      { name: 'Jeera Rice With Dal', desc: '', price: '₹330', isJain: true },
      { name: 'Ghee Rice With Kurma', desc: '', price: '₹330', isJain: false },
      { name: 'Curd Rice', desc: '', price: '₹180', isJain: false },
      { name: 'Steam Rice (Regular | Basmathi)', desc: '', price: 'Regular ₹140 · Basmathi ₹180', isJain: false },
    ],
  },
  {
    category: 'Pasta',
    emoji: '🍝',
    items: [
      { name: 'White Sauce Pasta (Alfredo)', desc: '', price: '₹350', isJain: true },
      { name: 'Red Sauce Pasta (Arrabiata)', desc: '', price: '₹350', isJain: false },
      { name: 'Pink Sauce Pasta (Mix)', desc: '', price: '₹350', isJain: true },
      { name: 'Pesto Pasta', desc: '', price: '₹350', isJain: false },
    ],
  },
  {
    category: 'Asian Bowls',
    emoji: '🥢',
    items: [
      { name: 'Fried Rice', desc: '', price: '₹280', isJain: false },
      { name: 'Hakka Noodles', desc: '', price: '₹280', isJain: false },
      { name: 'Schezwan Rice', desc: '', price: '₹300', isJain: false },
      { name: 'Schezwan Noodles', desc: '', price: '₹300', isJain: false },
      { name: 'Chilli Garlic Rice', desc: '', price: '₹300', isJain: false },
      { name: 'Chilli Garlic Noodles', desc: '', price: '₹300', isJain: false },
      { name: 'Chowmin', desc: '', price: '₹300', isJain: false },
      { name: 'Lifu Noodles', desc: '', price: '₹300', isJain: false },
    ],
  },
  {
    category: 'Chats',
    emoji: '🥙',
    items: [
      { name: 'Papad (Roasted / Plain)', desc: 'Roasted / Plain', price: '₹40', isJain: false },
      { name: 'Masala Papad (Fried / Roasted)', desc: 'Fried / Roasted', price: '₹90', isJain: true },
      { name: 'Raitha', desc: '', price: '₹60', isJain: false },
      { name: 'Green Salad', desc: '', price: '₹100', isJain: true },
      { name: 'French Fries (Salted / Peri Peri)', desc: 'Salted / Peri Peri', price: '₹220', isJain: false },
      { name: 'Crispy Pops', desc: '', price: '₹240', isJain: false },
      { name: 'Potato Cheese Roll', desc: '', price: '₹240', isJain: false },
      { name: 'Cheesy Nachos', desc: '', price: '₹240', isJain: true },
      { name: 'Nippat Masala', desc: '4 PCS · ₹90\n8 PCS · ₹160', price: '4 PCS · ₹90\n8 PCS · ₹160', isJain: false },
      { name: 'Dahi Puri', desc: '4 PCS · ₹90\n8 PCS · ₹160', price: '4 PCS · ₹90\n8 PCS · ₹160', isJain: false },
      { name: 'Murkh Sandwich', desc: '4 PCS · ₹100\n8 PCS · ₹180', price: '4 PCS · ₹100\n8 PCS · ₹180', isJain: true },
      { name: 'Mini Dal Pakwan', desc: '4 PCS · ₹100\n8 PCS · ₹180', price: '4 PCS · ₹100\n8 PCS · ₹180', isJain: true },
      { name: 'Nachos Bhel', desc: '', price: '₹220', isJain: false },
    ],
  },
  {
    category: 'Sabzi Mandi',
    emoji: '🥬',
    items: [
      { name: 'Aloo Mutter', desc: '', price: '₹320', isJain: true },
      { name: 'Aloo Jeera', desc: '', price: '₹320', isJain: false },
      { name: 'Dal Tadka', desc: '', price: '₹320', isJain: true },
      { name: 'Vegetable Hyderabadi', desc: '', price: '₹320', isJain: false },
      { name: 'Chole Pindi', desc: '', price: '₹320', isJain: false },
      { name: 'Sham Savera Kofta', desc: '', price: '₹350', isJain: false },
      { name: 'Dal Makhni', desc: '', price: '₹350', isJain: false },
      { name: 'Aloo Dum With Kasundi', desc: '', price: '₹350', isJain: false },
      { name: 'Malai Kofta', desc: '', price: '₹350', isJain: true },
      { name: 'Mushroom Masala', desc: '', price: '₹350', isJain: false },
      { name: 'English Vegetables With Makhni Gravy', desc: '', price: '₹350', isJain: false },
      { name: 'Paneer Tikka Masala', desc: '', price: '₹350', isJain: false },
      { name: 'Creamy Kaju Masala', desc: '', price: '₹350', isJain: false },
      { name: 'Paneer Jalfrezi', desc: '', price: '₹350', isJain: false },
      { name: 'Vegetable Kofta', desc: '', price: '₹350', isJain: false },
      { name: 'Paneer Labadar', desc: '', price: '₹350', isJain: false },
      { name: 'Paneer Patiala', desc: '', price: '₹350', isJain: false },
      { name: 'Paneer Butter Masala', desc: '', price: '₹350', isJain: true },
      { name: 'Palak Paneer', desc: '', price: '₹350', isJain: false },
      { name: 'Kadai (Vegetable, Mushroom | Paneer)', desc: '', price: 'Vegetable / Mushroom ₹320 · Paneer ₹350', isJain: false },
    ],
  },
  {
    category: 'Desserts',
    emoji: '🍮',
    items: [
      { name: 'Gulab Jamun Soufflé', desc: 'Rose syrup, pistachio, saffron cream', price: '₹280' },
      { name: 'Mango Phirni', desc: 'Alphonso mango, rice pudding, cardamom, silver leaf', price: '₹260' },
      { name: 'Chocolate Barfi', desc: 'Valrhona chocolate, khoya, almond crumble', price: '₹300' },
    ],
  },
]

const STATS = [
  { icon: '🕐', value: '15+', label: 'Years of Excellence', sub: 'Serving joy since 2009' },
  { icon: '🍽️', value: '100+', label: 'Signature Dishes', sub: 'Crafted with love & tradition' },
  { icon: '😊', value: '10,000+', label: 'Happy Guests', sub: 'Smiles served every day' },
  { icon: '⭐', value: '★★★★★', label: 'Customer Rating', sub: 'Rated 5 stars across platforms' },
]

const EXPERIENCES = [
  {
    title: "The Family Table",
    desc: "Our warmest corner — a round table for six, designed for families who love to share. Every visit feels like a celebration.",
    seats: "Up to 8 guests", duration: "Open seating",
    img: "https://images.unsplash.com/photo-1606788075819-9574a6edfab3?w=800&h=600&fit=crop&auto=format",
    color: B.tealPale, accent: B.teal,
  },
]

const TESTIMONIALS = [
  { quote: "The food was good. The ambience is pleasant, and the quality of the dishes was decent. However, the waiting time was quite long, both for getting a table and for the food to be served. While the food is overall fine, the service speed could definitely be improved, especially during busy hours. Overall, a good dining experience with room for improvement in wait times.", author: "Mythri Channamalladevaru", role: "Mysuru" },
  { quote: "Well, a cozy resturant in the heart of Mysore. Well mannered staff and great service. Food was pretty decent. Tried few starters. They were great. Paneer biryani, decent and nothing special. Overall a good place for a family or friends hangout. Thanks for the good experience.", author: "Pavan Kumar D K", role: "Local Guide" },
  { quote: "Some items are really great but few need improvement.Service is excellent and the theme of everything related to birds is really impressive.The service is really prompt and quick. Few dishes like Biriyani and tomato soup can be improved in taste.Loved the malai broccoli", author: "B Bharadwaj Datta", role: "" },
  { quote: "The restaurant has a nice and pleasant ambience, interior design that is top-notch , firstly staff are so professional with highly appreciated and Ethical staff while having food they took care of our baby so that we can enjoy the food it was a somewhat pleasant gesture by the staff , highly appreciated for that .Coming to food we have ordered Cream of tamato soup - sweetness loaded Honey chilli baby corn (must try) -  awesome taste Sweet corn croquetts - similar to chess & corn balls it was smooth overloaded with cheese Tandoori roti & Paneer jalfrazy was good (gravy surves for 3-4ppl)Over all it was awesome experience with Pankhii resturant and they have all mode of payment ie Card & UPI", author: "Bharath Raj", role: "Local Guide " }


]

// ── Reusable tiny components ──────────────────────────────────
function SectionTag({ children, color = B.teal }: { children: ReactNode; color?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
      <span style={{ fontFamily: display, fontWeight: 700, fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{children}</span>
    </div>
  )
}

function Pill({ children, bg = B.creamWarm, color = B.brown }: { children: ReactNode; bg?: string; color?: string }) {
  return (
    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '999px', background: bg, color, fontFamily: display, fontWeight: 700, fontSize: '12px', letterSpacing: '0.05em' }}>
      {children}
    </span>
  )
}

// Subtle bird silhouette SVG for decorative use
function BirdDeco({ size = 40, opacity = 0.08, color = B.brown }: { size?: number; opacity?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true" style={{ opacity }}>
      <ellipse cx="40" cy="48" rx="22" ry="18" fill={color} />
      <circle cx="56" cy="34" r="10" fill={color} />
      <ellipse cx="26" cy="44" rx="14" ry="8" fill={color} transform="rotate(-20 26 44)" />
      <circle cx="60" cy="31" r="2.5" fill={B.white} />
      <circle cx="61" cy="30.5" r="1" fill={color} />
      <path d="M62 35 L67 33 L65 37 Z" fill={color} />
    </svg>
  )
}

// ── Nav ───────────────────────────────────────────────────────


// ── Hero ──────────────────────────────────────────────
function Hero() {
  const { isDark } = useTheme()
  const T = isDark ? D : B
  const [menuHov, setMenuHov] = useState(false)
  const [reserveHov, setReserveHov] = useState(false)

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      style={{
        minHeight: '100vh',
        paddingTop: '76px',
        background: isDark
          ? `linear-gradient(150deg, #1F1C18 0%, #1A1612 48%, rgba(40,199,216,0.06) 100%)`
          : `linear-gradient(150deg, ${B.creamWarm} 0%, ${B.cream} 48%, rgba(40,199,216,0.08) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        .hero-layout { display:grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); gap: 72px; align-items: center; min-height: 100vh; padding: 80px 0; }
        .hero-left { padding-top: 24px; animation: fadeInUp 0.9s ease both; }
        .hero-pretitle { margin-bottom: 28px; animation: fadeInUp 0.95s ease both; }
        .hero-heading { font-family: ${serif}; font-weight: 700; font-size: clamp(3rem, 5vw, 5.5rem); line-height: 0.96; color: ${T.brown}; margin: 0 0 32px; letter-spacing: -0.02em; animation: fadeInUp 1s ease 0.1s both; }
        .hero-heading span { color: ${T.teal}; }
        .hero-divider { margin-bottom: 32px; opacity: 0.92; animation: fadeInUp 1s ease 0.15s both; }
        .hero-copy { font-family: ${sans}; font-weight: 400; font-size: clamp(1rem, 1.05vw, 1.2rem); line-height: 1.9; color: ${T.brownLight}; max-width: 580px; margin-bottom: 48px; animation: fadeInUp 1s ease 0.2s both; }
        .hero-actions { display:flex; flex-wrap: wrap; gap: 18px; margin-bottom: 48px; animation: fadeInUp 1s ease 0.25s both; }
        .hero-actions a { display: inline-flex; align-items:center; justify-content:center; min-width: 180px; text-decoration:none; padding: 18px 36px; border-radius: 999px; font-family: ${display}; font-weight: 800; font-size: 0.96rem; letter-spacing:0.06em; transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease, color 0.28s ease; position: relative; overflow: hidden; }
        .hero-actions a.primary { background: ${isDark ? '#2A2420' : B.white}; color: ${T.brown}; border: 2px solid ${isDark ? 'rgba(245,237,216,0.3)' : B.brown}; box-shadow: ${isDark ? '0 18px 48px rgba(0,0,0,0.3)' : '0 18px 48px rgba(78,52,46,0.12)'}; }
        .hero-actions a.primary:hover { transform: translateY(-2px) scale(1.01); background: ${isDark ? '#3A322C' : B.brown}; color: ${isDark ? T.brown : B.white}; box-shadow: ${isDark ? '0 18px 48px rgba(0,0,0,0.4)' : '0 18px 48px rgba(78,52,46,0.22)'}; }
        .hero-actions a.secondary { background: ${T.teal}; color: #FFFFFF; box-shadow: 0 10px 30px rgba(40,199,216,0.28); }
        .hero-actions a.secondary:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 16px 44px rgba(40,199,216,0.4); }
        .hero-badge { display: inline-flex; align-items: center; background: ${T.yellow}; border-radius: 24px; padding: 14px 22px; box-shadow: 0 12px 30px rgba(245,200,66,0.4); z-index:2; margin: 4px 0 0; width: fit-content; }
        .hero-badge p { font-family: ${display}; font-weight: 900; font-size: 0.86rem; color: ${B.brown}; margin: 0; }
        .hero-meta { display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; width: 100%; margin-top: 44px; padding-top: 36px; border-top: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(78,52,46,0.12)'}; animation: fadeInUp 1s ease 0.3s both; }
        .hero-meta-item { min-width: 0; display:flex; flex-direction: column; justify-content:flex-start; align-items:flex-start; }
        .hero-meta-item p:first-child { font-family: ${display}; font-weight: 900; font-size: 1.9rem; color: ${T.teal}; margin: 0 0 6px; }
        .hero-meta-item p:last-child { font-family: ${sans}; font-weight: 400; font-size: 0.82rem; color: ${T.brownMuted}; text-transform: uppercase; letter-spacing: 0.16em; margin: 0; }
        .hero-visual { position:relative; display:flex; align-items:center; justify-content:center; animation: fadeInUp 0.9s ease 0.2s both; }
        .hero-ring { position:absolute; inset: 16px; border-radius: 42px; border: 2px dashed rgba(40,199,216,0.22); pointer-events:none; }
        .hero-image-card { width: 100%; max-width: 720px; aspect-ratio: 4/5; border-radius: 36px; overflow:hidden; background: ${T.creamWarm}; box-shadow: 0 32px 96px rgba(78,52,46,0.18), 0 14px 36px rgba(78,52,46,0.12); position:relative; transition: transform 0.35s ease, box-shadow 0.35s ease; will-change: transform; backface-visibility: hidden; -webkit-backface-visibility: hidden; transform: translateZ(0); }
        .hero-image-card:hover { transform: translateY(-6px) translateZ(0); box-shadow: 0 44px 104px rgba(78,52,46,0.22), 0 18px 42px rgba(78,52,46,0.14); }
        .hero-image-card img { width: 100%; height: 100%; object-fit: cover; object-position: center; display:block; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; image-rendering: high-quality; -ms-interpolation-mode: bicubic; }
        .hero-overlay { position:absolute; bottom:0; left:0; right:0; height:46%; background: linear-gradient(to top, rgba(78,52,46,0.78) 0%, transparent 100%); }
        .hero-caption { position:absolute; bottom:28px; left:28px; right:28px; display:flex; flex-direction: column; gap: 4px; }
        .hero-caption p:first-child { font-family: ${display}; font-weight: 800; font-size: 1.05rem; color: #FFFFFF; margin:0; }
        .hero-caption p:last-child { font-family: ${sans}; font-weight: 400; font-size: 0.82rem; color: rgba(255,255,255,0.88); letter-spacing: 0.12em; text-transform: uppercase; margin:0; }
        @media (max-width: 1120px) {
          .hero-layout { grid-template-columns: 1fr; padding: 64px 40px 72px; }
          .hero-left { padding-top: 0; }
          .hero-visual { padding-top: 0; }
          .hero-meta { justify-content: flex-start; }
          .hero-image-card { max-width: 560px; }
        }
        @media (max-width: 760px) {
          .hero-layout { gap: 42px; }
          .hero-left { padding-top: 0; }
          .hero-actions { flex-direction: column; align-items: stretch; }
          .hero-actions a { width: 100%; }
          .hero-badge { margin-top: 8px; }
          .hero-meta { grid-template-columns: 1fr; gap: 20px; }
          .hero-image-card { max-width: 100%; border-radius: 32px; }
          .hero-caption { bottom: 22px; left: 22px; right: 22px; }
        }
        @media (max-width: 520px) {
          .hero-layout { padding: 48px 24px 60px; }
          .hero-heading { font-size: 2.65rem; line-height: 1.02; }
          .hero-copy { font-size: 1rem; max-width: 100%; }
          .hero-actions { gap: 14px; }
          .hero-actions a { padding: 16px 24px; font-size: 0.95rem; }
          .hero-image-card { aspect-ratio: 1; }
          .hero-badge { padding: 10px 16px; }
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Atmospheric background overlay */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url(${restaurant4})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: isDark ? 0.03 : 0.05, pointerEvents: 'none' }} />

      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: `radial-gradient(circle, ${B.yellow}55 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '80px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: `radial-gradient(circle, ${B.tealPale} 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '52%', left: '42%', width: '220px', height: '220px', borderRadius: '50%', background: `radial-gradient(circle, rgba(139,195,74,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Bird decos */}
      <div style={{ position: 'absolute', top: '18%', left: '5%', transform: 'rotate(-15deg)', pointerEvents: 'none' }}><BirdDeco size={60} opacity={0.06} color={B.brown} /></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '4%', transform: 'rotate(10deg)', pointerEvents: 'none' }}><BirdDeco size={48} opacity={0.07} color={B.teal} /></div>

      <div className="hero-layout" style={{ flex: 1, maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '0 64px' }}>
        {/* Left */}
        <div className="hero-left">
          <div className="hero-pretitle">
            <Pill bg={B.tealPale} color={B.teal}>🐦 Pure Vegetarian · Est. 2009</Pill>
          </div>

          <h1 id="hero-title" className="hero-heading">
            Pankhii.<br />
            Warmth in Every<br />
            <span>Family Meal</span>
          </h1>

          {/* Wavy divider */}
          <svg className="hero-divider" width="140" height="14" viewBox="0 0 140 14" fill="none" aria-hidden="true">
            <path d="M0 7 Q18 0 36 7 Q54 14 72 7 Q90 0 108 7 Q126 14 140 7" stroke={B.teal} strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>

          <p className="hero-copy">
            Settle into a refined vegetarian sanctuary where every dish blends rich spices, seasonal harvest, and the joy of shared moments. Elegant dining for families who savor warmth.
          </p>

          <div className="hero-actions">
            <a
              className="primary"
              href="#menu"
              onMouseEnter={() => setMenuHov(true)}
              onMouseLeave={() => setMenuHov(false)}
            >
              🍽️ Explore Menu
            </a>
            <a
              className="secondary"
              href="#reservations"
              onMouseEnter={() => setReserveHov(true)}
              onMouseLeave={() => setReserveHov(false)}
            >
              📅 Reserve Table
            </a>
          </div>

          <div className="hero-badge">
            <p>⭐ 5-Star Rated</p>
          </div>

          <div className="hero-meta">
            {[
              { v: '15+', l: 'Years' }, { v: '100+', l: 'Dishes' }, { v: '10K+', l: 'Guests' },
            ].map(({ v, l }) => (
              <div key={l} className="hero-meta-item">
                <p>{v}</p>
                <p>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — family dining image */}
        <div className="hero-visual">
          <div className="hero-ring" />
          <div className="hero-image-card">
            <img src={restaurant4} alt="Warm family dining together over vegetarian dishes" />
            <div className="hero-overlay" />
            <div className="hero-caption">
              <p>Chef-curated seasonal feast</p>
              <p>Plant-first · Intimate · Joyful</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Stats ─────────────────────────────────────────────
function StatsSection() {
  const { isDark } = useTheme()
  return (
    <section id="stats" style={{
      background: isDark ? '#12100E' : B.brown,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle dot pattern */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.06 }} preserveAspectRatio="none">
        <defs>
          <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2" fill={B.creamWarm} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="stats-grid" style={{ maxWidth: '1440px', margin: '0 auto', padding: '72px 64px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px', position: 'relative' }}>
        {STATS.map(({ icon, value, label, sub }, i) => (
          <StatCard key={label} icon={icon} value={value} label={label} sub={sub} isLast={i === 3} />
        ))}
      </div>
    </section>
  )
}

function StatCard({ icon, value, label, sub, isLast }: { icon: string; value: string; label: string; sub: string; isLast: boolean }) {
  const [hov, setHov] = useState(false)
  const { isDark } = useTheme()
  const T = isDark ? D : B

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '48px 36px',
        background: hov ? 'rgba(255,255,255,0.06)' : 'transparent',
        borderRight: isLast ? 'none' : '1px solid rgba(253,246,227,0.12)',
        transition: 'background 0.3s',
        cursor: 'default',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: '36px',
        height: '3px', borderRadius: '2px',
        width: hov ? 'calc(100% - 72px)' : '28px',
        background: T.teal,
        transition: 'width 0.4s ease',
      }} />

      {/* Icon bubble */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '16px',
        background: hov ? 'rgba(40,199,216,0.18)' : 'rgba(253,246,227,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px', marginBottom: '20px',
        transition: 'background 0.3s',
        border: `1px solid rgba(253,246,227,0.15)`,
      }}>
        {icon}
      </div>

      <p style={{
        fontFamily: display, fontWeight: 900,
        fontSize: value.startsWith('★') ? '20px' : '44px',
        lineHeight: 1, color: T.creamWarm,
        marginBottom: '8px',
        letterSpacing: value.startsWith('★') ? '0.1em' : '-0.01em',
      }}>{value}</p>

      <p style={{ fontFamily: display, fontWeight: 700, fontSize: '14px', color: '#FFFFFF', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
      <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '13px', color: 'rgba(253,246,227,0.6)', lineHeight: 1.5 }}>{sub}</p>
    </div>
  )
}

// ── About ─────────────────────────────────────────────
function AboutSection() {
  const { isDark } = useTheme()
  const T = isDark ? D : B
  return (
    <section id="about" style={{ background: T.cream, padding: '72px 0 84px', position: 'relative', overflow: 'hidden' }}>
      {/* Atmospheric background overlay */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url(${restaurant1})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: isDark ? 0.03 : 0.05, pointerEvents: 'none' }} />
      <style>{`
        .about-copy { display: flex; flex-direction: column; justify-content: center; gap: 16px; }
        .about-copy h2 { margin: 0; }
        .about-copy svg { display: block; margin: 0; }
        .about-copy p { margin: 0; }
        .about-stats { display: flex; gap: 32px; margin-top: 8px; }
        @media (max-width: 1120px) {
          .about-grid { gap: 52px; }
          .about-copy { gap: 14px; }
          .about-stats { gap: 20px; }
        }
        @media (max-width: 760px) {
          .about-grid { gap: 36px; }
          .about-copy { gap: 12px; }
          .about-stats { flex-direction: column; gap: 16px; }
        }
      `}</style>

      <div className="about-grid" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px 80px', alignItems: 'center' }}>

        {/* Left image mosaic */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div style={{ borderRadius: '28px', overflow: 'hidden', aspectRatio: '3/4', background: T.creamWarm, boxShadow: '0 24px 64px rgba(90,51,36,0.14)' }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTX9jddpZzipO4t9ixDh_IIbMSogmVLm3nCu_tHXApFQ&s=10"
              alt="Pankhii kitchen preparation"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', display: 'block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
            />
          </div>

          {/* Deco bird */}
          <div style={{ position: 'absolute', top: '20px', left: '-20px', pointerEvents: 'none' }}>
            <BirdDeco size={72} opacity={0.09} color={T.teal} />
          </div>
        </div>

        {/* Right copy */}
        <div className="about-copy">
          <SectionTag color={T.teal}>Our Story</SectionTag>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: '52px', lineHeight: 1.1, color: T.brown }}>
            Born from a<br />love of <span style={{ color: T.teal }}>good food</span><br />& family.
          </h2>

          <svg width="100" height="10" viewBox="0 0 100 10" fill="none" aria-hidden="true">
            <path d="M0 5 Q12.5 0 25 5 Q37.5 10 50 5 Q62.5 0 75 5 Q87.5 10 100 5" stroke={isDark ? T.teal : B.green} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>

          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', lineHeight: 1.85, color: T.brownLight }}>
            Pankhii — named after the Sanskrit word for "bird" — was founded by the Iyer family in 2009 with a simple belief: vegetarian food can be as joyful, colourful, and soulful as any meal on earth.
          </p>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', lineHeight: 1.85, color: T.brownLight }}>
            We source from 28 family farms across Maharashtra, cook with time-honoured spice traditions, and plate with the care of a gift. Every table is treated like family.
          </p>

          <div className="about-stats" style={{ display: 'flex', gap: '32px' }}>
            {[{ v: '28', l: 'Farm Partners' }, { v: '120+', l: 'Seasonal Ingredients' }].map(({ v, l }) => (
              <div key={l} style={{ padding: '20px 24px', background: T.tealPale, borderRadius: '16px', border: `1px solid rgba(40,199,216,0.2)` }}>
                <p style={{ fontFamily: display, fontWeight: 900, fontSize: '32px', color: T.teal, lineHeight: 1 }}>{v}</p>
                <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: T.brownMuted, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Menu ─────────────────────────────────────────────
function MenuSection() {
  const { isDark } = useTheme()
  const T = isDark ? D : B
  const [active, setActive] = useState('Starters')
  const current = MENU_ITEMS.find(m => m.category === active)!

  return (
    <section id="menu" style={{ background: isDark ? `linear-gradient(180deg, #1F1C18 0%, #1A1612 100%)` : `linear-gradient(180deg, ${B.creamWarm} 0%, ${B.cream} 100%)`, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionTag color={isDark ? T.teal : B.green}>Seasonal Menu</SectionTag>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: '52px', color: T.brown, marginBottom: '12px' }}>
            Curated with the <span style={{ color: isDark ? T.teal : B.green }}>season</span>.
          </h2>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', color: T.brownLight, maxWidth: '480px', margin: '0 auto' }}>
            Our menu honours what the earth offers each week. Fresh, vibrant, and full of flavour.
          </p>
        </div>

        {/* Category pills */}
        <div className="menu-categories" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px' }}>
          {MENU_ITEMS.map(m => (
            <button
              key={m.category}
              onClick={() => setActive(m.category)}
              style={{
                fontFamily: display, fontWeight: 800, fontSize: '14px',
                padding: '10px 28px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                background: active === m.category ? T.teal : T.white,
                color: active === m.category ? '#FFFFFF' : T.brownLight,
                boxShadow: active === m.category ? '0 6px 20px rgba(40,199,216,0.35)' : '0 2px 8px rgba(90,51,36,0.08)',
                transition: 'all 0.25s ease',
              }}
            >
              {m.emoji} {m.category}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div className="menu-grid-shell">
          <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px', width: '100%', alignItems: 'stretch' }}>
            {current.items.map(item => (
              <MenuCard key={item.name} {...item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function MenuCard({ name, desc, price, isJain = false }: { name: string; desc: string; price: string; isJain?: boolean }) {
  const { isDark } = useTheme()
  const T = isDark ? D : B
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.white, borderRadius: '20px', padding: '28px',
        boxShadow: hov ? '0 16px 48px rgba(90,51,36,0.14)' : '0 4px 16px rgba(90,51,36,0.07)',
        border: hov ? `1px solid rgba(40,199,216,0.3)` : `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(90,51,36,0.06)'}`,
        transform: hov ? 'translateY(-4px)' : 'none',
        transition: 'all 0.3s ease', cursor: 'default',
        width: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px', width: '100%' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: '18px', color: T.brown, lineHeight: 1.25, margin: 0, minWidth: 0, overflowWrap: 'break-word', wordBreak: 'normal' }}>{name}</h3>
        </div>
        <span style={{ fontFamily: display, fontWeight: 800, fontSize: '15px', color: T.teal, whiteSpace: 'pre-line', flexShrink: 0, marginLeft: '8px', maxWidth: '130px', textAlign: 'right', lineHeight: 1.4 }}>{price}</span>
      </div>
      <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: T.brownMuted, lineHeight: 1.65, margin: 0, width: '100%', minWidth: 0, overflowWrap: 'break-word', wordBreak: 'normal' }}>{desc}</p>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Pill bg={isDark ? 'rgba(155,203,101,0.15)' : `rgba(139,195,74,0.15)`} color={T.green}>🌿 Pure Veg</Pill>
        {isJain && (
          <Pill bg={`rgba(232,131,74,0.12)`} color={B.orange}>JAIN</Pill>
        )}
      </div>
    </div>
  )
}


// ── Gallery strip ─────────────────────────────────────────────
function GallerySection() {
  const { isDark } = useTheme()
  const T = isDark ? D : B
  const images = [
    { src: dish1, alt: 'Plated starter' },
    { src: dish2, alt: 'Colourful dish' },
    { src: dish3, alt: 'Chef preparation' },
    { src: dish4, alt: 'Signature bowl' },
    { src: dish5, alt: 'Fresh plating' },
    { src: dish6, alt: 'Dessert spread' },
    { src: dish7, alt: 'Dining room' },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const id = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length)
    }, 2600)

    return () => window.clearInterval(id)
  }, [isPaused, images.length])

  const goNext = () => setActiveIndex(prev => (prev + 1) % images.length)
  const goPrev = () => setActiveIndex(prev => (prev - 1 + images.length) % images.length)

  const getCardStyle = (index: number) => {
    const offset = ((index - activeIndex + images.length) % images.length)
    let normalized = offset > images.length / 2 ? offset - images.length : offset

    const abs = Math.abs(normalized)

    if (abs === 0) {
      return {
        transform: 'translate(-50%, -50%) translate3d(0, 0, 180px) scale(1.12)',
        opacity: 1,
        zIndex: 20,
      }
    }

    const direction = normalized > 0 ? 1 : -1
    const x = direction * (180 - abs * 32)
    const y = abs * 14
    const z = -Math.abs(normalized) * 120
    const rotateY = direction * (18 + abs * 10)
    const scale = 1 - abs * 0.12

    return {
      transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: 1 - abs * 0.22,
      zIndex: 10 - abs,
    }
  }

  return (
    <section id="gallery" style={{ background: isDark ? '#1A1612' : B.cream, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <SectionTag color={B.orange}>From the Kitchen</SectionTag>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: '48px', color: T.brown }}>Art on the <span style={{ color: B.orange }}>plate</span>.</h2>
          </div>
          <BirdDeco size={64} opacity={0.1} color={B.orange} />
        </div>

        <div
          className="gallery-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            position: 'relative',
            maxWidth: '1280px',
            margin: '0 auto',
            height: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            aria-label="Previous dishes"
            onClick={goPrev}
            style={{
              position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 30,
              width: '58px', height: '58px', borderRadius: '50%',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(78,52,46,0.15)'}`, background: T.white, color: T.brown,
              boxShadow: '0 16px 34px rgba(90,51,36,0.08)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', lineHeight: 1,
            }}
          >
            ←
          </button>

          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            perspective: '1600px',
            transformStyle: 'preserve-3d',
          }}>
            {images.map((image, index) => {
              const cardStyle = getCardStyle(index)

              return (
                <div
                  key={`${image.alt}-${index}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 'min(26vw, 300px)',
                    height: 'min(36vw, 420px)',
                    minWidth: '220px',
                    minHeight: '310px',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    background: isDark ? '#2A2420' : B.creamWarm,
                    boxShadow: index === activeIndex ? '0 22px 48px rgba(78,52,46,0.12)' : '0 10px 28px rgba(78,52,46,0.08)',
                    border: '1px solid rgba(78,52,46,0.05)',
                    transform: cardStyle.transform,
                    transformStyle: 'preserve-3d',
                    opacity: cardStyle.opacity,
                    zIndex: cardStyle.zIndex,
                    transition: 'transform 0.6s ease, opacity 0.6s ease, z-index 0.6s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              )
            })}
          </div>

          <button
            type="button"
            aria-label="Next dishes"
            onClick={goNext}
            style={{
              position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 30,
              width: '58px', height: '58px', borderRadius: '50%',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(78,52,46,0.15)'}`, background: T.white, color: T.brown,
              boxShadow: '0 16px 34px rgba(90,51,36,0.08)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', lineHeight: 1,
            }}
          >
            →
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '22px' }}>
          {images.map((image, index) => (
            <button
              key={image.alt}
              type="button"
              aria-label={`Go to dish ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              style={{
                width: index === activeIndex ? '28px' : '10px',
                height: '10px',
                borderRadius: '999px',
                border: 'none',
                background: index === activeIndex ? B.orange : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(78,52,46,0.18)'),
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Experience ────────────────────────────────────────────────
function ExperienceSection() {
  const { isDark } = useTheme()
  const T = isDark ? D : B
  const exp = EXPERIENCES[0]

  // All 6 available ambience images in masonry order
  const galleryImages = [
    { src: restaurant1, alt: 'Elegant restaurant ambience with premium seating', featured: true },
    { src: restaurant2, alt: 'Warm and inviting dining atmosphere', featured: false },
    { src: restaurant3, alt: 'Sophisticated interior design', featured: false },
    { src: restaurant4, alt: 'Beautiful restaurant space', featured: false },
    { src: restaurant5, alt: 'Premium dining environment', featured: false },
    { src: restaurant7, alt: 'Restaurant charm and elegance', featured: false },
  ]

  return (
    <section id="private-dining" style={{ background: T.creamWarm, padding: '120px 0' }}>
      <style>{`
        .experience-container { display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px; align-items: start; }
        
        .experience-text-section { display: flex; flex-direction: column; gap: 20px; }
        .experience-card { text-align: left; padding: 28px 32px; border-radius: 24px; background: ${T.white}; box-shadow: 0 12px 36px rgba(90,51,36,0.12); border-left: 4px solid ${T.teal}; }
        .experience-card h3 { font-family: ${display}; font-weight: 800; font-size: 22px; color: ${T.teal}; margin: 0 0 14px 0; }
        .experience-card p { font-family: ${sans}; font-size: 15px; color: ${T.brownLight}; line-height: 1.7; margin: 0 0 14px 0; }
        .experience-card p:last-child { margin-bottom: 0; }
        .experience-pills { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 14px; }
        
        .ambience-masonry { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 220px; gap: 14px; }
        .ambience-item { position: relative; overflow: hidden; border-radius: 24px; background: ${T.creamWarm}; box-shadow: 0 14px 40px rgba(90,51,36,0.11); transition: box-shadow 0.5s ease, transform 0.5s ease; cursor: pointer; }
        .ambience-item:hover { box-shadow: 0 24px 60px rgba(90,51,36,0.16); transform: translateY(-12px); }
        .ambience-item.featured { grid-column: span 2; grid-row: span 2; }
        .ambience-item img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; transition: transform 0.6s ease-out; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; image-rendering: auto; -webkit-font-smoothing: antialiased; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .ambience-item:hover img { transform: scale(1.06); }
        
        @media (max-width: 1280px) {
          .experience-container { grid-template-columns: 1fr 1.2fr; gap: 44px; }
          .ambience-masonry { grid-auto-rows: 200px; gap: 12px; }
        }
        @media (max-width: 1120px) {
          .experience-container { grid-template-columns: 1fr; gap: 40px; }
          .ambience-masonry { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; }
          .ambience-item.featured { grid-column: span 2; grid-row: span 2; }
        }
        @media (max-width: 760px) {
          .experience-container { gap: 28px; }
          .ambience-masonry { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; gap: 10px; }
          .ambience-item.featured { grid-column: span 1; grid-row: span 1; }
          .ambience-item:hover { transform: translateY(-6px); }
          .experience-card { padding: 22px 24px; border-radius: 20px; }
          .experience-card h3 { font-size: 20px; margin-bottom: 12px; }
          .experience-card p { font-size: 14px; }
          .experience-pills { gap: 8px; }
        }
        @media (max-width: 520px) {
          .ambience-masonry { grid-template-columns: 1fr; grid-auto-rows: 180px; }
          .experience-card { padding: 18px 20px; }
          .experience-card h3 { font-size: 18px; }
        }
      `}</style>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionTag color={T.teal}>Private Dining</SectionTag>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: '48px', color: T.brown }}>
            Extraordinary <span style={{ color: T.teal }}>spaces</span>.
          </h2>
        </div>

        {/* Main Container */}
        <div className="experience-container">
          {/* Text Section - Left */}
          <div className="experience-text-section">
            <div className="experience-card">
              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>
              <div className="experience-pills">
                <Pill bg={T.tealPale} color={T.teal}>{exp.seats}</Pill>
                <Pill bg={T.tealPale} color={T.teal}>{exp.duration}</Pill>
              </div>
            </div>
          </div>

          {/* Masonry Gallery - Right */}
          <div className="ambience-masonry">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`ambience-item ${image.featured ? 'featured' : ''}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  decoding={image.featured ? 'sync' : 'async'}
                  loading={image.featured ? 'eager' : 'lazy'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────
function TestimonialsSection() {
  const { isDark } = useTheme()
  const T = isDark ? D : B
  const [active, setActive] = useState(0)

  const nextTestimonial = () => setActive((current) => (current + 1) % TESTIMONIALS.length)
  const prevTestimonial = () => setActive((current) => (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="testimonials" style={{ background: T.cream, padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Atmospheric background overlay */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url(${restaurant2})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: isDark ? 0.03 : 0.04, pointerEvents: 'none' }} />
      <style>{`
        .testimonial-shell { max-width: 980px; margin: 0 auto; }
        .testimonial-row { display: flex; align-items: center; justify-content: center; gap: 28px; }
        .testimonial-arrow {
          width: 48px; height: 48px; border-radius: 50%;
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(90,51,36,0.12)'}; background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)'};
          color: ${T.brown}; box-shadow: 0 8px 24px rgba(90,51,36,0.08);
          display: inline-flex; align-items: center; justify-content: center;
          font-family: ${display}; font-weight: 800; font-size: 30px; line-height: 1;
          cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          flex-shrink: 0;
        }
        .testimonial-arrow:hover {
          transform: translateY(-2px); box-shadow: 0 12px 30px rgba(90,51,36,0.12);
          border-color: rgba(90,51,36,0.2);
        }
        .testimonial-arrow:active { transform: translateY(0); }
        .testimonial-content {
          flex: 1; min-width: 0; max-width: 760px;
          position: relative; padding: 28px 0 10px; animation: testimonialFade 0.45s ease;
        }
        .testimonial-content::before {
          content: '“';
          position: absolute; left: 50%; top: -14px; transform: translateX(-50%);
          font-family: Georgia, 'Times New Roman', serif; font-size: 170px; line-height: 1;
          font-weight: 600; color: rgba(78,52,46,0.08); letter-spacing: -0.08em;
          pointer-events: none;
        }
        @keyframes testimonialFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 760px) {
          .testimonial-row { gap: 12px; }
          .testimonial-arrow {
            width: 38px; height: 38px; font-size: 24px;
          }
          .testimonial-content { max-width: 100%; padding-top: 20px; }
          .testimonial-content::before {
            font-size: 120px; top: -4px;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionTag color={B.orange}>Guest Stories</SectionTag>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: '48px', color: T.brown }}>
            What our <span style={{ color: B.orange }}>guests</span> say.
          </h2>
        </div>

        <div className="testimonial-shell" style={{ textAlign: 'center' }}>
          <div className="testimonial-row">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prevTestimonial}
              className="testimonial-arrow"
            >
              ‹
            </button>

            <div key={active} className="testimonial-content">
              <p style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(20px, 2.3vw, 32px)',
                lineHeight: 1.6, letterSpacing: '0.02em', color: T.brown,
                margin: '0 auto 28px', maxWidth: '700px', padding: '0 10px'
              }}>
                "{TESTIMONIALS[active].quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '36px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: T.creamWarm, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>😊</div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontFamily: display, fontWeight: 800, fontSize: '15px', color: T.brown }}>{TESTIMONIALS[active].author}</p>
                  <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: T.brownMuted }}>{TESTIMONIALS[active].role}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={nextTestimonial}
              className="testimonial-arrow"
            >
              ›
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '0' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? '28px' : '10px', height: '10px', borderRadius: '999px',
                  border: 'none', cursor: 'pointer',
                  background: active === i ? T.teal : (isDark ? 'rgba(255,255,255,0.12)' : T.creamWarm),
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Reservation ────────────────────────────────────────────
function ReservationSection() {
  const { isDark } = useTheme()
  const T = isDark ? D : B
  const [form, setForm] = useState({ name: '', email: '', date: '', guests: '2', occasion: '' })
  const [submitted, setSubmitted] = useState(false)

  const inputSt: React.CSSProperties = {
    fontFamily: sans, fontWeight: 400, fontSize: '15px',
    width: '100%', padding: '14px 18px', borderRadius: '14px',
    border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(90,51,36,0.18)'}`, background: T.white,
    color: T.brown, outline: 'none', transition: 'border-color 0.25s',
  }

  return (
    <section id="reservations" style={{ background: isDark ? `linear-gradient(180deg, #1F1C18 0%, #1A1612 100%)` : `linear-gradient(180deg, ${B.creamWarm} 0%, ${B.cream} 100%)`, padding: '120px 0' }}>
      <div className="reservation-grid" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <SectionTag color={T.teal}>Reservations</SectionTag>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: '52px', lineHeight: 1.1, color: T.brown, marginBottom: '20px' }}>
            Your table<br /><span style={{ color: T.teal }}>awaits</span>.
          </h2>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', lineHeight: 1.8, color: T.brownLight, marginBottom: '40px' }}>
            We seat guests Tuesday through Sunday, from 12 PM to 3 PM and 7 PM to 11 PM. Walk-ins welcome at the bar.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              {
                emoji: '📍',
                label: 'Address',
                value: '1st Floor 877/4a, Vani Villas Road Near RTO Circle, Lakshmipuram, Mysuru 570004'
              },
              {
                emoji: '📞',
                label: 'Telephone',
                value: '+91 80958 09571'
              },
            ].map(({ emoji, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px 20px', background: T.white, borderRadius: '16px', boxShadow: '0 2px 12px rgba(90,51,36,0.07)' }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{emoji}</span>
                <div>
                  <p style={{ fontFamily: display, fontWeight: 700, fontSize: '11px', color: T.teal, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '3px' }}>{label}</p>
                  <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: T.brownLight }}>
                    {label === 'Telephone' ? <a href="tel:+918095809571" style={{ color: 'inherit', textDecoration: 'none' }}>{value}</a> : value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="reservation-panel" style={{ background: T.white, borderRadius: '28px', padding: '44px', boxShadow: '0 24px 64px rgba(90,51,36,0.12)', border: `1px solid rgba(40,199,216,0.12)` }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🐦</div>
              <h3 style={{ fontFamily: display, fontWeight: 900, fontSize: '28px', color: T.teal, marginBottom: '12px' }}>We'll be in touch!</h3>
              <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '15px', color: T.brownLight }}>Your reservation request has been received. Our team will confirm within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
              <h3 style={{ fontFamily: display, fontWeight: 900, fontSize: '22px', color: T.brown, marginBottom: '28px' }}>Book a Table</h3>
              <div className="reservation-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: T.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Full Name</label>
                  <input required type="text" placeholder="Your name" style={inputSt} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={e => { e.target.style.borderColor = T.teal }} onBlur={e => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(90,51,36,0.18)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: T.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Email</label>
                  <input required type="email" placeholder="your@email.com" style={inputSt} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={e => { e.target.style.borderColor = T.teal }} onBlur={e => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(90,51,36,0.18)' }} />
                </div>
              </div>
              <div className="reservation-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: T.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Date</label>
                  <input required type="date" style={{ ...inputSt, colorScheme: isDark ? 'dark' : 'light' }} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} onFocus={e => { e.target.style.borderColor = T.teal }} onBlur={e => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(90,51,36,0.18)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: T.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Guests</label>
                  <select style={{ ...inputSt, cursor: 'pointer' }} value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} onFocus={e => { e.target.style.borderColor = T.teal }} onBlur={e => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(90,51,36,0.18)' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: T.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Special Occasion (optional)</label>
                <input type="text" placeholder="Birthday, anniversary…" style={inputSt} value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })} onFocus={e => { e.target.style.borderColor = T.teal }} onBlur={e => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(90,51,36,0.18)' }} />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%', padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer',
                  fontFamily: display, fontWeight: 800, fontSize: '15px', letterSpacing: '0.04em',
                  background: T.teal, color: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(40,199,216,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(40,199,216,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(40,199,216,0.35)' }}
              >
                🐦 Request Reservation
              </button>
              <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: T.brownMuted, textAlign: 'center', marginTop: '12px' }}>No payment required · Confirmed within 2 hours</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ── Location / Find Us ─────────────────────────────────────────
function LocationSection() {
  const { isDark } = useTheme()
  const T = isDark ? D : B
  return (
    <section
      id="location"
      style={{
        background: isDark ? `linear-gradient(180deg, #1A1612 0%, #1F1C18 100%)` : `linear-gradient(180deg, ${B.cream} 0%, ${B.creamWarm} 100%)`,
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        /* ── loc-* classes are fully isolated and do not affect any other section ── */
        .loc-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 64px;
        }
        .loc-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .loc-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .loc-tag-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${B.gold};
        }
        .loc-tag-text {
          font-family: ${display};
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${B.gold};
        }
        .loc-heading {
          font-family: ${serif};
          font-weight: 700;
          font-size: 52px;
          color: ${T.brown};
          margin: 0 0 12px;
          line-height: 1.1;
        }
        .loc-heading span {
          color: ${T.teal};
        }
        .loc-subtitle {
          font-family: ${sans};
          font-weight: 400;
          font-size: 16px;
          color: ${T.brownLight};
          margin: 0;
        }
        .loc-map-wrapper {
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(78,52,46,0.18), 0 12px 32px rgba(78,52,46,0.1);
          border: 1px solid rgba(78,52,46,0.08);
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
          background: ${T.creamWarm};
        }
        .loc-map-wrapper iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
        .loc-open-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 28px;
          padding: 14px 32px;
          border-radius: 999px;
          font-family: ${display};
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.06em;
          background: ${B.teal};
          color: ${B.white};
          text-decoration: none;
          box-shadow: 0 8px 28px rgba(40,199,216,0.32);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .loc-open-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 38px rgba(40,199,216,0.44);
        }
        .loc-footer-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        .loc-address-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: ${T.white};
          border-radius: 999px;
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(78,52,46,0.1)'};
          box-shadow: 0 4px 14px rgba(78,52,46,0.07);
          font-family: ${sans};
          font-weight: 400;
          font-size: 14px;
          color: ${T.brownLight};
        }
        @media (max-width: 760px) {
          .loc-container { padding: 0 24px; }
          .loc-heading { font-size: 36px; }
          .loc-map-wrapper { aspect-ratio: 4 / 3; border-radius: 20px; }
          .loc-footer-row { flex-direction: column; gap: 12px; }
        }
        @media (max-width: 520px) {
          .loc-container { padding: 0 16px; }
          .loc-heading { font-size: 30px; }
          .loc-map-wrapper { aspect-ratio: 1 / 1; border-radius: 16px; }
        }
      `}</style>

      {/* Decorative blobs — isolated, pointer-events none */}
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '340px', height: '340px', borderRadius: '50%', background: `radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '260px', height: '260px', borderRadius: '50%', background: `radial-gradient(circle, ${B.tealPale} 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div className="loc-container">
        {/* Header */}
        <div className="loc-header">
          <div className="loc-tag">
            <div className="loc-tag-dot" />
            <span className="loc-tag-text">Find Us</span>
          </div>
          <h2 className="loc-heading">
            Locate <span>Pankhii</span>
          </h2>
          <p className="loc-subtitle">
            Pankhii Veg Restaurant · Mysuru, Karnataka
          </p>
        </div>

        {/* Map */}
        <div className="loc-map-wrapper">
          <iframe
            title="Pankhii Veg Restaurant location on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.1020869597354!2d76.6438459!3d12.2988174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf71007755180d%3A0x5b532179538bb265!2sPankhii%20Veg%20Restaurant%20%7C%20Mysuru!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Footer row — address chip + open-in-maps link */}
        <div className="loc-footer-row">
          <span className="loc-address-chip">
            📍 1st Floor 877/4a, Vani Villas Road, Lakshmipuram, Mysuru 570004
          </span>
          <a
            href="https://www.google.com/maps/place/Pankhii+Veg+Restaurant+%7C+Mysuru/@12.2988174,76.6438459,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="loc-open-link"
          >
            🗺️ Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────
function Footer() {
  const { isDark } = useTheme()
  return (
    <footer id="contact" style={{ background: isDark ? '#0E0C0A' : B.brown, position: 'relative', overflow: 'hidden' }}>
      {/* Deco bird top right */}
      <div style={{ position: 'absolute', top: '32px', right: '48px', pointerEvents: 'none' }}><BirdDeco size={80} opacity={0.08} color={B.creamWarm} /></div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '80px 64px 40px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '60px' }}>

          {/* Brand */}
          <div>
            <img src={logoImg} alt="Pankhii Veg Restaurant" style={{ height: '56px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '16px', filter: 'none', opacity: 1 }} />
            <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', lineHeight: 1.75, color: 'rgba(253,246,227,0.6)', maxWidth: '260px' }}>
              Pure vegetarian. Pure joy. Serving families across Mumbai since 2009 with love, tradition, and unforgettable flavours.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {['🌿 Pure Veg', '⭐ 5-Star'].map(t => (
                <span key={t} style={{ fontFamily: display, fontWeight: 700, fontSize: '11px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(253,246,227,0.1)', color: B.creamWarm, border: '1px solid rgba(253,246,227,0.15)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <p style={{ fontFamily: display, fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: B.teal, marginBottom: '20px' }}>Experience</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {["Family Table", "Garden Terrace", "Chef's Table", "Bar & Lounge"].map(i => (
                <li key={i}><a href="#" style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: 'rgba(253,246,227,0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = B.creamWarm }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,246,227,0.6)' }}>{i}</a></li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <p style={{ fontFamily: display, fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: B.teal, marginBottom: '20px' }}>Visit</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Tue – Sun', 'Lunch: 12–3 PM', 'Dinner: 7–11 PM', 'Closed Mondays'].map(i => (
                <li key={i} style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: 'rgba(253,246,227,0.6)' }}>{i}</li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontFamily: display, fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: B.teal, marginBottom: '20px' }}>Connect</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Instagram', 'Facebook', 'Zomato', 'Press & Media'].map(i => (
                <li key={i}><a href="#" style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: 'rgba(253,246,227,0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = B.creamWarm }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,246,227,0.6)' }}>{i}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(253,246,227,0.1)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '13px', color: 'rgba(253,246,227,0.4)' }}>© 2026 Pankhii Veg Restaurant Pvt. Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms', 'Accessibility'].map(i => (
              <a key={i} href="#" style={{ fontFamily: sans, fontWeight: 400, fontSize: '13px', color: 'rgba(253,246,227,0.4)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = B.creamWarm }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,246,227,0.4)' }}>{i}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)

  // ── Dark mode state ────────────────────────────────────────
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('pankhii-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const toggleTheme = () => setIsDark(prev => !prev)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('pankhii-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // ── Scroll detection ──────────────────────────────────────
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark, toggle: toggleTheme }}>
      <style>{`
        html, body { overflow-x: hidden; }
        #app { min-width: 0; }
        @media (max-width: 760px) {
          section > div[style*="max-width"], footer > div[style*="max-width"] {
            width: 100% !important;
            min-width: 0 !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          section h1, section h2, section h3, section p, footer p, footer a, footer li {
            white-space: normal;
            word-break: normal;
            overflow-wrap: break-word;
          }

          #hero .hero-layout {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          #stats .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 0 !important;
            padding-top: 44px !important;
            padding-bottom: 44px !important;
          }
          #stats .stats-grid > div {
            padding: 28px 18px !important;
            border-right: 1px solid rgba(253,246,227,0.12) !important;
            border-bottom: 1px solid rgba(253,246,227,0.12) !important;
          }
          #stats .stats-grid > div:nth-child(2n) { border-right: none !important; }
          #stats .stats-grid > div:nth-last-child(-n + 2) { border-bottom: none !important; }
          #stats .stats-grid > div > p:nth-of-type(2) { font-size: 12px !important; }
          #stats .stats-grid > div > p:nth-of-type(3) { font-size: 11px !important; }

          #about .about-grid { padding-left: 0 !important; padding-right: 0 !important; }
          #about .about-stats { flex-direction: row !important; gap: 12px !important; }
          #about .about-stats > div { flex: 1 1 0; min-width: 0; padding: 16px 14px !important; }
          #about .about-stats > div p:last-child { font-size: 10px !important; letter-spacing: 0.06em !important; }

          #menu .menu-grid-shell { padding-left: 0 !important; padding-right: 0 !important; }
          #menu .menu-categories { margin-left: -4px !important; margin-right: -4px !important; }

          #gallery > div > div:nth-of-type(2) {
            height: 390px !important;
          }
          #gallery > div > div:nth-of-type(2) > div {
            min-width: 0 !important;
            width: min(62vw, 250px) !important;
            height: min(86vw, 330px) !important;
            min-height: 0 !important;
          }
          #gallery > div > div:nth-of-type(2) > button {
            width: 42px !important;
            height: 42px !important;
            font-size: 22px !important;
          }

          #testimonials .testimonial-row { gap: 8px !important; align-items: flex-start !important; }
          #testimonials .testimonial-arrow { margin-top: 28px; flex: 0 0 36px; }

          #reservations .reservation-grid { padding-left: 0 !important; padding-right: 0 !important; }
          #reservations .reservation-panel { padding: 24px 18px !important; border-radius: 22px !important; }
          #reservations .reservation-form-grid { gap: 12px !important; }

          footer > div[style*="max-width"] { padding-top: 56px !important; padding-bottom: 28px !important; }
        }
        @media (max-width: 520px) {
          #about .about-stats { flex-direction: column !important; }
          #stats .stats-grid > div > p:first-of-type { font-size: 28px !important; }
          #testimonials .testimonial-arrow { display: none !important; }

          nav { min-width: 0; }
          .navbar-inner { padding: 0 16px !important; height: 66px !important; }
          .navbar-links, .navbar-cta { display: none !important; }
          .navbar-menu-button { display: inline-flex !important; }

          #home .hero-meta {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 10px !important;
            margin-top: 32px !important;
            padding-top: 24px !important;
          }
          #home .hero-meta-item p:first-child { font-size: 1.55rem !important; }
          #home .hero-meta-item p:last-child { font-size: 0.68rem !important; letter-spacing: 0.1em !important; }

          section { padding-left: 16px !important; padding-right: 16px !important; }
          section > div { min-width: 0; }
          section h1, section h2, section h3 { white-space: normal !important; word-break: break-word !important; }
          section h1, section h2, section h3 { margin-right: 0 !important; }

          .hero-layout { grid-template-columns: 1fr !important; padding: 40px 0 !important; gap: 32px !important; }
          .hero-heading { font-size: 2.5rem !important; line-height: 1.05 !important; }
          .hero-copy { font-size: 1rem !important; margin-bottom: 28px !important; }
          .hero-actions { flex-direction: column !important; align-items: stretch !important; }
          .hero-actions a { width: 100% !important; }
          .hero-meta { flex-direction: column !important; gap: 18px !important; padding-top: 24px !important; }
          .hero-image-card { max-width: 100% !important; aspect-ratio: 1 !important; border-radius: 28px !important; }
          .hero-caption { bottom: 22px !important; left: 20px !important; right: 20px !important; }
          .hero-badge { bottom: 32px !important; left: 10px !important; padding: 10px 16px !important; }

          #stats { overflow: hidden !important; }
          #stats .stats-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0 !important; padding: 44px 0 !important; }
          #stats .stats-grid > div { padding: 28px 16px !important; }
          #stats .stats-grid > div:nth-child(2n) { border-right: none !important; }
          #stats .stats-grid > div:nth-last-child(-n + 2) { border-bottom: none !important; }

          #about .about-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 28px !important; }
          #about .about-grid > div { min-width: 0 !important; }
          #about .about-visual-card { position: static !important; right: auto !important; bottom: auto !important; margin-top: 0 !important; width: 100% !important; }
          #about .about-visual-card > div { padding: 18px 18px 16px !important; }

          #menu .menu-categories { flex-wrap: nowrap !important; justify-content: flex-start !important; overflow-x: auto !important; gap: 12px !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          #menu { overflow: hidden !important; }
          #menu .menu-categories::-webkit-scrollbar { display: none; }
          #menu .menu-categories button { flex: 0 0 auto !important; min-width: 0 !important; }

          #menu .menu-grid-shell {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            padding: 0 14px !important;
            box-sizing: border-box !important;
          }
          #menu .menu-grid {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          #menu .menu-grid > div {
            min-width: 0 !important;
            width: 100% !important;
            max-width: none !important;
            padding: 12px 12px 10px !important;
            border-radius: 14px !important;
            box-sizing: border-box !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            gap: 8px !important;
            box-shadow: 0 4px 12px rgba(90,51,36,0.06) !important;
          }
          #menu .menu-grid h3, #menu .menu-grid p, #menu .menu-grid span, #menu .menu-grid div {
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
            word-break: normal !important;
            white-space: normal !important;
            hyphens: none !important;
            text-wrap: wrap !important;
          }
          #menu .menu-grid > div > div:first-child {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
            width: 100% !important;
            min-width: 0 !important;
          }
          #menu .menu-grid > div > div:first-child > div {
            flex: 1 1 auto !important;
            min-width: 0 !important;
          }
          #menu .menu-grid h3 {
            font-size: 14px !important;
            line-height: 1.25 !important;
            font-weight: 700 !important;
            margin: 0 !important;
            color: ${isDark ? D.brown : '#4f3022'} !important;
            letter-spacing: -0.01em !important;
            max-width: 100% !important;
          }
          #menu .menu-grid > div > div:first-child > span {
            display: inline-block !important;
            flex: 0 0 auto !important;
            font-size: 14px !important;
            line-height: 1.3 !important;
            font-weight: 800 !important;
            color: #2ec7d9 !important;
            margin: 0 !important;
            white-space: normal !important;
            text-align: left !important;
          }
          #menu .menu-grid p {
            font-size: 11.5px !important;
            line-height: 1.45 !important;
            margin: 0 !important;
            display: -webkit-box !important;
            -webkit-box-orient: vertical !important;
            -webkit-line-clamp: 3 !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            color: #6d5648 !important;
          }
          #menu .menu-grid > div > div:last-child {
            margin-top: auto !important;
            gap: 6px !important;
            display: flex !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            justify-content: flex-start !important;
          }
          #menu .menu-grid > div > div:last-child span {
            font-size: 8.5px !important;
            line-height: 1.2 !important;
            padding: 4px 7px !important;
            letter-spacing: 0.02em !important;
            white-space: nowrap !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          #menu .menu-note { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }

          #gallery .gallery-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 16px !important; }
          #gallery .gallery-grid > div { height: auto !important; aspect-ratio: unset !important; min-height: 240px !important; }
          #gallery { overflow: hidden !important; }
          #gallery .gallery-carousel { overflow: hidden !important; }

          #private-dining .experience-container { display: grid !important; grid-template-columns: 1fr !important; gap: 28px !important; }
          #private-dining .ambience-masonry { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 160px !important; gap: 10px !important; }
          #private-dining .ambience-item { min-height: 160px !important; }
          #private-dining .ambience-item.featured { grid-column: span 1 !important; grid-row: span 1 !important; }
          #private-dining .ambience-item:hover { transform: translateY(-6px) !important; }
          #private-dining .experience-card { padding: 18px 20px !important; border-radius: 16px !important; }
          #private-dining .experience-card h3 { font-size: 18px !important; margin-bottom: 10px !important; }
          #private-dining .experience-card p { font-size: 13px !important; }
          #private-dining .experience-pills { gap: 8px !important; }

          #testimonials { padding-top: 80px !important; padding-bottom: 48px !important; }
          #testimonials h2 { font-size: 2.4rem !important; }
          #testimonials p { font-size: 1.05rem !important; }

          #reservations .reservation-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 24px !important; }
          #reservations .reservation-form-grid { grid-template-columns: 1fr !important; }
          #reservations .reservation-form-grid > div { min-width: 0 !important; }
          #reservations .reservation-panel { padding: 28px !important; }

          footer .footer-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 28px !important; }
          footer .footer-bottom { flex-direction: column !important; gap: 16px !important; }
          footer .footer-bottom a { white-space: normal !important; }
        }
      `}</style>
      <Navbar scrolled={scrolled} isDark={isDark} onToggle={toggleTheme} />
      <Hero />
      <StatsSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ExperienceSection />
      <TestimonialsSection />
      <ReservationSection />
      <LocationSection />
      <Contact />
      <Footer />
    </ThemeContext.Provider>
  )
}


