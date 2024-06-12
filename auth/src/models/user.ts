import mongoose from 'mongoose';
import { Password } from '../services/password';

// Uma interface que descreve as propriedades
interface UserAttrs {
  email: string;
  password: string;
}

// Uma interface que descreve as propriedades que um modelo de usuário possui
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

// Uma interface que descreve as propriedades que um documento de usuário possui
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      // toJSON é um recurso interno do mongoose que permite manipular quais dados o schema retorna quando um usuário é criado
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema); // Estamos enviando interfaces usando genéricos para fazer a verificação de tipo dentro da função mongoose.model antes que ela possa compilar o modelo User

export { User };
