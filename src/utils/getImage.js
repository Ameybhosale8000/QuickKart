// utils/getImage.js

export const getImage = imageName => {
  switch (imageName) {
    case 'Samsung.png':
      return require('../assets/Samsung.png');
    case 'Iphone16.png':
      return require('../assets/Iphone16.png');
    case 'Acer.png':
      return require('../assets/Acer.png');
    case 'Redmi.png':
      return require('../assets/Redmi.png');
    case 'nothing.png':
      return require('../assets/nothing.png');
    case 'Oneplus.png':
      return require('../assets/Oneplus.png');
    case 'Motorola.png':
      return require('../assets/Motorola.png');
    case 'Tecno.png':
      return require('../assets/Tecno.png');
   
  }
};
