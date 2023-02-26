import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';
import { IconDashboard,  } from './Icons';
import { SwitchHorizontalIcon, ScaleIcon, DatabaseIcon, UserCircleIcon,
} from '@heroicons/react/outline'

import './style.css';
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { inject } from 'mobx-react'

@inject('store')
class Landing extends Component {
  render() {
    return (
      <>
<Helmet>
  <title>Landing Page</title>
</Helmet>
<section id="hero" className="hero-section">
  <div >
  <div className="border-b border-gray-300 bg-white shadow-sm ">
										<div className="container flex mx-auto px-4 md:px-28 flex select-none">
														<NavLink to="/"
														 exact
														 tabIndex={-1}
														 onClick={()=>this.props.store.toolsKeyword = ""}
														 activeClassName="bg-white-100 hover: text-gray-800 transition"
														 className="text-lg flex py-5 px-6 lg:py-4 lg:px-0 cursor-pointer  pl-0 rounded-t-md font-semibold transition items-center pl-0 ">
															
															<div className="">Think Space AI</div>

															</NavLink>
														 
														<div className="relative text-gray-400 focus-within:text-green-500 flex flex-1 ">
															<label htmlFor="q" className="absolute inset-y-0 left-0 top-0 bottom-0 hidden md:flex items-center lg:pl-2 ">
																	<div type="submit" className="p-2 focus:outline-none focus:shadow-outline ">
																	{/* <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 transition"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
																	</div>
															</label>
														
														</div>

                                                        <NavLink to="/login"
														 exact
														 tabIndex="-1"
														 activeClassName="bg-green-100 hover:bg-green-200 text-green-800 transition"
														 className={`text-lg flex py-3 px-6 xl:py-4 xl:px-8 cursor-pointer ${this.fromColor} hover:bg-gray-100 rounded-t-md font-medium transition items-center`}><UserCircleIcon className="w-7 h-7 lg:mr-4 transition" />
															<div className="hidden lg:block"> Log In</div>
														</NavLink>
														{/* <NavLink to="/"
														 exact
														 tabIndex={-1}
														 onClick={()=>this.props.store.toolsKeyword = ""}
														 activeClassName="bg-white-100 hover:bg-gray-200 text-gray-800 transition"
														 className="text-lg flex py-3 px-6 lg:py-4 lg:px-8 cursor-pointer hover:bg-gray-100 rounded-t-md font-medium transition items-center">
															 <div className="hidden lg:block">Sign Up</div>
															</NavLink> */}

                                                            <div className="hidden lg:block" style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px'}} >
  <Link to="/signup" className="hidden lg:block btn bg-gradient-to-r from-purple-900 to-purple-700 text-white hover:bg-purple-700 hover:text-white py-3 px-10 rounded-lg mr-5">
    <b>Sign Up</b>
  </Link>
</div>
      

														


												</div>
												
								</div>
                                <div style={{ backgroundColor: "white", color: "black", display: "flex", alignItems: "center", height: "100vh", flexDirection: "column", paddingTop: "30px", paddingLeft: "20px", paddingRight: "20px" }}>
  <div style={{ width: "100%" }}>
    <h1 className="text-black text-center font-bold text-4xl md:text-5xl mb-4">Streamline Your Work</h1>
    <h3 className="text-darkgrey text-center font-light text-2xl md:text-3xl mb-4">
      Unlock the full potential of your workflow with our cutting-edge AI powered tools.
    </h3>
    <div className="flex justify-center mt-10">
      <Link to="/signup" className="btn bg-gradient-to-r from-purple-900 to-purple-700 text-white hover:bg-purple-700 hover:text-white py-3 px-10 rounded-lg mr-5">
        <b>Sign Up Now</b>
      </Link>
    </div>
   
  </div>
  <div style={{alignItems: "center", marginTop: "50px"}}>
 <video style={{
    position: 'absolute',
    
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '60%',
    border: `15px solid #7b1fa2`,
    borderRadius: '20px',
    boxShadow: '0px 0px 25px #9478FF',
  }}
  controls autoplay loop>
    <source src="./video/sizzle.webm" type="video/webm"></source>
  </video> 

</div>

</div>





  </div>
</section>



      </>
    )
  }
}

export default withRouter(Landing);
