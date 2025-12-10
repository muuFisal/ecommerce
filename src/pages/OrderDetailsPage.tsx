import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nContext';

const OrderDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useI18n();

    // Mock Order Data
    const order = {
        id: id,
        date: 'Oct 24, 2025',
        status: 'Delivered',
        items: [
            { name: 'Oversized Graphic Tee', price: 45, quantity: 2, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=200' },
            { name: 'Cargo Pants Black', price: 85, quantity: 1, image: 'https://images.unsplash.com/photo-1517445312582-dadzec0e24ec?auto=format&fit=crop&q=80&w=200' },
        ],
        subtotal: 175,
        shipping: 10,
        total: 185,
        shippingAddress: {
            street: '123 Fashion St, Downtown',
            city: 'Cairo',
            governorate: 'Cairo',
            phone: '01000000001'
        },
        paymentMethod: 'Credit Card (**** 1234)'
    };

    return (
        <section className="min-h-screen py-12 bg-bg-base/50">
            <Container className="space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link to="/profile">
                        <Button variant="secondary" className="h-10 w-10 p-0 rounded-full flex items-center justify-center">
                            ←
                        </Button>
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-text-main">{t('order.details.title')} #{id}</h1>
                        <p className="text-text-muted text-sm">{order.date}</p>
                    </div>
                    <div className="ml-auto px-4 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                        {order.status}
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                    {/* Items List */}
                    <div className="space-y-6">
                        <Card className="rounded-[2rem] p-6 bg-bg-elevated border-border-subtle">
                            <h2 className="font-display text-lg font-bold text-text-main mb-6">{t('order.details.items')}</h2>
                            <div className="space-y-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center">
                                        <div className="h-20 w-20 rounded-xl bg-bg-base overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-text-main">{item.name}</h3>
                                            <p className="text-text-muted text-sm">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-text-main">${item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                             <Card className="rounded-[2rem] p-6 bg-bg-elevated border-border-subtle space-y-4">
                                <h3 className="font-bold text-text-main">{t('order.details.shipping')}</h3>
                                <div className="text-sm text-text-muted space-y-1">
                                    <p>{order.shippingAddress.street}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.governorate}</p>
                                    <p className="pt-2">📞 {order.shippingAddress.phone}</p>
                                </div>
                             </Card>
                             <Card className="rounded-[2rem] p-6 bg-bg-elevated border-border-subtle space-y-4">
                                <h3 className="font-bold text-text-main">{t('order.details.payment')}</h3>
                                <p className="text-sm text-text-muted">{order.paymentMethod}</p>
                             </Card>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-6">
                        <Card className="rounded-[2rem] p-6 bg-bg-elevated border-border-subtle space-y-4 shadow-lg sticky top-24">
                            <h2 className="font-display text-lg font-bold text-text-main">{t('order.details.summary')}</h2>
                            <div className="text-sm text-text-muted space-y-2">
                                <div className="flex justify-between">
                                    <span>{t('order.details.subtotal')}</span>
                                    <span className="text-text-main font-semibold">${order.subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{t('cart.shipping')}</span>
                                    <span className="text-text-main font-semibold">${order.shipping}</span>
                                </div>
                            </div>
                            <div className="h-px bg-border-subtle"></div>
                            <div className="flex justify-between items-end">
                                <span className="font-bold text-text-main">{t('order.details.total')}</span>
                                <span className="text-2xl font-black text-primary">${order.total}</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default OrderDetailsPage;
