 
import { useNavigate } from "react-router-dom";

function Homepage() {
   
  const navigate = useNavigate();

 

  return (
    <div className="">
      {/* Hero Section */}
 <section className="relative sm:h-[80vh] md:h-screen w-full h-full overflow-hidden">
  
  <img
    src="add-1.jpg"
    alt="poster"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay for contrast */}
  <div className="absolute inset-0 bg-yellow-50/30"></div>

  {/* Centered Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-8 ">
    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-lg">
      Welcome to MyShop
    </h2>
    <p className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
      Here you start the purchase
    </p>
    <button
      className="bg-black text-yellow-50 px-6 py-3 rounded-xl mt-6 hover:bg-yellow-800 hover:text-white transition duration-300 shadow-lg"
      onClick={() => navigate("/productpage")}
    >
      Shop Now
    </button>
  </div>
</section>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 mt-8 bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 rounded-3xl shadow-xl">
  {/* Left: Promotional Video */}
  <div className="relative overflow-hidden rounded-2xl group shadow-lg">
    <video
      src="front-ad.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
    ></video>

    {/* Subtle overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
  </div>

  {/* Right: Hero Content */}
  <div className="flex flex-col justify-center text-center lg:text-left px-4 sm:px-8">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-900 mb-4">
      Celebrate the Festival of Style 🎉
    </h2>
    <p className="text-gray-700 text-lg sm:text-xl mb-6">
      Discover exclusive deals on electronics, fashion, and more. Bring home
      happiness this festive season with amazing discounts and fast delivery!
    </p>

    <div className="flex justify-center lg:justify-start">
      <button
        onClick={() => navigate("/productpage")}
        className="bg-black text-yellow-100 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-800 hover:text-white shadow-md transition-all duration-300"
      >
        Shop Now
      </button>
    </div>

    {/* Decorative Accent */}
    <div className="mt-8 flex justify-center lg:justify-start">
      <div className="h-2 w-32 bg-yellow-500 rounded-full"></div>
    </div>
  </div>
</div>


      {/* Collection of Categories */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-10 px-5 text-yellow-900">
  Product List
</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
  {/* Electronics */}
  <div
    onClick={() => navigate("/electronics")}
    className="cursor-pointer w-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
  >
    <img
      src="electronics.jpg"
      alt="electronics"
      className="w-full h-56 sm:h-60 lg:h-64 object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* Women's Collection */}
  <div
    onClick={() => navigate("/womens")}
    className="cursor-pointer w-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
  >
    <img
      src="women-ad.jpg"
      alt="women collection"
      className="w-full h-56 sm:h-60 lg:h-64 object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* Accessories */}
  <div
    onClick={() => navigate("/accessories")}
    className="cursor-pointer w-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
  >
    <img
      src="jewells.jpg"
      alt="accessories"
      className="w-full h-56 sm:h-60 lg:h-64 object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
    />
  </div>
</div>


      {/* Banner / View More Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 bg-yellow-50">
        <img
          src="sale-home-img.webp"
          alt="banner"
          className="w-full h-60 sm:h-80 lg:h-full object-cover rounded-lg"
        />
        <div className="flex flex-col justify-center items-center text-center font-bold text-2xl sm:text-3xl lg:text-4xl px-4">
          <h1>Diwlali sale is going on</h1>
          <p className="mt-2 text-base sm:text-lg font-normal">
            Click here to check more products. Do check Out
          </p>
          <button
            className="bg-black text-yellow-50 px-5 py-2 rounded-xl mt-4 hover:bg-red-700 transition"
            onClick={() => navigate("/productpage")}
          >
            View More
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-yellow-100 mt-10 ">
        <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <strong className="block text-xl sm:text-3xl font-bold text-gray-900">
              Want us to email you with the latest blockbuster news?
            </strong>
            <form className="mt-3">
              <div className="relative max-w-lg mx-auto">
                <input
                  className="w-full rounded-full border-black border bg-transparent p-4 pe-32 text-sm sm:text-base font-medium"
                  id="email"
                  type="email"
                  placeholder="john@doe.com"
                />
                <button
                  className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-3 text-sm sm:text-base font-medium text-white hover:bg-blue-700 transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
            <div className="mx-auto max-w-sm lg:max-w-none text-center lg:text-left">
              <p className="mt-4 text-gray-500 text-base sm:text-lg">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Praesentium natus quod eveniet aut perferendis distinctio iusto
                repudiandae, provident velit earum?
              </p>
            </div>
            <div className="flex justify-center lg:justify-start mt-4 lg:mt-0 gap-4">
              {/* Social Icons (same as your SVGs) */}
              <a href="#" className="text-gray-700 hover:text-gray-700/75">
                <span className="sr-only">Facebook</span>
                {/* Add SVG */}
              </a>
            </div>
          </div>

          <div className="mt-5 border-t border-gray-100 pt-8">
            <p className="text-center text-xs sm:text-sm text-gray-500">
              © Company 2022. All rights reserved.
              <br />
              Created with{" "}
              <a
                href="#"
                className="text-gray-700 underline hover:text-gray-700/75"
              >
                Laravel
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-gray-700 underline hover:text-gray-700/75"
              >
                Laravel Livewire
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
