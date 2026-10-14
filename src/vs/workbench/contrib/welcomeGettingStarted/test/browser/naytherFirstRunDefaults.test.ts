/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../../base/test/common/utils.js';
import { Extensions, IConfigurationRegistry } from '../../../../../platform/configuration/common/configurationRegistry.js';
import { Registry } from '../../../../../platform/registry/common/platform.js';
import '../../../chat/browser/chat.shared.contribution.js';
import '../../browser/gettingStarted.contribution.js';

// Nayther Scope (NAY-94): AI features and the Copilot onboarding must be opt-in on first run.
suite('Nayther Scope first-run defaults', () => {

	ensureNoDisposablesAreLeakedInTestSuite();

	const properties = () => Registry.as<IConfigurationRegistry>(Extensions.Configuration).getConfigurationProperties();

	test('AI features are disabled by default', () => {
		assert.strictEqual(properties()['chat.disableAIFeatures']?.default, true);
	});

	test('Copilot sign-in affordance in the title bar is off by default', () => {
		assert.strictEqual(properties()['chat.titleBar.signIn.enabled']?.default, false);
	});

	test('Welcome page GitHub sign-in button is off by default', () => {
		assert.strictEqual(properties()['chat.welcomePage.signIn.enabled']?.default, false);
	});

	test('experimental onboarding is off and not remotely assignable', () => {
		const onboarding = properties()['workbench.welcomePage.experimentalOnboarding'];
		assert.strictEqual(onboarding?.default, false);
		assert.strictEqual(onboarding?.experiment, undefined);
	});
});
