import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nContext';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { products } from '../data/products';

const CartPage: React.FC = () => {
  const { user, role } = useAuthContext();
  const { t } = useI18n();
  
  // Mock cart items (using first 2 products for demo)
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1, selectedSize: 'L', selectedColor: 'black' },
    { ...products[1], quantity: 2, selectedSize: 'M', selectedColor: 'gray' },
  ]);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = role === 'trader' && item.wholesalePrice ? item.wholesalePrice : item.flashSalePrice ?? item.price;
    return acc + price * item.quantity;
  }, 0);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <section className="py-20 min-h-[60vh] flex items-center justify-center">
        <Container className="text-center space-y-6">
          <div className="mx-auto h-24 w-24 rounded-full bg-bg-elevated flex items-center justify-center text-4xl shadow-inner text-text-muted">
            🛒
          </div>
          <h1 className="font-display text-2xl font-bold text-text-main">{t('cart.empty')}</h1>
          <p className="text-text-muted max-w-sm mx-auto">{t('cart.emptyDesc')}</p>
          <Link to="/shop">
            <Button className="mt-4 px-8 py-3 rounded-xl">{t('cart.continueShopping')}</Button>
          </Link>
        </Container>
      </section>
    );
  }

  const handleTraderCheckout = async () => {
    // TODO: Implement actual API call
    const submitTraderOrder = async (payload: any) => ({ success: true });
    
    const payload = {
      type: 'trader',
      items: cartItems.map(item => ({
        productId: item.id,
        mode: item.wholesalePrice ? 'wholesale' : 'retail',
        quantity: item.quantity,
      })),
      totalAmount: subtotal,
    };
    const response = await submitTraderOrder(payload);
    if (response.success) {
      setCartItems([]);
      alert(t('cart.checkout.wholesaleSubmitted'));
    }
  };

  const handleUserCheckout = () => {
    alert(t('cart.checkout.userProceed'));
  };

  return (
    <section className="py-12 min-h-screen bg-bg-base/50">
      <Container className="space-y-8">
        <div className="flex items-center gap-4 border-b border-border-subtle pb-6">
             <h1 className="font-display text-3xl font-bold text-text-main">{t('cart.title')}</h1>
             <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{cartItems.length} items</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Cart Items List */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="group flex flex-col sm:flex-row gap-6 p-5 rounded-[2rem] border-transparent bg-bg-elevated/50 hover:bg-bg-elevated transition-colors shadow-sm">
                {/* Image */}
                <Link to={`/products/${item.id}`} className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-bg-base">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                             <Link to={`/products/${item.id}`} className="font-display text-lg font-bold text-text-main hover:text-primary transition-colors line-clamp-1">
                                {item.name}
                            </Link>
                             <p className="text-sm text-text-muted">{item.category}</p>
                        </div>
                        <p className="font-bold text-lg text-text-main tabular-nums">
                            ${(item.flashSalePrice ?? item.price) * item.quantity}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                         <div className="flex items-center gap-1 bg-bg-base px-2 py-1 rounded-lg border border-border-subtle">
                             <span>{t('cart.size')}:</span>
                             <span className="font-bold text-text-main">{item.selectedSize}</span>
                         </div>
                         <div className="flex items-center gap-1 bg-bg-base px-2 py-1 rounded-lg border border-border-subtle">
                             <span>{t('cart.color')}:</span>
                             <span className="w-3 h-3 rounded-full border border-border-subtle" style={{ backgroundColor: item.selectedColor === 'white' ? '#fff' : item.selectedColor }}></span>
                         </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-bg-base rounded-xl p-1 border border-border-subtle">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-main transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold tabular-nums">
                        {role === 'trader' && item.seriesConfig?.isSeriesProduct ? `Series × ${item.quantity} (Each series = ${item.seriesConfig.totalPieces} pcs)` : item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-main transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button 
                        onClick={() => removeItem(item.id)}
                        className="text-xs font-semibold text-red-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-500/5 transition-colors"
                    >
                        Remove
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="relative h-fit space-y-6">
            <Card className="relative overflow-hidden p-8 rounded-[2.5rem] bg-bg-elevated border-border-subtle shadow-2xl sticky top-24">
               {/* Decorative Gradient */}
               <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointing-events-none"></div>

              <h2 className="font-display text-2xl font-bold text-text-main relative z-10">{t('cart.summary')}</h2>
              
              <div className="space-y-5 text-sm relative z-10 pt-4">
                <div className="flex justify-between items-center text-text-muted">
                  <span>{t('cart.subtotal')}</span>
                  <span className="text-text-main font-bold text-base">${subtotal}</span>
                </div>
                 <div className="flex justify-between items-center text-text-muted">
                  <span>{t('cart.shipping')}</span>
                  <span className="text-text-main italic text-xs bg-bg-base/50 px-2 py-1 rounded-md border border-border-subtle/50">{t('cart.shippingDesc')}</span>
                </div>
                
                {/* Promo Code Input */}
                <div className="pt-2">
                    <label className="text-xs font-semibold text-text-muted mb-2 block uppercase tracking-wide">{t('cart.promoCode')}</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="CODE" 
                            className="flex-1 bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all uppercase placeholder:normal-case"
                        />
                        <button className="px-5 py-2 bg-text-main text-bg-base font-bold rounded-xl text-xs hover:bg-primary hover:text-white transition-colors">
                            {t('cart.apply')}
                        </button>
                    </div>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border-subtle to-transparent my-6 relative z-10"></div>

              <div className="flex justify-between items-end relative z-10">
                  <span className="text-lg font-bold text-text-main">{t('cart.total')}</span>
                  <div className="text-right">
                      <p className="text-3xl font-black text-primary leading-none">${subtotal}</p>
                      <p className="text-[10px] text-text-muted mt-1 font-medium tracking-wide">Inclusive of all taxes</p>
                  </div>
              </div>

              <Button fullWidth className="py-4 text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-emerald-400 hover:to-emerald-500 border-none relative overflow-hidden group"
                onClick={role === 'trader' ? handleTraderCheckout : handleUserCheckout}>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                      {role === 'trader' ? t('cart.checkout.wholesaleSend') : t('cart.checkout')}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] text-text-muted uppercase tracking-widest font-bold pt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {t('cart.secureCheckout')}
              </div>
            </Card>

            {/* Trust Badges / Payment Methods */}
             <div className="flex flex-col items-center gap-3 opacity-60">
                 <p className="text-[10px] text-text-muted uppercase tracking-widest">We accept</p>
                 <div className="flex justify-center gap-3 grayscale hover:grayscale-0 transition-all duration-300">
                    <div className="h-8 w-12 bg-white rounded border border-border-subtle flex items-center justify-center">
                        <span className="text-[10px] font-bold text-blue-800">VISA</span>
                    </div>
                    <div className="h-8 w-12 bg-white rounded border border-border-subtle flex items-center justify-center">
                        <span className="text-[10px] font-bold text-red-600">MC</span>
                    </div>
                    <div className="h-8 w-12 bg-white rounded border border-border-subtle flex items-center justify-center">
                        <span className="text-[10px] font-bold text-blue-400">AMEX</span>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CartPage;