import React, { FC, PropsWithChildren } from "react";
import IndexedDBProvider from "use-indexeddb";

const idbConfig = {
    databaseName: "messagesHistory",
    version: 1,
    stores: [
      {
        name: "currentUser",
        id: { keyPath: "id", autoIncrement: true },
        indices: [
            { name: 'currentUser', keyPath: 'currentUser' },
        ],
      },
      {
        name: "messages",
        id: { keyPath: "id", autoIncrement: true },
        indices: [
            { name: 'messages', keyPath: 'messages' },
        ],
      },
      {
        name: "users",
        id: { keyPath: "id", autoIncrement: true },
        indices: [
            { name: 'users', keyPath: 'users' },
        ],
      },
    ],
};

const DbProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <IndexedDBProvider config={idbConfig}>
            { children }
        </IndexedDBProvider>
    )
};

export default DbProvider;