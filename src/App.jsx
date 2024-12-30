import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HeroSecrtion from "./components/heroSection/HeroSecrtion";
import NewArrival from "./components/newArrival/NewArrivals";
import { CartProvider, ProductProvider } from "./provider";

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <Header />
        <HeroSecrtion />
        <NewArrival />
        <Footer />
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
