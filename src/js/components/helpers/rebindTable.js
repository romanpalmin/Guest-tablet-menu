import ajax from './ajax';
import store from '../../../store';
export default {
    rebind: function (tableId) {
        const order = store.state.app.orders;
        store.state.app.TableNumberPrimary = tableId;
        console.log('Новый стол: ' + tableId);
        this.ajaxWorker(tableId, order);

    },
    ajaxWorker: function (tabId, order) {
        let cntMax = order.length;
        let currCode = tabId + ';';
        const self = this;
        order.forEach(function (item, index) {
            item.tableId = tabId;
            currCode += item.code + ';';
            if (index === cntMax-1) {
                store.state.app.orders = order;
                self.addNewOrder(currCode);
            }
        });
    },
    addNewOrder: function (order) {
        let options = {'name': 'rebuildTable', 'stringOfCodes': order};
        ajax.exec(options, function (response) {
            console.log(response.data);
            if (response.data == '1'){
                console.log(order + ' добавлены.')
            } else {
                this.addNewOrder(order);
            }
        });


    }
}