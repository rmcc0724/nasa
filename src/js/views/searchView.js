class SearchView {
    _parentEl = document.querySelector('.search');
  
    getQuery() {
      let query = this._parentEl.querySelector('.search__field').value;
      query = query.split('');
      this._clearInput();
      return(`${query[0]}${query[1]}${query[2]}${query[3]}-${query[5]}${query[6]}-${query[8]}${query[9]}`);
    }
  
    _clearInput() {
      this._parentEl.querySelector('.search__field').value = '';
    }
  
    addHandlerSearch(handler) {
      this._parentEl.addEventListener('submit', function (e) {
        e.preventDefault();
        handler();
      });
    }
  }
  
  export default new SearchView();