const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/ekram-original';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    colors: [{
        name: { type: String },
        hex: { type: String },
    }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function fixCoordSets() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Vardhana
        await Product.updateOne(
            { slug: 'vardhana' },
            {
                $set: {
                    images: [
                        '/images/CO-ORD%20SETS/VARDHANA/VARDHANA%20(TURQUOISE%20BLUE)1.webp',
                        '/images/CO-ORD%20SETS/VARDHANA/VARDHANA%20(TURQUOISE%20BLUE)2.webp',
                        '/images/CO-ORD%20SETS/VARDHANA/VARDHANA%20(TURQUOISE%20BLUE)3.webp',
                        '/images/CO-ORD%20SETS/VARDHANA/VARDHANA%20(BROWN)1.webp',
                        '/images/CO-ORD%20SETS/VARDHANA/VARDHANA%20(BROWN)2.webp',
                        '/images/CO-ORD%20SETS/VARDHANA/VARDHANA%20(BROWN)3.webp',
                        '/images/CO-ORD%20SETS/VARDHANA/VARDHANA%20(BROWN)4.webp'
                    ],
                    colors: [
                        { name: 'Turquoise Blue', hex: '#00CED1' },
                        { name: 'Brown', hex: '#A52A2A' }
                    ]
                }
            }
        );
        console.log('Updated Vardhana');

        // 2. Jivida
        await Product.updateOne(
            { slug: 'jivida' },
            {
                $set: {
                    images: [
                        '/images/CO-ORD%20SETS/JIVIDHA/JIVIDA%20(BUBLEGUM-PINK)1.webp',
                        '/images/CO-ORD%20SETS/JIVIDHA/JIVIDA%20(BUBLEGUM-PINK)2.webp',
                        '/images/CO-ORD%20SETS/JIVIDHA/JIVIDA%20(NEON%20LIME%20GREEN)1.webp',
                        '/images/CO-ORD%20SETS/JIVIDHA/JIVIDA%20(NEON%20LIME%20GREEN)2.webp',
                        '/images/CO-ORD%20SETS/JIVIDHA/JIVIDA%20(NEON%20LIME%20GREEN)3.webp',
                        '/images/CO-ORD%20SETS/JIVIDHA/JIVIDA%20(SKY%20BLUE)1.webp',
                        '/images/CO-ORD%20SETS/JIVIDHA/JIVIDA%20(SKY%20BLUE)2.webp'
                    ],
                    colors: [
                        { name: 'Bublegum Pink', hex: '#FF69B4' },
                        { name: 'Neon Lime Green', hex: '#32CD32' },
                        { name: 'Sky Blue', hex: '#87CEEB' }
                    ]
                }
            }
        );
        console.log('Updated Jivida');

        // 3. Samragani
        await Product.updateOne(
            { slug: 'samragani' },
            {
                $set: {
                    images: [
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(WHITE%20AND%20BLUE)1.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(WHITE%20AND%20BLUE)2.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(WHITE%20AND%20BLUE)3.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(WHITE%20AND%20BLUE)4.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(WHITE%20AND%20BLUE)5.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(WHITE%20AND%20BLUE)6.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(WHITE%20AND%20BLACK)1.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(WHITE%20AND%20BLACK)2.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(WHITE%20AND%20BLACK)3.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(PINK)1.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(PINK)2.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(PINK)3.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(ORANGE%20DIGITAL%20PRINT)1.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(ORANGE%20DIGITAL%20PRINT)2.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(ORANGE%20DIGITAL%20PRINT)3.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(ORANGE%20DIGITAL%20PRINT)4.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(ORANGE%20DIGITAL%20PRINT)5.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(ORANGE%20DIGITAL%20PRINT)6.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(ORANGE%20DIGITAL%20PRINT)7.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(GREY%20DIGITAL%20PRINT)1.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(GREY%20DIGITAL%20PRINT)2.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(GREY%20DIGITAL%20PRINT)3.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(GREY%20DIGITAL%20PRINT)4.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(GREY%20DIGITAL%20PRINT)5.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(GREEN%20TIE%20&%20DYE)1.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(GREEN%20TIE%20&%20DYE)2.webp',
                        '/images/CO-ORD%20SETS/SAMRAGANI/SAMRAGANI%20(GREEN%20TIE%20&%20DYE)3.webp'
                    ],
                    colors: [
                        { name: 'White & Blue', hex: '#0000FF' },
                        { name: 'White & Black', hex: '#000000' },
                        { name: 'Pink', hex: '#FFC0CB' },
                        { name: 'Orange Digital Print', hex: '#FFA500' },
                        { name: 'Grey Digital Print', hex: '#808080' },
                        { name: 'Green Tie & Dye', hex: '#008000' }
                    ]
                }
            }
        );
        console.log('Updated Samragani');

        // 4. Raagini
        await Product.updateOne(
            { slug: 'raagini' },
            {
                $set: {
                    images: [
                        '/images/CO-ORD%20SETS/RAAGINI/RAAGINI%20(DARK%20RED)1.webp',
                        '/images/CO-ORD%20SETS/RAAGINI/RAAGINI%20(DARK%20RED)2.webp',
                        '/images/CO-ORD%20SETS/RAAGINI/RAAGINI%20(DARK%20RED)3.webp',
                        '/images/CO-ORD%20SETS/RAAGINI/RAAGINI%20(SKY%20BLUE)1.webp',
                        '/images/CO-ORD%20SETS/RAAGINI/RAAGINI%20(SKY%20BLUE)2.webp',
                        '/images/CO-ORD%20SETS/RAAGINI/RAAGINI%20(SKY%20BLUE)3.webp'
                    ],
                    colors: [
                        { name: 'Dark Red', hex: '#8B0000' },
                        { name: 'Sky Blue', hex: '#87CEEB' }
                    ]
                }
            }
        );
        console.log('Updated Raagini');

        // 5. Sadhakaa
        await Product.updateOne(
            { slug: 'sadhakaa' },
            {
                $set: {
                    images: [
                        '/images/CO-ORD%20SETS/SADHAKAA/SADHAKAA%201.webp',
                        '/images/CO-ORD%20SETS/SADHAKAA/SADHAKAA%202.webp',
                        '/images/CO-ORD%20SETS/SADHAKAA/SADHAKAA%203.webp',
                        '/images/CO-ORD%20SETS/SADHAKAA/SADHAKAA%204.webp'
                    ],
                    colors: [
                        { name: 'Standard', hex: '#5A7D5C' }
                    ]
                }
            }
        );
        console.log('Updated Sadhakaa');

        // 6. Narmada
        await Product.updateOne(
            { slug: 'narmada' },
            {
                $set: {
                    images: [
                        '/images/CO-ORD%20SETS/NARMADA/NARMADA%20(BEIGE)1.webp',
                        '/images/CO-ORD%20SETS/NARMADA/NARMADA%20(BEIGE)2.webp',
                        '/images/CO-ORD%20SETS/NARMADA/NARMADA%20(BEIGE)3.webp',
                        '/images/CO-ORD%20SETS/NARMADA/NARMADA%20(BLACK)1.webp',
                        '/images/CO-ORD%20SETS/NARMADA/NARMADA%20(BLACK)2.webp',
                        '/images/CO-ORD%20SETS/NARMADA/NARMADA%20(BLACK)3.webp',
                        '/images/CO-ORD%20SETS/NARMADA/NARMADA%20(BLACK)4.webp'
                    ],
                    colors: [
                        { name: 'Beige', hex: '#F5F5DC' },
                        { name: 'Black', hex: '#000000' }
                    ]
                }
            }
        );
        console.log('Updated Narmada');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

fixCoordSets();
