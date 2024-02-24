import footballImage from '../images/football.jpg';
import football6v6Image from '../images/football6v6.jpg';

const MainContent = () => {
  return (
    <main>
       <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
          <h1 className="text-5xl font-bold">Welcome to Our Landing Page</h1>
          <p className="mt-4 text-lg text-gray-600">Discover our services and products.</p>
          <button className="mt-8 bg-blue-500 text-white font-bold py-2 px-4 rounded-full">Get Started</button>
        </div>



        
        <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
  <div className="text-2xl font-semibold mb-4">OFFRES</div>

  <div className="mb-4">Some text to describe this section.</div>
  <div className="flex justify-center gap-4">
    <div className="w-1/3 flex flex-col items-center">
    <img src={footballImage} alt="Description" className="mb-2"/>
      <div>Description for image 1</div>
    </div>
    <div className="w-1/3 flex flex-col items-center">
    <img src={football6v6Image} alt="Description" className="mb-2"/>
      <div>Description for image 2</div>
    </div>
    <div className="w-1/3 flex flex-col items-center">
      <img src="path_to_your_image" alt="Description" className="mb-2"/>
      <div>Description for image 3</div>
    </div>
  </div>
</div>


 
 <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
  <div className="text-2xl font-semibold mb-4">PRICING</div>
  <div className="mb-4">Choose the plan that works best for you.</div>
  <div className="flex justify-center gap-4">
    <div className="flex-1">
      <div className="p-4 border rounded-lg text-center">
        <h3 className="font-bold text-lg mb-2">Basic</h3>
        <p className="mb-4">Perfect for individuals starting out.</p>
        <div className="text-2xl mb-4">$19/month</div>
        <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Select</a>
      </div>
    </div>
    <div className="flex-1">
      <div className="p-4 border rounded-lg text-center">
        <h3 className="font-bold text-lg mb-2">Pro</h3>
        <p className="mb-4">For professionals looking for more features.</p>
        <div className="text-2xl mb-4">$39/month</div>
        <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Select</a>
      </div>
    </div>
    <div className="flex-1">
      <div className="p-4 border rounded-lg text-center">
        <h3 className="font-bold text-lg mb-2">Enterprise</h3>
        <p className="mb-4">Best for large organizations.</p>
        <div className="text-2xl mb-4">Contact us</div>
        <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Select</a>
      </div>
    </div>
  </div>
</div>


        
    </main>
  );
};

export default MainContent;
