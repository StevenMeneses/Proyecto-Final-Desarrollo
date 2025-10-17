import { useContext } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartContext } from "../contexts/Cart.context";
import { AuthContext } from "../contexts/Auth.context";
 
export default function Cart() {
  const { 
    cart, 
    updateCartItem, 
    removeFromCart, 
    clearCart, 
    isLoading 
  } = useContext(CartContext);
  
  const { isLoggedIn } = useContext(AuthContext);

  const handleQuantityChange = async (productId, newQuantity) => {
    console.log('Cambiando cantidad:', productId, newQuantity);
    
    if (newQuantity < 1) {
      if (window.confirm('¿Quieres eliminar este producto del carrito?')) {
        await removeFromCart(productId);
      }
      return;
    }

    // Solo llamamos a updateCartItem, no necesitamos fetchCart aquí
    await updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      await clearCart();
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <main className="bg-[#EBEBEB] min-h-screen overflow-auto flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Debes iniciar sesión</h2>
            <p className="mb-4">Para ver tu carrito, necesitas iniciar sesión.</p>
            <a href="/login" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Iniciar Sesión
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (isLoading && !cart) {
    return (
      <>
        <Header />
        <main className="bg-[#EBEBEB] min-h-screen overflow-auto flex justify-center items-center">
          <p className="text-lg">Cargando carrito...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[#EBEBEB] min-h-screen overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Tu Carrito de Compras</h1>
          
          {!cart || cart.items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-6">Agrega algunos productos para comenzar a comprar</p>
              <a href="/" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Continuar Comprando
              </a>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.productId} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                    <img 
                      src={item.imageUrl || "/src/assets/image24.png"} 
                      alt={item.productName} 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="ml-6 flex-grow">
                      <h3 className="text-lg font-semibold">{item.productName}</h3>
                      <p className="text-gray-600">Precio: ${item.price}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button 
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300"
                          disabled={isLoading}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-white min-w-12 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300"
                          disabled={isLoading}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${item.subtotal}</p>
                      <button 
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-red-500 mt-2 hover:text-red-700"
                        disabled={isLoading}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold">Total: ${cart.total}</span>
                  <span className="text-gray-600">{cart.totalItems} items</span>
                </div>
                <div className="flex justify-between space-x-4">
                  <button 
                    onClick={handleClearCart}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 flex-1"
                    disabled={isLoading}
                  >
                    Vaciar Carrito
                  </button>
                  <button 
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex-1"
                    disabled={isLoading}
                  >
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
