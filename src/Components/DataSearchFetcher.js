const DataSearchFetcher = async (fetchFunction, args) => {
    
    const limit = 100;
    let offset = 0;
    const timeoutLimit = 5000;
    const startTime = Date.now();
    let allResults = [];

    while (offset < 10 * limit) {

        const dataPromises = [];
        
        for (let index = 0; index < 10; index++) {
            dataPromises.push(fetchFunction(args, offset + index * limit));
        }

        try {
            const dataArray = await Promise.all(dataPromises);
            const flattenedData = dataArray.flat();

            if (flattenedData.length === 0 || Date.now() - startTime > timeoutLimit) {
                break;
            }

            allResults = [...allResults, ...flattenedData];
            offset += limit * 10;

        } catch (error) {
            console.error(error);
            break;
        }
    }

    return allResults;
};

export default DataSearchFetcher;
