import React from 'react'
import '../Category/Loading.css'

function Loading() {
  return (
    <div  class="flex items-center justify-center w-screen h-screen bg-gradient-to-r bg-black">
      {/*  from-black to-white */}
      
 

  <div class="px-40 py-20 bg-white rounded-md shadow-xl">
    <div class="flex flex-col items-center">
    <i class="fas fa-circle-notch fa-spin fa-5x "></i>
     

      <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl mt-5">
        <span class="text-blue-600">Please</span> wait for loading data
      </h6>

      <p class="mb-8 text-center text-gray-500 md:text-lg">
          Don't just click away from the website.
      </p>
    

     
    </div>
  </div>
      
</div>

  
  )
}

export default Loading
