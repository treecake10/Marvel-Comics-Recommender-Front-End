const ParallelDataFetcher = async (fetchFunction, id, availability) => {
    
        const limit = 100;
        const numberOfBatches = Math.ceil(availability / limit);

        const promises = Array.from({ length: numberOfBatches }, (_, index) =>
            fetchFunction(id, index * limit)
        );

        const dataArray = await Promise.all(promises);
        const allData = dataArray.flat();

        return allData;
};

export default ParallelDataFetcher;
