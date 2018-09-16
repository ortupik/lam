'use strict';


module.exports = function(app) {

var products = [{
    id: 1,
    name: 'Apple MaX Pro 15" Touch Bar MPTU2LL/A 256GB (Silver)',
    type: 'Laptop',
    href: 'product',
    image: {
      small: 'images/products/1/1-small.jpg',
      medium: 'images/products/1/1-medium.jpg',
      large: 'images/products/1/1-large.jpg',
    },
    additionalImages: [{
      small: 'images/products/1/1-add-1-small.jpg',
      large: 'images/products/1/1-add-1-large.jpg',
    }, {
      small: 'images/products/1/1-add-2-small.jpg',
      large: 'images/products/1/1-add-2-large.jpg',
    }, {
      small: 'images/products/1/1-add-3-small.jpg',
      large: 'images/products/1/1-add-3-large.jpg',
    }, {
      small: 'images/products/1/1-add-4-small.jpg',
      large: 'images/products/1/1-add-4-large.jpg',
    }],
    price: 'Ksh 150,000.00',
    oldPrice: 'Ksh 189,900.00',
    brand: {
      name: 'Apple',
      image: 'images/brands/apple.svg',
      href: '#',
    },
    variations: [{
      name: 'Color',
      values: [{
        name: 'Space Grey',
        value: '#aaaeb1'
      }, {
        name: 'Silver',
        value: '#dddfde'
      }]
    }, {
      name: 'SSD Storage',
      values: [{
        name: '256 GB',
        value: '256 GB'
      }, {
        name: '512 GB',
        value: '512 GB'
      }]
    }],
    specifications: [{
    name: 'Performance',
    properties: {
      'Processor': 'Intel&nbsp;Core i7&nbsp;Quad-Core',
      'Base Clock Speed': '2.8&nbsp;GHz',
      'Maximum Boost Speed': '3.8&nbsp;GHz',
      'Total Installed Memory': '16&nbsp;GB',
      'Memory Type': 'LPDDR3&nbsp;SDRAM',
      'Memory Speed': '2133&nbsp;MHz',
      'Onboard Memory': '16&nbsp;GB',
      'Available Memory Slots': '—',
      'Graphics Type': 'Hybrid',
      'GPU': 'AMD Radeon&nbsp;Pro 555 with 2&nbsp;GB&nbsp;GDDR5 VRAM,<br>Intel HD Graphics&nbsp;630'
      }
    }, {
    name: 'Display',
    properties: {
      'Panel Type': 'IPS',
      'Size': '15.4"',
      'Aspect Ratio': '16:10',
      'Native Resolution': '2880×1800',
      'Touchscreen': '—',
      'Finish': 'Glossy',
      'Brightness': '500&nbsp;cd/m<sup>2</sup>'
      }
    }, {
    name: 'Drives',
    properties: {
      'Available Slots': '—',
      'Total Capacity': '256&nbsp;GB',
      'Solid State Storage': '1 × 256&nbsp;GB&nbsp;Integrated PCIe',
      'Optical Drive': '—'
      }
    }, {
    name: 'Input/ Output Connectors',
    properties: {
      'Ports': '4 × Thunderbolt 3&nbsp;via USB Type-C',
      'Display': '4 × DisplayPort&nbsp;via Type-C',
      'Audio': '1 × 1/8" (3.5&nbsp;mm) Headphone Output,<br>2 × Integrated Speaker,<br>3 × Integrated Microphone',
      'Expansion Slots': '—',
      'Media Card Slots': '—'
      }
    }, {
    name: 'Communications',
    properties: {
      'Network': '—',
      'Modem': '—',
      'Wi-Fi': '802.11ac; Dual-Band',
      'Bluetooth': 'Bluetooth 4.2',
      'Mobile Broadband': '—',
      'GPS': 'Not Specified by Manufacturer',
      'NFC': 'Not Specified by Manufacturer',
      'Webcam': 'User-Facing: 720p Video'
      }
    }, {
    name: 'Battery',
    properties: {
      'Battery Chemistry': 'Lithium-Ion Polymer',
      'Watt Hours / Type': '76&nbsp;Wh&nbsp;Non-Removable',
      'Maximum Runtime': '10&nbsp;Hours',
      'Power Requirements': '100-240&nbsp;VAC, 50-60&nbsp;Hz',
      'Power Supply': '1 × 87&nbsp;W',
      }
    }, {
    name: 'General',
    properties: {
      'Operating System': 'macOS High Sierra',
      'Security': 'Not specified',
      'Keyboard': 'Keys: 64,<br>Type: Standard Notebook Keyboard,<br>Features: Backlight',
      'Pointing Device': 'Force Touch Trackpad',
      'Dimensions (W × H × D)': '13.8 × 0.6 × 9.5"&nbsp;/&nbsp;35.1 × 1.5 × 24.1&nbsp;cm',
      'Weight': '4.02&nbsp;lb&nbsp;/&nbsp;1.82&nbsp;kg',
      }
    }, {
    name: 'Packaging Info',
    properties: {
      'Package Weight': '7.55&nbsp;lb',
      'Box Dimensions (L × W × H)': '16.2 × 11.6 × 3.7"'
      }
    }],
    reviews: [{
      author: 'Thomas Bruns',
      date: 'May 21, 2018',
      text: '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>',
      likes: 14,
      dislikes: 2
    }, {
      author: 'George Clanton',
      date: 'May 24, 2018',
      text: '<p>Nunc interdum odio non erat commodo lacinia. Aliquam nec tincidunt lorem. Nunc quis scelerisque nulla. Nam nulla ante, luctus non dignissim a, luctus quis sem. Curabitur consectetur porttitor leo. Donec molestie nisl vitae lorem porttitor vehicula. Etiam feugiat a magna ac dapibus. Donec vitae sollicitudin lectus.</p><p>Sed mollis ex tincidunt posuere blandit. Mauris sed tellus dolor. Suspendisse nibh mi, dignissim et molestie id, dictum in arcu. Duis sodales scelerisque quam, quis lobortis felis egestas eu. Sed nibh nulla, aliquet ac leo vel, rutrum dignissim metus. Sed non rhoncus ex. Curabitur accumsan porta lacus non viverra. Etiam feugiat sapien ut purus luctus, eu porttitor neque volutpat.</p>',
      likes: 5,
      dislikes: 0
    }],
    questions: [{
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer: 'Vivamus imperdiet venenatis est. Phasellus vitae mauris imperdiet, condimentum eros vel, ullamcorper turpis. Maecenas sed libero quis orci egestas vehicula fermentum id diam.'
    }, {
      question: 'Nullam massa sem, mollis ut luctus at, tincidunt a lorem?',
      answer: 'Aliquam sed dictum elit, quis consequat metus. Proin in mauris finibus urna lacinia laoreet sed id orci.'
    }, {
      question: 'Aliquam pretium diam et ullamcorper malesuada?',
      answer: 'Praesent feugiat lectus faucibus tellus congue pharetra. In viverra vehicula pellentesque. Etiam consectetur ultricies magna at bibendum.'
    }, {
      question: 'Nulla fringilla sollicitudin mauris eu volutpat?',
      answer: 'Mauris quis neque nec lectus aliquet malesuada. Nunc ullamcorper purus id gravida aliquam. Integer eget blandit urna.'
    }, {
      question: 'Nam luctus velit ante, id pulvinar nisl gravida eget?',
      answer: 'Vestibulum gravida nisi tempor malesuada iaculis. Phasellus finibus, nisl quis pellentesque scelerisque, erat erat mollis massa, eu semper diam eros id risus. Cras vitae nisi porta.'
    }],
    isNotAvailable: false,
    isOnSale: true,
    isAddedToCart: true,
    isAddedToFavorites: true,
    isAddedToCompare: true,
    statuses: ['top selling', 'trade-in'],
    properties: {
      'Diagonal display': '15.4"',
      'CPU': 'Intel®&nbsp;Core™ i7',
      'RAM': '16&nbsp;GB',
      'Video Card': 'AMD Radeon Pro 555'
    }
  }, {
    id: 2,
    name: 'Apple MacBook 12" MNYN2LL/A 512GB (Rose Gold)',
    type: 'Laptop',
    href: 'product',
    image: {
      small: 'images/products/2/2-small.jpg',
      medium: 'images/products/2/2-medium.jpg',
      large: 'images/products/2/2-large.jpg'
    },
    additionalImages: [],
    price: '$1549.00',
    oldPrice: '',
    brand: {},
    variations: [],
    specifications: [],
    reviews: [],
    questions: [],
    isNotAvailable: false,
    isOnSale: false,
    isAddedToCart: true,
    isAddedToFavorites: true,
    isAddedToCompare: true,
    statuses: ['new', 'trade-in'],
    properties: {
      'Diagonal display': '12"',
      'CPU': 'Intel®&nbsp;Core™ i5',
      'RAM': '8&nbsp;GB',
      'Video Card': 'Intel® HD Graphics 615'
    }
  }, {
    id: 3,
    name: 'Lenovo IdeaPad YOGA 920-13IKB 80Y7001RRK (Copper)',
    type: 'Laptop',
    href: 'product',
    image: {
      small: 'images/products/3/3-small.jpg',
      medium: 'images/products/3/3-medium.jpg',
      large: 'images/products/3/3-large.jpg'
    },
    additionalImages: [],
    price: '$1199.00',
    oldPrice: '',
    brand: {},
    variations: [],
    specifications: [],
    reviews: [],
    questions: [],
    isNotAvailable: false,
    isOnSale: false,
    isAddedToCart: false,
    isAddedToFavorites: true,
    isAddedToCompare: false,
    statuses: '',
    properties: {
      'Diagonal display': '13.9"',
      'CPU': 'Intel®&nbsp;Core™ i7 8550U',
      'RAM': '16&nbsp;GB',
      'Video Card': 'Intel® HD Graphics 620'
    }
  }, {
    id: 4,
    name: 'ASUS Zenbook UX330UA-FC020T (Rose Gold)',
    type: 'Laptop',
    href: 'product',
    image: {
      small: 'images/products/4/4-small.jpg',
      medium: 'images/products/4/4-medium.jpg',
      large: 'images/products/4/4-large.jpg'
    },
    additionalImages: [],
    price: '$749.00',
    oldPrice: '',
    brand: {},
    variations: [],
    specifications: [],
    reviews: [],
    questions: [],
    isNotAvailable: false,
    isOnSale: false,
    isAddedToCart: false,
    isAddedToFavorites: false,
    isAddedToCompare: false,
    statuses: ['top selling'],
    properties: {
      'Diagonal display': '13.3"',
      'CPU': 'Intel®&nbsp;Core™ i7-6500U',
      'RAM': '8&nbsp;GB',
      'Video Card': 'Intel® HD Graphics 520'
    }
  }, {
    id: 5,
    name: 'Dell XPS 15 9560-8968 (Silver)',
    type: 'Laptop',
    href: 'product',
    image: {
      small: 'images/products/5/5-small.jpg',
      medium: 'images/products/5/5-medium.jpg',
      large: 'images/products/5/5-large.jpg'
    },
    additionalImages: [],
    price: '$949.00',
    oldPrice: '$999.00',
    brand: {},
    variations: [],
    specifications: [],
    reviews: [],
    questions: [],
    isNotAvailable: false,
    isOnSale: true,
    isAddedToCart: false,
    isAddedToFavorites: false,
    isAddedToCompare: false,
    statuses: '',
    properties: {
      'Diagonal display': '15.6"',
      'CPU': 'Intel®&nbsp;Core™ i7 7700HQ',
      'RAM': '16&nbsp;GB',
      'Video Card': 'NVIDIA GeForce GTX 960M'
    }
  }, {
    id: 6,
    name: 'Apple MacBook Air 13" MQD32LL/A 128GB (Silver)',
    type: 'Laptop',
    href: 'product',
    image: {
      small: 'images/products/6/6-small.jpg',
      medium: 'images/products/6/6-medium.jpg',
      large: 'images/products/6/6-large.jpg'
    },
    additionalImages: [],
    price: '$849.00',
    oldPrice: '',
    brand: {},
    variations: [],
    specifications: [],
    reviews: [],
    questions: [],
    isNotAvailable: false,
    isOnSale: false,
    isAddedToCart: false,
    isAddedToFavorites: false,
    isAddedToCompare: true,
    statuses: ['trade-in'],
    properties: {
      'Diagonal display': '13.3"',
      'CPU': 'Intel®&nbsp;Core™ i5',
      'RAM': '8&nbsp;GB',
      'Video Card': 'Intel® HD Graphics 6000'
    }
  }, {
    id: 7,
    name: 'Dell Inspiron 5378-2063 (Gray)',
    type: 'Laptop',
    href: 'product',
    image: {
      small: 'images/products/7/7-small.jpg',
      medium: 'images/products/7/7-medium.jpg',
      large: 'images/products/7/7-large.jpg'
    },
    additionalImages: [],
    price: '$579.00',
    oldPrice: '$599.00',
    brand: {},
    variations: [],
    specifications: [],
    reviews: [],
    questions: [],
    isNotAvailable: false,
    isOnSale: true,
    isAddedToCart: false,
    isAddedToFavorites: false,
    isAddedToCompare: false,
    statuses: '',
    properties: {
      'Diagonal display': '13.3"',
      'CPU': 'Intel®&nbsp;Core™ i3-7100U',
      'RAM': '4&nbsp;GB',
      'HDD Capacity': '1&nbsp;TB'
    }
  }, {
    id: 8,
    name: 'Lenovo Yoga 720-13IKB 80X60059RK (Silver)',
    type: 'Laptop',
    href: 'product',
    image: {
      small: 'images/products/8/8-small.jpg',
      medium: 'images/products/8/8-medium.jpg',
      large: 'images/products/8/8-large.jpg'
    },
    additionalImages: [],
    price: '$1099.00',
    oldPrice: '',
    brand: {},
    variations: [],
    specifications: [],
    reviews: [],
    questions: [],
    isNotAvailable: false,
    isOnSale: false,
    isAddedToCart: false,
    isAddedToFavorites: false,
    isAddedToCompare: false,
    statuses: ['new'],
    properties: {
      'Diagonal display': '13.3"',
      'CPU': 'Intel®&nbsp;Core™ i5-7200U',
      'RAM': '8&nbsp;GB',
      'Video Card': 'Intel® HD Graphics 620'
    }
  }, {
    id: 9,
    name: 'Lenovo ThinkPad X380 Yoga 20LH000MUS (Black)',
    type: 'Laptop',
    href: 'product',
    image: '',
    additionalImages: [],
    price: '$2239.00',
    oldPrice: '',
    brand: {},
    variations: [],
    specifications: [],
    reviews: [],
    questions: [],
    isNotAvailable: true,
    isOnSale: false,
    isAddedToCart: false,
    isAddedToFavorites: false,
    isAddedToCompare: false,
    statuses: '',
    properties: {
      'Diagonal display': '13.3"',
      'CPU': 'Intel®&nbsp;Core™ i7 8550U',
      'RAM': '4&nbsp;GB',
      'Video Card': 'Intel® UHD Graphics 620'
    }
  }];
	// Root routing	
	app.get('/', function (req, res) {
	  res.render('pages/index.pug');
	});
	app.get('/index', function (req, res) {
	  res.render('pages/index.pug');
	});
	app.get('/401', function (req, res) {
	  res.render('401.html');
	});
	app.get('/404', function (req, res) {
	  res.render('pages/404.pug');
	});
	app.get('/about', function (req, res) {
	  res.render('pages/about.pug');
	});
	app.get('/article', function (req, res) {
	  res.render('pages/article.pug');
	});
	app.get('/blog', function (req, res) {
	  res.render('pages/blog.pug');
	});
	app.get('/brands', function (req, res) {
	  res.render('pages/brands.pug');
	});
	app.get('/cart', function (req, res) {
	  res.render('pages/cart.pug');
	});
	app.get('/catalog', function (req, res) {
	  res.render('pages/catalog.pug');
	});
	app.get('/category', function (req, res) {
	  res.render('pages/category.pug');
	});
	app.get('/checkout', function (req, res) {
	  res.render('pages/checkout.pug');
	});
	app.get('/compare', function (req, res) {
	  res.render('pages/compare.pug');
	});
	app.get('/contacts', function (req, res) {
	  res.render('pages/contacts.pug');
	});
	app.get('/delivery', function (req, res) {
	  res.render('pages/delivery.pug');
	});
	app.get('/faq', function (req, res) {
	  res.render('pages/faq.pug');
	});
	app.get('/favourites', function (req, res) {
	  res.render('pages/favourites.pug');
	});
	app.get('/news', function (req, res) {
	  res.render('pages/news.pug');
	});
	app.get('/personal', function (req, res) {
	  res.render('pages/personal.pug');
	});
	app.get('/product', function (req, res) {
	  res.render('pages/product.pug', {man:products[0]});
	});
	app.get('/settings', function (req, res) {
	  res.render('pages/settings.pug');
	});
	app.get('/subcategory', function (req, res) {
	  res.render('pages/subcategory.pug');
	});
 
};