# Security policy — Nayther Scope fork

**Experimental project; no supported release is available.** This policy concerns Nayther-specific changes in this repository, which is an independent fork of Microsoft's Code - OSS.

## Reporting a vulnerability

**Do not disclose vulnerabilities, secrets, private source code, or exploit details in public issues, discussions or pull requests.**

For Nayther-specific vulnerabilities, use GitHub's private **"Report a vulnerability"** workflow on this repository **if the maintainer has enabled private vulnerability reporting**. The maintainer must verify that this channel is enabled and monitored before marking this project ready for external security reports. If the private-report option is unavailable, please do not post details publicly; the maintainer must first provide an approved private contact method.

For vulnerabilities that exist in *unchanged upstream* Code - OSS, follow [Microsoft's official security reporting guidance](https://aka.ms/SECURITY.md). Reporting to Microsoft does not replace reporting Nayther-specific changes to this fork's maintainer.

## Supported versions

There are **no supported public releases** and no security-update service-level commitment at this stage.

## Maintainer prerequisites before a public release

- [ ] Enable and verify private vulnerability reporting and response ownership.
- [ ] Audit upstream dependencies, third-party rights and distribution-specific assets.
- [ ] Review secrets in the repository's complete history, CI logs and distribution artifacts.
- [ ] Verify the intended release commit and Windows distribution/security gates.
- [ ] Update this policy with supported versions and a concrete response process.
