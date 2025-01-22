const connectionString: string = process.env.CONFIGURATION__AZURECOSMOSDB__CONNECTIONSTRING!
console.log(`CONNECTION_STRING: ${connectionString}`);

const client: TableServiceClient = new TableServiceClient(connectionString);