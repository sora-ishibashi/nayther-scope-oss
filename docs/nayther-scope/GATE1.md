# Nayther Scope — Windows desktop Gate 1 (NAY-94)

**Status: Gate 1 ACCEPTED and merged (2026-10-15 JST).** Owner accepted the Windows source-build GUI 5/5 on code commit `449705399a941b7576655e84e3d713c52ee7750e`; follow-up `e64021f` changed docs only. Approved PR #1 was squash-merged into `integration/nayther-scope-0.1.0` at `4508b9d0dc21a18b96265e9288a257cafa24105d`. This is **not** a packaged/public release. Packaged-app data paths remain unverified and deferred to Gate 3. This is an **independent, unofficial** desktop application built from the open-source Code - OSS repository. It is **not Microsoft VS Code** and may not use Microsoft marks, proprietary release binaries, product services, credentials, or extension marketplace rights merely by virtue of the MIT source license.

**Base:** [upstream Code - OSS 1.141.2](https://github.com/microsoft/vscode/tree/1.141.2), exactly `16507d91be0dc1ce4f94c04d4d0430210b8685d9`. On this fork, `baseline/code-oss-1.141.2` is a **never-modify reference**, and `main` tracks upstream separately. Gate 1 source work occurred on `feat/nay-94-gate1-identity`; its PR #1 was initially based on the frozen baseline for review but **retargeted before merge** to a newly created `integration/nayther-scope-0.1.0` branch starting at the same upstream SHA. This preserves the baseline. Future Nayther product branches should start from the integration branch, not alter the baseline or upstream-tracking `main`.

**Tracking:** [NAY-94](https://nayther.atlassian.net/browse/NAY-94); predecessor [NAY-92](https://nayther.atlassian.net/browse/NAY-92). Existing Scope Core and Canvas remain in a separate repo; **no integration until Gate 2**.

**How to read this file:** "Gate 1 goals" and "Windows-specific notes" are the original design intent. "Acceptance checklist" and everything after it describe the **current** state. The tracked review rounds (PR #1 reviews 5521583464, 5521622128, 5521891428) are summarised at the end; earlier intermediate wording (for example a doubled "Dev" title, "Get started with VS Code", or "no automated tests") is superseded and no longer describes the build.

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
- **Gate 1 merge was explicitly owner-approved and completed** via PR #1 on the product integration branch only. Future merges, tags, releases, profile deletion or credential operations require separate owner approval.

## Acceptance checklist (current state)

Legend: **PASS** = locally reported or owner-tested against the Gate 1 source build; **DEFERRED** = outside Gate 1 (Gate 3). For build/automated test runs, raw logs remain local and were not independently rerun by the remote reviewer.

| # | Item | State | Evidence |
|---|---|---|---|
| 1 | Independently named app: window title, executable, in-app icon and first-run text | **PASS** | Title `Nayther Scope Dev` (single ` Dev`), executable `Nayther Scope.exe`, "N" title-bar icon, "Get started with Nayther Scope" (screenshots kept locally, not published) |
| 1b | Help → About identity | **PASS** | Owner manually checked Help → About name and version (Code - OSS source version `1.141.2`) in the latest `4497053` build on 2026-10-15 |
| 2 | AppId / protocol / mutex / data roots do not reuse upstream values | **PASS** | `naytherProduct.test.ts` ("identity does not reuse …") + table below |
| 3 | No unapproved auth / telemetry / Marketplace / update on a clean first start | **PASS (bounded)** | Service inventory below; network observation limits stated |
| 4 | Windows build and launch | **PASS** | `npm install`, `npm run compile` (0 errors) and launch from `scripts\code.bat` on Windows 11 x64 |
| 5 | Scratch Explorer / editor / terminal / Git smoke | **PASS** | Owner manually repeated Explorer folder access, Editor file save/close/reopen, integrated Terminal real output (`node --version`, `git --version`) and Git status/Source Control changes on the latest built source (commit `4497053`, 2026-10-15); separate previous 4/4 PASS on older commit `41cf779` |
| 6 | Baseline remains pinned and recoverable | **PASS** | `baseline/code-oss-1.141.2` = `16507d91…`, untouched; Gate 1 changes merged only into `integration/nayther-scope-0.1.0`, PR #1 squash commit `4508b9d` |
| 7 | MIT and Microsoft notices preserved | **PASS** | No licence or copyright text removed; new files carry the repository header (see "Licensing of new files") |
| 8 | Logs reviewed / redacted; no secrets, profiles or extensions in the PR | **PASS** | Raw evidence stays on the local machine only |
| 9 | Installer images, non-Windows assets, Sessions window brand, language packs, distribution licence inventory | **DEFERRED** | Gate 3 |

## Identity fields changed (`product.json`)

| Field | Upstream (Code - OSS) | Nayther Scope |
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

Provisional icon: `resources/win32/code.ico`, `code_150x150.png`, `code_70x70.png` (generated "N" mark, no Microsoft artwork); `VisualElementsManifest.xml` short name updated. In-app marks: `src/vs/workbench/browser/media/code-icon.svg` and the four `letterpress-*.svg` editor watermarks are replaced with the same original "N" mark.

## Behavioural changes in source

| File | Change | Reason |
|---|---|---|
| `chat.shared.contribution.ts` | `chat.disableAIFeatures` default `false` → `true` | Copilot/AI is opt-in |
| `chat.shared.contribution.ts` | `chat.titleBar.signIn.enabled` default `true` → `false` | No sign-in affordance in the title bar unless AI is enabled |
| `gettingStarted.contribution.ts` | `workbench.welcomePage.experimentalOnboarding` default `true` → `false`; `experiment: auto` override removed | The onboarding wizard is a Copilot sign-in flow |
| `gettingStartedContent.ts` | `VS Code` → `Nayther Scope`; Copilot steps additionally require `!config.chat.disableAIFeatures`; Marketplace and Settings Sync steps hidden (`when: 'false'`); external video relabelled as upstream | First-run text must not present unsupported upstream services as Nayther features |
| `onboardingVariationA.ts` | Title and aria label read `Nayther Scope` | Brand |

`product.json` `configurationDefaults` was tried and removed: it is only honoured by web embedders, not the desktop app.

## First-run link and walkthrough audit

| Surface | Before | Now |
|---|---|---|
| Setup walkthrough → "Watch video tutorials" (`aka.ms/vscode-getting-started-video`) | Presented as Nayther Scope's own tutorial | Titled "Watch upstream VS Code video tutorials"; text states they are published by the upstream Visual Studio Code project (Microsoft) and that Nayther Scope has no Marketplace, Settings Sync or Copilot service. The link still opens Microsoft's page: it is an upstream reference, not a Nayther feature |
| Setup walkthrough → Copilot steps | Conditioned on chat state only | Also require AI features to be enabled; image alt text names GitHub Copilot |
| Essentials walkthrough → "Tune your settings" (mentions Settings Sync) | Shown when a sync status exists | Hidden: no sync store in product.json |
| Essentials walkthrough → "Code with extensions" (Marketplace picture and "Browse Popular Extensions") | Shown | Hidden: no `extensionsGallery` in product.json. Local `.vsix` installation is an upstream feature that is expected to remain available (not exercised in Gate 1) |
| Web walkthrough variants | n/a on desktop (`when: isWeb`) | Text rebranded only; not reachable in the desktop app |
| Built-in walkthrough illustrations (`learn.svg`, `settings.svg`, `multi-file-edits.svg`, `extensions*.svg`) | Upstream VS Code artwork | Unchanged; the marketplace/Copilot illustrations are only reachable through the hidden or opt-in steps above. Attributed to the upstream project under its MIT licence |
| Other Microsoft/GitHub links remaining in the tree (e.g. `aka.ms/github-copilot-*` in `defaultChatAgent`, Copilot terms) | Upstream | Unchanged and only reachable after the user enables AI features |

## Service inventory (clean first start, scratch folder)

| Area | Status | Basis |
|---|---|---|
| Extension gallery / Marketplace | Not configured | No `extensionsGallery` in product.json (upstream OSS default); UI entry points in first-run text hidden |
| Auto-update | Disabled | No update URL; main log `update#setState disabled` |
| Telemetry | No endpoint configured | No `aiConfig` / telemetry keys in product.json |
| Experiments / assignment service | Inert | `experimentsEnabled()` needs `tasConfig` (absent) and telemetry level `all` |
| Settings Sync | Not configured | No `configurationSync` store |
| Copilot / GitHub sign-in | Opt-in only | `chat.disableAIFeatures=true`; title-bar and Welcome sign-in affordances default off; `trustedExtensionAuthAccess={}`. `defaultChatAgent` is **retained in its upstream shape** because a large part of the chat code dereferences it without a guard (removing it threw at start-up) |
| Built-in `github-authentication` and Copilot extension sources | Present, inactive until the user opts in | Source tree unchanged |
| Webview external endpoint (`vscode-cdn.net`) | Retained, not exercised | Read only by the browser/web environment service; desktop Markdown preview rendered with no proxied request |
| `agentsTelemetryAppName` | Retained | A label for the extension-host `appHost` property; no endpoint |
| Built-in `ms-vscode.js-debug*` (MIT) | Present | Fetched from GitHub at build time, not from a Marketplace; redistribution review at Gate 3 |

### Network observation: method and limits

Fresh isolated profile, three independent observers over about 4 minutes (start-up, Welcome idle, Extensions view and search, Chat shortcut, Markdown preview, 60 s idle):

1. a local logging proxy (`--proxy-server` plus `HTTP(S)_PROXY`) that answers 502 to everything and records only method and host:port;
2. a 150 ms `netstat` sampler over all `Nayther Scope.exe` processes for non-loopback TCP;
3. the Windows DNS client cache before and after.

Result: **0 proxy requests, 0 sampled non-loopback connections.** The DNS cache gained `cafe.github.com` and `chatgpt.com`; a 120 s control with the app closed showed the cache also gaining unrelated hosts, so those entries are **unattributed** (machine-wide cache, administrator-only ETW not used). This is bounded evidence that **no unauthorised traffic was observed in these scenarios**, not proof of network isolation: a proxy sees only proxy-aware clients, the Chat view was not opened because AI features are hidden, and GitHub sign-in was deliberately not attempted. Upstream Copilot endpoints still exist in `defaultChatAgent`; the boundary is the opt-in setting, not removal.

## Data roots and isolation policy

Everything the app writes, by root:

| Root | Content | Controlled by | Isolated from VS Code / Code - OSS? |
|---|---|---|---|
| `--user-data-dir` (we pass `C:\src\gate1-*profile\user-data`) | settings, state DB, workspace storage, logs, caches | CLI flag | Yes, when the flag is used |
| `--extensions-dir` | installed extensions | CLI flag | Yes, when the flag is used |
| `~\.nayther-scope-dev-shared\sharedStorage\state.vscdb` (observed in source Dev run; separately packaged app path unverified) | cross-window shared storage | `sharedDataFolderName` currently equals `.nayther-scope-dev-shared` in `product.json`; may be overridden by `--shared-data-dir` or `VSCODE_PORTABLE\shared-data` | Dedicated namespace verified in observed Dev run; `~\.vscode-oss-shared` and `~\.vscode` were not modified. Do **not** assume a packaged build uses `.nayther-scope-shared` without testing |
| `~\.nayther-scope-dev\argv.json` (built app: `~\.nayther-scope\argv.json`) | persistent runtime arguments | `dataFolderName` (resolved under the home directory) | Yes: dedicated name; **not** relocated by `--user-data-dir` |
| `.build\electron\` and `out\` inside the checkout | binaries and compiled code | build | n/a |

Policy:

1. **Default (Gate 1):** named Nayther roots in the user's home directory plus explicit `--user-data-dir` / `--extensions-dir`. These cannot collide with VS Code or Code - OSS because every name is different.
2. **Single-root option:** setting `VSCODE_PORTABLE=<dir>` (or `--shared-data-dir` for the shared store only) places data under one directory. Not used in Gate 1 and not changed by this work.
3. The app **never** reads, migrates, merges or deletes another application's profile. Cleanup of the named roots is manual and owner-initiated; Gate 1 deletes nothing.
4. Evidence from these roots (state DBs, `argv.json`, logs, extensions) stays local and is never attached to the PR.

**Additional packaging clarification:** the standalone distribution build was not produced during Gate 1. The shipped app's shared data root, installer assets, and actual profile behavior require separate Gate 3 validation. The dev build's observed shared storage path is recorded above; all existing user profiles remain untouched.

## Tests

| Command | Declared `test(...)` | Reported passing | Difference |
|---|---|---|---|
| `npm run test-node -- --run src/vs/platform/product/test/node/naytherProduct.test.ts` | 5 | 6 | +1: the mocha harness appends `Errors › should not have unexpected errors in tests` |
| `scripts\test.bat --run src/vs/workbench/contrib/welcomeGettingStarted/test/browser/naytherFirstRunDefaults.test.ts` | 5 | 6 | +1: the Electron harness prepends `Tests are using suiteSetup and setup correctly › assertCleanState` |

Test names (exactly as printed by the runners):

- Node: `identity does not reuse upstream Code - OSS / Microsoft identifiers`; `base display name has no Dev suffix (the dev run adds it once)`; `no Microsoft gallery, update, telemetry, sync or experiment services configured`; `no extension is silently trusted for authentication access`; `generic editor, terminal and git support stay in the tree`.
- Browser: `AI features are disabled by default`; `Copilot sign-in affordance in the title bar is off by default`; `Welcome page GitHub sign-in button is off by default`; `experimental onboarding is off and not remotely assignable`; `walkthrough does not offer unconfigured Marketplace, Sync or Copilot steps`.

What these tests prove: configuration defaults and static content. They do **not** prove that authentication can never occur or that no user action reaches other services; that rests on the inventory and the bounded network observation above. Regression for Explorer/Editor/Terminal/Git remains the hands-on smoke. Upstream GitHub Actions stay disabled; tests were run locally. Also run: the existing `gettingStartedMarkdownRenderer.test.ts` (2 passing) and ESLint on the changed TypeScript files.

## Licensing of new files

The two new test files carry the repository's standard file header (`Copyright (c) Microsoft Corporation … MIT`), because this repository's ESLint rule (`header/header`) requires that exact header on every source file and `LICENSE.txt` is the repository's MIT licence. A comment under the header states that the tests were written for the Nayther Scope fork; they are licensed under the repository MIT licence. No existing Microsoft or third-party copyright notice was edited or removed (`LICENSE.txt` and `ThirdPartyNotices.txt` are unchanged). Whether Nayther Scope contributions should carry their own copyright line is a product-owner licensing decision for Gate 3 and is not made here.

## Remaining residuals

- Help → About identity and the hands-on GUI smoke on the exact source Dev build: **owner-confirmed PASS (2026-10-15 JST, HEAD `4497053`)**. Source build acceptance is complete; no product binaries were packaged or distributed.
- DNS entries `cafe.github.com` and `chatgpt.com` could not be attributed; optional administrator ETW is not required unless an unexplained connection is observed.
- Upstream VS Code illustrations remain in hidden/opt-in walkthrough steps.
- Deferred to Gate 3: installer `inno-*.bmp`, macOS/Linux icons and desktop files, Sessions-window `letterpress-sessions-*` / `vscodeLogoPath`, language-pack strings, About licence text, distribution licence inventory.

## Review history

- **5521583464** (first review): requested single Dev suffix, first-run rebrand, auth/experiment audit, bounded network claim, tests, shared-data proof — addressed in `41cf779` and `d6a8e69`.
- **5521622128**: owner GUI 4/4 PASS on `41cf779`.
- **5521891428** (round 2): requested this reconciliation — stale sections removed, test counts reconciled, first-run links audited, licence header assessed, data roots and policy written down.
