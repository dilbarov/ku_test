declare module "*.less" {
    const styles: (...args: Array<false | string | undefined | {[className: string ]: undefined | string | boolean}>) => string ;
    export default styles;
}
