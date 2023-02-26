import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Business Idea",
	desc: "Start your journey to success today with our AI-powered idea generator.",
	category: "Business",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "green-500",
	toColor: "blue-500",

	to: "/ai/productivity/businessidea",
	api: "/ai/productivity/businessidea",

	output: {
		title: "Business Idea",
		desc: "The following business ideas have been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Entry Text",
		desc: " ",
		// n: 1,
		prompts: [
			{ 
				title: "Business Category", 
				attr: "bus_cat",  
				value: "", 
				placeholder: "Beauty, Healthcare technology, Education", 
				label: " ",
				type: "text",
				maxLength: 90,
				// max: 100,
				min: 5,
				required: true,
				error: "",
				example: "Real Estate",
			},
			
		],
		example: {
			output: "A tech-enabled service matching up investors interested in flipping houses with contractors who can provide necessary repair services at discounted rates – allowing users to maximize ROI potential when it comes time to resell their newly flipped home!",
			// outputs: [],
			// Icon: RefreshIcon,
			// color: "",
		}
	}]
		
}

export default obj

