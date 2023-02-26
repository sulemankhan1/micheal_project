import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Expand Sentences",
	desc: "Enhance your writing by letting AI expand and elaborate on your ideas",
	category: "Productivity",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "blue-500",
	toColor: "green-500",
	
	to: "/ai/productivity/expand",
	api: "/ai/productivity/expand",

	output: {
		title: "Expanded Text",
		desc: "The following text has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Write small sentence or paragraph you wish to expand.",
		desc: " ",
		// n: 1,
		prompts: [
			{ 
				title: "Text", 
				attr: "og_text",  
				value: "", 
				placeholder: "Influencer marketing is a form of social media marketing involving endorsements and product placement from influencers, people and organizations who have a purported expert level of knowledge or social influence in their field.", 
				label: "",
				type: "textarea",
				maxLength: 1000,
				// max: 100,
				min: 5,
				required: true,
				error: "",
				example: "Influencer marketing is a form of social media marketing involving endorsements and product placement from influencers, people and organizations who have a purported expert level of knowledge or social influence in their field.",
			},
			
		],
		example: {
			output: "Influencer marketing is an increasingly popular form of social media marketing that involves endorsements and product placements from people and organizations who have a high level of expertise or clout in their respective fields. These influencers have the power to shape public opinion and potentially drive consumer behaviour, making them a valuable asset for brands looking to expand their reach and visibility.",
			// outputs: [],
			// Icon: RefreshIcon,
			// color: "",
		}
	}]
		
}

export default obj

