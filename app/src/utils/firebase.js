import * as app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import dig from 'object-dig';

const firebaseConfig = {
  apiKey: 'AIzaSyCHT0sPwe8T3BJxKAzo3e5y8OkNR3brZwg',
  authDomain: 'kamuskita-28d92.firebaseapp.com',
  databaseURL: 'https://kamuskita-28d92.firebaseio.com',
  projectId: 'kamuskita-28d92',
  storageBucket: 'kamuskita-28d92.appspot.com',
  messagingSenderId: '141578707470',
  appId: '1:141578707470:web:00f84fbcb7dac6b4',
};

const DEFINITIONS = 'definitions';
const WORDS = 'words';
export const PAGINATE_PER = 10;

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();
    this.connections = [];
    this.user = null;

    this.auth.onAuthStateChanged((user) => {
      this.user = {
        displayName: dig(user, 'displayName'),
        photoUrl: dig(user, 'photoURL'),
        uid: dig(user, 'uid'),
      };
    });
  }

  // *** Auth API ***

  createUser = (email, password, callback) => {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => this.signIn(email, password, callback))
      .catch((error) => {
        console.error(error.message);
      });
  };

  signIn = (email, password, callback) => {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(callback)
      .catch((error) => {
        console.error(error.message);
      });
  };

  // *** Firestore API ***

  readWords = (resolve) => {
    const ref = this.db.collection(WORDS);

    ref
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        resolve(data);
      })
      .catch((error) => {
        console.error('Error getting definitions: ', error);
      });
  }

  readDefinitions = async (resolve, query = {}) => {
    let ref = this.db.collection(DEFINITIONS)
      .orderBy('createdAt', 'desc');

    if (query.key) {
      ref = ref.where('key', '==', query.key);
    }

    if (query.user) {
      ref = ref.where('user.uid', '==', query.user);
    }

    if (query.cursor) {
      const lastDoc = await this.db.collection(DEFINITIONS).doc(query.cursor).get();
      ref = ref.startAfter(lastDoc);
    }

    ref
      .limit(PAGINATE_PER)
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        resolve(data);
      })
      .catch((error) => {
        console.error('Error getting definitions: ', error);
      });
  }

  readDefinition = (id, resolve) => {
    const ref = this.db.collection(DEFINITIONS).doc(id);

    ref
      .get()
      .then((doc) => {
        resolve({
          id: doc.id,
          ...doc.data(),
        });
      })
      .catch((error) => {
        console.error('Error getting definition: ', error);
      });
  }

  voteDefinition = (id, vote, callback) => {
    const ref = this.db.collection(DEFINITIONS).doc(id);

    ref
      .update({
        userVotes: {
          [this.user.uid]: vote,
        },
      })
      .then(() => {
        ref.get().then(doc => callback(doc.data().userVotes));
      })
      .catch((error) => {
        console.error('Error getting definition: ', error);
      });
  }

  readFirstUnvotedDefinition = (resolve) => {
    const ref = this.db.collection(DEFINITIONS)
      .where('likes', 'array-contains', this.user.uid)
      .limit(1);

    ref
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        resolve(data[0]);
      })
      .catch((error) => {
        console.error('Error getting definition: ', error);
      });
  }

  addDefinition = ({
    word, definition, example, tags,
  }, callback) => {
    if (!word) throw new Error('Word cannot be empty');
    if (!definition) throw new Error('Definition cannot be empty');
    if (!this.user) throw new Error('User must be logged in');

    const key = word.trim().toLowerCase().replace(/[^0-9a-zA-Z# ]/g, '-');

    const newDefinition = {
      key,
      word: word.trim(),
      definition: definition.trim(),
      example: example.trim(),
      tags: tags.split(',').map(tag => tag.trim()),
      createdAt: new Date(),
      user: this.user,
    };

    this.db.collection(DEFINITIONS)
      .add(newDefinition)
      .then(() => callback(key))
      .catch((error) => {
        console.error('Error adding definitions: ', error);
      });
  }

  // *** close connections ***
  close = () => {
    this.connections.forEach((disconnect) => {
      if (typeof disconnect === 'function') disconnect();
    });
    this.auth.signOut();
  };
}

const firebase = new Firebase();

export default firebase;
