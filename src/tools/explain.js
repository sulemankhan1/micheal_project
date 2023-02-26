import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "Simplify Sentences",
	desc: "Simplify complex text into easy-to-understand concepts",
	category: "Productivity",
	Icon: ViewListIcon,
	// tags: [],
	permissions: ['user'],
	
    fromColor: "blue-500",
	toColor: "green-500",

	to: "/ai/productivity/explain",
	api: "/ai/productivity/explain",

	output: {
		title: "Simplified Text",
		desc: "The following simplified text has been generated",
		Icon: false,
		color: "blue",
	},

	prompts: [{
		title:"Enter the simplification level and the content wish to have simplified.",
		desc: " ",
		// n: 1,
		prompts: [
            { 
				title: "Level", 
				attr: "level",  
				value: "", 
				placeholder: "High school, 4th grade, Expert ", 
				label: "",
				type: "text",
				maxLength: 150,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "2nd grade",
			},
          
            { 
				title: "Content", 
				attr: "content",  
				value: "", 
				placeholder: "Calculus, originally called infinitesimal calculus or 'the calculus of infinitesimals', is the mathematical study of continuous change, in the same way that geometry is the study of shape, and algebra is the study of generalizations of arithmetic operations. ", 
				label: "",
				type: "textarea",
				maxLength: 1000,
				// max: 100,
				min: 3,
				required: false,
				error: "",
				example: "Quantum computing is a field that utilizes quantum bits (qubits) for processing information, rather than classical binary bits. This allows quantum computers to perform certain computations faster than traditional computers.\nResearchers are developing new algorithms and hardware to exploit these properties for various applications, particularly in machine learning. However, maintaining qubits' quantum state is a significant challenge. Despite these challenges, the field is advancing rapidly and is expected to have a major impact on various industries in the future.",
			},

		],
		example: {
			output: "Scientists are making computers that use qubits instead of regular bits. This lets the computers do some tasks faster. People are working on new ways to use these special computers for things like machine learning. But it's hard to keep the qubits in their special state. Even so, this field is growing quickly and will likely change many industries soon.",
			// outputs: [
			// 	"The sun is very old, over 4.5 billion years",
			// 	"At 10,000 degrees, sun is also very hot",
			// 	"Gasses called coronal mass ejections erupt from the sun",
			// ],
			// Icon: RefreshIcon,
			color: "blue",
		}
	}]
		
}

export default obj

