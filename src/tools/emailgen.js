import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "Email Writer",
	desc: "Make your emails clear and concise with our email writing tool",
	category: "Productivity",
	Icon: ViewListIcon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "blue-500",
	toColor: "green-500",

	to: "/ai/business/emailgen",
	api: "/ai/business/emailgen",

	output: {
		title: "Generated Email",
		desc: "The following email has been generated with you key points",
		Icon: false,
		color: "blue",
	},

	prompts: [{
		title:"Enter the tone and key points of the email wish to have generated. ",
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
				maxLength: 150,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "Casual",
			},
          
            { 
				title: "Key Points", 
				attr: "main_points",  
				value: "", 
				placeholder: "I cant attend the sprint planning meeting tomorrow at 11am.", 
				label: "",
				type: "textarea",
				maxLength: 300,
				// max: 100,
				min: 3,
				required: false,
				error: "",
				example: "I cant attend the sprint planning meeting tomorrow at 11am.",
			},

		],
		example: {
			// output: "",
			output: 
				`Subject: Can't Attend Sprint Planning Meeting Tomorrow\n\nHi Team,\n\nI hope you're all doing well. I wanted to let you know that unfortunately I won't be able to make it to the sprint planning meeting tomorrow at 11am. I'm sorry for any inconvenience this may cause.\n\nI'll make sure to catch up with everyone on the progress of the project and provide any updates as soon as possible. Please don't hesitate to reach out if there's anything I can do in my absence.\n\nThanks,  [Your Name]`,
			
			// Icon: RefreshIcon,
			color: "blue",
		}
	}]
		
}

export default obj

