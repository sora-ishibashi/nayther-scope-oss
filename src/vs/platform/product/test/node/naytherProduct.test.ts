/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Nayther Scope (NAY-94): original test written for the Nayther Scope fork. The header above is the file header enforced
// by this repository's lint rule; the file is licensed under the repository MIT license (License.txt).

import assert from 'assert';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from '../../../../base/common/path.js';
import { fileURLToPath } from 'url';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../base/test/common/utils.js';

function findRepoRoot(): string {
	let dir = dirname(fileURLToPath(import.meta.url));
	while (!existsSync(join(dir, 'product.json'))) {
		const parent = dirname(dir);
		assert.notStrictEqual(parent, dir, 'product.json not found');
		dir = parent;
	}
	return dir;
}

// Nayther Scope (NAY-94): guards the Gate 1 identity and service boundary of product.json.
suite('Nayther Scope product.json boundary', () => {

	ensureNoDisposablesAreLeakedInTestSuite();

	const root = findRepoRoot();
	const product = JSON.parse(readFileSync(join(root, 'product.json'), 'utf8'));

	test('identity does not reuse upstream Code - OSS / Microsoft identifiers', () => {
		const upstream: Record<string, string[]> = {
			nameShort: ['Code - OSS'],
			nameLong: ['Code - OSS'],
			applicationName: ['code-oss'],
			dataFolderName: ['.vscode-oss'],
			sharedDataFolderName: ['.vscode-oss-shared'],
			win32MutexName: ['vscodeoss'],
			win32AppUserModelId: ['Microsoft.CodeOSS'],
			win32x64AppId: ['{{D77B7E06-80BA-4137-BCF4-654B95CCEBC5}'],
			win32arm64AppId: ['{{D1ACE434-89C5-48D1-88D3-E2991DF85475}'],
			win32x64UserAppId: ['{{CC6B787D-37A0-49E8-AE24-8559A032BE0C}'],
			win32arm64UserAppId: ['{{3AEBF0C8-F733-4AD4-BADE-FDB816D53D7B}'],
			urlProtocol: ['code-oss'],
			darwinBundleIdentifier: ['com.visualstudio.code.oss'],
			linuxDesktopName: ['com.visualstudio.CodeOSS'],
		};
		for (const [key, forbidden] of Object.entries(upstream)) {
			assert.ok(typeof product[key] === 'string' && product[key].length > 0, `${key} must be set`);
			assert.ok(!forbidden.includes(product[key]), `${key} must not reuse upstream value ${product[key]}`);
		}
	});

	test('base display name has no Dev suffix (the dev run adds it once)', () => {
		assert.strictEqual(product.nameShort, 'Nayther Scope');
		assert.strictEqual(product.nameLong, 'Nayther Scope');
		assert.ok(!/dev$/i.test(product.dataFolderName), 'dev run appends -dev to dataFolderName');
	});

	test('no Microsoft gallery, update, telemetry, sync or experiment services configured', () => {
		for (const key of ['extensionsGallery', 'updateUrl', 'quality', 'aiConfig', 'tasConfig', 'configurationSync.store', 'enableTelemetry', 'voiceWsUrl']) {
			assert.strictEqual(product[key], undefined, `${key} must not be configured`);
		}
	});

	test('no extension is silently trusted for authentication access', () => {
		assert.deepStrictEqual(product.trustedExtensionAuthAccess, {});
		assert.deepStrictEqual(product.builtInExtensionsEnabledWithAutoUpdates, []);
	});

	test('generic editor, terminal and git support stay in the tree', () => {
		assert.ok(existsSync(join(root, 'extensions', 'git', 'package.json')));
		assert.ok(existsSync(join(root, 'src', 'vs', 'workbench', 'contrib', 'terminal')));
	});
});
