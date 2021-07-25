export default class bookmarks {
    constructor() {
        this.bookmarks = [];
    }

    addbookmark(id, title, author, img) {
        const bookmark = { id, title, author, img };
        this.bookmarks.push(bookmark);

        // Perist data in localStorage
        this.persistData();

        return bookmark;
    }

    deletebookmark(id) {
        const index = this.bookmarks.findIndex(el => el.id === id);
        this.bookmarks.splice(index, 1);

        // Perist data in localStorage
        this.persistData();
    }

    isbookmarked(id) {
        return this.bookmarks.findIndex(el => el.id === id) !== -1;
    }

    getNumbookmarks() {
        return this.bookmarks.length;
    }

    persistData() {
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('bookmarks'));
        
        // Restoring bookmarks from the localStorage
        if (storage) this.bookmarks = storage;
    }
}
