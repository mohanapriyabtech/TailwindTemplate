import React from 'react'
import Ellipse from '../webim/Ellipse.png'; 
import Wave3 from '../webim/wave3.png';
import Wave from '../webim/wave3.png';
import Loading from '../webim/loading.png';

function Header() {
  return (
    <section className="bg-[#23304c] h-screen flex px-[10%] py-[6%]">
    <img
      src={Ellipse} alt="Eclipse"
      className="z-20  w-6 absolute left-24 top-56  animate-bounce"
    />
    <img
      src={Ellipse} alt="Eclipse"
      className="z-20 animate-spin w-6 absolute right-96 top-36"
    />
    <img
      src={Ellipse} alt="Eclipse"
      className="z-20 w-6 absolute left-64 bottom-24"
    />
    <img
      src={Ellipse} alt="Eclipse"
      className="z-20 animate-ping w-6 absolute right-40 top-64"
    />

    {/* <img  src={Wave3} alt="Wave3" className="absolute " /> */}
    <img
       src={Wave} alt="Wave"
      className="absolute z-20 bottom-0 right-0 top-20"
    />
    <div className="flex-1">
      <img  src={Loading} alt="Loading" className="w-9/12" />
    </div>

    <div className="flex-1 pt-7">
      <div className="absolute">
        <h1 className="text-3xl leading-normal py-6">
          Learning <br />
          {/* <span className="underline decoration-teal-500">customers</span> */}
        </h1>
        <button
          className="bg-teal-600 px-7 rounded-full tracking-wide py-3 text-xs hover:scale-110 duration-300"
        >
          GET STARTED
        </button>
      </div>
    </div>
  </section>
  )
}

export default Header