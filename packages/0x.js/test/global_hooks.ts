import { devConstants } from '@0xproject/dev-utils';
import { runV2MigrationsAsync } from '@0xproject/migrations';

import { provider } from './utils/web3_wrapper';

before('migrate contracts', async function(): Promise<void> {
    // HACK: Since the migrations take longer then our global mocha timeout limit
    // we manually increase it for this before hook.
    const mochaTestTimeoutMs = 20000;
    this.timeout(mochaTestTimeoutMs); // tslint:disable-line:no-invalid-this
    const txDefaults = {
        gas: devConstants.GAS_LIMIT,
        from: devConstants.TESTRPC_FIRST_ADDRESS,
    };
    const artifactsDir = `src/artifacts`;
    await runV2MigrationsAsync(provider, artifactsDir, txDefaults);
});
