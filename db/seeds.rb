# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding data..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('db', 'seed_assets', file_name))
end

# Only run on development (local) instances not on production, etc.
# unless Rails.env.development?
#   puts "Development seeds only (for now)!"
#   exit 0
# end

## KEYWORDS

puts "Finding or creating keywords..."

key1 = Keyword.find_or_create_by! name: 'Tourist stuff'
key2 = Keyword.find_or_create_by! name: 'Kombucha'
key3 = Keyword.find_or_create_by! name: 'Where the animals go'
key4 = Keyword.find_or_create_by! name: 'Sunny hangouts'
key5 = Keyword.find_or_create_by! name: 'Nostalgia'
key6 = Keyword.find_or_create_by! name: 'Bubble Tea'
key7 = Keyword.find_or_create_by! name: 'Plant-based-friendly Restaurants/Cafes'
key8 = Keyword.find_or_create_by! name: 'For the Yogis'

## ANCHORS

puts "Creating anchors..."

300.times do
  Anchor.create!()
end

## LOCATIONS
puts "Creating locations..."
Location.destroy_all
Funfact.destroy_all

loc1 = Location.create! ({
  name: 'Victoria public',
  address: 'Victoria, BC, Canada',
  description: 'Capital of British Columbia, Canada.',
  website: 'https://www.victoria.ca/#',
  anchor_id: 1
})

loc1.funfacts.create!({
  description: 'Hang around the church area around Pandora and Cook when it gets dark makes your life more colourful.',
})

loc1.funfacts.create!({
  user_name: 'Yuhan',
  description: 'Rain season here is short than that in Vancouver.'
})

loc1.funfacts.create!({
  description: 'Victoria\'s expecting the biggest tsunami/earthquake/natural disaster anytime soon now. Carefully consider your investments.'
})

loc2 = Location.create! ({
  name: 'Fairmont Empress',
  address: '721 Government Street',
  description: 'Tea at the Empress:
  Served daily since its opening in 1908, world famous Tea at the Empress is served in the sophisticated Lobby Lounge. Located on the picturesque West Coast of Canada, Fairmont Empress is the ideal starting point to explore the stunning natural beauty of Vancouver Island.
  Meetings, Events and Weddings:
  Fairmont Empress is Vancouver Island\'s premier venue for top tier functions. With unparalleled facilities, proximity to the Victoria Conference Centre and sustainable meeting options, the Empress is Victoria’s ideal location for discerning planners.  Planning a wedding? Fairmont Empress\' team will create a fairy tale wedding for you right here at Canada\'s castle on the coast.',
  website: 'https://www.fairmont.com/empress-victoria/',
  anchor_id: 55
})

loc2.funfacts.create!({
  user_name: 'Lindz',
  description: 'The queen lived in the Empress hotel during her visit..where else.'
})


loc3 = Location.create!({
  name: 'Victoria Parliament',
  address: '501 Belleville Street',
  description: 'Home to the Legislative Assembly of British Columbia where elected representatives – called Members of the Legislative Assembly or MLAs – meet to shape the future of the province by debating and passing the laws that govern British Columbia.
  The Parliament Buildings and surrounding areas are located in the traditional territories of the Lekwungen (pronounced Le-KWUNG-en) people. Now known as the Songhees and Esquimalt First Nations, these Coast Salish people have a rich culture and history dating back thousands of years.',
  website: 'https://www.leg.bc.ca/learn-about-us/visiting-the-legislature',
  anchor_id: 56
})

loc4 = Location.create!({
  name: 'Quazar\'s Arcade',
  address: '1215 Government Street',
  description: 'Open Noon to 9pm
  7 Days a Week
  Extensive and ever-growing collection of new and vintage arcade machines means we can rotate the titles on the floor to keep the selection fresh. Check back often to see what they have currently in the arcade!
  Pinball Games:
  Beautiful collection of pinball machines. They have the largest selection in BC!
  We use a token based system. Our token machine accepts cash, debit, and tap. Our tokens (better known as ‘Quazars’) are fifty cents a piece. Tokens can also be purchased from anyone of our staff members.
  ',
  website: 'https://www.quazarsarcade.com/',
  anchor_id: 57
})

