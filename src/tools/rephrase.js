import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Rephrase Sentences",
	desc: "Rephrase and simplify complex sentences, making them clear and easy to understand",
	category: "Productivity",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],

	fromColor: "blue-500",
	toColor: "green-500",

	to: "/ai/productivity/rephrase",
	api: "/ai/productivity/rephrase",

	output: {
		title: "Rephrased Text",
		desc: "The following text has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Write sentence or paragraph you wish to have rephrased.",
		desc: " ",
		// n: 1,
		prompts: [
			{ 
				title: "Tone", 
				attr: "tone",  
				value: "", 
				placeholder: "Professional, Assertive, Friendly", 
				label: "",
				type: "text",
				maxLength: 1000,
				// max: 100,
				min: 5,
				required: true,
				error: "",
				example: "Professional",
			},
			{ 
				title: "Text", 
				attr: "og_text",  
				value: "", 
				placeholder: "Augmented reality is like a magic window into a whole new world, it can make the ordinary, extraordinary. With augmented reality, you can explore new places and experiences without ever leaving your home.", 
				label: "",
				type: "textarea",
				maxLength: 1000,
				// max: 100,
				min: 5,
				required: true,
				error: "",
				example: "Augmented reality is like a magic window into a whole new world, it can make the ordinary, extraordinary. With augmented reality, you can explore new places and experiences without ever leaving your home.",
			},
			
		],
		example: {
			output: "Augmented reality provides a unique opportunity to explore new places and experiences without leaving the comfort of one's home. This technology can transform the ordinary into extraordinary, creating a virtual window into an entirely new world.",
			// outputs: [],
			// Icon: RefreshIcon,
			// color: "",
		}
	}]
		
}

export default obj

