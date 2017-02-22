import ajax from './ajax'
import state from '../store/currentStates';

export default function updateState() {
    console.log('Обновляем состояние категорий, а затем и их составляющих');
    const operation = {};
    let menu = [];
    operation.name = 'categories';
    ajax.exec(operation, function (resp) {
        state.appState.MenuPoints = [];
        state.appState.MenuPoints = resp.data;
        console.log('Меню обновлено');
        console.log(state.appState.MenuPoints);
        menu = state.appState.MenuPoints;
        menu.forEach(function (item) {
            operation.name = 'positions';
            operation.catId = item.code;
            ajax.exec(operation, function (resp) {
                console.log(resp.data);
                formatJson(resp.data, item.code);
                console.log(`${item.code} категория обновлена:`);
                console.log(state.appState.Category[item.code]);
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