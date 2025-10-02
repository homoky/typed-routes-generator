import deepCloneMap from "deep-clone-map";

type Args = {
  routes: any;
  exportConstName: string;
};

export const generateRoutes = (args: Args) => {
  return (
    `export const ${args.exportConstName} = ` +
    JSON.stringify(
      deepCloneMap(args.routes, (route: string) => {
        const regex = /\[(.*?)([a-zA-Z]*)\]/g;
        const params = (route.match(regex) || []).map((match) =>
          match.replace("[", "").replace("]", "")
        );

        if (params.length > 0)
          return `#(params: {${params
            .map((parameter) => `${parameter}: string`)
            .join(", ")} }) => "${route}"${params
            .map((param) => `.replace("[${param}]", params.${param})`)
            .join("")}#`;

        return `#()=>"` + route + '"#';
      })
    )
      .replace(/"#/g, "")
      .replace(/#"/g, "")
      .replace(/\\"/g, '"') +
    "\n\n"
  );
};
