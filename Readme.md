# Typed routes generator

Provide route definitions in yaml file and get generated typed routes with parameters in paths. There is no limit how deep routes can be. Also you can define in one yaml file multiple route types that each will be exported as separate const.

Argument (parameter) can be text, numbers but no special characters like `_`, `-`, etc.

## Usage

```
yarn typed-routes-generator --source ./example/routes.yaml --output ./example/generated.ts
```

## Example

### Source yaml file (./example/routes.yaml)

```
mainRoutes:
  firstLevel:
    anotherLevel:
      anotherLevel:
        lastLevel:
          homeWithArgument: "/[someargumentkey]"

websiteRoutes:
  home: /
  product:
    archive: "/products"
    detail: "/products/[detail]"
  aboutUs: "/about-us"
```

### Output (./example/generated.ts)

```
export const mainRoutes = {
  firstLevel: {
    anotherLevel: {
      anotherLevel: {
        lastLevel: {
          homeWithArgument: (params: { someargumentkey: string }) => '/[someargumentkey]'.replace('[someargumentkey]', params.someargumentkey.toLowerCase()),
        },
      },
    },
  },
};

export const websiteRoutes = {
  home: () => '/',
  product: { archive: () => '/products', detail: (params: { detail: string }) => '/products/[detail]'.replace('[detail]', params.detail.toLowerCase()) },
  aboutUs: () => '/about-us',
};
```

### Usage of generated code

```
websiteRoutes.product.detail({ detail: 'product-id' });
// Output: /products/product-id
```