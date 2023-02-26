import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Lean Canvas",
	desc: "Quickly analyze business idea's and ventures",
	category: "Business",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "green-500",
	toColor: "blue-500",

	to: "/ai/productivity/leancanvas",
	api: "/ai/productivity/leancanvas",

	output: {
		title: "Lean Canvas",
		desc: "The following lean canvas has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Enter the business name and detailed description of the business you want to evaluate.",
		desc: " ",
		// n: 1,
		prompts: [
			{ 
				title: "Business Name", 
				attr: "b_name",  
				value: "", 
				placeholder: "Gin and Juicery", 
				label: " ",
				type: "text",
				maxLength: 150,
				// max: 100,
				min: 5,
				required: true,
				error: "",
				example: "Yenisi Beauty",
			},
			{ 
				title: "Business Description", 
				attr: "b_desc",  
				value: "", 
				placeholder: "100% organic fresh pressed juicery made to order. Offers juice flavors that mock cocktails", 
				label: " ",
				type: "textarea",
				maxLength: 1000,
				// max: 100,
				min: 5,
				required: true,
				error: "",
				example: "a 100% certified organic skin brand using real ingredients to moisturize exfoliate and grow either your skin or hair.",
			},
			
		],
		example: {
			output: "Customer Segments: Beauty-conscious individuals who value health, wellness and sustainability and are looking for high-quality skin and hair care products./n/nEarly Adopters: Health-conscious individuals who prioritize natural and organic ingredients in their beauty products. Customers who have tried other skin and hair care products with harmful chemicals and are looking for a more natural alternative./n/nProblem: Many skin and hair care products contain harmful chemicals that can harm skin and hair over time. Consumers are looking for products that are 100% organic and made with real ingredients./n/nUnique Value Proposition: Yenisi Beauty offers 100% certified organic skin and hair care products that are made with real ingredients. These products are designed to moisturize, exfoliate and grow skin and hair in a healthy and sustainable way./n/nSolutions:/n Moisturizing: Our products are formulated with organic ingredients like coconut oil, shea butter and avocado oil to hydrate skin and hair without leaving it feeling greasy./n Exfoliating: Our products contain natural ingredients like sugar, sea salt and coffee to gently exfoliate and remove dead skin cells./n Growing: Our products are formulated with ingredients like biotin, keratin and aloe vera to promote healthy growth and strengthen skin and hair./n/nChannels:/n Online: Our products are available on our website and on popular e-commerce platforms like Amazon./n Retail: We partner with health and wellness stores to offer our products in-store./n/nRevenue Streams:/n Retail sales: Revenue generated from the sale of our products in-store and online./n Wholesale partnerships: Revenue generated from partnerships with health and wellness stores./n/nKey Metrics:/n Conversion rate: Number of customers who make a purchase after visiting our website./n Repeat purchase rate: Number of customers who make repeat purchases./n Net promoter score (NPS): Customer satisfaction score./n Customer acquisition cost (CAC): The cost of acquiring new customers through advertising and marketing./n/nUnfair Advantage:/n Strong brand: Our commitment to using only 100% certified organic ingredients and our focus on healthy, sustainable skin and hair care sets us apart from other beauty brands./n Positive customer reviews: Our products have received positive feedback from customers, which helps us attract new customers and build brand loyalty.",
			// outputs: [],
			// Icon: RefreshIcon,
			color: "blue",
		}
	}]
		
}

export default obj

