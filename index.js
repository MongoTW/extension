// Name: MongoTW
// ID: mongoTW
// Description: A MongoDB extension for TurboWarp, enabling connections to MongoDB servers and operations like insert, find, delete, and count documents.
// By: Thebloxers998 <https://scratch.mit.edu/users/Thebloxers998/>
// License: MPL-2.0

class MongoTW {
    getInfo() {
        return {
            id: 'mongoTW',
            name: 'MongoTW',
            color1: '#4DB33D', // MongoDB green
            color2: '#389728', // Darker green
            color3: '#ffffff', // White text
            blocks: [
                {
                    opcode: 'connectToServer',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Connect to MongoDB Server [SERVER]',
                    arguments: {
                        SERVER: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'mongodb://<username>:<password>@your-mongodb-host:port/database',
                        },
                    },
                },
                {
                    opcode: 'checkConnectionStatus',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'Is MongoDB Server Connected?',
                },
                {
                    opcode: 'insertData',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Insert [DATA] into [COLLECTION]',
                    arguments: {
                        DATA: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '{"key": "value"}',
                        },
                        COLLECTION: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'defaultCollection',
                        },
                    },
                },
                {
                    opcode: 'findData',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Find data with query [QUERY] in [COLLECTION]',
                    arguments: {
                        QUERY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '{"key": "value"}',
                        },
                        COLLECTION: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'defaultCollection',
                        },
                    },
                },
                {
                    opcode: 'deleteData',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Delete data with query [QUERY] in [COLLECTION]',
                    arguments: {
                        QUERY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '{"key": "value"}',
                        },
                        COLLECTION: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'defaultCollection',
                        },
                    },
                },
                {
                    opcode: 'countDocuments',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Count documents in [COLLECTION]',
                    arguments: {
                        COLLECTION: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'defaultCollection',
                        },
                    },
                },
            ],
        };
    }

    connectToServer(args) {
        const serverUrl = args.SERVER;
        return fetch('http://localhost:1200/mongodb-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: serverUrl }),
        })
            .then(response => response.text())
            .then(data => data)
            .catch(() => 'Error connecting to server');
    }

    checkConnectionStatus() {
        return fetch('http://localhost:1200/mongodb-status')
            .then(response => response.json())
            .then(data => data === true)
            .catch(() => false);
    }

    insertData(args) {
        const data = JSON.parse(args.DATA);
        const collection = args.COLLECTION;
        return fetch('http://localhost:1200/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data,
                collection,
            }),
        })
            .then(response => response.text())
            .catch(() => 'Error inserting data');
    }

    findData(args) {
        const query = JSON.parse(args.QUERY);
        const collection = args.COLLECTION;
        return fetch('http://localhost:1200/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                collection,
            }),
        })
            .then(response => response.json())
            .catch(() => 'Error finding data');
    }

    deleteData(args) {
        const query = JSON.parse(args.QUERY);
        const collection = args.COLLECTION;
        return fetch('http://localhost:1200/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                collection,
            }),
        })
            .then(response => response.text())
            .catch(() => 'Error deleting data');
    }

    countDocuments(args) {
        const collection = args.COLLECTION;
        return fetch('http://localhost:1200/count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                collection,
            }),
        })
            .then(response => response.json())
            .catch(() => 'Error counting documents');
    }
}

Scratch.extensions.register(new MongoTW());
