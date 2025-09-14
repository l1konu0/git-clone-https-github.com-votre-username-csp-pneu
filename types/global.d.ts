// Déclarations globales pour TypeScript

declare global {
  interface Window {
    adminManager?: {
      closeAddPneuModal: () => void;
      loadPneus: () => void;
      updateStats: () => void;
      pneus: any[];
    };
    orderSystem?: {
      addToCart: (tireId: string, quantity?: number) => void;
      removeFromCart: (tireId: string) => void;
      updateCartQuantity: (tireId: string, quantity: number) => void;
      clearCart: () => void;
      getCart: () => any[];
      getCartDetails: () => any[];
      getCartTotal: () => number;
      processOrder: (customerInfo: any) => Promise<any>;
      showCheckoutForm: () => void;
      submitOrder: () => Promise<void>;
      showOrderConfirmation: (order: any) => void;
      updateCartDisplay: () => void;
      updateCartModal: () => void;
      updateCatalogDisplay: () => void;
      showNotification: (message: string, type?: string) => void;
    };
    inventoryManager?: {
      getTireById: (id: string) => any;
      reserveTire: (id: string, quantity: number) => any;
      addOrder: (order: any) => any;
    };
  }
}

export {};
