# Nayther Scope — Windows desktop Gate 1 (NAY-94)

**Status:** In progress / design-first Draft. This is an **independent, unofficial** desktop application built from the open-source Code - OSS repository. It is **not Microsoft VS Code** and may not use Microsoft marks, proprietary release binaries, product services, credentials, or extension marketplace rights merely by virtue of the MIT source license.

**Base:** [upstream Code - OSS 1.141.2](https://github.com/microsoft/vscode/tree/1.141.2), exactly `16507d91be0dc1ce4f94c04d4d0430210b8685d9`. On this fork, `baseline/code-oss-1.141.2` is a never-modify reference; `main` tracks upstream separately. Implement exclusively on `feat/nay-94-gate1-identity`. All PRs for Gate 1 **must target the pinned baseline branch**, never floating `main`.

**Tracking:** [NAY-94](https://nayther.atlassian.net/browse/NAY-94); predecessor [NAY-92](https://nayther.atlassian.net/browse/NAY-92). Existing Scope Core and Canvas remain in a separate repo; **no integration until Gate 2**.

## Gate 1 goals

1. **Non-conflicting identity:** Audit the pinned `product.json`, platform build/packaging metadata and Windows assets. Update the app's name, applicationName, dataFolderName, sharedDataFolderName, serverDataFolderName (where applicable), URL protocol, mutexes, registered app IDs and associated Windows identity values consistently to use the Nayther Scope namespace. Document changed fields and generated GUIDs; never reuse Microsoft's registered app identities. Avoid promising final installer/registration integration at Gate 1.
2. **Brand separation:** Use a uniquely recognizable, non-Microsoft **temporary** app icon until a final owner-approved identity is available. Visible title, About/product metadata, binary name and app shortcut (if generated) must not claim the product is an official Microsoft build. Retain the original MIT copyright and license notices.
3. **Data boundaries:** At launch, provide unique clean `--user-data-dir` and `--extensions-dir` outside any official VS Code or baseline Code - OSS profile. Validate actual read/write paths, not just settings. Do not migrate, read, purge, or log into existing personal profiles.
4. **Service & privacy audit:** Inventory startup integrations that can trigger GitHub/Copilot login, built-in extensions, telemetry, auto-updates, extension gallery, remote/webview origins and other external communication. Treat proprietary URLs, Microsoft API endpoints, Marketplace, credential access and product services as **unapproved unless independently justified**. Disable unsafe defaults or fail closed without silently breaking core editor UX; demonstrate clean offline/basic-start behavior. Prefer explicit opt-in where service terms allow. No broad PAT, secret logging, or automatic enrollment.
5. **Baseline function:** Rebuild/launch on Windows x64 using the already established reproducible setup. Verify Explorer, editor save/reopen, integrated terminal and local Git status against a disposable scratch folder. Collect path/version and isolation evidence without including tokens, account metadata, `user-data` or raw `exts` in a public PR.
6. **Upstream diff:** All modifications confined to this Gate 1 branch, with a concise changed-files rationale and explicit risk/unknown list. Do not modify the frozen baseline or upstream tracking branch.

## Windows-specific notes

The pinned `1.141.2` upstream `build/npm/preinstall.ts` checks Visual Studio 2022/2019 paths. Windows Build Tools 2026 may need a **process-local** `vs2022_install` variable pointing to the actual installed Build Tools directory; this is a directory-existence preflight workaround, **not** proof that the installed toolset is VS 2022. Preserve a record of the exact selected Python executable and any `GYP_MSVS_VERSION` used. The desktop launch environment must not inherit `ELECTRON_RUN_AS_NODE=1` from a parent VS Code/agent session; clear it **in the launch child process**, never system-wide. Validate actual toolchain behavior before modifying any upstream code.

## Security and release gates

- A prior verbose baseline development log was found to contain **account-linked Copilot token claim metadata**. Do not publish or copy raw logs, auth databases, user profiles or extensions to GitHub/Jira. Scrub new evidence locally and review redacted material before sharing. Do not delete any prior user data without explicit owner approval.
- Keep GitHub Actions disabled on this public fork until a narrowly scoped workflow is reviewed. Do not upload machine-specific traces/secrets.
- Keep all source license and copyright notices intact; review bundled components independently for redistribution.
- **Gate 1 excludes:** React Flow Canvas/GraphDocument integration (Gate 2), signed installer/portable Windows release (Gate 3), public release (Gate 4), upstream bug issue creation, unapproved Microsoft service use, destructive workspace cleanup.
- **No merge, tag, release, credentials or profile deletion** without explicit owner approval.

## Definition of done

- [ ] Independently named Nayther Scope Dev app (window, About, icons and principal identity fields).
- [ ] Independent Windows AppId / protocol / mutex / profile and extensions directories confirmed non-colliding.
- [ ] No unapproved auth/telemetry/Marketplace/updates on first clean startup; service inventory with supported/disabled/unknown statuses.
- [ ] Windows build and launch PASS; scratch Explorer/editor/terminal/Git smoke PASS.
- [ ] Unmodified baseline remains pinned and recoverable; upstream diff bounded and documented.
- [ ] MIT and required third-party notices preserved.
- [ ] Local logs reviewed/redacted; Draft PR ready for independent review and owner sign-off.

## Implementation record (2026-10-15, Windows x64 local build)

### Identity fields changed (`product.json`)

| Field | Upstream (Code - OSS) | Nayther Scope Dev |
|---|---|---|
| `nameShort` / `nameLong` | Code - OSS | Nayther Scope (the dev run appends ` Dev` once: window title "Nayther Scope Dev", built exe `Nayther Scope.exe`) |
| `applicationName` | code-oss | nayther-scope |
| `dataFolderName` / `sharedDataFolderName` | .vscode-oss / .vscode-oss-shared | .nayther-scope (dev run: .nayther-scope-dev, holds argv.json) / .nayther-scope-dev-shared |
| `serverApplicationName` / `serverDataFolderName` / `tunnelApplicationName` | code-server-oss / .vscode-server-oss / code-tunnel-oss | nayther-scope-server / .nayther-scope-server / nayther-scope-tunnel |
| `win32MutexName`, tunnel mutexes | vscodeoss* | naytherscopedev* |
| `win32DirName` / `win32NameVersion` / `win32RegValueName` / `win32AppUserModelId` / `win32ShellNameShort` | Microsoft Code OSS / CodeOSS / Microsoft.CodeOSS / C&ode - OSS | Nayther Scope Dev / NaytherScopeDev / Nayther.Scope.Dev / Nayther &Scope Dev |
| `win32{x64,arm64}{,User}AppId` | upstream GUIDs | four newly generated GUIDs (not registered anywhere yet) |
| `darwinBundleIdentifier`, `darwin*UUID`, `linuxDesktopName`, `linuxIconName` | com.visualstudio.* | dev.nayther.* (macOS/Linux not built or verified in Gate 1) |
| `urlProtocol` | code-oss | nayther-scope |
| `reportIssueUrl` | microsoft/vscode issues | this fork's issues |
| `builtInExtensionsEnabledWithAutoUpdates` | `GitHub.copilot-chat` | `[]` |
| `voiceWsUrl` | Microsoft voice endpoint | removed |
| `trustedExtensionAuthAccess` | GitHub.copilot-chat / vscode.github-authentication trusted | `{}` (every extension must ask for account access) |

Provisional icon: `resources/win32/code.ico`, `code_150x150.png`, `code_70x70.png` (generated "N" mark, no Microsoft artwork); `VisualElementsManifest.xml` short name updated.

### Behavioural defaults changed (source, two one-line edits)

- `chat.disableAIFeatures`: default `false` -> `true` (`chat.shared.contribution.ts`). Copilot/chat is opt-in.
- `workbench.welcomePage.experimentalOnboarding`: default `true` -> `false` (`gettingStarted.contribution.ts`). The onboarding wizard is a GitHub Copilot sign-in flow.
- `product.json` `configurationDefaults` was tried and removed: it is only honoured by web embedders, not the desktop app.

### Service inventory (clean first start, scratch folder)

| Area | Status | Basis |
|---|---|---|
| Extension gallery / Marketplace | Disabled | No `extensionsGallery` in product.json (upstream OSS default) |
| Auto-update | Disabled | No update URL; main log `update#setState disabled` |
| Telemetry | Disabled | No `aiConfig` / telemetry keys in product.json |
| Settings Sync | Disabled | No `configurationSync` store in product.json |
| Copilot / GitHub sign-in | Opt-in only | Default `chat.disableAIFeatures=true`; no sign-in prompt on first start; endpoints remain in `defaultChatAgent` (unchanged upstream shape) |
| Outbound connections after 40 s idle | None observed | Per-process TCP table for all app processes |
| Webview CDN fallback (`vscode-cdn.net`) | Unknown / unused on desktop | Hard-coded browser-only fallback; not exercised |
| Built-in `ms-vscode.js-debug*` | Present, MIT, fetched from GitHub at build time | Not Marketplace; review for redistribution at Gate 3 |
| Built-in `github-authentication` / Copilot extension sources | Present, inactive until user opts in | Source tree unchanged |

### Known residuals

- Window title shows "Nayther Scope Dev Dev" in unbuilt dev runs (upstream appends " Dev").
- Walkthrough text still reads "Get started with VS Code"; in-app title-bar/walkthrough logo is still the upstream SVG. Localized strings and `resources/*/code-icon.svg` are not rebranded in Gate 1.
- Installer bitmaps (`inno-*.bmp`) and macOS/Linux assets are unchanged.
- Dev-mode shared data root is `~/.nayther-scope-dev-shared`, outside `--user-data-dir`.
- No automated tests were run for the two default changes; unit tests asserting the old defaults, if any, are unverified.

## Review follow-up (round 2)

### What changed after PR review (5521583464, 5521622128)

- **Name:** `nameShort`/`nameLong` are now `Nayther Scope`; upstream appends ` Dev` for source runs, so the window title is `Nayther Scope Dev` and the built executable is `Nayther Scope.exe`. `dataFolderName` no longer ends in `-dev` (the dev run adds it).
- **First-run brand surfaces:** every `VS Code` string in `gettingStartedContent.ts` and the onboarding title/aria label now reads `Nayther Scope`. `code-icon.svg` (title bar, walkthrough, banners, update tooltip) and the four `letterpress-*.svg` editor watermarks are replaced with an original "N" mark.
- **Authentication boundary:** `trustedExtensionAuthAccess` emptied; `chat.titleBar.signIn.enabled` default `false`; the `experiment: { mode: 'auto' }` override removed from the onboarding flag. `defaultChatAgent` is kept in its upstream shape on purpose (a large part of the chat code dereferences it unguarded; removing it threw at start-up) and is gated by `chat.disableAIFeatures=true`. Experiments are inert regardless: `experimentsEnabled()` requires `tasConfig`, which this product.json does not define, plus `telemetry.telemetryLevel=all`.
- **Tests added** (run locally; upstream Actions stay disabled):
  - `src/vs/platform/product/test/node/naytherProduct.test.ts` – product.json identity and service boundary (6 passing, `npm run test-node -- --run ...`).
  - `src/vs/workbench/contrib/welcomeGettingStarted/test/browser/naytherFirstRunDefaults.test.ts` – the four first-run defaults (5 passing, `scripts\test.bat --run ...`).

### Network observation method and result

Fresh isolated profile, three independent observers, 4 minutes covering start-up, Welcome idle, Extensions view + search, Chat shortcut, Markdown preview (a webview) and 60 s idle:

1. A local logging proxy (`--proxy-server` plus `HTTP(S)_PROXY`) that answers 502 to everything and records only method + host:port.
2. A 150 ms `netstat` sampler over all `Nayther Scope.exe` processes for non-loopback TCP.
3. Windows DNS client cache before/after.

Result: **0 proxy requests, 0 sampled non-loopback connections.** The DNS cache gained `cafe.github.com` and `chatgpt.com`; a 120 s control with the app closed showed the cache also gaining `api.github.com`, `api.anthropic.com` and unrelated vendor hosts, so the cache is machine-wide and these entries are **not attributable** to the app. Limits: a proxy only sees proxy-aware clients, per-process DNS attribution needs administrator ETW (not used), and Chat was exercised by shortcut only (AI features are hidden, so no chat view opened). This is evidence of absence under these scenarios, not a proof for every path. GitHub sign-in itself was deliberately not attempted.

### Shared data root

`environmentService.appSharedDataHome` = `--shared-data-dir`, else `VSCODE_PORTABLE\shared-data`, else `~\<sharedDataFolderName>`. Observed: `~\.nayther-scope-dev-shared\sharedStorage\state.vscdb` (12 KB, created by this app); `~\.vscode-oss-shared` and `~\.vscode` were not modified during the run (timestamps predate it). Also written outside `--user-data-dir`: `~\.nayther-scope-dev\argv.json`. To fully relocate both use `--shared-data-dir` / `VSCODE_PORTABLE`; Gate 1 does not change that. Cleanup is manual and never automatic.

### Remaining residuals

- `agentsTelemetryAppName: "agents"` is retained; it is only a label used for the extension-host `appHost` property and has no endpoint (no `aiConfig`). Telemetry level default is upstream; no telemetry endpoint exists in product.json.
- `webviewContentExternalBaseUrlTemplate` (vscode-cdn.net) is retained: it is read only by the browser/web environment service (hard-coded fallback). The desktop Markdown preview rendered with no proxied request.
- Built-in `ms-vscode.js-debug*` (MIT) are fetched from GitHub at build time, not from a Marketplace; redistribution review stays with Gate 3.
- Not rebranded (deferred to Gate 3): installer `inno-*.bmp`, macOS/Linux icons and desktop files, Sessions-window letterpress/`vscodeLogoPath`, localized strings in language packs, `About` licence text.
- Owner confirmation still required for: terminal command output (panel opens, output not captured in the automated smoke), About dialog text, and a repeat of the Explorer/save-reopen check on this build.
