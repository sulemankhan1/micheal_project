import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Freestyle",
	desc: "Generate any kind of written content with this flexible AI",
	category: "Productivity",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
    fromColor: "blue-500",
	toColor: "green-500",

	to: "/ai/productivity/freestyle",
	api: "/ai/productivity/freestyle",

	output: {
		title: "Generated Text",
		desc: "The following text has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Enter the tone, type and key points of the content wish to have generated.",
		desc: " ",
		// n: 1,
		prompts: [
			{ 
				title: "Tone", 
				attr: "tone",  
				value: "", 
				placeholder: "Professional, Casual, Persuasive", 
				label: "",
				type: "text",
				maxLength: 150,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "Professional",
			},
            { 
				title: "Type of Content", 
				attr: "type",  
				value: "", 
				placeholder: "Blog, Email, Ad caption", 
				label: "",
				type: "text",
				maxLength: 150,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "2 paragraph blog post",
			},
			{ 
				title: "Key Points", 
				attr: "main_points",  
				value: "", 
				placeholder: "The impact of social media on mental health.", 
				label: "",
				type: "textarea",
				maxLength: 1000,
				// max: 100,
				min: 5,
				required: true,
				error: "",
				example: "The impact of social media on mental health.",
			},
			
		],
		example: {
			output: "The impact of social media on mental health has been a growing concern in recent years. Studies have shown that social media use can lead to increased feelings of loneliness, depression, and anxiety. This is due to the fact that people are constantly exposed to images and messages from others which can cause them to compare themselves and feel inadequate. Additionally, cyberbullying has become a major issue for many users who experience harassment or bullying online.\n\nIt is important for individuals to be aware of how their social media usage affects their mental health so they can take steps towards managing it in a healthy way. This includes limiting the amount of time spent on social media, engaging in activities outside of the platform such as exercise or hobbies, and seeking help if needed. Taking these steps will help ensure that people are using social media responsibly and not letting it negatively affect their mental health.",
			// outputs: [],
			// Icon: RefreshIcon,
			// color: "",
		}
	}]
		
}

export default obj

