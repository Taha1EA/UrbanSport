//  import { Link } from 'react-router-dom';
import icone from '../icons/icone.png';
const Header = () => {
  return (
    <header>
  <nav className="bg-gray-800 text-white p-4 flex justify-between">
    <div className="container mx-auto flex justify-between items-center">
      <a href="/" className="text-xl font-bold">Brand</a>
      <div className="flex items-center">
        
        <a href="/" className="px-4 hover:bg-gray-700 py-2 rounded">Home</a>
        <a href="/about" className="px-4 hover:bg-gray-700 py-2 rounded">About</a>
        <a href="/services" className="px-4 hover:bg-gray-700 py-2 rounded">Services</a>
        <a href="/services" className="px-4 hover:bg-gray-700 py-2 rounded">Offers</a>
        <a href="/contact" className="px-4 hover:bg-gray-700 py-2 rounded">Contact</a>
        
      </div>
      <div><img src={icone} alt="search" className="mb-2 w-10 h-10"/> </div>

    </div>
  </nav>
</header>

  );
};

export default Header;
