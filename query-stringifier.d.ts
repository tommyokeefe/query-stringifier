interface stringMap { [s: string]: string; }
interface optionsMap { prefix: string ; }
declare module "query-stringifier" {
    function stringify(params: stringMap, options?: optionsMap): string;
    function parse(queryStr: string): stringMap;
    export = { stringify, parse };
}