loc5 = Location.create!({
  name: 'Market Square',
  address: '#39 - 560 Johnson Street',
  description: 'If you’re looking for local boutiques that offer one-of-a-kind merchandise, you’ve come to the right place. You’ll find the latest fashion trends; home accessories; locally made jewelry; fun gift ideas and more. Choose from a variety of tasty dine-in and take-out restaurants – authentic Belgian waffles, a vegetarian buffet, Neapolitan pizzeria, curries, Mexican, Indonesian, a coffee shop and craft beer eatery.',
  website: 'https://www.marketsquare.ca/',
  anchor_id: 120
})

loc6 = Location.create!({
  name: 'JagaSilk',
  address: 'A17 - 633 Courtney St',
  description: 'Have focused on fresh-milled maccha green tea and its tools since 2005. Maccha has inspired our micro-milled tea lattes and a farm direct rotating line of loose teas.
  JagaSilk was created (and is operated and owned) by Miyuki and Jared Nyberg. The adventure began in the summer of 2005, making deliveries from the public transit system. Importing maccha began with a little knowledge and a kernel of an idea.
  With the support of a wealth of local small business owners, managers, and employees, we were able to hone our niche to the specialty cafe, supermarket and restaurant environment. This is where quality, knowledge, and attention to detail in technique and the sharing of knowledge were and are most appreciated.',
  website: 'http://jagasilk.com/',
  anchor_id: 59
})

loc7 = Location.create!({
  name: 'Bastion Square',
  address: '50 - 60 Bastion Square',
  description: 'Bastion Square is located in the heart of downtown. The ceremonial entry arch, located at View and Government Streets, welcomes visitors to the original site of old Fort Victoria. The square looks out on the Inner Harbour and boasts some of the finest restaurants, pubs, and cafes in Victoria. In the summer, its seasonal artisan market and many outdoor patios make it an ideal spot to visit.',
  website: 'https://www.tourismvictoria.com/bastion-square-public-market',
   anchor_id: 60
})


loc8 = Location.create!({
  name: 'Lucky Bar',
  address: '517 Yates Street',
  description: 'Hopping club featuring varied live bands, DJ nights & dance parties in an intimate space.
  Specialties:
   90\'s Night, 80\' Night, etc.',
  website: 'https:/\/luckybar.ca\/',
  anchor_id: 61
})

loc9 = Location.create!({
  name: 'Maritime Museum',
  address: '634 Humboldt Street',
  description: 'Adult – $10.00
Senior/Student – $8.00
Youth (12-17) – $5.00
Child (under 12) – Free
UPCOMING CLOSURE PERIODS:  APRIL 1 – 11, 2019
Tours:
Explore Victoria’s Inner Harbour and discover more about BC’s maritime heritage and culture!

The tour starts at the Maritime Museum of BC and go around the Inner Harbour, up Wharf St., through Bastion Square, down Government St., and back to the Museum. It runs for about an hour and includes the cost of admission.',
  website: 'https://mmbc.bc.ca/',
  anchor_id: 62
})

loc10 = Location.create!({
  name: 'Songhees Hilltop Dog Park',
  address: '100 Saghalie Road',
  description: 'Dogs are allowed off-leash from 6am to 10pm. The off leash area is the grassy area encircled by the gravel pathway on the west side of the park.',
  anchor_id: 22
})

loc11 = Location.create!({
  name: 'The Bubble Tea Place',
  address: '532 Fisgard Street (Chinatown)',
  description: 'Literally the name. It comes with a lot of bubbles.',
  anchor_id: 63
})


loc12 = Location.create!({
  name: 'Chattime',
  address: '1306 Douglas Street',
  description: 'Chatime is a Taiwanese global franchise teahouse chain based in Taiwan. Chatime is the largest teahouse franchise in the world. Its expansion and growth model is through franchising.
  The one in Victoria is right on the main road (Douglas) in the center of the city!',
  website: 'http://chatime.com/index_nr.html#home',
  anchor_id: 64
})

