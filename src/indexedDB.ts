// eslint-disable-next-line import/no-mutable-exports
export let database: IDBDatabase | null = null;

export const openIndexedDB = (): void => {
  const openDB = indexedDB.open('max7290599', 1);

  openDB.onupgradeneeded = () => {
    database = openDB.result;
    const store = database.createObjectStore('bestScore', { keyPath: 'id', autoIncrement: true });
    store.createIndex('fname', 'fname');
    store.createIndex('lname', 'lname');
    store.createIndex('mail', 'mail');
    store.createIndex('total', 'total');
    store.createIndex('url', 'url');
  };

  openDB.onsuccess = () => {
    database = openDB.result;
  };
}
