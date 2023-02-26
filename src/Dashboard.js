import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { computed,  } from 'mobx'
import MainBody from './Components/Body'
import {Helmet} from "react-helmet";
import { SwitchHorizontalIcon, ScaleIcon, DatabaseIcon, UserCircleIcon,
} from '@heroicons/react/outline'


import { observer, inject } from 'mobx-react'
@inject('store')
@observer
class Body extends Component {

	@computed get permissions() {
		return this.props.store.tools.filter(tool=>
			tool.permissions.some(r=> this.props.store.profile.permissions.includes(r))
		)
	}

	@computed get beta() {
		return this.permissions.filter(tool => tool.category === 'Beta')
	}

	@computed get social() {
		return this.permissions.filter(tool => tool.category === 'Social')
	}

	@computed get content() {
		return this.permissions.filter(tool => tool.category === 'Content')
	}

	@computed get programming() {
		return this.permissions.filter(tool => tool.category === 'Programming')
	}

	@computed get productivity() {
		return this.permissions.filter(tool => tool.category === 'Productivity')
	}

	@computed get business() {
		return this.permissions.filter(tool => tool.category === 'Business')
	}

	
	render() {
	return (

		<>
			<Helmet>
				<title>{`Tools`}</title>
			</Helmet>
			<MainBody className="px-4 py-0 md:px-28 md:py-0 lg:py-0 ">

			<div className="flex" >
    <div className={`items-center flex inline-flex ${this.props.store.profile.credits ? " bg-gray-100 text-gray-500" : " bg-red-100 text-red-500"} text-sm rounded-md px-3 py-1 font-medium my-2 mr-2`}>
        <DatabaseIcon className="w-4 h-4 mr-2" />{this.props.store.profile.credits}&nbsp;<span className=" lg:block">credits remain</span>
    </div>
</div>


			{this.productivity.length ? <>
				<Title title="Productivity" />
				<Grid>
					{this.productivity.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor={tool.fromColor} 
							toColor={tool.toColor} 
						/>)} 
				</Grid>
				<Divider />
			</> : null}

			{this.programming.length ? <>
				<Title title="Programming" />
				<Grid>
					{this.programming.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor={tool.fromColor} 
							toColor={tool.toColor} 
						/>)} 
				</Grid>
				<Divider />
			</> : null}

			{this.content.length ? <>
				<Title title="Written Content" />
				<Grid>
					{this.content.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor={tool.fromColor} 
							toColor={tool.toColor} 
						/>)} 
				</Grid>
				<Divider />
				</> : null}

			{this.business.length ? <>
				<Title title="Business" />
				<Grid>
					{this.business.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor={tool.fromColor} 
							toColor={tool.toColor} 
						/>)} 
				</Grid>
				<Divider />
			</> : null}

			

			{this.social.length ? <>
				<Title title="Online" />
				<Grid>
					{this.social.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor={tool.fromColor} 
							toColor={tool.toColor} 
						/>)} 
				</Grid>
				<Divider />
			</> : null}

</MainBody>
</>)
}
  }

export const Divider = () => <div className="divide-y-2 divide-dashed divide-gray-300 py-8 md:py-12"> <div></div>
<div></div></div>

export const Title = ({ title }) => <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-4 md:mb-6">
{title}
</h2>

export const Grid = ({ children }) => <div className="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-2 xl:grid-cols-3 ">{children}</div>

export const Tool = ({ Icon, title, desc, to, group, fromColor, toColor }) => <Link to={to || "/"} className="flex relative ">
	
	<div className={`bg-white flex-1 rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 cursor-pointer border border-gray-300 md:flex relative  hover:text-black`}>
  <div className="p-4">
	{/* <div className={`uppercase tracking-wide text-sm text-${fromColor ? fromColor : "green-500"} font-semibold leading-none`}>{group || "New"}</div> */}
	<div href="#" className="block text-lg xl:text-xl 2xl:text-2xl leading-tight font-medium text-black leading-none">{title}</div>
	<p className="mt-1 pr-1 text-sm ">{desc} </p>
  </div>
</div>
</Link>



export default Body