loc13 = Location.create!({
  name: 'Fantan Cafe',
  address: '549 Fisgard Street (Chinatown)',
  description: 'Local, laid-back Chinese nook since 1985 with eclectic decor focusing on noodle dishes & bubble tea.',
  anchor_id: 65
})

loc14 = Location.create!({
  name: 'Green Cuisine',
  address: 'Unit 5 - 560 Johnson Street, Market Square',
  description: 'Awesome plant-based casual restaurant located in Market Square. Serve yourself and everything will be weighted at the til. Great place to get your plant-based fix in ;).',
  website: 'http://www.greencuisine.com',
  anchor_id: 120
})

loc15 = Location.create!({
  name: 'Hey Happy Coffee',
  address: 'Unit 122 - 560 Johnson Street, Market Square',
  description: 'Hey Happy loves people, they love creativity and most of all they LOVE coffee.

Their coffees are treated with respect and an uncompromising touch. Here, coffee isn’t just a commodity. At Hey Happy they treat it as it truly is, a beverage every bit as complex and profound as the finest wines and spirits in the world. ',
  website: 'http://www.heyhappycoffee.com',
  anchor_id: 119
})

loc16 = Location.create!({
  name: 'Ashtanga Yoga Victoria',
  address: 'Unit 202 - 560 Johnson Street, Market Square',
  description: 'Release your modern-life stresses, and ease into a stronger you, one breath, one posture and one day at a time, practicing Ashtanga yoga at your own pace.',
  website: 'http://www.ashtanga-yoga-victoria.com',
  anchor_id: 120
})

loc17 = Location.create!({
  name: 'Moksana Yoga Centre',
  address: '613 Pandora Ave',
  description: '“The magic art of releasing” ™
MokSana Yoga & Healing Center was founded in December 2001 with a mandate to provide inspiring yoga classes in a variety of styles. Our center offers drop-in yoga classes, a Yoga-Alliance certified 250-hour Yoga Teacher Training course, continuing education workshops for yoga teachers and students, healing arts practitioners, yoga retreats, and retail.',
  website: 'https://www.moksanayoga.com/',
  anchor_id: 274
})

loc18 = Location.create!({
  name: 'Medicine NEST: Yoga',
  address: '532 Herald Street',
  description: 'Yoga varieties: Lunar Yoga, Meditation + Hatha Yoga, Yintrospection, Elemental Yoga + Tea, Kundalini Yoga, Meditation + Restoration Yoga.
  All levels welcome. Join for a holistic journey. ',
  website: 'https://www.medicinenest.ca/',
  anchor_id: 42
})

loc19 = Location.create!({
  name: 'Rebar',
  address: '50 Bastion Square',
  description: 'At Rebar, eating modern means being aware: aware of where your food comes from and preparing and serving food responsibly, from seed to table.

Rebar proves that exotic flavours don’t need to traverse the globe to reach your plate, especially since there is a wealth of culinary treasures in our own backyards.',
  website: 'http://rebarmodernfood.com/#menu',
  anchor_id: 60
})

loc20 = Location.create!({
  name: 'Lotus Pond Vegetarian Restaurant',
  address: '617 Johnson Street',
  description: 'Vegetarian lunch buffet from 11am - 2pm. Join for plant-based food!! ',
  website: 'https://lotuspondvictoria.ca/',
  anchor_id: 145
})

loc21 = Location.create!({
  name: 'The Mint',
  address: '1414 Douglas Street',
  description: 'Join the Mint for an early dinner with a relaxed atmosphere and soak up the romance or stay a little later when the lights go down and the music comes up as our resident DJs step in behind the vintage stove turntables. All ages are welcome, although an earlier reservation is recommended for those with small children or those looking for a quieter ambience.',
  website: 'https://themintvictoria.com/downstairs/food/',
  anchor_id: 104
})

