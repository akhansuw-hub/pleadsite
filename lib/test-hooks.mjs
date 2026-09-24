// Lets `node --test` load TypeScript files that use extensionless relative imports (as Next does).
// Usage: node --import ./lib/test-hooks.mjs --test lib/legal.test.ts
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, next) {
    try {
      return next(specifier, context);
    } catch (err) {
      if (specifier.startsWith(".") && !/\.[cm]?[jt]sx?$/.test(specifier)) {
        return next(`${specifier}.ts`, context);
      }
      throw err;
    }
  },
});
