// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = 'babel'

export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.Identifier)
    .forEach(path => {
      j(path).replaceWith(
        j.identifier(path.node.name+"Chuchu")
      );
    })
    .toSource();
}

