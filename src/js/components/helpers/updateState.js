import ajax from './ajax'
import state from '../store/currentStates';

export default function updateState() {
    console.log('Обновляеются данные');
    const operation = {};
    let menu = [];
    operation.name = 'categories';
    ajax.exec(operation, function (resp) {
        state.appState.MenuPoints = [];
        state.appState.MenuPoints = resp.data;
        menu = state.appState.MenuPoints;
        menu.forEach(function (item) {
            operation.name = 'positions';
            operation.catId = item.code;
            ajax.exec(operation, function (resp) {
                formatJson(resp.data, item.code);
            });
        });

        function formatJson(resp, code) {
            state.appState.Category[code].currentState = [];
            if (resp.length === 1){
                if (resp[0].tovar){
                    state.appState.Category[code].currentState = resp[0];
                }
                else{
                    state.appState.Category[code].currentState = resp;
                }
            } else {
                state.appState.Category[code].currentState = resp;
            }
        }
    });
}