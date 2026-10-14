/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Nayther Scope (NAY-94): original test written for the Nayther Scope fork. The header above is the file header enforced
// by this repository's lint rule; the file is licensed under the repository MIT license (License.txt).

import assert from 'assert';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../../base/test/common/utils.js';
import { Extensions, IConfigurationRegistry } from '../../../../../platform/configuration/common/configurationRegistry.js';
import { Registry } from '../../../../../platform/registry/common/platform.js';
import '../../../chat/browser/chat.shared.contribution.js';
import '../../browser/gettingStarted.contribution.js';
import { walkthroughs } from '../../common/gettingStartedContent.js';

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

	test('walkthrough does not offer unconfigured Marketplace, Sync or Copilot steps', () => {
		const setup = walkthroughs.find(w => w.id === 'Setup');
		assert.ok(setup && setup.content.type === 'steps');
		const steps = setup.content.steps;
		const copilot = steps.filter(step => step.id.startsWith('CopilotSetup'));
		assert.ok(copilot.length > 0);
		for (const step of copilot) {
			assert.ok(step.when?.startsWith('!config.chat.disableAIFeatures && '), `${step.id} must require AI features to be enabled`);
		}
		const video = steps.find(step => step.id === 'videoTutorial');
		assert.ok(video && /upstream/i.test(video.title) && /upstream/i.test(video.description), 'external video must be labelled as upstream');
		const essentials = walkthroughs.find(w => w.id === 'Beginner');
		assert.ok(essentials && essentials.content.type === 'steps');
		for (const id of ['settingsAndSync', 'extensions']) {
			assert.strictEqual(essentials.content.steps.find(step => step.id === id)?.when, 'false', `${id} needs a service this product does not configure`);
		}
	});
});
