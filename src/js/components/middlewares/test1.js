export function middlewareTest(resp){
    const debug = true;
    const checkBreakfastAndLunch = false;
    const checkNoMainPosition = !checkBreakfastAndLunch;
    let retTestData =  resp.data;
    if (!debug){
        return retTestData;
    }
    else {
        console.log('Проводим изменения полученных данных для тестирования');
    }

    if (debug && checkBreakfastAndLunch){
        for (let i = 0; i< retTestData.length; i++){
            if (retTestData[i].code === '472020') {
                retTestData[i].activeTime = '1';
                retTestData[i].lanhc = '0';
                retTestData[i].breakfast = '1';
            }
            if (retTestData[i].code === '482020') {
                retTestData[i].activeTime = '0';
                retTestData[i].lanhc = '0';
                retTestData[i].breakfast = '1';
            }
            if (i === retTestData.length - 1){
                return retTestData;
            }
        }
    }
    if (debug && checkNoMainPosition){
        for (let i = 0; i< retTestData.length; i++){
            if (retTestData[i].code === '472020' || retTestData[i].code === '482020') {
                retTestData[i].activeTime = '0';
                retTestData[i].lanhc = '0';
                retTestData[i].breakfast = '0';
            }
            if (i === retTestData.length - 1){
                return retTestData;
            }
        }
    }
}