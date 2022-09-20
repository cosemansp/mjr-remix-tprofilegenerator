routes/
  index.tsx      -> /
  about.tsx      -> /about
  products.tsx   -> /products         (layout route)
  /products 
    index.tsx    -> /products         (index route, default child on products)
    $id.jsx      -> /products/12334
    new.tsx      -> /products/new