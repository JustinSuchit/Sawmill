# Vercel build warning review

Reviewed 2026-10-26 against production deployment `26X4cTqF3XbqHDXzcKT8Q759UE1A` (commit `71c0e99`). That deployment completed successfully.

## Resolver lifecycle script

`unrs-resolver@1.12.2` is a development dependency reached through `eslint-config-next` and `eslint-import-resolver-typescript`. Its postinstall calls `napi-postinstall`, which can install or download a native binding if the platform-specific optional dependency is missing. Normal installations already receive that binding through optional dependencies.

The package.json policy explicitly denies this package's lifecycle script:

```json
"allowScripts": {
  "unrs-resolver": false
}
```

No script is approved. No dependency version or lockfile is changed. Keep optional dependencies enabled; investigate a missing native binding instead of broadly allowing scripts. npm versions supporting this policy can distinguish an explicit denial from an unreviewed script. See the [npm install-scripts documentation](https://docs.npmjs.com/cli/v11/commands/npm-install-scripts/).

## Unknown environment configuration: cache-dir

The warning appears before both Vercel's dependency installation and its `npm run build` invocation. No matching configuration was found in the repository or the checked local npm environment variables. Vercel's project Environment Variables page showed no project variables configured. This suggests build-environment configuration, but its precise origin was not established.

No cache workaround, custom install command, warning suppression, or Vercel setting was added. Do not replace working npm caching configuration without identifying the setting that introduces the unsupported key.

## Validation

- Fresh isolated install using the unchanged lockfile: `npm ci --ignore-scripts --include=optional --offline --no-audit --no-fund` passed (347 packages). All lifecycle scripts were disabled for this check.
- The freshly installed native resolver loaded and successfully resolved React from the isolated dependency directory.
- ESLint passed on app, components, lib and next.config.ts, both in the source checkout and the isolated fixture.
- Production build passed in the isolated fixture, including TypeScript checking and all 13 generated pages. The nested fixture emitted a multiple-lockfile workspace warning specific to its test location.
- Local npm 11.16.0 did not expose the `install-scripts` command; it cannot reproduce Vercel's pending-script report directly.
- A fresh Vercel deployment is still required to confirm the pending-script warning disappears there. Linux-native execution was not tested locally.
- Website sources, contact details, dependency versions and package-lock.json remain unchanged.
