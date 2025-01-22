const connectionString = process.env.CONFIGURATION__AZURECOSMOSDB__CONNECTIONSTRING;
console.log(`CONNECTION_STRING: ${connectionString}`);

const client = new TableServiceClient(connectionString);