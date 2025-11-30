import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1, color, size) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) => item.slug === product.slug && item.color === color && item.size === size
                );

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.slug === product.slug && item.color === color && item.size === size
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...currentItems, { ...product, quantity, color, size }] });
                }
            },
            removeItem: (slug, color, size) => {
                set({
                    items: get().items.filter(
                        (item) => !(item.slug === slug && item.color === color && item.size === size)
                    ),
                });
            },
            updateQuantity: (slug, color, size, quantity) => {
                set({
                    items: get().items.map((item) =>
                        item.slug === slug && item.color === color && item.size === size
                            ? { ...item, quantity }
                            : item
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            getCartTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
