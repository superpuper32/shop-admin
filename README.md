# Shop admin template
🛍e-commerce admin template

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

## Running

```sh
node dist/bundle.js
```

URLs:

- `http://localhost:1234/api/rest/products`
- `http://localhost:1234/api/rest/categories`
- `http://localhost:1234/api/rest/subcategories`
- `http://localhost:1234/api/rest/orders`

Parameters:

- `http://localhost:1234/api/rest/products?_start=0&_end=30&_order=desc&_embed=subcategory.category`
- `/products?_category.name =  _lte=  _gte=  _ne=  _like=`
- `/products?_start=1&_end=10`
- `/products?_sort=category.name,id&order=desc,asc`
- `/products?_embed=category,other`
- `/categories?_refs=subcategory`
