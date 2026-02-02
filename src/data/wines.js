export const wines = [
    // WHITE WINES
    {
        id: 1,
        slug: 'chardonnay',
        name: "Chardonnay",
        type: "White",
        price: 26.99,
        description: "Aged in steel tanks then in french oak barrels, this wine is light & crispy with mellow acidity & a touch of french oak.",
        awards: [
            "2012 International Eastern Wine Competition Gold Medal Winner",
            "2012 Finger Lakes International Wine Competition Bronze Medal Winner"
        ],
        specs: {
            alc: "11.5 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/chardonnay.png"
    },
    {
        id: 2,
        slug: 'cayuga-white',
        name: "Cayuga White",
        type: "White",
        isFanFavorite: true,
        price: 21.99,
        description: "A crisp, refreshing, fruit-forward white wine with hints of grapefruit, citrus and peach. Similar to a Sauvignon Blanc. Enjoy with chicken or fish!",
        awards: [
            "2012 Finger Lakes International Wine Competition Silver Medal Winner",
            "2012 International Eastern Wine Competition Bronze Medal Winner",
            "2011 Grand Harvest International Wine Competition Bronze Medal Winner",
            "2010 International Eastern Wine Competition Bronze Medal Winner",
            "2010 Grand Harvest International Wine Competition Silver Medal Winner",
            "2009 Finger Lakes International Competition Gold Medal Winner",
            "2008 International Eastern Wine Competition Bronze Medal Winner"
        ],
        specs: {
            alc: "11.25 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/cayuga-white.png"
    },
    {
        id: 3,
        slug: 'sunset-orange',
        name: "Sunset Orange",
        type: "White", // Categorized under white as per list context "White Wines", though it's orange
        price: 26.99,
        description: "A traditional Orange wine, using our Cayuga grapes fermented on the skins like a red wine. Offers a more complex and deeper notes of rich lemon with a soft finish.. Excellent with roasted vegetables to lamb and poultry.",
        specs: {
            alc: "12 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/sunset-orange.png"
    },
    {
        id: 4,
        slug: 'vidal-blanc',
        name: "Vidal Blanc",
        type: "White",
        price: 25.99,
        description: "Elegant, clean and delicately balanced this wine is a medium bodied white with little to no acidity and a hint of melon and a soft buttery popcorn finish.",
        awards: [
            "2010 Finger Lakes International Wine Competition Bronze Medal Winner",
            "2009 Eastern States Wine Competition Silver Medal Winner",
            "2008 International Eastern Wine Competition Bronze Medal Winner"
        ],
        specs: {
            alc: "12 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/vidal-blanc.png"
    },
    {
        id: 5,
        slug: 'root-63-white',
        name: "Root 63 White",
        type: "White",
        price: 22.99,
        description: "Refreshing and tropical this semi-sweet blend has a bursting fruit aroma followed by an exciting taste of mixed fruit. Fruit salad in a glass!",
        specs: {
            alc: "11.25 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/root-63-white.png"
    },
    {
        id: 6,
        slug: 'majestic',
        name: "Majestic",
        type: "White",
        price: 26.99,
        description: "A touch of pure maple syrup gives this wine a deliciously soft sweetness. Hints of toasted caramel and vanilla make this a perfect sipping wine. French Toast in a bottle ! Pro tip mix with our country porch blueberry for blueberry pancake flavor",
        specs: {
            alc: "8.5 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/majestic.png"
    },

    // FRUIT WINES
    {
        id: 7,
        slug: 'country-porch-pear',
        name: "Country Porch Pear",
        type: "Fruit",
        price: 22.99,
        description: "Pear aromas open up to soft, citrus and semi-sweet pear flavors. Just like biting into a fresh juicy pear! Perfect as a base of white sangria, bbq or grilled fish!",
        specs: {
            alc: "7.5 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/country-porch-pear.png"
    },
    {
        id: 8,
        slug: 'country-porch-peach',
        name: "Country Porch Peach",
        type: "Fruit",
        price: 22.99,
        description: "Light peach aromas open up to soft, citrus and semi-sweet peach flavors. Just like biting into a fresh juicy peach! Perfect as a base of white sangria, bbq or grilled fish!",
        specs: {
            alc: "7.5 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/country-porch-peach.png"
    },
    {
        id: 9,
        slug: 'country-porch-mango',
        name: "Country Porch Mango",
        type: "Fruit",
        price: 22.99,
        description: "Light Mango aromas open up to soft, citrus and semi-sweet mango flavors. Perfect as a base of white sangria, bbq or grilled fish!",
        specs: {
            alc: "7.5 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/country-porch-mango.png"
    },
    {
        id: 10,
        slug: 'country-porch-blueberry',
        name: "Country Porch Blueberry",
        type: "Fruit",
        price: 22.99,
        description: "A semi-sweet wine bursting with juicy blueberry flavors. Pair with goat cheese, almonds, & hazelnuts or your favorite fruit salad!",
        specs: {
            alc: "7.5 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/country-porch-blueberry.png"
    },

    // ROSÉ WINES
    {
        id: 11,
        slug: 'rose',
        name: "Rosé",
        type: "Rosé",
        price: 23.99,
        description: "A delicate, surprisingly elegant, crisp, dry wine, with hints of raspberry. Suitable to a wide range of cuisines.",
        awards: [
            "2012 CT Specialty Food Competition Gold Medal Winner",
            "2011 International Eastern Wine Competition Bronze Medal Winner",
            "2011 CT Specialty Food Competition Silver Medal Winner",
            "2011 Finger Lakes International Wine Competition Silver Medal Winner"
        ],
        specs: {
            alc: "11.5 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/rose.png"
    },
    {
        id: 12,
        slug: 'sunset-blush',
        name: "Sunset Blush",
        type: "Rosé",
        isFanFavorite: true,
        price: 23.99,
        description: "Fruity and refreshing with hints of strawberry and rhubarb. Perfect summer wine!",
        awards: [
            "2012 CT Specialty Foods Wine Competition Gold Medal Winner",
            "2011 International Eastern Wine Competition Bronze Medal Winner",
            "2011 Finger Lakes International Wine Competition Silver Medal Winner",
            "2011 CT Specialty Food Competition Silver Medal Winner",
            "2011 Grand Harvest International Wine Competition Bronze Medal Winner",
            "2010 Dallas Morning News Wine Competion Bronze Medal Winner",
            "2010 Grand Harvest International Wine Competition Bronze Medal Winner",
            "2010 International Eastern Wine Competition Bronze Medal Winner",
            "2009 Grand Harvest International Wine Competition Bronze Medal Winner",
            "2009 Amenti DelVino Wine Competition Silver Medal Winner",
            "2009 International Eastern States Competition Silver Medal Winner",
            "2008 International Eastern States Competition Silver Medal Winner"
        ],
        specs: {
            alc: "11.25 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/sunset-blush.png"
    },
    {
        id: 13,
        slug: 'rum-blush',
        name: "Rum Blush",
        type: "Rosé",
        price: 29.99,
        description: "Aged in Dark Rum Barrels from Berkshire Mountain Distillery, this fun style of our Sunset Blush makes it taste like a strawberry daquiri.",
        specs: {
            alc: "11.25 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/rum-blush.png"
    },

    // RED WINES
    {
        id: 14,
        slug: 'st-croix',
        name: "St. Croix",
        type: "Red",
        price: 26.99,
        description: "Lighter bodied red wine with bold flavors, smokey and earthy tones. Pairs well with barbecue, meats and a nice aged cheddar cheese.",
        specs: {
            alc: "13 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/st-croix.png"
    },
    {
        id: 15,
        slug: 'merlot',
        name: "Merlot",
        type: "Red",
        price: 30.99,
        description: "Aged on a combination of American and French Oaks. Well balanced, Medium Bodied Notice the deep color with tastes of dark cherry and hints of black pepper and butter. Great with red meat or Italian dishes.",
        awards: [
            "2011 Finger Lakes International Wine Competition Silver Medal Winner",
            "2010 Finger Lakes International Wine Competition Silver Medal Winner",
            "2010 Grand Harvest International Wine Competition Bronze Medal Winner"
        ],
        specs: {
            alc: "13 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/merlot.png"
    },
    {
        id: 16,
        slug: 'twisted-red',
        name: "Twisted Red",
        type: "Red",
        isFanFavorite: true,
        price: 29.99,
        description: "An exquisitely balanced Bordeaux style wine. This Cabernet blend will tantalize your taste buds with hints of spice, blackberry, black cherry, plum and vanilla.",
        awards: [
            "2010 Finger Lakes International Wine Competition Bronze Medal Winner",
            "2009 Grand Harvest Competition Silver Medal Winner",
            "2008 International Eastern States Competition Bronze Medal Winner"
        ],
        specs: {
            alc: "14 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/twisted-red.png"
    },
    {
        id: 17,
        slug: 'barrel-aged-root-63-red',
        name: "Barrel Aged Root 63 Red",
        type: "Red",
        price: 23.99,
        description: "Your favorite Root 63 aged on French Oak creating a richer, smooth oaky red. Sweet and oaky nose and creamy fruit finish.",
        specs: {
            alc: "12 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/barrel-aged-root-63-red.png"
    },
    {
        id: 18,
        slug: 'limited-root-63-red',
        name: "Limited Root 63 Red",
        type: "Red",
        price: 26.99,
        description: "This Italian Style version of our Famous Root 63 is slightly dryer with a fuller body. Fruit forward with hints of cherry, plum and strawberry that finishes with a delicate earthiness which creates the perfect wine for pasta or steak.",
        specs: {
            alc: "11.25 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/limited-root-63-red.png"
    },
    {
        id: 19,
        slug: 'root-63-red',
        name: "Root 63 Red",
        type: "Red",
        price: 21.99,
        description: "A versatile semi-sweet wine with flavors of strawberry, pomegranate and raspberry. Similar to a red sangria! Pairs well with most everything from pizza and burgers to fruit & cheese.",
        specs: {
            alc: "12 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/root-63-red.png"
    },
    {
        id: 20,
        slug: 'chocolate-infused-root-63-red',
        name: "Chocolate Infused Root 63 Red",
        type: "Red",
        price: 26.99,
        description: "Infused with chocolate! Subtle notes of chocolate, cranberry, and strawberry. Perfect for after dinner!",
        specs: {
            alc: "12 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/root-63-chocolate.png"
    },
    {
        id: 21,
        slug: 'root-63-cafe',
        name: "Root 63 Cafe’",
        type: "Red",
        price: 26.99,
        description: "Infused with Coffee! Light bodied with just a hint of cherry and touches of dark chocolate and hints of coffee flavor. Subtle sweetness is followed by a smooth, creamy, vanilla finish that fills your whole palate.",
        specs: {
            alc: "12 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/root-63-cafe.png"
    },

    // RESERVE WINES
    {
        id: 22,
        slug: 'bourbon-barrel-aged-st-croix',
        name: "Bourbon Barrel Aged St. Croix",
        type: "Reserve",
        price: 39.99,
        description: "Aged in French Oak for two years, then aged in 10 year old Bourbon Barrels from Litchfield Distillery for a year. Bold nose of bourbon filled with soft fruit, smoky, earthy aroma and a creamy finish.",
        specs: {
            alc: "13 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/bourbon-st-croix.png"
    },
    {
        id: 23,
        slug: 'cabernet-franc',
        name: "Cabernet Franc",
        type: "Reserve",
        price: 41.99,
        description: "Aged in French Oak for two years, rich and well balanced. Expect hints of black licorice, soft and creamy chocolate with fruit flavors of ripe black cherry and brambleberry.",
        specs: {
            alc: "13 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/cabernet-franc.png"
    },

    // SPARKLING WINE
    {
        id: 24,
        slug: 'shades',
        name: "Shades",
        type: "Sparkling",
        price: 23.99,
        description: "A fruity, pomegranate hued, sparkling wine. Bursting with flavors of bright raspberry and pomegranate with just a hint of effervescence.",
        specs: {
            alc: "8 % by vol",
            weight: "2.5lbs",
            dimensions: "3x3x12 in"
        },
        image: "/wines/shades.png"
    }
];
