import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "Product Descriptions",
	desc: "Create compelling product descriptions to attract customers and boost sales",
	category: "Business",
	Icon: ViewListIcon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "green-500",
	toColor: "blue-500",

	to: "/ai/business/productdesc",
	api: "/ai/business/productdesc",

	output: {
		title: "Product Description",
		desc: "The following description was generated",
		Icon: false,
		color: "blue",
	},

	prompts: [{
		title:"Write the product name and characteristics of the product you want a description for.",
		desc: " ",
		// n: 1,
		prompts: [
            { 
				title: "Product Name", 
				attr: "prod_name",  
				value: "", 
				placeholder: "Patchwork 001", 
				label: "",
				type: "text",
				maxLength: 150,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "Eco Breeze",
			},
            { 
				title: "Product Characteristics", 
				attr: "prod_char",  
				value: "", 
				placeholder: "rain jacket that has insulation, red lining on the zipper, stylish yet functional, lightweight and suitable for everyday use", 
				label: "",
				type: "textarea",
				maxLength: 1000,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "Portable and lightweight design, Rechargeable battery-powered operation, Adjustable airflow settings, Eco-friendly and energy-efficient, Uses natural evaporative cooling technology, Durable and easy to clean.",
			},
            

		],
		example: {
			output: "Stay cool and comfortable with Eco Breeze! This portable and lightweight cooling solution is rechargeable, adjustable, and eco-friendly. With natural evaporative cooling technology that uses no refrigerants or Freon, you can enjoy the breeze of cooler air wherever you go.",
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

