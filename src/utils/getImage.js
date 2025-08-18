// utils/getImage.js
export const getImage = (imageName) => {
  if (!imageName) return null;

  const key = imageName.toLowerCase().trim();

  const images = {
    // Mobiles / Electronics
    'samsung.png': require('../assets/Samsung.png'),
    '16.png': require('../assets/Iphone16.png'),
    'acer.png': require('../assets/Acer.png'),
    'redmi.png': require('../assets/Redmi.png'),
    'nothing.png': require('../assets/nothing.png'),
    'oneplus.png': require('../assets/Oneplus.png'),
    'motorola.png': require('../assets/Motorola.png'),
    'tecno.png': require('../assets/Tecno.png'),

    // Number icons
    'two.png': require('../assets/two.png'),
    'three.png': require('../assets/three.png'),
    'four.png': require('../assets/four.png'),
    'five.png': require('../assets/five.png'),
    'six.png': require('../assets/six.png'),
    'seven.png': require('../assets/seven.png'),
    'eight.png': require('../assets/eight.png'),
    'night.png': require('../assets/night.png'),

    // Beauty / Other products
    'the.jpg': require('../assets/the.jpg'),
    'rich.jpg': require('../assets/richdad.jpg'),
    'f2.jpg': require('../assets/f2.jpg'),
    'lips.jpg': require('../assets/lips.jpg'),
    'headphone.jpg': require('../assets/headphone.jpg'),
    'ipad.jpg': require('../assets/ipad.jpg'),
    
    '16.jpg': require('../assets/16.jpg'),
    'acer.jpg': require('../assets/Acer.png'),
    'redmi.jpg': require('../assets/redmi2.jpg'),
    'nothing.jpg': require('../assets/nothing.png'),
    'one1.jpg': require('../assets/one1.jpg'),
    'butter.jpg': require('../assets/butter.jpg'),
    'salt.jpg': require('../assets/salt.jpg'),

    // Fresh items (Veg & Fruits)
    'tomato.jpg': require('../assets/tomato.jpg'),
    'potatoes.png': require('../assets/potato.jpg'),
    
    'bananas.png': require('../assets/banana.jpg'),
    'apples.png': require('../assets/apple.jpg'),
    'grapes.png': require('../assets/grape.jpg'),
    'carrots.png': require('../assets/carrot.jpg'),
    'mango.png': require('../assets/mango.jpg'),
       'onions.png': require('../assets/onion.jpg'),
        'rice.jpg': require('../assets/rice.jpg'),



    // Fashion category
    'tshirt.jpg': require('../assets/tshirt.jpg'),
    'jeans.jpg': require('../assets/pant.jpg'),
   
    'shoes.jpg': require('../assets/shoe.jpg'),
    'dress.jpg': require('../assets/dress.jpg'),
  
    'handbag.jpg': require('../assets/handbag.jpg'),
  };

  return images[key] || null; // Return the matched image or null if not found
};
