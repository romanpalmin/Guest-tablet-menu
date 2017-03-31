import ajax from './ajax';
import state from '../store/currentStates'
export default {
    rebind: function (tableId) {
        state.appState.orders.currentState = [{positionId: 1, tableId: 555}, {positionId: 2, tableId: 555}];
        const order = state.appState.orders.currentState;
        state.appState.TableNumberPrimary = tableId;
        console.log('Новый стол: ' + tableId);
        console.log(JSON.stringify(state.appState.orders.currentState));
        this.ajaxWorker(tableId, order);

    },
    ajaxWorker: function (tabId, order) {
        let cntMax = order.length;
        const self = this;
        const operation = {name: 'clearOrder'};
        /*ajax.exec(operation);*/
        order.forEach(function (item, index) {
            item.tableId = tabId;
            if (index === cntMax-1) {
                state.appState.orders.currentState = order;
                self.addNewOrder(order);
            }
        });
    },
    addNewOrder: function (order) {
        let options = {};
        let cntMax = order.length;
        order.forEach(function (item, index) {
            options = {
                name: 'addToOrder',
                positionId: item.positionId,
                tableId: item.tableId
            };
            /*ajax.exec(options, function (response) {
                if (response.data === 1){
                    console.log(item.positionId + ' добавлен.')
                }
            });*/
            if (index === cntMax-1) {
                console.log(state.appState.orders.currentState);
                console.log(state.appState.TableNumberPrimary);
            }
        });

    }
}