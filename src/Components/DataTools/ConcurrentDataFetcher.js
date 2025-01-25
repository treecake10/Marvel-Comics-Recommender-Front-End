import pLimit from 'p-limit';

const fetchWithRetry = async (fetchFunction, id, start, batchSize, retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await fetchFunction(id, start, batchSize);
        } catch (error) {
            if (attempt === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 100));
        }
    }
};

const ConcurrentDataFetcher = async (fetchFunction, id, availability) => {
    const batchSize = 100;
    const limit = pLimit(10);

    const numberOfBatches = Math.ceil(availability / batchSize);
    const promises = Array.from({ length: numberOfBatches }, (_, i) =>
        limit(() => fetchWithRetry(fetchFunction, id, i * batchSize, batchSize))
    );

    try {
        const dataArray = await Promise.all(promises);
        return dataArray.flat();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default ConcurrentDataFetcher;