loc22 = Location.create!({
  name: 'Mo:Lé',
  address: '554 Pandora Street',
  description: 'Born of a longtime friendship, and a desire to serve excellent food to friends, foodies, hipsters, families, retirees and everyone in between, Mo:Lé Restaurant has grown from a simple eatery into a Victoria institution in just a few years. They make delicious all-day breakfast, brunch and lunch with their secret ingredient: love.',
  website: 'https://molerestaurant.ca/',
  anchor_id: 85
})

loc23 = Location.create!({
  name: 'Fol Epi',
  address: '398 Harbour Road, #101',
  description: 'Despite being called Slow Food, everybody I know that\'s into it is incredibly busy and working fast. We are all a bit obsessive about food. But there\'s an understanding that we are all doing the same thing and still contributing as individuals within the community. -- Fol Epi(About Us)',
  website: 'http://folepi.ca/',
  anchor_id: 35
})

loc24 = Location.create!({
  name: 'Nourish Kitchen & Cafe',
  address: '225 Quebec Street',
  description: 'An 1888 heritage home-turned-restaurant with rooms to mingle & rooms to gather.
Nourish was created to make people feel Healthy & Happy.
The kitchen plays with re-imagining natural ingredients. Nourish prepares seasonal dishes that share their fascination with traditional food philosophies & the love of holistic nutrition principles.',
  website: 'https://www.nourishkitchen.ca/',
  anchor_id: 260
})

loc25 = Location.create!({
  name: 'Chinatown',
  address: '500 Fisgard Street',
  description: 'Canada\'s oldest Chinatown, and one of the oldest in North America!',
  website: 'http://chinatown.library.uvic.ca/',
  anchor_id: 273
})

# KEY TO LOCATION

puts 'Setting locations to keywords...'
key1.locations << loc2
key1.locations << loc3
key1.locations << loc9
key1.locations << loc25
key2.locations << loc6
key3.locations << loc10
key4.locations << loc5
key4.locations << loc7
key4.locations << loc10
key4.locations << loc25
key5.locations << loc4
key5.locations << loc8
key5.locations << loc9
key5.locations << loc25
key6.locations << loc11
key6.locations << loc12
key6.locations << loc13
key7.locations << loc14
key7.locations << loc15
key7.locations << loc19
key7.locations << loc20
key7.locations << loc21
key7.locations << loc22
key7.locations << loc23
key7.locations << loc24
key8.locations << loc16
key8.locations << loc17
key8.locations << loc18


puts 'Setting ratings for locations...'

loc1.ratings.create! score: 4
loc1.ratings.create! score: 4
loc1.ratings.create! score: 3.5
loc1.ratings.create! score: 5

loc2.ratings.create! score: 2
loc2.ratings.create! score: 5
loc2.ratings.create! score: 3.5

loc3.ratings.create! score: 2
loc3.ratings.create! score: 1
loc3.ratings.create! score: 3.5

loc4.ratings.create! score: 5
loc4.ratings.create! score: 3.5
loc4.ratings.create! score: 4

loc5.ratings.create! score: 5
loc5.ratings.create! score: 3

loc6.ratings.create! score: 3

loc9.ratings.create! score: 2

loc10.ratings.create! score: 4.5
loc10.ratings.create! score: 5

loc11.ratings.create! score: 5
loc11.ratings.create! score: 2

loc12.ratings.create! score: 5
loc12.ratings.create! score: 4

loc13.ratings.create! score: 4

loc14.ratings.create! score: 5
loc14.ratings.create! score: 4.8

loc15.ratings.create! score: 4

loc16.ratings.create! score: 4.5
loc16.ratings.create! score: 4.3

loc19.ratings.create! score: 3.5
loc19.ratings.create! score: 4.0
loc19.ratings.create! score: 4.1
loc19.ratings.create! score: 5

loc20.ratings.create! score: 4.3

loc21.ratings.create! score: 4
loc21.ratings.create! score: 5

loc23.ratings.create! score: 4.3

loc24.ratings.create! score: 5

loc25.ratings.create! score: 5

puts 'DONE POPULATING THE DB!! WHEEEEE!'
