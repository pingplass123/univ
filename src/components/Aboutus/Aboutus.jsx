import React from 'react'
import './Aboutus.css'
import aboutusbg from './aboutus2.webp'
function Aboutus() {
  return (
  <div id="aboutus" target="aboutus">
  <div className="relative overflow-hidden bg-black bg-white" id='section2'>
  <div className="mx-auto max-w-7xl">
    <div className="relative z-10 pb-8 bg-black sm:pb-16 md:pb-20 lg:max-w-2xl ">
      <svg className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block" fill="bg-neutral-900" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,0 100,0 50,100 0,100 " />
      </svg>
      <div>
    <div className="relative px-4 pt-2 sm:px-6 ">
      <main className="px-4 mt-5 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-14">
        <div className="sm:text-center lg:text-left ">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600 sm:text-5xl md:text-6xl animate-charcter">
            <h2 className="block xl:inline ">AboutUs</h2>
            
            
           
          </h1>
          <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Univ is an e-learning website that you can learn and share anything that you want, you can comunicate and interaction each other, 
            everyone can access anytime and anywhere Learning is will not boring anymore.

          </p>
          
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-indigo-600 sm:text-5xl md:text-6xl animate-charcter ">
            <span className="block xl:inline">Why Univ?</span>
          </h1>
          <p className="mt-3 mt-6 text-base text-left text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0" >
            
                <p>
                  <span className="text-sky-200 ">Users can access:</span> it through any device.
                </p>

                <p>
                  <span className="text-sky-200">User-centric:</span> Users can choose what they want to learn as they like.
                </p>

                <p>
                  <span className="text-sky-200">User-friendly and beautiful:</span> Even if you've never used e-learning before, it's not difficult to understand.The aesthetics of the website certainly makes learning less boring.
                </p>
          </p>
        
           
          
          <div className="mt-50 sm:mt-20 sm:flex sm:justify-center lg:justify-start ">
            {/* <div class="rounded-md shadow">
              <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white glow-on-hover md:py-4 md:text-lg md:px-10 "> Get started </a>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
              <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 glow-on-hover md:py-4 md:text-lg md:px-10"> Live demo </a>
            </div>
           */}
          </div>
        </div>
      </main>
    </div>
    </div>
  </div>
  <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full" src={aboutusbg} alt=""/>
  </div>
</div>
</div>
</div>
  )
}

export default Aboutus
