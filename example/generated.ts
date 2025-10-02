export const mainRoutes = {
  firstLevel: {
    anotherLevel: {
      anotherLevel: {
        lastLevel: {
          homeWithArgument: (params: { someargumentkey: string }) =>
            "/[someargumentkey]".replace(
              "[someargumentkey]",
              params.someargumentkey
            ),
        },
      },
    },
  },
};

export const websiteRoutes = {
  home: () => "/",
  product: {
    archive: () => "/products",
    detail: (params: { detail: string }) =>
      "/products/[detail]".replace("[detail]", params.detail),
  },
  aboutUs: () => "/about-us",
};
