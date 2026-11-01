# Nayther Scope (experimental Code - OSS fork)

> **Status: experimental / no public binary release.** This repository is a work-in-progress fork of [Microsoft's Code - OSS](https://github.com/microsoft/vscode), not an official Microsoft Visual Studio Code distribution. It is maintained independently by the Nayther project and is not affiliated with or endorsed by Microsoft.

**Nayther Scope** explores a development environment where developers can inspect code structure and relationships visually, alongside familiar editing workflows. This is the **Code - OSS-derived desktop shell**, not a claim that the planned Scope features are complete or available on the default branch.

## Repository layout and current status

- **`main`**: upstream-derived Code - OSS baseline/tracking branch. Do not infer that it contains a finished Nayther-branded product.
- **`baseline/code-oss-1.141.2`**: pinned upstream reference used for the initial isolated development work.
- **`integration/nayther-scope-0.1.0`**: experimental Nayther branding and profile-isolation work. It is a development branch, **not a release or an approved installer**.
- The separate Scope mapping/analysis prototype is developed independently and is not represented by a stable public release in this repository.

Please check the exact branch and commit before reproducing results. Work on other branches may not be merged into `main`.

## Goals (not release claims)

- Make code structure, dependencies and relationships easier to understand.
- Explore direct manipulation and visualization of source relationships while retaining a conventional editor.
- Maintain distinct application identity, profile storage and product-service boundaries from Microsoft distributions.
- Document security, privacy and third-party license obligations before any distribution.

**Limitations:** There is no supported installer, public release, compatibility guarantee or confirmed distribution-readiness at this time. Upstream build/test workflows are not evidence of Nayther-specific Windows acceptance. Do not assume proprietary Microsoft services, Marketplace access, branding or extension rights accompany the MIT-licensed source code.

## Building and testing

This is a substantial Code - OSS source tree. For the upstream baseline, see Microsoft's [build instructions](https://github.com/microsoft/vscode/wiki/How-to-Contribute) and the checked-in project files. Building or running a development branch is at your own risk. A Nayther-specific supported build/release process will be documented only after its verification gates pass.

## Issues and contributions

See [CONTRIBUTING.md](CONTRIBUTING.md) for this fork's contribution policy. Please use this repository only for **Nayther-specific** questions or reproducible changes; report issues reproducible in unchanged VS Code upstream to [microsoft/vscode](https://github.com/microsoft/vscode/issues). **Do not post security vulnerabilities, credentials, or private logs in public issues.** The security reporting policy requires separate maintainer setup before external reporting can be accepted safely.

## Origin, attribution and licenses

- Upstream: [Microsoft/vscode](https://github.com/microsoft/vscode) (Code - OSS).
- The original code's [MIT license and copyright notice](LICENSE.txt) remain in place.
- See [ThirdPartyNotices.txt](ThirdPartyNotices.txt), [cglicenses.json](cglicenses.json), and [cgmanifest.json](cgmanifest.json) for additional existing third-party records. These must be re-audited for any future distributed artifact.
- **Code - OSS source licensing does not grant a license to Microsoft's proprietary product distribution, services, logos or trademarks.** Nayther's new artwork and branding must be reviewed separately.

This README describes the Nayther fork. The upstream project and its canonical documentation are available at [microsoft/vscode](https://github.com/microsoft/vscode).
