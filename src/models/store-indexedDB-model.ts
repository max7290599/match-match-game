export interface StoreIndexedDBModel {
  result: IDBDatabase,
  tx: IDBTransaction,
  store: IDBObjectStore,
  index: IDBIndex,
}
