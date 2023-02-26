import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "Summarize Text",
	desc: "Analyze your text or documents and convey the important concepts in bullet form",
	category: "Productivity",
	Icon: ViewListIcon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "blue-500",
	toColor: "green-500",

	to: "/ai/productivity/summarize",
	api: "/ai/productivity/summarize",

	output: {
		title: "Summarized Points",
		desc: "The following key points detected",
		Icon: false,
		color: "blue",
	},

	prompts: [{
		title:"Enter a sentence or paragraph you wish to understand in bullet point form.",
		desc: " ",
		// n: 1,
		prompts: [{ 
				title: "Content", 
				attr: "content",  
				value: "", 
				placeholder: "The Sun is over 4.5 billion years old and has a temperature of around 10,000 degrees Fahrenheit. The Sun's light reaches the Earth in eight minutes. Coronal mass ejections are gases on the Sun's surface erupt, shooting far out into space.", 
				label: "",
				type: "textarea",
				maxLength: 1000,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "The Sun is over 4.5 billion years old and has a temperature of around 10,000 degrees Fahrenheit. The Sun's light reaches the Earth in eight minutes. Coronal mass ejections are gases on the Sun's surface erupt, shooting far out into space.",
			},
		],
		example: {
			// output: "",
			outputs: [
				"The sun is very old, over 4.5 billion years",
				"At 10,000 degrees, sun is also very hot",
				"Gasses called coronal mass ejections erupt from the sun",
			],
			// Icon: RefreshIcon,/
			color: "blue",
		}
	}]
		
}

export default obj

