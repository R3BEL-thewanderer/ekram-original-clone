import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

const products = [
    // KURTI/TOPS (11 products)
    {
        name: "Laavanya",
        slug: "laavanya",
        category: "Kurti/Tops",
        description: "Step into the spotlight with LAVAANYA our Stylish & Double Bow Back Kurti, a chic and playful addition to your wardrobe. Crafted from breathable fabric, this kurti features a flattering silhouette that pairs effortlessly with pants, jeans or shorts. Slip on our handmade matching Fabric earrings and it's perfect for the trendsetter Girl. Product Highlights: ✔ Double bow back kurti with a chic, playful design ✔ Crafted from breathable fabric for all-day comfort ✔ Flattering silhouette that pairs effortlessly with pants, jeans, or shorts ✔ Comes with handmade matching fabric earrings ✔ Perfect for the trendsetter looking to make a statement ✔ Designed for style, ease, and versatile everyday wear",
        price: 1270,
        images: [
            "/images/products/laavanya/black-and-blue-1.webp", "/images/products/laavanya/black-and-blue-2.webp", "/images/products/laavanya/black-and-blue-3.webp",
            "/images/products/laavanya/black-and-red-1.webp", "/images/products/laavanya/black-and-red-2.webp",
            "/images/products/laavanya/black-and-white-dragon-print-1.webp", "/images/products/laavanya/black-and-white-dragon-print-2.webp", "/images/products/laavanya/black-and-white-dragon-print-3.webp",
            "/images/products/laavanya/peach-1.webp", "/images/products/laavanya/peach-2.webp", "/images/products/laavanya/peach-3.webp",
            "/images/products/laavanya/pink-1.webp", "/images/products/laavanya/pink-2.webp", "/images/products/laavanya/pink-3.webp", "/images/products/laavanya/pink-4.webp"
        ],
        colors: [
            { name: "Black & Blue", hex: "#000000", image: "/images/products/laavanya/black-and-blue-1.webp" },
            { name: "Black & Red", hex: "#800000", image: "/images/products/laavanya/black-and-red-1.webp" },
            { name: "Black & White Dragon Print", hex: "#333333", image: "/images/products/laavanya/black-and-white-dragon-print-1.webp" },
            { name: "Peach", hex: "#FFDAB9", image: "/images/products/laavanya/peach-1.webp" },
            { name: "Pink", hex: "#FFC0CB", image: "/images/products/laavanya/pink-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Shayla",
        slug: "shayla",
        category: "Kurti/Tops",
        description: "Turn heads with SHAYLA, our strapless bandeau top paired with a sleek stole. Designed for the modern, confident girl, it features side slits that create a graceful and flattering silhouette. Perfect for a date night, evening outing, or party, SHAYLA can be effortlessly paired with skirts, pants, or shorts, making it versatile enough for both casual and festive occasions. Bold, trendy, and figure-flattering, this top is a must-have addition to your wardrobe. Product Highlights: ✔ Strapless bandeau top with a matching stole ✔ Side slits for a flattering, graceful silhouette ✔ Versatile styling with skirts, pants, or shorts ✔ Perfect for date nights, parties, or casual outings ✔ Designed to be bold, trendy, and figure-enhancing ✔ A wardrobe essential for effortless style",
        price: 1220,
        images: [
            "/images/products/shayla/floral-print-1.webp", "/images/products/shayla/floral-print-2.webp", "/images/products/shayla/floral-print-3.webp",
            "/images/products/shayla/retro-bollywood-1.webp", "/images/products/shayla/retro-bollywood-2.webp", "/images/products/shayla/retro-bollywood-3.webp", "/images/products/shayla/retro-bollywood-4.webp", "/images/products/shayla/retro-bollywood-5.webp"
        ],
        colors: [
            { name: "Floral Print", hex: "#5A7D5C", image: "/images/products/shayla/floral-print-1.webp" },
            { name: "Retro Bollywood", hex: "#FF0000", image: "/images/products/shayla/retro-bollywood-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Chiffon",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Kavach",
        slug: "kavach",
        category: "Kurti/Tops",
        description: "Elevate your style with KAVACH our overlay Power drape Kurti with a side dori tie-up – a perfect fusion of traditional elegance and modern flair. The flowing design offers a graceful breezy silhouette, while the side two string tie-up adds a unique, customizable fit that enhances your figure. Paired with matching handmade fabric earrings, you are sure to be under the Spot Light at every event. Product Highlights: ✔ Overlay power drape kurti with a side dori tie-up for a customizable fit ✔ Flowing, breezy silhouette blending traditional elegance with modern style ✔ Perfect for parties, events, and special occasions ✔ Comes with handmade matching fabric earrings ✔ Enhanced figure with adjustable tie-up design",
        price: 950,
        images: [
            "/images/products/kavach/mocha-1.webp", "/images/products/kavach/mocha-2.webp", "/images/products/kavach/mocha-3.webp",
            "/images/products/kavach/peach-1.webp", "/images/products/kavach/peach-2.webp",
            "/images/products/kavach/red-1.webp", "/images/products/kavach/red-2.webp", "/images/products/kavach/red-3.webp", "/images/products/kavach/red-4.webp"
        ],
        colors: [
            { name: "Mocha", hex: "#964B00", image: "/images/products/kavach/mocha-1.webp" },
            { name: "Peach", hex: "#FFDAB9", image: "/images/products/kavach/peach-1.webp" },
            { name: "Red", hex: "#FF0000", image: "/images/products/kavach/red-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Mohini",
        slug: "mohini",
        category: "Kurti/Tops",
        description: "Elevate Your Everyday with MOHINI our long kurti—a perfect blend of timeless style and supreme comfort. Whether you pair it with jeans, leggings, or tailored pants, MOHINI transforms your look into something stylish yet relaxed. Its versatile silhouette adapts seamlessly to casual outings or relaxed get-togethers. A broad neckline and a discreet rear zipper deliver a flattering, tailored fit—easy to slip into yet polished in form. Paired with our complimentary fabric earrings uniquely made to complete your look. Product Highlights: ✔ Long kurti with a versatile silhouette for effortless style ✔ Broad neckline and discreet rear zipper for a flattering, tailored fit ✔ Can be paired with jeans, leggings, or tailored pants ✔ Perfect for casual outings or relaxed get-togethers ✔ Comes with complimentary fabric earrings ✔ Designed for timeless style and supreme comfort",
        price: 910,
        images: [
            "/images/products/mohini/black-1.webp", "/images/products/mohini/black-2.webp", "/images/products/mohini/black-3.webp", "/images/products/mohini/black-4.webp",
            "/images/products/mohini/dark-green-1.webp", "/images/products/mohini/dark-green-2.webp", "/images/products/mohini/dark-green-3.webp", "/images/products/mohini/dark-green-4.webp"
        ],
        colors: [
            { name: "Black", hex: "#000000", image: "/images/products/mohini/black-1.webp" },
            { name: "Dark Green", hex: "#006400", image: "/images/products/mohini/dark-green-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Swastiga",
        slug: "swastiga",
        category: "Kurti/Tops",
        description: "Elevate your everyday style with SWASTIGAA – Featuring our signature corset-back with broad straps for superior support and double lining for a flawless fall, these kurtis are perfect for effortless everyday wear. The vibrant leheriya print brings a touch of tradition with a chic, contemporary vibe—making them ideal for office, college, or casual outings. To complete your look, each piece comes with a pair of adorable matching fabric earrings.",
        price: 770,
        images: [
            "/images/products/swastiga/dark-pink-1.webp", "/images/products/swastiga/dark-pink-2.webp",
            "/images/products/swastiga/green-1.webp", "/images/products/swastiga/green-2.webp",
            "/images/products/swastiga/yellow-1.webp", "/images/products/swastiga/yellow-2.webp"
        ],
        colors: [
            { name: "Dark Pink", hex: "#C71585", image: "/images/products/swastiga/dark-pink-1.webp" },
            { name: "Green", hex: "#008000", image: "/images/products/swastiga/green-1.webp" },
            { name: "Yellow", hex: "#FFFF00", image: "/images/products/swastiga/yellow-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: false
    },
    {
        name: "Amolki",
        slug: "amolki",
        category: "Kurti/Tops",
        description: "Elevate your style with AMOLKI – a traditional kurti designed to offer a flattering fit and chic modern look, a playful blend of style and comfort. Featuring a lace-up detail at the back that creates a customizable fit and adds an edgy yet feminine touch. Paired with a pair of matching handmade fabric earrings and you're ready for a casual outing or a semi-formal event, making it a must-have in your wardrobe for a fashionable tailored experience.",
        price: 950,
        images: [
            "/images/products/amolki/navy-blue-1.webp", "/images/products/amolki/navy-blue-2.webp",
            "/images/products/amolki/pink-1.webp", "/images/products/amolki/pink-2.webp",
            "/images/products/amolki/teal-blue-1.webp", "/images/products/amolki/teal-blue-2.webp"
        ],
        colors: [
            { name: "Navy Blue", hex: "#000080", image: "/images/products/amolki/navy-blue-1.webp" },
            { name: "Pink", hex: "#FFC0CB", image: "/images/products/amolki/pink-1.webp" },
            { name: "Teal Blue", hex: "#008080", image: "/images/products/amolki/teal-blue-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton with Lining",
        includesEarrings: true,
        stock: 100,
        isFeatured: false
    },
    {
        name: "Vrutra",
        slug: "vrutra",
        category: "Kurti/Tops",
        description: "Meet VRUTRA, our chic and versatile vest top designed for the modern trendsetter. Crafted for a snug yet comfortable fit, it features a smart buttoned front that adds both style and ease. The playful, colorful buttons bring a unique pop of detail, making this piece stand out effortlessly. Paired with our signature matching earrings and it's perfect for any occasion. VRUTRA pairs beautifully with pants, shorts, skirts, or even layered over dresses—giving you endless styling possibilities. Whether you're heading to brunch, college, work, or a night out, this vest top ensures you look effortlessly fashionable. Product Highlights: ✔ Snug and comfortable fit ✔ Buttoned front with colorful details ✔ Pairs with pants, shorts, skirts, or dresses ✔ Versatile for any occasion ✔ Adds a trendsetting pop of color",
        price: 770,
        images: [
            "/images/products/vrutra/black-1.webp", "/images/products/vrutra/black-2.webp", "/images/products/vrutra/black-3.webp", "/images/products/vrutra/black-4.webp",
            "/images/products/vrutra/floral-print-1.webp", "/images/products/vrutra/floral-print-2.webp", "/images/products/vrutra/floral-print-3.webp", "/images/products/vrutra/floral-print-4.webp",
            "/images/products/vrutra/white-1.webp", "/images/products/vrutra/white-2.webp", "/images/products/vrutra/white-3.webp", "/images/products/vrutra/white-4.webp"
        ],
        colors: [
            { name: "Black", hex: "#000000", image: "/images/products/vrutra/black-1.webp" },
            { name: "Floral Print", hex: "#FFC0CB", image: "/images/products/vrutra/floral-print-1.webp" },
            { name: "White", hex: "#FFFFFF", image: "/images/products/vrutra/white-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Stretchable",
        includesEarrings: true,
        stock: 100,
        isFeatured: false
    },
    {
        name: "Swasti",
        slug: "swasti",
        category: "Kurti/Tops",
        description: "Elevate your style with SWASTI our halter neck top with a twist of handmade charm. Crafted for confidence and comfort, this top brings sleek lines and effortlessly flattering fit. A real showstopper! The lightweight fabric making it a wardrobe must-have matched with a pair of handcrafted fabric earrings made of the same fabric—a thoughtful detail that completes your look with a unique artisanal touch.",
        price: 730,
        images: [
            "/images/products/swasti/swasti-1.webp", "/images/products/swasti/swasti-2.webp", "/images/products/swasti/swasti-3.webp"
        ],
        colors: [
            { name: "Default", hex: "#F5F5DC", image: "/images/products/swasti/swasti-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Georgette Crepe",
        includesEarrings: true,
        stock: 100,
        isFeatured: false
    },
    {
        name: "Suksheyma",
        slug: "suksheyma",
        category: "Kurti/Tops",
        description: "Elevate your style with SUKSHEYMA our Bustier & Shirt combo style set. Crafted from light mulmul cotton in beautiful colours, the shirt drapes with ease while the hand painted fitted bustier adds a bold, sculptured contrast. Layered together, they create a look that's both relaxed and refined. Finished with matching handmade fabric earrings, this set is a harmonious blend of comfort and style, designed for those who appreciate artisanal craftsmanship and contemporary elegance.",
        price: 1450,
        images: [
            "/images/products/suksheyma/black-and-white-1.webp", "/images/products/suksheyma/black-and-white-2.webp",
            "/images/products/suksheyma/blue-and-white-1.webp", "/images/products/suksheyma/blue-and-white-2.webp",
            "/images/products/suksheyma/pink-and-black-1.webp", "/images/products/suksheyma/pink-and-black-2.webp", "/images/products/suksheyma/pink-and-black-3.webp"
        ],
        colors: [
            { name: "Black & White", hex: "#000000", image: "/images/products/suksheyma/black-and-white-1.webp" },
            { name: "Blue & White", hex: "#0000FF", image: "/images/products/suksheyma/blue-and-white-1.webp" },
            { name: "Pink & Black", hex: "#FFC0CB", image: "/images/products/suksheyma/pink-and-black-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton Mulmul + Stretchable Bustier",
        includesEarrings: true,
        stock: 100,
        isFeatured: false
    },
    {
        name: "Bhoomaya",
        slug: "bhoomaya",
        category: "Kurti/Tops",
        description: "Elevate your style with BHOOMAYA our noodle strap corset-back Top – a handcrafted statement in every stitch. Made from hand-painted jute fabric and lined with soft silk for that luxe feel against the skin, this top blends traditional craft with contemporary design. The delicate noodle strap and structured corset back offer flattering, adjustable fit that excludes elegance and strength.",
        price: 1450,
        images: [
            "/images/products/bhoomaya/ash-grey-1.webp", "/images/products/bhoomaya/ash-grey-2.webp",
            "/images/products/bhoomaya/black-1.webp", "/images/products/bhoomaya/black-2.webp",
            "/images/products/bhoomaya/blue-1.webp", "/images/products/bhoomaya/blue-2.webp", "/images/products/bhoomaya/blue-3.webp",
            "/images/products/bhoomaya/blush-pink-1.webp", "/images/products/bhoomaya/blush-pink-2.webp", "/images/products/bhoomaya/blush-pink-3.webp",
            "/images/products/bhoomaya/brown-1.webp", "/images/products/bhoomaya/brown-2.webp",
            "/images/products/bhoomaya/teal-blue-1.webp", "/images/products/bhoomaya/teal-blue-2.webp", "/images/products/bhoomaya/teal-blue-3.webp"
        ],
        colors: [
            { name: "Ash Grey", hex: "#B2BEB5", image: "/images/products/bhoomaya/ash-grey-1.webp" },
            { name: "Black", hex: "#000000", image: "/images/products/bhoomaya/black-1.webp" },
            { name: "Blue", hex: "#0000FF", image: "/images/products/bhoomaya/blue-1.webp" },
            { name: "Blush Pink", hex: "#FFB6C1", image: "/images/products/bhoomaya/blush-pink-1.webp" },
            { name: "Brown", hex: "#A52A2A", image: "/images/products/bhoomaya/brown-1.webp" },
            { name: "Teal Blue", hex: "#008080", image: "/images/products/bhoomaya/teal-blue-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Jute / Hand Painted",
        includesEarrings: true,
        stock: 100,
        isFeatured: false
    },
    {
        name: "Indrani",
        slug: "indrani",
        category: "Kurti/Tops",
        description: "Elevate Your Style with INDRANI our shirt style long kurta made for modern days and timeless style. With a Tailored shirt collar, buttoned down front and a graceful long silhouette, this Kurta brings a smart, structured look to ethnic wear. Can be styled as a shirt dress or paired with straight-cut pants for a sleek, no-fuss finish, offering all day comfort without compromising on style. Complete with coordinating handmade fabric earrings, this set is your go-to for work hours, casual gatherings or a graceful stroll in the evening.",
        price: 1450,
        images: [
            "/images/products/indrani/blue-1.webp", "/images/products/indrani/blue-2.webp", "/images/products/indrani/blue-3.webp", "/images/products/indrani/blue-4.webp",
            "/images/products/indrani/grey-and-white-1.webp", "/images/products/indrani/grey-and-white-2.webp", "/images/products/indrani/grey-and-white-3.webp",
            "/images/products/indrani/lilac-1.webp", "/images/products/indrani/lilac-2.webp", "/images/products/indrani/lilac-3.webp", "/images/products/indrani/lilac-4.webp",
            "/images/products/indrani/multicolour-1.webp", "/images/products/indrani/multicolour-2.webp", "/images/products/indrani/multicolour-3.webp",
            "/images/products/indrani/white-and-black-1.webp", "/images/products/indrani/white-and-black-2.webp", "/images/products/indrani/white-and-black-3.webp"
        ],
        colors: [
            { name: "Blue", hex: "#0000FF", image: "/images/products/indrani/blue-1.webp" },
            { name: "Grey & White", hex: "#808080", image: "/images/products/indrani/grey-and-white-1.webp" },
            { name: "Lilac", hex: "#C8A2C8", image: "/images/products/indrani/lilac-1.webp" },
            { name: "Multicolour", hex: "#FF00FF", image: "/images/products/indrani/multicolour-1.webp" },
            { name: "White & Black", hex: "#FFFFFF", image: "/images/products/indrani/white-and-black-1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Chiffon",
        includesEarrings: true,
        stock: 100,
        isFeatured: false
    },

    // CO-ORD SETS (6 products)
    {
        name: "Vardhana",
        slug: "vardhana",
        category: "Co-Ord Sets",
        description: "Elevate your style with KAVACH our overlay Power drape Kurti with a side dori tie-up a perfect fusion of traditional elegance and modern flair. The flowing design offers a graceful breezy silhouette, while the side two string tie-up adds a unique, customizable fit that enhances your figure. Paired with matching handmade fabric earrings you are sure to be under the Spot Light at every event.",
        price: 1450,
        images: [
            "/images/CO-ORD SETS/VARDHANA/VARDHANA (BROWN)1.webp", "/images/CO-ORD SETS/VARDHANA/VARDHANA (BROWN)2.webp", "/images/CO-ORD SETS/VARDHANA/VARDHANA (BROWN)3.webp", "/images/CO-ORD SETS/VARDHANA/VARDHANA (BROWN)4.webp",
            "/images/CO-ORD SETS/VARDHANA/VARDHANA (TURQUOISE BLUE)1.webp", "/images/CO-ORD SETS/VARDHANA/VARDHANA (TURQUOISE BLUE)2.webp", "/images/CO-ORD SETS/VARDHANA/VARDHANA (TURQUOISE BLUE)3.webp"
        ],
        colors: [
            { name: "Brown", hex: "#A52A2A", image: "/images/CO-ORD SETS/VARDHANA/VARDHANA (BROWN)1.webp" },
            { name: "Turquoise Blue", hex: "#40E0D0", image: "/images/CO-ORD SETS/VARDHANA/VARDHANA (TURQUOISE BLUE)1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Jivida",
        slug: "jivida",
        category: "Co-Ord Sets",
        description: "Elevate your style with JIVIDA our chic corset-back Kurti. Paired with easy, breathable lowers that blend comfort with clean lines. This set screams modern ethnic wear. The look is tied together with perfectly matched handmade fabric earrings, giving you that effortless style boost.",
        price: 1270,
        images: [
            "/images/CO-ORD SETS/JIVIDHA/JIVIDA (BUBLEGUM-PINK)1.webp", "/images/CO-ORD SETS/JIVIDHA/JIVIDA (BUBLEGUM-PINK)2.webp",
            "/images/CO-ORD SETS/JIVIDHA/JIVIDA (NEON LIME GREEN)1.webp", "/images/CO-ORD SETS/JIVIDHA/JIVIDA (NEON LIME GREEN)2.webp", "/images/CO-ORD SETS/JIVIDHA/JIVIDA (NEON LIME GREEN)3.webp",
            "/images/CO-ORD SETS/JIVIDHA/JIVIDA (SKY BLUE)1.webp", "/images/CO-ORD SETS/JIVIDHA/JIVIDA (SKY BLUE)2.webp"
        ],
        colors: [
            { name: "Bubblegum Pink", hex: "#FF69B4", image: "/images/CO-ORD SETS/JIVIDHA/JIVIDA (BUBLEGUM-PINK)1.webp" },
            { name: "Neon Lime Green", hex: "#32CD32", image: "/images/CO-ORD SETS/JIVIDHA/JIVIDA (NEON LIME GREEN)1.webp" },
            { name: "Sky Blue", hex: "#87CEEB", image: "/images/CO-ORD SETS/JIVIDHA/JIVIDA (SKY BLUE)1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Samragani",
        slug: "samragani",
        category: "Co-Ord Sets",
        description: "Elevate Your Style with INDRANI our shirt style long kurta made for modern days and timeless style. With a Tailored shirt collar, buttoned down front and a graceful long silhouette, this Kurta brings a smart, structured look to ethnic wear. Can be styled as a shirt dress or paired with straight-cut pants for a sleek, no-fuss finish, offering all day comfort without compromising on style. Complete with coordinating handmade fabric earrings, this set is your go-to for work hours, casual gatherings or a graceful stroll in the evening.",
        price: 1270,
        images: [
            "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (GREEN TIE & DYE)1.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (GREEN TIE & DYE)2.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (GREEN TIE & DYE)3.webp",
            "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (GREY DIGITAL PRINT)1.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (GREY DIGITAL PRINT)2.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (GREY DIGITAL PRINT)3.webp",
            "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (ORANGE DIGITAL PRINT)1.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (ORANGE DIGITAL PRINT)2.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (ORANGE DIGITAL PRINT)3.webp",
            "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (PINK)1.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (PINK)2.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (PINK)3.webp",
            "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (WHITE AND BLACK)1.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (WHITE AND BLACK)2.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (WHITE AND BLACK)3.webp",
            "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (WHITE AND BLUE)1.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (WHITE AND BLUE)2.webp", "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (WHITE AND BLUE)3.webp"
        ],
        colors: [
            { name: "Green Tie & Dye", hex: "#008000", image: "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (GREEN TIE & DYE)1.webp" },
            { name: "Grey Digital Print", hex: "#808080", image: "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (GREY DIGITAL PRINT)1.webp" },
            { name: "Orange Digital Print", hex: "#FFA500", image: "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (ORANGE DIGITAL PRINT)1.webp" },
            { name: "Pink", hex: "#FFC0CB", image: "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (PINK)1.webp" },
            { name: "White & Black", hex: "#FFFFFF", image: "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (WHITE AND BLACK)1.webp" },
            { name: "White & Blue", hex: "#0000FF", image: "/images/CO-ORD SETS/SAMRAGANI/SAMRAGANI (WHITE AND BLUE)1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton Rayon",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Raagini",
        slug: "raagini",
        category: "Co-Ord Sets",
        description: "Elevate Your Style with INDRANI our shirt style long kurta made for modern days and timeless style. With a Tailored shirt collar, buttoned down front and a graceful long silhouette, this Kurta brings a smart, structured look to ethnic wear. Can be styled as a shirt dress or paired with straight-cut pants for a sleek, no-fuss finish, offering all day comfort without compromising on style. Complete with coordinating handmade fabric earrings, this set is your go-to for work hours, casual gatherings or a graceful stroll in the evening.",
        price: 1395,
        images: [
            "/images/CO-ORD SETS/RAAGINI/RAAGINI (DARK RED)1.webp", "/images/CO-ORD SETS/RAAGINI/RAAGINI (DARK RED)2.webp", "/images/CO-ORD SETS/RAAGINI/RAAGINI (DARK RED)3.webp",
            "/images/CO-ORD SETS/RAAGINI/RAAGINI (SKY BLUE)1.webp", "/images/CO-ORD SETS/RAAGINI/RAAGINI (SKY BLUE)2.webp", "/images/CO-ORD SETS/RAAGINI/RAAGINI (SKY BLUE)3.webp"
        ],
        colors: [
            { name: "Dark Red", hex: "#8B0000", image: "/images/CO-ORD SETS/RAAGINI/RAAGINI (DARK RED)1.webp" },
            { name: "Sky Blue", hex: "#87CEEB", image: "/images/CO-ORD SETS/RAAGINI/RAAGINI (SKY BLUE)1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Sadhakaa",
        slug: "sadhakaa",
        category: "Co-Ord Sets",
        description: "Celebrate bold femininity with SAADHAKA, our chic printed co-ord set designed for women who embrace style with confidence. The kurti features a deep neckline, elegant elbow-length sleeves, and an adjustable dori at the back for a perfectly tailored fit. Paired with matching printed palazzo pants, this ensemble blends sophistication with comfort in every detail. Completing the look, SAADHAKA comes with a handcrafted statement necklace and coordinated fabric earrings, giving you a ready-to-wear set that turns heads wherever you go. Designed for the modern trendsetter, SAADHAKA is more than a co-ord—it's a statement of effortless power and poise.",
        price: 1395,
        images: [
            "/images/CO-ORD SETS/SADHAKAA/SADHAKAA 1.webp", "/images/CO-ORD SETS/SADHAKAA/SADHAKAA 2.webp", "/images/CO-ORD SETS/SADHAKAA/SADHAKAA 3.webp", "/images/CO-ORD SETS/SADHAKAA/SADHAKAA 4.webp"
        ],
        colors: [
            { name: "Default", hex: "#808080", image: "/images/CO-ORD SETS/SADHAKAA/SADHAKAA 1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: false
    },
    {
        name: "Narmada",
        slug: "narmada",
        category: "Co-Ord Sets",
        description: "Discover the beauty of simplicity with NARMADAA, our sleeveless kurti paired with comfortable palazzo pants. Designed for the woman who values comfort without compromising on style, this set is airy, elegant, and perfect for everyday wear. Lightweight and versatile, NARMADAA transitions seamlessly from casual outings to relaxed evenings. To complete the look, it comes with our statement matching fabric earrings, giving you a coordinated and chic appearance with ease. An everyday essential that feels as good as it looks—NARMADAA is comfort, styled beautifully.",
        price: 1310,
        images: [
            "/images/CO-ORD SETS/NARMADA/NARMADA (BEIGE)1.webp", "/images/CO-ORD SETS/NARMADA/NARMADA (BEIGE)2.webp", "/images/CO-ORD SETS/NARMADA/NARMADA (BEIGE)3.webp",
            "/images/CO-ORD SETS/NARMADA/NARMADA (BLACK)1.webp", "/images/CO-ORD SETS/NARMADA/NARMADA (BLACK)2.webp", "/images/CO-ORD SETS/NARMADA/NARMADA (BLACK)3.webp", "/images/CO-ORD SETS/NARMADA/NARMADA (BLACK)4.webp"
        ],
        colors: [
            { name: "Beige", hex: "#F5F5DC", image: "/images/CO-ORD SETS/NARMADA/NARMADA (BEIGE)1.webp" },
            { name: "Black", hex: "#000000", image: "/images/CO-ORD SETS/NARMADA/NARMADA (BLACK)1.webp" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: false
    },

    // BOHO PANTS (3 products)
    {
        name: "Vikroti - Blue",
        slug: "boho-pants-vikroti",
        category: "Boho Pants",
        description: "Step into effortless style with VIKROTI our free-spirited boho pants designed for comfort and versatility. Made with a unique mix of two fabrics, these pants create a striking look that blends flowy ease with chic detail. Perfect for everyday wear, they're soft, breathable, and easy to move in. Pair them with a casual top for a relaxed vibe or jazz them up with accessories for parties, evenings out, or festive gatherings. With VIKROTI, you don't just wear pants – you wear freedom. Highlights: ✔ Free-spirited boho pants with unique two-fabric mix ✔ Flowy, relaxed fit ✔ Soft and breathable ✔ Comes with matching fabric earrings ✔ Free size fits waist 24\"–40\"",
        price: 1395,
        images: [
            "/images/BOHO-PANTS/VIKROTI- BLUE 1.webp", "/images/BOHO-PANTS/VIKROTI- BLUE 2.webp", "/images/BOHO-PANTS/VIKROTI- BLUE 3.webp", "/images/BOHO-PANTS/VIKROTI- BLUE 4.webp"
        ],
        colors: [{ name: "Blue", hex: "#000080", image: "/images/BOHO-PANTS/VIKROTI- BLUE 1.webp" }],
        sizes: ["FITS WAIST SIZE 24 - 40 INCHES"],
        fabric: "Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Vikroti - Black",
        slug: "boho-pants-vikroti-black",
        category: "Boho Pants",
        description: "Step into effortless style with VIKROTI our free-spirited boho pants designed for comfort and versatility. Made with a unique mix of two fabrics, these pants create a striking look that blends flowy ease with chic detail. Perfect for everyday wear, they're soft, breathable, and easy to move in. Pair them with a casual top for a relaxed vibe or jazz them up with accessories for parties, evenings out, or festive gatherings. With VIKROTI, you don't just wear pants – you wear freedom. Highlights: ✔ Free-spirited boho pants with unique two-fabric mix ✔ Flowy, relaxed fit ✔ Soft and breathable ✔ Comes with matching fabric earrings ✔ Free size fits waist 24\"–40\"",
        price: 1395,
        images: [
            "/images/BOHO-PANTS/VIKROTI- BLACK 1.webp", "/images/BOHO-PANTS/VIKROTI- BLACK 2.webp", "/images/BOHO-PANTS/VIKROTI- BLACK 3.webp"
        ],
        colors: [{ name: "Black", hex: "#000000", image: "/images/BOHO-PANTS/VIKROTI- BLACK 1.webp" }],
        sizes: ["FITS WAIST SIZE 24 - 40 INCHES"],
        fabric: "Black Cotton + Printed Kalamkari",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    },
    {
        name: "Vikroti - Navy Blue",
        slug: "boho-pants-vikroti-navy-blue",
        category: "Boho Pants",
        description: "Step into effortless style with VIKROTI our free-spirited boho pants designed for comfort and versatility. Made with a unique mix of two fabrics, these pants create a striking look that blends flowy ease with chic detail. Perfect for everyday wear, they're soft, breathable, and easy to move in. Pair them with a casual top for a relaxed vibe or jazz them up with accessories for parties, evenings out, or festive gatherings. With VIKROTI, you don't just wear pants – you wear freedom. Highlights: ✔ Free-spirited boho pants with unique two-fabric mix ✔ Flowy, relaxed fit ✔ Soft and breathable ✔ Comes with matching fabric earrings ✔ Free size fits waist 24\"–40\"",
        price: 1395,
        images: [
            "/images/BOHO-PANTS/VIKROTI- NAVY BLUE 1.webp", "/images/BOHO-PANTS/VIKROTI- NAVY BLUE 2.webp", "/images/BOHO-PANTS/VIKROTI- NAVY BLUE 3.webp", "/images/BOHO-PANTS/VIKROTI- NAVY BLUE 4.webp"
        ],
        colors: [{ name: "Navy Blue", hex: "#000080", image: "/images/BOHO-PANTS/VIKROTI- NAVY BLUE 1.webp" }],
        sizes: ["FITS WAIST SIZE 24 - 40 INCHES"],
        fabric: "Navy Cotton",
        includesEarrings: true,
        stock: 100,
        isFeatured: true
    }
];

export async function POST() {
    await dbConnect();
    await Product.deleteMany({});
    await Product.insertMany(products);
    return NextResponse.json({ message: 'Database seeded successfully' });
}
