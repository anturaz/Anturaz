// import something here
import wordsCount from 'words-count';
// "async" is optional
export default async({ Vue }) => {
    Vue.prototype.$wordsCount = function(x) {
        return wordsCount(x)
    }
}