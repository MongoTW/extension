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
            color1: '#4DB33D', // Primary MongoDB green for the first theme color
            color2: '#389728', // Secondary MongoDB darker green
            color3: '#ffffff', // White for text contrast
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
                    text: 'Insert [DATA] into MongoDB',
                    arguments: {
                        DATA: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '{"key": "value"}',
                        },
                    },
                },
                {
                    opcode: 'findData',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Find data with query [QUERY]',
                    arguments: {
                        QUERY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '{"key": "value"}',
                        },
                    },
                },
                {
                    opcode: 'deleteData',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Delete data with query [QUERY]',
                    arguments: {
                        QUERY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '{"key": "value"}',
                        },
                    },
                },
                {
                    opcode: 'countDocuments',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Count documents in MongoDB',
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
        return fetch('http://localhost:1200/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(response => response.text())
            .catch(() => 'Error inserting data');
    }

    findData(args) {
        const query = JSON.parse(args.QUERY);
        return fetch('http://localhost:1200/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
            .then(response => response.json())
            .catch(() => 'Error finding data');
    }

    deleteData(args) {
        const query = JSON.parse(args.QUERY);
        return fetch('http://localhost:1200/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
            .then(response => response.text())
            .catch(() => 'Error deleting data');
    }

    countDocuments() {
        return fetch('http://localhost:1200/count')
            .then(response => response.json())
            .catch(() => 'Error counting documents');
    }
}

Scratch.extensions.register(new MongoTW());
