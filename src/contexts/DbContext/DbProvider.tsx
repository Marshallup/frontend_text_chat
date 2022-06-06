import React, { FC, PropsWithChildren } from "react";
import IndexedDBProvider from "use-indexeddb";

const idbConfig = {
    databaseName: "messagesHistory",
    version: 1,
    stores: [
      {
        name: "messages",
        id: { keyPath: "id", autoIncrement: true },
        indices: [
            { name: 'clientID', keyPath: 'clientID', options: { unique: false } },
            { name: 'messages', keyPath: 'messages' },
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