# Contributing to Nayther Scope

Thank you for your interest. **This is an experimental Code - OSS fork, not Microsoft's VS Code repository or a supported product release.**

## Before contributing

1. Check the [README](README.md) and select the intended branch; `main` and the experimental integration branch serve different purposes.
2. Search existing [Nayther Scope issues](https://github.com/sora-ishibashi/nayther-scope-oss/issues).
3. For a Nayther-specific enhancement, start with an issue describing the intended behavior, affected branch/commit, and how to verify it. **Please do not submit unsolicited large refactors or auto-generated PRs** while the interface and upstream sync policy are being stabilized.
4. For bugs that also reproduce on unmodified Code - OSS, report them to [Microsoft's upstream tracker](https://github.com/microsoft/vscode/issues) following their guidelines.

## Bug report guidelines

Include the affected branch and commit, OS version, expected and actual result, minimal reproduction, and sanitized diagnostics. Never include account tokens, environment files, personally identifying paths, private code, or logs that could contain secrets.

## Code contributions

External code contributions are **not yet formally opened**. A maintainer-approved issue and published build/test instructions will be prerequisites before we label an issue `good first issue` or advertise a contribution path. Do not assume that an upstream PR automatically applies to this fork.

The initial development branch is `integration/nayther-scope-0.1.0`; it is not a shipping release. No PR may bypass project-specific security, dependency, license, and Windows verification gates.

## Vulnerability reports

**Never disclose security vulnerabilities in public issues or PRs.** Nayther-specific private vulnerability reporting must be enabled and documented before this repository is promoted as a security-report-ready project. For unchanged upstream issues, follow [Microsoft's security reporting guidance](https://aka.ms/SECURITY.md).

## Rights and attribution

Microsoft Code - OSS is licensed under [MIT](LICENSE.txt), and existing third-party notices are in [ThirdPartyNotices.txt](ThirdPartyNotices.txt). Any contribution must have appropriate rights and preserve applicable license headers and upstream attribution. Microsoft trademarks, logos, proprietary services, and marketplace distribution rights are not granted by the source-code license.
