import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Business Name",
	desc: "Find the perfect name for your business idea",
	category: "Business",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "green-500",
	toColor: "blue-500",

	to: "/ai/productivity/businessname",
	api: "/ai/productivity/businessname",

	output: {
		title: "Business Name",
		desc: "The following names have been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Entry Text",
		desc: " ",
		// n: 1,
		prompts: [
			{ 
				title: "Business Description", 
				attr: "bus_desc",  
				value: "", 
				placeholder: "A mobile-based platform for connecting patients with local laboratories for blood test and other diagnostic services", 
				label: " ",
				type: "text",
				maxLength: 170,
				// max: 100,
				min: 5,
				required: true,
				error: "",
				example: "Virtual reality physical therapy platform for patients recovering from injuries or surgeries.",
			},
			
		],
		example: {
			output: "Virtually Healing, RealityFit Therapy, vPhysiopathology, VirtualRehab Plus",
			// outputs: [],
			// Icon: RefreshIcon,
			// color: "",
		}
	}]
		
}

export default obj

