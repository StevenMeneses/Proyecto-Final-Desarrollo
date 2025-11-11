import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './Auth.context';
import { cartAPI } from '../services/api';

const CartContext = createContext();

function CartProviderWrapper(props) {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, token, isLoggedIn } = useContext(AuthContext);

  // Cargar carrito cuando el usuario se autentique
  useEffect(() => {
    if (isLoggedIn && token) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isLoggedIn, token]);

  const fetchCart = async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      const response = await cartAPI.getCart(token);
      if (response.success) {
        setCart(response.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return false;
    }

    try {
      setIsLoading(true);
      const response = await cartAPI.addToCart(productId, quantity, token);
      if (response.success) {
        setCart(response.cart);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar producto al carrito: ' + error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!token) {
      console.error('No token available for update');
      return false;
    }

    try {
      setIsLoading(true);
      console.log(`Updating product ${productId} to quantity ${quantity}`);
      
      const response = await cartAPI.updateCart(productId, quantity, token);
      console.log('Update response:', response);
      
      if (response.success) {
        setCart(response.cart);
        return true;
      } else {
        console.error('Backend returned error:', response.message);
        return false;
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      // Recargar el carrito para mostrar estado actual
      await fetchCart();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) return false;

    try {
      setIsLoading(true);
      const response = await cartAPI.removeFromCart(productId, token);
      if (response.success) {
        setCart(response.cart);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!token) return false;

    try {
      setIsLoading(true);
      const response = await cartAPI.clearCart(token);
      if (response.success) {
        setCart(response.cart);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getCartItemCount = () => {
    return cart ? cart.totalItems : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
        getCartItemCount
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper, CartContext };