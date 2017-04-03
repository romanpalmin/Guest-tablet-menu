import ajax from './ajax';
import state from '../store/currentStates'
export default {
    rebind: function (tableId) {
        const order = state.appState.orders.currentState;
        state.appState.TableNumberPrimary = tableId;
        console.log('Новый стол: ' + tableId);
        this.ajaxWorker(tableId, order);

    },
    ajaxWorker: function (tabId, order) {
        let cntMax = order.length;
        let currCode = tabId + ';';
        const self = this;
        const operation = {name: 'clearOrder'};
        //ajax.exec(operation);
        order.forEach(function (item, index) {
            item.tableId = tabId;
            currCode += item.code + ';';
            if (index === cntMax-1) {
                state.appState.orders.currentState = order;
                //self.addNewOrder(order);
                self.addNewOrder(currCode);
            }
        });
    },
    addNewOrder: function (order) {
        console.log(order);
        let options = {'name': 'rebuildTable', 'stringOfCodes': order};
        console.log(options);
        ajax.exec(options, function (response) {
            console.log(response.data);
            if (response.data == '1'){
                console.log(order + ' добавлены.')
            } else {
                this.addNewOrder(order);
            }
        });

        /*let cntMax = order.length;
        order.forEach(function (item, index) {
            let test = item.code;
            options = {
                name: 'addToOrder',
                positionId: item.code,
                tableId: item.tableId
            };
            ajax.exec(options, function (response) {
                console.log('------');
                console.log(response.data);
                if (response.data == '1'){
                    console.log(test + ' добавлен.')
                }
            });
            if (index === cntMax-1) {
                console.log(state.appState.orders.currentState);
                console.log(state.appState.TableNumberPrimary);
            }
        });*/

    }
}