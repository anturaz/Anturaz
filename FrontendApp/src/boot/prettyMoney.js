var moneyFormatter = require('money-formatter');
export default async({ Vue }) => {
    Vue.prototype.$prettyMoney = function(amount) {
        return moneyFormatter.format('PHP', amount);
    }
}