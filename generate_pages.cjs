const fs = require('fs');
const pages = ['Shop', 'Categories', 'ProductDetails', 'Cart', 'Wishlist', 'Checkout', 'Login', 'Register', 'UserProfile', 'MyOrders', 'About', 'Contact', 'NotFound'];

pages.forEach(p => {
  const content = `import React from 'react';

const ${p} = () => {
  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <h1>${p} Page</h1>
    </div>
  );
};

export default ${p};`;

  fs.writeFileSync('src/pages/' + p + '.jsx', content);
});
