const ConcurrentDataFetcher = async (fetchFunction, id, availability) => {
    const batchSize = 100; 
    
    // Calculate the number of batches needed
    const numberOfBatches = Math.ceil(availability / batchSize); 

    const promises = [];

    // Create promises for each batch
    for (let i = 0; i < numberOfBatches; i++) {
        const start = i * batchSize;
        promises.push(fetchFunction(id, start, batchSize)); 
    }

    try {
        // Execute promises concurrently
        const dataArray = await Promise.all(promises);
        // Flatten the array of arrays into a single array
        const allData = dataArray.flat();
        return allData;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default ConcurrentDataFetcher;

