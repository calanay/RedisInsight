import { Selector } from 'testcafe';
import { MyRedisDatabasePage, CliPage, OverviewPage, WorkbenchPage } from '../../../pageObjects';
import { rte } from '../../../helpers/constants';
import { acceptLicenseTermsAndAddOSSClusterDatabase } from '../../../helpers/database';
import { commonUrl, ossClusterConfig } from '../../../helpers/conf';
import { deleteOSSClusterDatabaseApi, getClusterNodesApi } from '../../../helpers/api/api-database';
import { Common } from '../../../helpers/common';

const overviewPage = new OverviewPage();
const myRedisDatabasePage = new MyRedisDatabasePage();
const common = new Common();
const cliPage = new CliPage();
const workbenchPage = new WorkbenchPage();

const headerColumns = {
    'Type': 'OSS Cluster',
    'Version': '7.0.0',
    'User': 'Default'
};
const keyName = common.generateWord(10);
const commandToAddKey = `set ${keyName} test`;

fixture `Overview`
    .meta({ type: 'critical_path', rte: rte.ossCluster })
    .page(commonUrl)
    .beforeEach(async t => {
        await acceptLicenseTermsAndAddOSSClusterDatabase(ossClusterConfig, ossClusterConfig.ossClusterDatabaseName);
        // Go to Analysis Tools page
        await t.click(myRedisDatabasePage.NavigationPanel.analysisPageButton);
    })
    .afterEach(async() => {
        await deleteOSSClusterDatabaseApi(ossClusterConfig);
    });
test('Overview tab header for OSS Cluster', async t => {
    const uptime = /[1-9][0-9]\s|[0-9]\smin|[1-9][0-9]\smin|[0-9]\sh/;

    // Verify that user see "Overview" tab by default for OSS Cluster
    await t.expect(overviewPage.overviewTab.withAttribute('aria-selected', 'true').exists).ok('The Overview tab not opened');
    // Verify that user see "Overview" header with OSS Cluster info
    for (const key in headerColumns) {
        const columnSelector = Selector(`[data-testid=cluster-details-item-${key}]`);
        await t.expect(columnSelector.textContent).contains(`${headerColumns[key]}`, `Cluster detail ${key} is incorrect`);
    }
    // Verify that Uptime is displayed as time in seconds or minutes from start
    await t.expect(overviewPage.clusterDetailsUptime.textContent).match(uptime, 'Uptime value is not correct');
});
test
    .after(async() => {
    //Clear database and delete
        await cliPage.sendCommandInCli(`DEL ${keyName}`);
        await cliPage.sendCommandInCli('FT.DROPINDEX idx:schools DD');
        await deleteOSSClusterDatabaseApi(ossClusterConfig);
    })('Primary node statistics table displaying', async t => {
    // Remember initial table values
        const initialValues: number[] = [];
        const nodes = (await getClusterNodesApi(ossClusterConfig)).sort();
        const columns = ['Commands/s', 'Clients', 'Total Keys', 'Network Input', 'Network Output', 'Total Memory'];

        for (const column in columns) {
            initialValues.push(await overviewPage.getTotalValueByColumnName(column));
        }
        const nodesNumberInHeader = parseInt((await overviewPage.tableHeaderCell.nth(0).textContent).match(/\d+/)![0]);

        // Add key from CLI
        await t.click(cliPage.cliExpandButton);
        await t.typeText(cliPage.cliCommandInput, commandToAddKey);
        await t.pressKey('enter');
        await t.click(cliPage.cliCollapseButton);
        // Verify nodes in header column equal to rows
        await t.expect(await overviewPage.getPrimaryNodesCount()).eql(nodesNumberInHeader, 'Primary nodes in table are not displayed');
        // Verify that all nodes from BE response are displayed in table
        for (const node of nodes) {
            await t.expect(overviewPage.tableRow.nth(nodes.indexOf(node)).textContent).contains(node, `Node ${node} is not displayed in table`);
        }
        // Go to Workbench page
        await t.click(myRedisDatabasePage.NavigationPanel.workbenchButton);
        //Run Create hash index command to load network and memory
        await t.click(workbenchPage.documentButtonInQuickGuides);
        await t.click(workbenchPage.internalLinkWorkingWithHashes);
        await t.click(workbenchPage.preselectCreateHashIndex);
        await t.click(workbenchPage.submitCommandButton);
        // Go to Analysis Tools page
        await t.click(myRedisDatabasePage.NavigationPanel.analysisPageButton);
        // Verify that values in table are dynamic
        for (const column in columns) {
            await t.expect(await overviewPage.getTotalValueByColumnName(column)).notEql(initialValues[columns.indexOf(column)], `${column} not dynamic`);
        }
    });
