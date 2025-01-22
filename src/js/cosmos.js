import { DefaultAzureCredential } from '@azure/identity';
import { TableServiceClient, TableClient } from '@azure/data-tables';

export async function start(emit) {
    // <create_client>
    const endpoint = process.env.CONFIGURATION__AZURECOSMOSDB__ENDPOINT;
    console.log(`ENDPOINT: ${endpoint}`);

    const credential = new DefaultAzureCredential();
    
    const client = new TableServiceClient(endpoint, credential);
    // </create_client>
    emit('Current Status:\tStarting...')
    
    const tableName = process.env.CONFIGURATION__AZURECOSMOSDB__TABLENAME ?? 'cosmicworks-products';
    const table = new TableClient(endpoint, tableName, credential);

    emit(`Get table:\t${table.tableName}`);

    {
        const entity = {
            rowKey: 'aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb',
            partitionKey: 'gear-surf-surfboards',
            name: 'Yamba Surfboard',
            quantity: 12,
            price: 850.00,
            clearance: false
        };

        await table.upsertEntity(entity, 'Replace');
        emit(`Upserted item:\t${JSON.stringify(entity)}`);
    }

    {
        const entity = {
            rowKey: 'bbbbbbbb-1111-2222-3333-cccccccccccc',
            partitionKey: 'gear-surf-surfboards',
            name: 'Kiama Classic Surfboard',
            quantity: 25,
            price: 790.00,
            clearance: true
        };

        await table.upsertEntity(entity, 'Replace');
        emit(`Upserted item:\t${JSON.stringify(entity)}`);
    }

    {
        const rowKey = 'aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb';
        const partitionKey = 'gear-surf-surfboards';

        const entity = await table.getEntity(partitionKey, rowKey);
        emit(`Read item id:\t${entity.rowKey}`);
        emit(`Read item:\t${JSON.stringify(entity)}`);
    }

    {
        const partitionKey = 'gear-surf-surfboards';

        const entities = table.listEntities({
            queryOptions: {
                filter: `PartitionKey eq '${partitionKey}'`
            }
        });

        for await(const entity of entities) {
            emit(`Found item:\t${entity.name}\t${entity.rowKey}`);
        }
    }

    emit('Current Status:\tFinalizing...');
}